import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand-lockup" aria-label="Burakorn Performance home">
          <span className="brand-name">Burakorn</span>
          <span className="brand-subtitle">Performance Registry</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
