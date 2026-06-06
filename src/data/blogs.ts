export interface Blog {
  id: number;
  title: string;
  slug: string;
  shortDesc: string;
  content: string;
  imagePath: string;
  category: string;
  publishDate: Date;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "How Free Meals Are Changing Lives on Campus",
    slug: "how-free-meals-are-changing-lives-on-campus",
    shortDesc: "Discover the impact of our meal program on student academic performance and mental health.",
    content: `<p>Food insecurity affects nearly 1 in 3 college students across the United States. For many, choosing between a meal and textbooks is a daily reality. The World Food Movement is working to change that — one meal at a time.</p><p>Our campus meal program has served over 50,000 meals this academic year alone. Students who participate report improved focus, reduced stress, and better academic outcomes.</p>`,
    imagePath: "/images/resources/food-image-home.webp",
    category: "Impact",
    publishDate: new Date("2026-04-15"),
  },
  {
    id: 2,
    title: "Why Plant-Based Meals Help Students Study Better",
    slug: "why-plant-based-meals-help-students-study-better",
    shortDesc: "The science behind why freshly cooked, plant-based food improves focus, energy, and academic performance.",
    content: `<p>At the heart of every meal we serve is a simple principle: food should nourish both body and mind. Our kitchens prepare fresh, plant-based meals daily using wholesome, locally sourced ingredients — because what students eat directly affects how well they can learn.</p><p>Research consistently shows that students who eat nutritious, regular meals perform better academically, experience lower stress levels, and are more likely to complete their degrees. That is why WFM focuses on freshly cooked, balanced meals — not pre-packaged food or pantry boxes.</p>`,
    imagePath: "/images/resources/food-serving.webp",
    category: "Nutrition",
    publishDate: new Date("2026-03-22"),
  },
  {
    id: 3,
    title: "Volunteer Spotlight: Meet the People Behind the Meals",
    slug: "volunteer-spotlight-meet-the-people-behind-the-meals",
    shortDesc: "Our volunteers are the backbone of everything we do. Meet a few of the incredible people who make it happen.",
    content: `<p>Behind every meal delivery is a volunteer who woke up early, packed their car, and showed up — not for recognition, but because they believe no student should go hungry. This month, we're spotlighting a few of the dedicated volunteers who make our program possible.</p>`,
    imagePath: "/images/resources/food-distribution-1.jpg",
    category: "Community",
    publishDate: new Date("2026-02-10"),
  },
];
