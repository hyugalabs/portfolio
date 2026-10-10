import type { Metadata } from "next";
import { Geist, Inter, Bricolage_Grotesque } from "next/font/google";
import { CinematicFooter } from "@/components/footer/cinematic-footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    url: "/",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: siteConfig.url + siteConfig.logo,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  sameAs: siteConfig.socials.map((s) => s.href),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactType: "sales",
    areaServed: "US",
    availableLanguage: "English",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${inter.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, String.fromCharCode(92) + "u003c"),
          }}
        />
        <Header />
        {children}
        <CinematicFooter />
      </body>
    </html>
  );
}
