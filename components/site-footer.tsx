import Link from "next/link";
import { siteConfig } from "@/lib/site";

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
        <div className="footer-col footer-col--brand">
          <Link
            href="/"
            className="footer-lockup"
            aria-label="Burakorn Performance home"
          >
            <span className="footer-wordmark">Burakorn</span>
            <span className="footer-wordmark-sub">Performance Registry</span>
          </Link>
          <p className="footer-thesis">{siteConfig.thesis}</p>

          <nav className="footer-nav" aria-label="Footer navigation">
            <ul>
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-col">
          <p className="footer-col-heading">Registry</p>
          <p className="footer-definition">{siteConfig.definition}</p>

          <p className="footer-col-heading footer-col-heading--spaced">
            Documentation
          </p>
          <ul className="footer-doc-list">
            <li>
              <Link href="/registry">Registry index</Link>
            </li>
            <li>
              <Link href="/bp-002-moray">BP-002 / Moray build sheet</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <p className="footer-col-heading">Private interest</p>
          <Link href="/contact" className="footer-contact-link">
            Request registry discussion
          </Link>

          <p className="footer-col-heading footer-col-heading--spaced">
            Detail
          </p>
          <dl className="footer-meta">
            {registryMeta.map((item) => (
              <div key={item.label} className="footer-meta-row">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
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

      <div className="footer-giant" aria-hidden="true">
        <span>Burakorn</span>
      </div>
    </footer>
  );
}
