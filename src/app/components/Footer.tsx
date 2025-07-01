import Link from "next/link";
import { navLinks } from "../config/navLinks";

const START_YEAR = 2025;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const yearDisplay =
    START_YEAR === currentYear
      ? `${currentYear}`
      : `${START_YEAR}–${currentYear}`;

  return (
    <footer className="w-full bg-black text-sb-muted-foreground py-6 border-t border-sb-primary">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Footer Navigation">
          <ul className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium hover:text-sb-accent-foreground transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-6 text-center text-xs text-sb-secondary-foreground">
          &copy; {yearDisplay} Starbase. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
