export type BuildStage = {
  id: string;
  /** Short name for the stage rail. */
  short: string;
  title: string;
  body: string;
  /** A live site from `sites.ts`, by name, and the detail on its screenshot that shows this stage. */
  proof: {
    site: string;
    label: string;
    caption: string;
    /** Box around the detail, in % of the 1280x800 screenshot. */
    mark: { left: number; top: number; width: number; height: number };
    /** Optional close-up: scale the shot from an origin (in %) so a small detail reads at body size. */
    zoom?: { scale: number; originX: number; originY: number };
  };
};

export const buildStages: BuildStage[] = [
  {
    id: "listen",
    short: "Listen",
    title: "We start with how customers reach you",
    body: "Before anything is designed, we learn how your business gets work today: who calls, who texts, who books and who asks for a quote. The site is built to make that first step easier.",
    proof: {
      site: "Sarah Ross Office Cleaning",
      label: "Call and text, first",
      caption: "The two ways customers get in touch sit right under the headline.",
      mark: { left: 3, top: 71, width: 41, height: 10.5 },
    },
  },
  {
    id: "shape",
    short: "Shape",
    title: "Then we shape the site around it",
    body: "No templates. If you already work from a quote sheet, the form looks like your quote sheet. If customers pick a time, they get a booking flow. The site fits the business, not the other way round.",
    proof: {
      site: "SS Cleaning LLC",
      label: "A work order, not a form",
      caption: "The quote request is a work order the customer fills in and the owner calls back on.",
      mark: { left: 42.5, top: 15, width: 53, height: 83 },
    },
  },
  {
    id: "build",
    short: "Build",
    title: "We build the parts that do the work",
    body: "Booking, quote forms, submissions, live numbers: whatever the site has to do, we build it properly, and make sure it's quick on a phone, where most of your customers will see it.",
    proof: {
      site: "BiyerKahini",
      label: "Live stats",
      caption: "Anonymous story submissions feed the live numbers on the home page.",
      mark: { left: 4.5, top: 76.5, width: 91, height: 9.5 },
    },
  },
  {
    id: "launch",
    short: "Launch",
    title: "And we set it up to be found",
    body: "Before launch, your services and areas each get a clear place, titles and link previews are set, and search engines can read every page. You see the finished site first, then we launch it together.",
    proof: {
      site: "SS Cleaning LLC",
      label: "Service areas",
      caption: "The counties the business covers are written into its opening lines, where customers and search engines read first.",
      mark: { left: 2, top: 49.5, width: 40, height: 15.5 },
      zoom: { scale: 2, originX: 0, originY: 64 },
    },
  },
];
