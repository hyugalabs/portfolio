export type Site = {
  name: string;
  description: string;
  image: string;
  href: string;
  features: string[];
};

// Live sites shown on /components. Previews are 1280x800 screenshots in public/images/sites.
export const sites: Site[] = [
  {
    name: "Sparkle Clean",
    description: "Home and commercial cleaning across west-central Ohio, with free estimates up front.",
    image: "/images/sites/sparkle.png",
    features: ["Free estimates", "Service areas", "Reviews"],
    href: "https://sparkle.hyugalabs.com/",
  },
  {
    name: "SS Cleaning LLC",
    description: "House, office and post-construction cleaning, with a work-order style quote form.",
    image: "/images/sites/sscleaning.png",
    features: ["Work-order quote form", "Service areas", "Click-to-call"],
    href: "https://sscleaningllc.vercel.app/",
  },
  {
    name: "Sarah Ross Office Cleaning",
    description: "Owner-operated commercial cleaning with call and text-for-quote at the top.",
    image: "/images/sites/srocleaning.png",
    features: ["Click-to-call", "Text for a quote", "Owner story"],
    href: "https://srocleaning.vercel.app/",
  },
  {
    name: "Sparkle Clean NYC",
    description: "Multi-borough cleaning service with online booking, services and a blog.",
    image: "/images/sites/aniktests.png",
    features: ["Online booking", "Services", "Blog"],
    href: "https://www.aniktests.online/",
  },
  {
    name: "BiyerKahini",
    description: "A community site for anonymous wedding cost stories, with submissions and live stats.",
    image: "/images/sites/biyerkahini.png",
    features: ["Story submissions", "Live stats", "Light and dark mode"],
    href: "https://www.biyerkahini.online/",
  },
  {
    name: "Dry Masters Carpet Systems",
    description: "Low-moisture, steam-free carpet cleaning in Canton, Ohio, with reviews and a blog.",
    image: "/images/sites/drymasters.png",
    features: ["Services", "Google reviews", "Blog"],
    href: "https://drymasterscarpetsystemsllc.vercel.app/",
  },
];
