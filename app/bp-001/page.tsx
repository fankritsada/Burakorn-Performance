import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { bp001 } from "@/content/registry";
import { createMetadata } from "@/lib/seo";
import { informationalPageJsonLd, JsonLd } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "BP-001 / The Founder",
  description:
    "BP-001 / The Founder is the origin build of Burakorn Performance Registry. It is not for sale.",
  path: "/bp-001",
});

export default function Bp001Page() {
  return (
    <>
      <JsonLd
        data={informationalPageJsonLd({
          name: "BP-001 / The Founder",
          path: "/bp-001",
          description: bp001.summary,
        })}
      />
      <section className="page-hero">
        <div className="container">
          <p className="mono-label accent">{bp001.registryNumber}</p>
          <h1>BP-001 / The Founder</h1>
          <p>{bp001.summary}</p>
        </div>
      </section>
      <section className="section">
        <div className="container build-grid">
          <div className="build-copy">
            <SectionHeading
              label="Origin build"
              title="Presence without ownership waste."
            />
            <p>
              BP-001 started because the founder wanted presence, comfort,
              character, and reliability without irrational ownership cost in
              Bangkok.
            </p>
            <p>
              The build proved that the Accord G8 K24 platform could be
              transformed into a dark executive car with strong road presence
              and low ownership pain.
            </p>
            <div className="button-row">
              <Link href="/bp-002-moray" className="button-link primary">
                View BP-002 / Moray
              </Link>
              <Link href="/registry" className="button-link">
                Back to Registry
              </Link>
            </div>
          </div>
          <div className="visual-panel" aria-label="Exterior placeholder" />
        </div>
      </section>
    </>
  );
}
