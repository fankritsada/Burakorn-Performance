import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/seo";
import { informationalPageJsonLd, JsonLd } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Request a private Burakorn Performance Registry discussion. Static preview page with no automated outreach or payment flow.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={informationalPageJsonLd({
          name: "Burakorn Performance Contact",
          path: "/contact",
          description:
            "Request a private Burakorn Performance Registry discussion.",
        })}
      />
      <PageHero
        eyebrow="Contact"
        title="Request a private registry discussion."
        lede="Private interest is handled manually. No automated submission, payment, CRM update, public posting, or outreach action is connected in this preview."
      />
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-panel">
            <h2>Information to collect manually</h2>
            <ul className="contact-list">
              <li>Name</li>
              <li>Email or owner-approved contact channel</li>
              <li>WhatsApp / Line, if approved by owner</li>
              <li>Location</li>
              <li>Interest: future build, client build, media, supplier, or service partner</li>
              <li>Message</li>
            </ul>
          </div>
          <div className="contact-panel">
            <p className="mono-label accent">Boundary</p>
            <h2>No public offer.</h2>
            <p>
              This page is for private discussion only. It does not create a
              purchase offer, deposit flow, public stock list, warranty promise,
              or public availability claim.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
