import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/components", label: "Components" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/logos/only logo 1024x1024 dark mode.svg"
            alt=""
            width={48}
            height={48}
            preload
          />
          <span className="hidden font-headline text-lg font-semibold text-offwhite sm:inline">
            Hyuga Labs
          </span>
        </Link>
        <ul className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-sub text-sm text-offwhite/70 transition-colors hover:text-coral focus-visible:text-coral"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
