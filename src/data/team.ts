export type TeamMember = {
  name: string;
  role: string;
  /** Portrait in public/images/team, 4:5. Until there is one, the card shows initials. */
  photo?: string;
};

// Placeholders: replace each name and role, and add a photo path, before launch.
export const team: TeamMember[] = [
  { name: "Team Member", role: "Role" },
  { name: "Team Member", role: "Role" },
  { name: "Team Member", role: "Role" },
];
