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
    title: "The Sattvic Diet: Nourishing Body and Mind",
    slug: "the-sattvic-diet-nourishing-body-and-mind",
    shortDesc: "Learn about the philosophy behind our nutritious, plant-based meal offerings.",
    content: `<p>At the heart of every meal we serve is the principle of sattvic nutrition — food that is pure, wholesome, and prepared with care. Rooted in Ayurvedic tradition, sattvic foods promote clarity of mind and vitality of body.</p><p>Our kitchens prepare fresh, vegetarian meals daily using seasonal, locally sourced ingredients whenever possible.</p>`,
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
