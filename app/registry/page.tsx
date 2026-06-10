import { RegistryTable } from "@/components/registry-table";
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
      <section className="page-hero">
        <div className="container">
          <p className="mono-label accent">Registry</p>
          <h1>Numbered build record.</h1>
          <p>
            {siteConfig.definition} The registry records numbered builds, base
            platform, build status, codename, inspection history, and
            documentation posture.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <RegistryTable />
        </div>
      </section>
    </>
  );
}
