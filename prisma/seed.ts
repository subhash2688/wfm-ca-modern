import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ── Clean existing data ──
  await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 0");
  const tables = [
    "menu_items", "email_templates", "banners", "settings",
    "financial_reports", "awards", "supporters", "team_members",
    "newsletters", "contacts", "faqs", "testimonials",
    "gallery_images", "galleries", "stories",
    "event_registrations", "events", "blogs", "news", "pages",
    "donations", "campaigns",
    "volunteer_availability", "meal_package_counts", "deliveries", "meal_requests", "meal_timetables",
    "chapter_images", "chapters", "kitchens", "locations", "colleges",
    "verification_tokens", "sessions", "accounts", "users",
  ];
  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`${table}\``);
  }
  await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 1");

  const password = await hash("password123", 12);

  // ── Colleges ──
  const [stateU, cityCollege, techInst] = await Promise.all([
    prisma.college.create({ data: { name: "State University", domain: "stateu.edu", email: "admin@stateu.edu" } }),
    prisma.college.create({ data: { name: "City College", domain: "citycollege.edu", email: "admin@citycollege.edu" } }),
    prisma.college.create({ data: { name: "Tech Institute", domain: "techinst.edu", email: "admin@techinst.edu" } }),
  ]);

  // ── Locations ──
  const [mainCafeteria, sciBuilding, libLobby, cityMain, techCafe] = await Promise.all([
    prisma.location.create({ data: { name: "Main Cafeteria", address: "Building A, Ground Floor", collegeId: stateU.id } }),
    prisma.location.create({ data: { name: "Science Building Lobby", address: "Science Block, 1st Floor", collegeId: stateU.id } }),
    prisma.location.create({ data: { name: "Library Lobby", address: "Central Library, Ground Floor", collegeId: stateU.id } }),
    prisma.location.create({ data: { name: "City College Main Hall", address: "Main Building, Ground Floor", collegeId: cityCollege.id } }),
    prisma.location.create({ data: { name: "Tech Cafe", address: "Innovation Hub, Level 1", collegeId: techInst.id } }),
  ]);

  // ── Kitchens ──
  await Promise.all([
    prisma.kitchen.create({ data: { name: "Central Kitchen", address: "123 Food Ave, Downtown", contactName: "Chef Raman", contactPhone: "+1-555-0101", contactEmail: "kitchen@wfmca.org" } }),
    prisma.kitchen.create({ data: { name: "Sattvic Kitchen East", address: "456 Green St, Eastside", contactName: "Chef Priya", contactPhone: "+1-555-0102", contactEmail: "east@wfmca.org" } }),
  ]);

  // ── Users (all 6 roles) ──
  const superAdmin = await prisma.user.create({
    data: { email: "admin@wfmca.org", password, firstName: "Super", lastName: "Admin", role: "SUPER_ADMIN", status: "ACTIVE", qrCode: "ADMIN-001" },
  });

  const collegeAdmin = await prisma.user.create({
    data: { email: "collegeadmin@stateu.edu", password, firstName: "College", lastName: "Admin", role: "COLLEGE_ADMIN", status: "ACTIVE", collegeId: stateU.id, qrCode: "CADM-001" },
  });

  const sattvicAdmin = await prisma.user.create({
    data: { email: "sattvic@wfmca.org", password, firstName: "Sattvic", lastName: "Admin", role: "SATTVIC_ADMIN", status: "ACTIVE", qrCode: "SADM-001" },
  });

  const volunteers = await Promise.all(
    [
      { email: "vol1@example.com", firstName: "Anika", lastName: "Patel", collegeId: stateU.id, qrCode: "VOL-001" },
      { email: "vol2@example.com", firstName: "James", lastName: "Wong", collegeId: stateU.id, qrCode: "VOL-002" },
      { email: "vol3@example.com", firstName: "Maria", lastName: "Garcia", collegeId: cityCollege.id, qrCode: "VOL-003" },
    ].map((v) =>
      prisma.user.create({
        data: { ...v, password, role: "VOLUNTEER", status: "ACTIVE", volunteerApproval: "APPROVED", volunteerApprovedAt: new Date(), gender: "FEMALE" },
      }),
    ),
  );

  const students = await Promise.all(
    [
      { email: "student1@stateu.edu", firstName: "Raj", lastName: "Kumar", collegeId: stateU.id, qrCode: "STU-001", gender: "MALE" as const },
      { email: "student2@stateu.edu", firstName: "Emily", lastName: "Chen", collegeId: stateU.id, qrCode: "STU-002", gender: "FEMALE" as const },
      { email: "student3@stateu.edu", firstName: "Omar", lastName: "Hassan", collegeId: stateU.id, qrCode: "STU-003", gender: "MALE" as const },
      { email: "student4@citycollege.edu", firstName: "Sophia", lastName: "Lee", collegeId: cityCollege.id, qrCode: "STU-004", gender: "FEMALE" as const },
      { email: "student5@citycollege.edu", firstName: "David", lastName: "Kim", collegeId: cityCollege.id, qrCode: "STU-005", gender: "MALE" as const },
      { email: "student6@techinst.edu", firstName: "Priya", lastName: "Singh", collegeId: techInst.id, qrCode: "STU-006", gender: "FEMALE" as const },
    ].map((s) =>
      prisma.user.create({
        data: { ...s, password, role: "STUDENT", status: "ACTIVE" },
      }),
    ),
  );

  const donors = await Promise.all(
    [
      { email: "donor1@example.com", firstName: "Robert", lastName: "Johnson", qrCode: "DON-001" },
      { email: "donor2@example.com", firstName: "Sarah", lastName: "Williams", qrCode: "DON-002" },
    ].map((d) =>
      prisma.user.create({
        data: { ...d, password, role: "DONOR", status: "ACTIVE" },
      }),
    ),
  );

  // ── Meal Timetable ──
  const days: Array<"MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"> = [
    "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY",
  ];
  const mealTimes: Array<"BREAKFAST" | "LUNCH" | "DINNER"> = ["BREAKFAST", "LUNCH", "DINNER"];
  for (const day of days) {
    for (const mealTime of mealTimes) {
      // No breakfast on weekends
      const isActive = !(["SATURDAY", "SUNDAY"].includes(day) && mealTime === "BREAKFAST");
      await prisma.mealTimetable.create({ data: { mealTime, day, isActive } });
    }
  }

  // ── Meal Requests (sample: this week) ──
  const today = new Date();
  const mondayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + dayIdx);
    const dayName = days[dayIdx];

    for (const student of students.slice(0, 4)) {
      for (const mealTime of ["LUNCH" as const, "DINNER" as const]) {
        await prisma.mealRequest.create({
          data: {
            userId: student.id,
            locationId: student.collegeId === stateU.id ? mainCafeteria.id : cityMain.id,
            requestDate: date,
            day: dayName,
            mealTime,
            status: "ACTIVE",
          },
        });
      }
    }
  }

  // ── Deliveries (some past deliveries) ──
  for (let dayIdx = 0; dayIdx < 3; dayIdx++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + dayIdx);
    const dayName = days[dayIdx];

    for (const student of students.slice(0, 3)) {
      await prisma.delivery.create({
        data: {
          deliveryDate: date,
          mealTime: "LUNCH",
          deliveryType: "VOLUNTEER_DELIVERY",
          studentId: student.id,
          volunteerId: volunteers[0].id,
          locationId: mainCafeteria.id,
        },
      });
    }

    // Walk-in deliveries
    await prisma.delivery.create({
      data: {
        deliveryDate: date,
        mealTime: "LUNCH",
        deliveryType: "WALK_IN",
        walkInCount: 5,
        volunteerId: volunteers[1].id,
        locationId: mainCafeteria.id,
      },
    });
  }

  // ── Package Counts ──
  for (let dayIdx = 0; dayIdx < 3; dayIdx++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + dayIdx);
    const dayName = days[dayIdx];

    await prisma.mealPackageCount.create({
      data: {
        date,
        day: dayName,
        mealTime: "LUNCH",
        locationId: mainCafeteria.id,
        collegeId: stateU.id,
        volunteerId: volunteers[0].id,
        mealsDelivered: 25,
        extraPackagesDelivered: 5,
        mealsCancelled: 2,
        mealsReturned: 1,
      },
    });
  }

  // ── Campaigns ──
  const [feedACampus, winterMeals] = await Promise.all([
    prisma.campaign.create({
      data: {
        name: "Feed a Campus",
        slug: "feed-a-campus",
        description: "Help us provide nutritious meals to students across all partner universities. Every $5 feeds a student for a day.",
        goalAmount: 50000,
        raisedAmount: 32450,
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-06-30"),
        isActive: true,
        status: "PUBLISHED",
      },
    }),
    prisma.campaign.create({
      data: {
        name: "Winter Meals Drive",
        slug: "winter-meals-drive",
        description: "During winter break, many students who rely on campus meal programs lose access to regular meals. Help us bridge the gap.",
        goalAmount: 25000,
        raisedAmount: 18200,
        startDate: new Date("2025-11-01"),
        endDate: new Date("2026-02-28"),
        isActive: true,
        status: "PUBLISHED",
      },
    }),
  ]);

  // ── Donations ──
  const donationData = [
    { amount: 100, userId: donors[0].id, donorName: "Robert Johnson", donorEmail: "donor1@example.com", campaignId: feedACampus.id, status: "COMPLETED" as const },
    { amount: 250, userId: donors[1].id, donorName: "Sarah Williams", donorEmail: "donor2@example.com", campaignId: feedACampus.id, status: "COMPLETED" as const },
    { amount: 50, donorName: "Anonymous Donor", donorEmail: "anon@example.com", campaignId: winterMeals.id, status: "COMPLETED" as const, isAnonymous: true },
    { amount: 500, userId: donors[0].id, donorName: "Robert Johnson", donorEmail: "donor1@example.com", status: "COMPLETED" as const },
    { amount: 25, donorName: "Jane Smith", donorEmail: "jane@example.com", campaignId: feedACampus.id, status: "COMPLETED" as const },
  ];
  for (const d of donationData) {
    await prisma.donation.create({ data: d });
  }

  // ── CMS Pages ──
  const pageData = [
    { title: "About Us", slug: "about-us", content: "<h2>Our Mission</h2><p>The World Food Movement for College and University Students of America (WFMCA) is dedicated to ending hunger among college students. We believe no student should have to choose between buying textbooks and buying food.</p><h2>Our Story</h2><p>Founded in 2015, WFMCA started as a small initiative at State University. Today, we serve over 10,000 meals per week across 50+ partner campuses.</p>", metaTitle: "About WFMCA - Fighting Student Hunger", metaDescription: "Learn about WFMCA's mission to end hunger among college students in America." },
    { title: "Our Programs", slug: "programs", content: "<h2>Daily Meal Distribution</h2><p>Our flagship program provides nutritious breakfast, lunch, and dinner to registered students through campus pickup points.</p><h2>Volunteer Delivery Network</h2><p>Our trained volunteers deliver meals directly to students who cannot visit pickup locations.</p><h2>Emergency Food Assistance</h2><p>Immediate meal support for students facing acute food insecurity.</p>", metaTitle: "Programs - WFMCA", metaDescription: "Explore WFMCA's programs: daily meal distribution, volunteer delivery, and emergency food assistance." },
    { title: "Get Involved", slug: "get-involved", content: "<h2>Ways to Help</h2><p>Whether you can spare time, money, or resources, there's a way for you to help end student hunger.</p><h3>Volunteer</h3><p>Join our delivery network and help bring meals to students on your campus.</p><h3>Donate</h3><p>Every dollar helps. $5 feeds a student for a day, $35 for a week, $150 for a month.</p><h3>Campus Ambassador</h3><p>Represent WFMCA on your campus and help us expand our reach.</p>", metaTitle: "Get Involved - WFMCA", metaDescription: "Join the fight against student hunger. Volunteer, donate, or become a campus ambassador." },
    { title: "Our Vision", slug: "vision", content: "<h2>A World Where No Student Goes Hungry</h2><p>We envision a future where every college student in America has reliable access to nutritious meals, enabling them to focus on their education and reach their full potential.</p>", metaTitle: "Our Vision - WFMCA" },
    { title: "Contact Us", slug: "contact", content: "<h2>Get in Touch</h2><p>Have questions? Want to partner with us? We'd love to hear from you.</p><p>Email: info@wfmca.org<br>Phone: (555) 123-4567<br>Address: 100 Hope Street, Suite 200, New York, NY 10001</p>", metaTitle: "Contact WFMCA" },
  ];
  for (const p of pageData) {
    await prisma.page.create({ data: { ...p, status: "PUBLISHED", createdById: superAdmin.id, modifiedById: superAdmin.id } });
  }

  // ── News ──
  const newsData = [
    { title: "WFMCA Expands to 5 New Campuses", slug: "wfmca-expands-five-new-campuses", shortDesc: "We're thrilled to announce partnerships with five new universities.", content: "<p>This spring, WFMCA is expanding its meal distribution program to five new campuses across three states. The expansion will serve an estimated 2,000 additional students per week.</p><p>\"We've seen incredible demand from campuses nationwide,\" says our Executive Director. \"Every campus we add means hundreds more students who won't go hungry.\"</p>", publishDate: new Date("2026-03-15") },
    { title: "2.3 Million Meals Milestone", slug: "2-3-million-meals-milestone", shortDesc: "WFMCA has officially served over 2.3 million meals since our founding.", content: "<p>Today marks a tremendous milestone for our organization. Since our founding in 2015, we have served over 2.3 million meals to college students facing food insecurity.</p>", publishDate: new Date("2026-02-28") },
    { title: "Annual Fundraising Gala a Huge Success", slug: "annual-fundraising-gala-success", shortDesc: "Our 2026 gala raised over $200,000 for student meal programs.", content: "<p>The 10th annual WFMCA Fundraising Gala was held last Saturday at the Grand Ballroom, with over 500 guests in attendance. The event raised a record-breaking $200,000.</p>", publishDate: new Date("2026-02-10") },
  ];
  for (const n of newsData) {
    await prisma.news.create({ data: { ...n, status: "PUBLISHED", createdById: superAdmin.id, modifiedById: superAdmin.id } });
  }

  // ── Blogs ──
  const blogData = [
    { title: "Why Student Hunger is a Hidden Crisis", slug: "student-hunger-hidden-crisis", shortDesc: "Millions of college students face food insecurity. Here's why it's more common than you think.", content: "<p>When we think of hunger in America, college students rarely come to mind. Yet studies show that up to 36% of university students experience food insecurity at some point during their academic careers.</p>", category: "Awareness", tags: JSON.stringify(["hunger", "students", "awareness"]) },
    { title: "A Day in the Life of a WFMCA Volunteer", slug: "day-in-life-volunteer", shortDesc: "Follow volunteer Anika as she delivers meals across campus.", content: "<p>It's 6:30 AM and Anika Patel is already up, checking her delivery schedule for the day. As a WFMCA volunteer at State University, she's responsible for delivering breakfast to students in the science buildings.</p>", category: "Stories", tags: JSON.stringify(["volunteer", "stories", "campus"]) },
  ];
  for (const b of blogData) {
    await prisma.blog.create({ data: { ...b, status: "PUBLISHED", publishDate: new Date(), createdById: superAdmin.id, modifiedById: superAdmin.id } });
  }

  // ── Events ──
  await Promise.all([
    prisma.event.create({
      data: { title: "Spring Volunteer Orientation", slug: "spring-volunteer-orientation-2026", shortDesc: "Join us to learn about volunteer opportunities for the spring semester.", content: "<p>New volunteers welcome! Learn about meal delivery procedures, QR scanning, and safety protocols.</p>", eventDate: new Date("2026-04-15T10:00:00"), endDate: new Date("2026-04-15T14:00:00"), venue: "State University Student Center, Room 201", status: "PUBLISHED", createdById: superAdmin.id, modifiedById: superAdmin.id },
    }),
    prisma.event.create({
      data: { title: "Annual Fundraising Gala 2026", slug: "annual-gala-2026", shortDesc: "Our biggest fundraising event of the year.", content: "<p>Join us for an evening of inspiration, fine dining, and fundraising to support student meal programs nationwide.</p>", eventDate: new Date("2026-06-20T18:00:00"), endDate: new Date("2026-06-20T22:00:00"), venue: "Grand Ballroom, 500 Park Avenue, NY", status: "PUBLISHED", createdById: superAdmin.id, modifiedById: superAdmin.id },
    }),
  ]);

  // ── Stories ──
  await Promise.all([
    prisma.story.create({
      data: { title: "From Hungry to Hopeful: Raj's Story", slug: "rajs-story", excerpt: "How WFMCA meals helped Raj focus on his engineering degree.", content: "<p>When Raj Kumar started his freshman year at State University, he was excited but anxious. Coming from a low-income family, he knew that every dollar counted. 'I often had to choose between buying a meal and buying course materials,' he recalls.</p><p>A friend told him about WFMCA's meal program. 'It changed everything. I could focus on my studies knowing that I wouldn't go hungry. I graduated with honors and now work as a software engineer.'</p>", authorName: "WFMCA Team", status: "PUBLISHED" },
    }),
    prisma.story.create({
      data: { title: "Why I Volunteer: Maria's Journey", slug: "marias-journey", excerpt: "Maria Garcia shares why delivering meals is the best part of her week.", content: "<p>Maria Garcia has been a WFMCA volunteer for two years. 'I started volunteering because I knew what hunger felt like. When I was a freshman, there were days I couldn't afford to eat. Now that I have a meal plan, I want to make sure other students don't go through what I did.'</p>", authorName: "WFMCA Team", status: "PUBLISHED" },
    }),
  ]);

  // ── Galleries ──
  const gallery = await prisma.gallery.create({
    data: { title: "Campus Meal Distribution", slug: "campus-meal-distribution", description: "Photos from our daily meal distribution across partner campuses.", status: "PUBLISHED" },
  });
  for (let i = 1; i <= 6; i++) {
    await prisma.galleryImage.create({
      data: { galleryId: gallery.id, imagePath: `/images/gallery/meal-distribution-${i}.jpg`, altText: `Meal distribution photo ${i}`, sortOrder: i },
    });
  }

  // ── FAQs ──
  const faqData = [
    { question: "How do I register for the meal program?", answer: "Visit our website and create an account. Select your college, provide your student ID, and choose your preferred meal times and pickup locations.", category: "Students" },
    { question: "Is the meal program really free?", answer: "Yes! All meals are completely free for registered students. Our programs are funded through donations and grants.", category: "Students" },
    { question: "How can I become a volunteer?", answer: "Register on our website and select 'Volunteer' as your role. After completing a brief orientation, you'll be matched with delivery routes on your campus.", category: "Volunteers" },
    { question: "Is my donation tax-deductible?", answer: "Yes, WFMCA is a registered 501(c)(3) nonprofit. All donations are tax-deductible to the full extent allowed by law. You'll receive a receipt via email.", category: "Donors" },
    { question: "What types of meals do you serve?", answer: "We serve nutritious, balanced meals including vegetarian and allergen-conscious options. Our menus are designed by nutritionists to support student health and academic performance.", category: "General" },
  ];
  for (let i = 0; i < faqData.length; i++) {
    await prisma.faq.create({ data: { ...faqData[i], sortOrder: i + 1, status: "PUBLISHED" } });
  }

  // ── Testimonials ──
  await Promise.all([
    prisma.testimonial.create({ data: { name: "Raj Kumar", role: "Student", content: "WFMCA literally saved my college career. I was on the verge of dropping out because I couldn't afford food and tuition. Now I'm graduating with honors.", rating: 5, sortOrder: 1 } }),
    prisma.testimonial.create({ data: { name: "Anika Patel", role: "Volunteer", content: "Volunteering with WFMCA has been the most rewarding experience of my life. Seeing the relief on students' faces when they receive their meals keeps me coming back.", rating: 5, sortOrder: 2 } }),
    prisma.testimonial.create({ data: { name: "Robert Johnson", role: "Donor", content: "I've donated to many nonprofits, but WFMCA stands out for their transparency and impact. I know exactly where my money goes — directly to feeding students.", rating: 5, sortOrder: 3 } }),
  ]);

  // ── Team Members ──
  await Promise.all([
    prisma.teamMember.create({ data: { name: "Dr. Anand Sharma", title: "Executive Director", bio: "Dr. Sharma founded WFMCA in 2015 with a vision to end student hunger in America.", teamType: "leadership", sortOrder: 1 } }),
    prisma.teamMember.create({ data: { name: "Jennifer Park", title: "Director of Operations", bio: "Jennifer oversees daily operations across all campus partnerships.", teamType: "leadership", sortOrder: 2 } }),
    prisma.teamMember.create({ data: { name: "Michael Torres", title: "Director of Development", bio: "Michael leads fundraising and donor relations for the organization.", teamType: "leadership", sortOrder: 3 } }),
    prisma.teamMember.create({ data: { name: "Dr. Lisa Chen", title: "Board Chair", bio: "Dr. Chen is a professor of public health and longtime advocate for food security.", teamType: "advisory", sortOrder: 1 } }),
  ]);

  // ── Supporters ──
  await Promise.all([
    prisma.supporter.create({ data: { name: "Global Foods Foundation", website: "https://example.com", supportType: "foundation", sortOrder: 1 } }),
    prisma.supporter.create({ data: { name: "TechCorp", website: "https://example.com", supportType: "corporate", sortOrder: 2 } }),
    prisma.supporter.create({ data: { name: "Community Health Alliance", website: "https://example.com", supportType: "foundation", sortOrder: 3 } }),
  ]);

  // ── Awards ──
  await prisma.award.create({
    data: { title: "Best Nonprofit Innovation Award 2025", description: "Recognized for our QR-based meal distribution system that increased efficiency by 300%.", awardDate: new Date("2025-11-15") },
  });

  // ── Financial Reports ──
  await prisma.financialReport.create({
    data: { title: "Annual Report 2025", year: 2025, description: "Complete financial statements and impact report for fiscal year 2025.", filePath: "/reports/annual-report-2025.pdf" },
  });

  // ── Chapters ──
  const chapter = await prisma.chapter.create({
    data: { name: "Northeast Chapter", slug: "northeast", description: "Serving universities across New York, New Jersey, Connecticut, and Massachusetts." },
  });
  await prisma.chapterImage.create({ data: { chapterId: chapter.id, imagePath: "/images/chapters/northeast-banner.jpg", imageType: "banner", altText: "Northeast Chapter" } });

  // ── Banners ──
  await Promise.all([
    prisma.banner.create({ data: { title: "No Student Should Go Hungry", subtitle: "Join us in the fight against student food insecurity", imagePath: "/images/banners/hero-1.jpg", linkUrl: "/donate", sortOrder: 1 } }),
    prisma.banner.create({ data: { title: "2.3 Million Meals Served", subtitle: "And counting — thanks to donors and volunteers like you", imagePath: "/images/banners/hero-2.jpg", linkUrl: "/about-us", sortOrder: 2 } }),
    prisma.banner.create({ data: { title: "Become a Volunteer", subtitle: "Make a difference on your campus today", imagePath: "/images/banners/hero-3.jpg", linkUrl: "/get-involved", sortOrder: 3 } }),
  ]);

  // ── Settings ──
  const settings = [
    { key: "site_name", value: "WFMCA" },
    { key: "site_tagline", value: "World Food Movement for College and University Students of America" },
    { key: "site_email", value: "info@wfmca.org" },
    { key: "site_phone", value: "(555) 123-4567" },
    { key: "site_address", value: "100 Hope Street, Suite 200, New York, NY 10001" },
    { key: "social_facebook", value: "https://facebook.com/wfmca" },
    { key: "social_twitter", value: "https://twitter.com/wfmca" },
    { key: "social_instagram", value: "https://instagram.com/wfmca" },
    { key: "social_linkedin", value: "https://linkedin.com/company/wfmca" },
    { key: "social_youtube", value: "https://youtube.com/wfmca" },
    { key: "impact_meals_served", value: "2300000" },
    { key: "impact_campuses", value: "52" },
    { key: "impact_volunteers", value: "1200" },
    { key: "impact_states", value: "18" },
    { key: "donation_amounts", value: JSON.stringify([5, 25, 50, 100, 250, 500]) },
    { key: "header_menu", value: JSON.stringify([
      { label: "About Us", href: "/about-us", children: [
        { label: "Our Mission", href: "/about-us" },
        { label: "Our Team", href: "/team" },
        { label: "Vision & Mission", href: "/vision" },
        { label: "Financial Reports", href: "/financial-reports" },
      ]},
      { label: "Programs", href: "/programs" },
      { label: "Get Involved", href: "/get-involved", children: [
        { label: "Volunteer", href: "/get-involved" },
        { label: "Donate", href: "/donate" },
        { label: "Campus Ambassador", href: "/get-involved" },
      ]},
      { label: "News & Events", href: "/news", children: [
        { label: "News", href: "/news" },
        { label: "Events", href: "/events" },
        { label: "Blog", href: "/blogs" },
      ]},
      { label: "Stories", href: "/stories" },
      { label: "Contact", href: "/contact" },
    ])},
  ];
  for (const s of settings) {
    await prisma.setting.create({ data: s });
  }

  // ── Email Templates ──
  await Promise.all([
    prisma.emailTemplate.create({ data: { name: "welcome", subject: "Welcome to WFMCA!", body: "<h1>Welcome, {{firstName}}!</h1><p>Thank you for joining WFMCA. Your account has been created successfully.</p>" } }),
    prisma.emailTemplate.create({ data: { name: "otp", subject: "Your WFMCA Login Code", body: "<h1>Your verification code</h1><p>Your one-time password is: <strong>{{otpCode}}</strong></p><p>This code expires in 10 minutes.</p>" } }),
    prisma.emailTemplate.create({ data: { name: "donation_receipt", subject: "Thank You for Your Donation!", body: "<h1>Thank you, {{donorName}}!</h1><p>Your donation of ${{amount}} has been received. This tax-deductible contribution will help feed students across America.</p><p>Receipt #: {{receiptId}}</p>" } }),
    prisma.emailTemplate.create({ data: { name: "volunteer_approved", subject: "You're Approved as a WFMCA Volunteer!", body: "<h1>Congratulations, {{firstName}}!</h1><p>Your volunteer application has been approved. You can now start signing up for delivery shifts.</p>" } }),
    prisma.emailTemplate.create({ data: { name: "password_reset", subject: "Reset Your WFMCA Password", body: "<h1>Password Reset</h1><p>Click the link below to reset your password:</p><p><a href='{{resetUrl}}'>Reset Password</a></p><p>This link expires in 1 hour.</p>" } }),
  ]);

  // ── Menu Items ──
  const headerItems = [
    { menuGroup: "header", label: "About Us", href: "/about-us", sortOrder: 1 },
    { menuGroup: "header", label: "Programs", href: "/programs", sortOrder: 2 },
    { menuGroup: "header", label: "Get Involved", href: "/get-involved", sortOrder: 3 },
    { menuGroup: "header", label: "News", href: "/news", sortOrder: 4 },
    { menuGroup: "header", label: "Stories", href: "/stories", sortOrder: 5 },
    { menuGroup: "header", label: "Contact", href: "/contact", sortOrder: 6 },
  ];
  const footerItems = [
    { menuGroup: "footer", label: "About Us", href: "/about-us", sortOrder: 1 },
    { menuGroup: "footer", label: "Programs", href: "/programs", sortOrder: 2 },
    { menuGroup: "footer", label: "FAQs", href: "/faqs", sortOrder: 3 },
    { menuGroup: "footer", label: "Privacy Policy", href: "/privacy-policy", sortOrder: 4 },
    { menuGroup: "footer", label: "Terms of Service", href: "/terms", sortOrder: 5 },
  ];
  for (const item of [...headerItems, ...footerItems]) {
    await prisma.menuItem.create({ data: item });
  }

  // ── Volunteer Availability ──
  for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + dayIdx);

    for (const vol of volunteers.slice(0, 2)) {
      await prisma.volunteerAvailability.create({
        data: { userId: vol.id, locationId: mainCafeteria.id, date, mealTime: "LUNCH", isAssigned: dayIdx < 3 },
      });
    }
  }

  console.log("Seed complete!");
  console.log(`
  Test Accounts (all passwords: "password123"):
  ─────────────────────────────────────────────
  Super Admin:    admin@wfmca.org
  College Admin:  collegeadmin@stateu.edu
  Sattvic Admin:  sattvic@wfmca.org
  Volunteer:      vol1@example.com
  Student:        student1@stateu.edu
  Donor:          donor1@example.com
  `);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
