import { RegistryTable } from "@/components/registry-table";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  JsonLd,
  informationalPageJsonLd,
  registryItemListJsonLd,
} from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "Registry",
  description:
    "The central index for numbered Burakorn Performance builds, status, platform, and notes.",
  path: "/registry",
});

export default function RegistryPage() {
  return (
    <>
      <JsonLd data={registryItemListJsonLd()} />
      <JsonLd
        data={informationalPageJsonLd({
          name: "Burakorn Performance Registry",
          path: "/registry",
          description: siteConfig.definition,
        })}
      />
      <PageHero
        eyebrow="Registry"
        title="Numbered build record."
        lede={
          <>
            {siteConfig.definition} The registry records numbered builds, base
            platform, build status, codename, inspection history, and
            documentation posture.
          </>
        }
        meta={[
          { label: "Builds", value: "BP-001 — BP-005" },
          { label: "Platform", value: "Honda Accord G8 K24" },
          { label: "Base", value: "Bangkok, Thailand" },
        ]}
      />
      <section className="section">
        <div className="container">
          <RegistryTable />
        </div>
      </section>
    </>
  );
}
