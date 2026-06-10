import Link from "next/link";
import { siteConfig } from "@/lib/site";

const registryLinks = siteConfig.nav.slice(0, 3);
const programLinks = siteConfig.nav.slice(3);

const registryMeta = [
  { label: "Category", value: siteConfig.category },
  { label: "Origin", value: siteConfig.location },
  { label: "Status", value: "Preview registry — 2026" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <span className="footer-accent-line" aria-hidden="true" />
      <div className="container footer-top">
        <div className="footer-brand">
          <span className="footer-corner footer-corner--tl" aria-hidden="true" />
          <Link href="/" className="footer-lockup" aria-label="Burakorn Performance home">
            <span className="footer-wordmark">Burakorn</span>
            <span className="footer-wordmark-sub">Performance Registry</span>
          </Link>
          <p className="footer-thesis">{siteConfig.thesis}</p>
          <p className="footer-definition">{siteConfig.definition}</p>
          <dl className="footer-meta">
            {registryMeta.map((item) => (
              <div key={item.label} className="footer-meta-row">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <div className="footer-nav-group">
            <p className="footer-nav-heading">Registry</p>
            <ul>
              {registryLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-nav-group">
            <p className="footer-nav-heading">Program</p>
            <ul>
              {programLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="container footer-bottom">
        <p className="footer-disclaimer-text">{siteConfig.disclaimer}</p>
        <div className="footer-baseline">
          <span className="footer-mark">BP — Bangkok</span>
          <span className="footer-copy">
            {`© ${year} Burakorn Performance. Independent concept.`}
          </span>
        </div>
      </div>
    </footer>
  );
}
