import { siteConfig } from "@/lib/site-config";

const base = siteConfig.url;

const body = `# ${siteConfig.name}

> ${siteConfig.tagline}. ${siteConfig.description}

${siteConfig.name} is a small remote team that designs and builds custom websites for small businesses, and adds SEO and social content so customers can find them.

## Pages

- [Home](${base}): what we do and the sites we have built
- [Services](${base}/services): custom websites, booking and quote forms, SEO, social content
- [Our Work](${base}/components): live client websites we designed and built
- [About](${base}/about): how we build a site from first message to launch, and the team
- [Contact](${base}/contact): send us a message about your business

## Contact

- Email: ${siteConfig.email}
- Phone: ${siteConfig.phoneDisplay}
${siteConfig.socials.map((s) => `- ${s.label}: ${s.href}`).join("\n")}

## Legal

- [Privacy Policy](${base}/privacy)
- [Terms of Service](${base}/terms)
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
