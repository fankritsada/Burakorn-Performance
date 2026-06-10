import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { platformPoints } from "@/content/registry";
import { createMetadata } from "@/lib/seo";
import { informationalPageJsonLd, JsonLd } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "Honda Accord G8 K24 Platform",
  description:
    "Why Burakorn Performance uses selected Honda Accord G8 K24 platforms for numbered executive restomod builds in Thailand.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <>
      <JsonLd
        data={informationalPageJsonLd({
          name: "Honda Accord G8 K24 Thailand Platform",
          path: "/platform",
          description:
            "Why Burakorn Performance uses selected Honda Accord G8 K24 platforms for numbered executive restomod builds in Thailand.",
        })}
      />
      <PageHero
        eyebrow="Platform"
        title="Why Honda Accord G8 K24?"
        lede="Burakorn Performance selects the Accord G8 K24 platform because it can support a calm executive build with manageable ownership logic in Thailand."
        meta={[
          { label: "Base", value: "Honda Accord G8" },
          { label: "Engine", value: "K24 i-VTEC" },
          { label: "Market", value: "Thailand" },
        ]}
      />
      <section className="section">
        <div className="container">
          <p className="mono-label accent">Platform criteria</p>
          <ul className="platform-card-grid">
            {platformPoints.map((point, index) => (
              <li key={point.label} className="platform-card">
                <div className="platform-card-media">
                  <Image
                    src={point.image || "/placeholder.svg"}
                    alt={point.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="platform-card-image"
                  />
                </div>
                <div className="platform-card-body">
                  <span className="platform-card-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="platform-card-label">{point.label}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="fine-print">
            Major components are described cautiously as widely available and
            relatively affordable in Thailand. Exact prices, parts claims, and
            service terms require source-backed review before public launch.
          </p>
        </div>
      </section>
    </>
  );
}
