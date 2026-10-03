export type Service = {
  id: string;
  name: string;
  /** Matching "What do you need?" chip on the contact form. */
  need: string;
  summary: string;
  includes: string[];
  /** Live sites from `sites.ts` that already do this, by name, with the feature that shows it. */
  proof: { site: string; feature: string }[];
  /** Shown instead of proof when there is none yet. */
  note?: string;
};

export const services: Service[] = [
  {
    id: "websites",
    name: "Websites",
    need: "New website",
    summary: "Custom-built around how your business runs, not a template with your logo on it.",
    includes: [
      "Designed and built from scratch for your business",
      "Made for phones first, where most of your customers are",
      "Your services, areas and prices laid out clearly",
      "Contact forms and click-to-call that reach you",
    ],
    proof: [
      { site: "Sparkle Clean", feature: "Free estimates" },
      { site: "Sarah Ross Office Cleaning", feature: "Owner story" },
      { site: "BiyerKahini", feature: "Light and dark mode" },
    ],
  },
  {
    id: "booking",
    name: "Booking & quotes",
    need: "Booking or quotes",
    summary: "Let customers book a slot or ask for a quote without having to phone you.",
    includes: [
      "Online booking for your services",
      "Quote and estimate forms shaped like your own paperwork",
      "Text-for-a-quote and click-to-call buttons",
      "Every enquiry kept in one place, so none slip through",
    ],
    proof: [
      { site: "Sparkle Clean NYC", feature: "Online booking" },
      { site: "SS Cleaning LLC", feature: "Work-order quote form" },
      { site: "Sarah Ross Office Cleaning", feature: "Text for a quote" },
    ],
  },
  {
    id: "seo",
    name: "SEO",
    need: "SEO",
    summary: "So people searching for what you do, where you do it, find you.",
    includes: [
      "A page for each service and area you cover",
      "Fast, clean pages search engines can read",
      "Titles, descriptions and link previews set up properly",
      "A blog, if you want to publish",
    ],
    proof: [
      { site: "Sparkle Clean", feature: "Service areas" },
      { site: "SS Cleaning LLC", feature: "Service areas" },
      { site: "Sparkle Clean NYC", feature: "Blog" },
    ],
  },
  {
    id: "social",
    name: "Social content",
    need: "Social content",
    summary: "Posts for your Instagram and Facebook, so your feed looks as good as your site.",
    includes: [
      "Posts designed in your brand",
      "Planned around your services and busy seasons",
      "Made to point people back to your site",
    ],
    proof: [],
    note: "This is our newest service, so there's no client work to show here yet. Ask us how it would work for your business.",
  },
];
