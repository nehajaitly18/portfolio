export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  href: string;
  thumbClass: string;
  image?: string;
  imageScale?: number;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "midorm",
    index: "01",
    title: "MiDorm",
    category: "UX / Product Design",
    year: "2025",
    description: "A mobile app simplifying dorm selection for incoming University of Michigan freshmen — replacing scattered information with an intuitive comparison-first experience.",
    tags: ["iOS", "UX Research", "Prototyping"],
    href: "/work/midorm",
    thumbClass: "project-thumb-1",
    image: "/001.jpg",
    featured: true,
  },
  {
    id: "elvis-presley",
    index: "02",
    title: "Elvis Presley's Albums",
    category: "Publication Design",
    year: "2024",
    description: "An editorial publication exploring the visual narratives embedded in Elvis Presley's discography — where music history meets typographic craft.",
    tags: ["Editorial", "Typography", "Print"],
    href: "/work/elvis-presley",
    thumbClass: "project-thumb-2",
    image: "/elvis blue.png",
    featured: true,
  },
  {
    id: "steamy-sips",
    index: "03",
    title: "Steamy Sips",
    category: "Visual Branding & Identity",
    year: "2026",
    description: "Visual branding and identity system for Steamy Sips — a cohesive brand language built around warmth, ritual, and sensory detail.",
    tags: ["Branding", "Identity", "Visual Design"],
    href: "/work/steamy-sips",
    thumbClass: "project-thumb-3",
    image: "/glass sign updated.png",
  },
  {
    id: "la-raza",
    index: "04",
    title: "La Raza Arts",
    category: "Exhibition Design",
    year: "2024",
    description: "Zine design for the La Raza Arts and Media Collective's exhibition — a tactile artifact connecting community storytelling with contemporary visual culture.",
    tags: ["Zine", "Exhibition", "Print"],
    href: "/work/la-raza",
    thumbClass: "project-thumb-4",
    image: "/zine cover image-1.png",
  },
  {
    id: "micro-merchant-loan",
    index: "05",
    title: "Micro Merchant Loan",
    category: "UX / UI Design",
    year: "2025",
    description: "Redesigning the loan application experience for micro-merchants at Paytm — reducing friction and increasing accessibility for India's informal economy.",
    tags: ["Fintech", "UX Research", "Systems"],
    href: "/work/micro-merchant-loan",
    thumbClass: "project-thumb-5",
    image: "/paytm cover.png",
  },
  {
    id: "penny-stamps",
    index: "06",
    title: "Penny W. Stamps",
    category: "Wayfinding & Branding",
    year: "2024",
    description: "A comprehensive wayfinding and signage system for the Penny W. Stamps School of Art & Design — translating institutional identity into spatial language.",
    tags: ["Wayfinding", "Branding", "Signage"],
    href: "/work/penny-stamps",
    thumbClass: "project-thumb-6",
    image: "/map hero.png",
  },
];
