import { router, publicProcedure } from "@/lib/trpc/init";

const team = [
  { id: 1, name: "Arjun Mehta", title: "Founder & Executive Director", bio: "Arjun founded WFM in 2019 after witnessing food insecurity firsthand on his college campus.", imagePath: "/images/testimonials/testimonial0.jpg", teamType: "leadership", sortOrder: 1 },
  { id: 2, name: "Lakshmi Patel", title: "Director of Programs", bio: "Lakshmi oversees all campus chapter operations and volunteer training programs across the country.", imagePath: "/images/testimonials/testimonial1.jpg", teamType: "leadership", sortOrder: 2 },
  { id: 3, name: "Daniel Okafor", title: "Director of Development", bio: "Daniel leads fundraising, grant writing, and donor relations. He has secured over $1M in funding for WFM programs.", imagePath: "/images/testimonials/testimonial2.jpg", teamType: "leadership", sortOrder: 3 },
  { id: 4, name: "Sofia Reyes", title: "Head of Volunteer Operations", bio: "Sofia manages our network of 500+ volunteers, coordinating scheduling, training, and recognition programs.", imagePath: "/images/testimonials/testimonial3.jpg", teamType: "leadership", sortOrder: 4 },
];

export const teamRouter = router({
  list: publicProcedure.query(() => team),
});
