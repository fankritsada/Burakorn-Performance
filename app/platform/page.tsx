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
      <section className="page-hero">
        <div className="container">
          <p className="mono-label accent">Platform</p>
          <h1>Why Honda Accord G8 K24?</h1>
          <p>
            Burakorn Performance selects the Accord G8 K24 platform because it
            can support a calm executive build with manageable ownership logic
            in Thailand.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ul className="point-grid">
            {platformPoints.map((point) => (
              <li key={point.label}>{point.label}</li>
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
