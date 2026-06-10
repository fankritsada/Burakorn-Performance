import { PrivateInterest } from "@/components/private-interest";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/lib/seo";
import { informationalPageJsonLd, JsonLd } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "Philosophy",
  description:
    "The Burakorn Performance philosophy: status effect without status waste, documentation over claims, and build-sheet logic over marketplace logic.",
  path: "/philosophy",
});

export default function PhilosophyPage() {
  return (
    <>
      <JsonLd
        data={informationalPageJsonLd({
          name: "Burakorn Performance Philosophy",
          path: "/philosophy",
          description:
            "Status effect without status waste, documentation over claims, and build-sheet logic over marketplace logic.",
        })}
      />
      <section className="page-hero">
        <div className="container">
          <p className="mono-label accent">Philosophy</p>
          <h1>Status effect without status waste.</h1>
          <p>
            For people who can afford more, but refuse to waste more. The point
            is presence, control, documentation, and ownership logic.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container split-grid">
          <SectionHeading
            label="Build-sheet logic"
            title="We do not hide the age of the base car."
          />
          <div className="split-copy">
            <p>We change the criteria by which the car is evaluated.</p>
            <p>We do not sell options. We sell a decision.</p>
            <p>We do not sell old cars. We create documented numbered builds.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            label="Marketplace vs build sheet"
            title="Marketplace sells age. Burakorn Performance sells condition."
            text="The registry evaluates body integrity, replaced systems, mechanical condition, documentation, visual presence, and build identity."
          />
        </div>
      </section>
      <PrivateInterest />
    </>
  );
}
