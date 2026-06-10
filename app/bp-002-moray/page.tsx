import Image from "next/image";
import Link from "next/link";
import { BuildStatusCard } from "@/components/build-status-card";
import { BuildTimeline } from "@/components/build-timeline";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { bp002, bp002Facts, bp002Timeline } from "@/content/registry";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { informationalPageJsonLd, JsonLd } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "BP-002 / Moray",
  description:
    "BP-002 / Moray is the first commercial validation build in the Burakorn Performance Registry.",
  path: "/bp-002-moray",
});

export default function Bp002Page() {
  return (
    <>
      <JsonLd
        data={informationalPageJsonLd({
          name: "BP-002 / Moray",
          path: "/bp-002-moray",
          description: `${siteConfig.definition} ${bp002.summary}`,
        })}
      />
      <PageHero
        eyebrow={bp002.registryNumber}
        title="BP-002 / Moray"
        lede="BP-002 / Moray is the first commercial validation build in the Burakorn Performance Registry, based on the Honda Accord G8 K24 platform in Thailand."
        meta={[
          { label: "Codename", value: "Moray" },
          { label: "Status", value: "Active Build" },
          { label: "Body", value: "Inspection passed" },
        ]}
      />

      <section className="section">
        <div className="container build-grid">
          <div className="visual-panel">
            <Image
              src="/visuals/burakorn-moray-card.png"
              alt="BP-002 / Moray exterior study on the Honda Accord G8 platform."
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              className="visual-panel-image"
              priority
            />
          </div>
          <BuildStatusCard facts={bp002Facts} />
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <SectionHeading
            label="Build logic"
            title="Silent, dark, sharp, and underestimated."
          />
          <div className="split-copy">
            <p>
              Moray represents a quiet, dark, underestimated build character.
              Built for Bangkok night, recorded as a registry project, and kept
              away from normal marketplace presentation.
            </p>
            <p>
              This is not a normal listing. Mileage remains on the original
              chassis. Value is created through inspection, refreshed systems,
              mechanical condition, visual identity, and documented build
              history.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading label="Timeline" title="Light build record." />
          <BuildTimeline items={bp002Timeline} />
          <div className="button-row">
            <Link href="/contact" className="button-link primary">
              Request Private Interest
            </Link>
            <Link href="/registry" className="button-link">
              View Registry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
