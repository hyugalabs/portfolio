import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "The terms for using the Hyuga Labs website, and how our website design and SEO projects are agreed.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 10, 2026"
      intro={`These terms apply to your use of hyugalabs.com, run by ${siteConfig.name}. By using the site you agree to them. If you don't, please don't use it.`}
      sections={[
        {
          heading: "About this site",
          body: <p>This site describes our website design, SEO and social content services and shows examples of our work. Nothing on it is a binding offer. We confirm scope, price and timing with you in writing before any project starts.</p>,
        },
        {
          heading: "Our projects",
          body: (
            <p>
              Paid projects are covered by a separate written agreement or proposal that sets out what we will deliver, the price, the schedule and who owns the finished work. If that agreement conflicts with these terms, the agreement wins for that project.
            </p>
          ),
        },
        {
          heading: "Using the site",
          body: (
            <>
              <p>You agree not to:</p>
              <ul>
                <li>use the site or contact form for spam, scams or anything unlawful</li>
                <li>try to break, overload or gain unauthorized access to the site</li>
                <li>copy our content or design to present as your own</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Our content and our clients' sites",
          body: (
            <p>
              The design, text, code and logos on this site belong to {siteConfig.name} unless stated otherwise. Screenshots and links in our portfolio show work we did for clients, who own their own sites and brands. They are not endorsements by or of any third party.
            </p>
          ),
        },
        {
          heading: "Third-party links",
          body: <p>Our site links to other websites, including client sites and social profiles. We don&rsquo;t control them and aren&rsquo;t responsible for their content or practices.</p>,
        },
        {
          heading: "No guarantees",
          body: (
            <p>
              We work hard to keep this site accurate and available, but it is provided &ldquo;as is&rdquo;. We can&rsquo;t promise it will always be error-free or uninterrupted. SEO results depend on factors outside our control, so we don&rsquo;t guarantee any particular ranking or traffic.
            </p>
          ),
        },
        {
          heading: "Limit of liability",
          body: <p>To the extent the law allows, {siteConfig.name} is not liable for indirect or consequential losses from using this site. Nothing here limits liability that can&rsquo;t be limited by law.</p>,
        },
        {
          heading: "Privacy",
          body: (
            <p>
              How we handle your information is covered in our <Link href="/privacy">Privacy Policy</Link>.
            </p>
          ),
        },
        {
          heading: "Changes",
          body: <p>We may update these terms. The version on this page, with the date above, is the one that applies.</p>,
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
