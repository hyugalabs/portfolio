import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "What personal information Hyuga Labs collects through this website and the contact form, how we use it, and your choices.",
  path: "/privacy",
});

const mail = <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>;

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 10, 2026"
      intro={`This policy explains what ${siteConfig.name} ("we", "us") collects when you use hyugalabs.com, call us or send us a message, and what we do with it. We keep it short because we collect very little.`}
      sections={[
        {
          heading: "What we collect",
          body: (
            <>
              <p>The only information we ask you for is what you type into the contact form or tell us directly:</p>
              <ul>
                <li>your name, email address and, optionally, your business name</li>
                <li>what you are looking for and the message you write</li>
                <li>anything else you share if you email or call us, including your phone number</li>
              </ul>
              <p>
                Like any web server, ours may log technical details such as IP address, browser type and the pages requested. We use these logs only to keep the site running and secure.
              </p>
            </>
          ),
        },
        {
          heading: "Cookies and tracking",
          body: (
            <p>
              This site does not set advertising or tracking cookies. If we add analytics later, we will choose a privacy-respecting tool and update this page first.
            </p>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <>
              <p>We use your details to reply to you, discuss and quote a project, and keep a record of the conversation. We do not use them for anything unrelated.</p>
              <p>We do not sell your personal information, and we do not share it for advertising.</p>
            </>
          ),
        },
        {
          heading: "Who handles it",
          body: (
            <p>
              Contact form messages are delivered to our team by email through Google&rsquo;s email service. We share information with others only where the law requires it, or with a provider helping us run these services under an obligation to keep it safe.
            </p>
          ),
        },
        {
          heading: "How long we keep it",
          body: <p>We keep enquiries for as long as needed to answer you and, if we work together, for the length of the project plus the period we need for our records. After that we delete them.</p>,
        },
        {
          heading: "Your choices",
          body: (
            <p>
              You can ask us at any time to see, correct or delete the personal information we hold about you, or to stop contacting you. Email {mail} and we will respond promptly. If you live in a place with specific privacy rights, such as California, those rights apply as well.
            </p>
          ),
        },
        {
          heading: "Children",
          body: <p>This site is for businesses and is not aimed at children. We do not knowingly collect information from anyone under 13.</p>,
        },
        {
          heading: "Changes",
          body: <p>If we change this policy, we will post the new version here and update the date at the top.</p>,
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about this policy: {mail} or call <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
