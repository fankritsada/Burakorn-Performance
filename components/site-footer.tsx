import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="mono-label">Preview registry</p>
          <h2>Burakorn Performance Registry</h2>
          <p>{siteConfig.definition}</p>
        </div>
        <div className="footer-links">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="container footer-disclaimer">
        <p>{siteConfig.disclaimer}</p>
      </div>
    </footer>
  );
}
