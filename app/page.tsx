import Link from "next/link";
import { HomeLuxurySections } from "@/components/home-luxury-sections";
import { HeroVideo } from "@/components/hero-video";
import { MotionStudySection } from "@/components/motion-study-section";
import { createMetadata } from "@/lib/seo";
import {
  JsonLd,
  organizationJsonLd,
  registryItemListJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Burakorn Performance Registry",
  description: siteConfig.definition,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={registryItemListJsonLd()} />
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <HeroVideo />
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">Bangkok numbered registry preview</p>
            <h1>
              Numbered builds,{" "}
              <span>registered with intent.</span>
            </h1>
            <p className="hero-lede">
              Numbered executive restomods based on the Honda Accord G8 K24
              platform.
            </p>
            <div className="hero-actions">
              <Link href="/registry" className="button-link primary">
                View Registry
              </Link>
              <Link href="/bp-002-moray" className="button-link">
                Follow BP-002 / Moray
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MotionStudySection />
      <HomeLuxurySections />
    </>
  );
}
