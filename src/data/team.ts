export type TeamMember = {
  name: string;
  role: string;
  /** Where the name links: a personal site or LinkedIn. Opens in a new tab. */
  href: string;
  /** Portrait in public/images/team, 4:5. Until there is one, the card shows a blobatar seeded by the name. */
  photo?: string;
};

export const team: TeamMember[] = [
  { name: "Khalid Hasan", role: "Co-founder & CEO", href: "https://khalidhasananik.com/" },
  { name: "Tihum Kabir", role: "Co-founder & COO", href: "https://www.tihumkabir.com/" },
  { name: "Habibur Rahman", role: "Co-founder & CTO", href: "https://www.linkedin.com/in/habiburrahmantanim/" },
];
