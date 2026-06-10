"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ElectricBorder } from "@/components/electric-border";
import type { RegistryBuild } from "@/content/registry";
import { platformPoints, registryBuilds } from "@/content/registry";

const registryPrinciples = [
  ["Numbered", "Each build is held inside a controlled registry sequence."],
  ["Documented", "Identity, condition, and build language are recorded before presentation."],
  ["Selective", "The platform is chosen for practical ownership and transformation potential."],
] as const;

const philosophyPairs = [
  ["Disclose the base", "The original age of the chassis remains part of the record."],
  ["Change the criteria", "Condition, presence, documentation, and identity become the evaluation."],
  ["Keep it private", "The preview does not create public stock or automated sales flow."],
] as const;

const buildPhases = ["Recorded", "In progress", "Reserved"] as const;

const cardVisuals: Partial<Record<string, string>> = {
  "BP-001": "/visuals/burakorn-founder-card.png",
  "BP-002": "/visuals/burakorn-moray-card.png",
  "BP-003": "/visuals/burakorn-black-current-card.png",
  "BP-004": "/visuals/burakorn-krait-card.png",
  "BP-005": "/visuals/burakorn-obsidian-card.png",
};

const cardBorderColors: Record<string, string> = {
  "BP-001": "#ff4d5a",
  "BP-002": "#31aaff",
  "BP-003": "#f4f7f2",
  "BP-004": "#d86cff",
  "BP-005": "#ff9a2e",
};

function buildPhase(build: RegistryBuild) {
  if (build.status === "Origin Build") {
    return buildPhases[0];
  }

  if (build.status === "Active Build") {
    return buildPhases[1];
  }

  return buildPhases[2];
}

function LuxurySection({
  children,
  className = "",
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "deep" | "warm";
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className={`luxury-section ${tone === "deep" ? "is-deep" : ""} ${
        tone === "warm" ? "is-warm" : ""
      } ${className}`}
      data-gsap-section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 42 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="gsap-sweep" aria-hidden="true" />
      {children}
    </motion.section>
  );
}

export function HomeLuxurySections() {
  const rootRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-gsap-section]").forEach((section) => {
        const rule = section.querySelector(".gsap-rule");
        const sweep = section.querySelector(".gsap-sweep");
        const items = section.querySelectorAll(".gsap-item");
        const heading = section.querySelector<HTMLElement>("[data-gsap-heading]");

        if (heading && !heading.dataset.split) {
          heading.dataset.split = "true";
          const words = (heading.textContent ?? "").split(/(\s+)/);
          heading.textContent = "";
          words.forEach((word) => {
            if (/^\s+$/.test(word)) {
              heading.appendChild(document.createTextNode(word));
              return;
            }
            const outer = document.createElement("span");
            outer.className = "gsap-word";
            const inner = document.createElement("span");
            inner.className = "gsap-word-inner";
            inner.textContent = word;
            outer.appendChild(inner);
            heading.appendChild(outer);
          });

          gsap.fromTo(
            heading.querySelectorAll(".gsap-word-inner"),
            { yPercent: 116 },
            {
              yPercent: 0,
              duration: 0.9,
              stagger: 0.06,
              ease: "power4.out",
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                once: true,
              },
            },
          );
        }

        if (rule) {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 74%",
                once: true,
              },
            },
          );
        }

        if (sweep) {
          gsap.fromTo(
            sweep,
            { autoAlpha: 0.26, xPercent: -115 },
            {
              autoAlpha: 0,
              xPercent: 115,
              duration: 1.45,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 76%",
                once: true,
              },
            },
          );
        }

        if (items.length > 0) {
          gsap.fromTo(
            items,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.78,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                once: true,
              },
            },
          );
        }
      });

      // Count-up animation for the platform matrix index numbers.
      gsap.utils.toArray<HTMLElement>("[data-count-to]").forEach((el) => {
        const target = Number(el.dataset.countTo ?? "0");
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value)).padStart(2, "0");
          },
        });
      });
    }, rootRef);

    return () => context.revert();
  }, [shouldReduceMotion]);

  const cardMotion: Pick<HTMLMotionProps<"div">, "whileHover" | "transition"> = shouldReduceMotion
    ? {}
    : {
        whileHover: { y: -8 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      };

  const renderCardVisual = (build: RegistryBuild) => {
    const visual = cardVisuals[build.registryNumber];

    if (!visual) {
      return null;
    }

    return (
      <span className="registry-card-visual" aria-hidden="true">
        <Image
          src={visual}
          alt=""
          width={1536}
          height={449}
          sizes="(max-width: 560px) 78vw, 220px"
        />
      </span>
    );
  };

  return (
    <div ref={rootRef} className="home-luxury-sections">
      <LuxurySection className="registry-proof-section" tone="warm">
        <div className="container registry-proof-grid">
          <div className="registry-proof-copy">
            <p className="mono-label accent">Private registry preview</p>
            <h2 data-gsap-heading>Documented identity before public attention.</h2>
            <span className="gsap-rule" aria-hidden="true" />
          </div>
          <div className="registry-proof-body">
            <p>
              Burakorn Performance is a Bangkok-based numbered restomod registry
              creating dark executive builds from selected Honda Accord G8 K24
              platforms.
            </p>
            <p>
              We do not sell ordinary used cars. We create documented,
              numbered executive builds from selected platforms in Thailand.
            </p>
            <div className="registry-proof-principles">
              {registryPrinciples.map(([label, text], index) => (
                <motion.div className="principle-tile gsap-item" key={label} {...cardMotion}>
                  <div className="principle-tile-head">
                    <span className="principle-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="principle-label">{label}</span>
                  </div>
                  <span className="principle-divider" aria-hidden="true" />
                  <p>{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </LuxurySection>

      <LuxurySection className="controlled-builds-section" tone="deep">
        <div className="container">
          <div className="luxury-heading-row">
            <div>
              <p className="mono-label accent">Registry preview</p>
              <h2 data-gsap-heading>Five controlled build numbers.</h2>
            </div>
            <p>
              A compact sequence, designed to keep the registry legible rather
              than crowded.
            </p>
          </div>
          <span className="gsap-rule wide" aria-hidden="true" />
          <div className="luxury-registry-grid">
            {registryBuilds.map((build) => (
              <motion.div className="gsap-item" key={build.registryNumber} {...cardMotion}>
                <ElectricBorder
                  className="registry-electric-border"
                  color={cardBorderColors[build.registryNumber]}
                  speed={0.7}
                  chaos={0.9}
                  thickness={2}
                  borderRadius={0}
                >
                  <Link href={build.href} className="luxury-registry-card">
                    <span className="registry-card-topline">
                      <b>{build.registryNumber}</b>
                      <em>{buildPhase(build)}</em>
                    </span>
                    {renderCardVisual(build)}
                    <strong>{build.codename}</strong>
                    <span className="registry-card-platform">{build.platform}</span>
                    <p>{build.summary}</p>
                    <span className="registry-card-note">{build.note}</span>
                  </Link>
                </ElectricBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </LuxurySection>

      <LuxurySection className="philosophy-statement-section">
        <div className="container philosophy-statement-grid">
          <div className="philosophy-statement-copy">
            <p className="mono-label accent">Core philosophy</p>
            <h2 data-gsap-heading>The chassis has its original age. The build is new.</h2>
            <p className="philosophy-statement-lead">
              Every Burakorn build is honest about where it begins and deliberate
              about what it becomes. These three principles govern the registry.
            </p>
            <span className="gsap-rule" aria-hidden="true" />
          </div>
          <div className="philosophy-ledger">
            {philosophyPairs.map(([title, text], index) => (
              <motion.div className="ledger-row gsap-item" key={title} {...cardMotion}>
                <span className="ledger-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="ledger-body">
                  <span className="ledger-title">{title}</span>
                  <p>{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </LuxurySection>

      <LuxurySection className="platform-matrix-section" tone="deep">
        <div className="container">
          <div className="luxury-heading-row">
            <div>
              <p className="mono-label accent">Why this platform</p>
              <h2 data-gsap-heading>Honda Accord G8 K24.</h2>
            </div>
            <p>
              A proven executive base selected for practical ownership, parts
              availability, and visual transformation potential in Thailand.
            </p>
          </div>
          <span className="gsap-rule wide" aria-hidden="true" />
          <div className="platform-matrix">
            {platformPoints.map((point, index) => (
              <motion.div className="platform-cell gsap-item" key={point.label} {...cardMotion}>
                <div className="platform-cell-media">
                  <Image
                    src={point.image}
                    alt={point.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="platform-cell-image"
                  />
                </div>
                <div className="platform-cell-body">
                  <span data-count-to={String(index + 1)}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{point.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </LuxurySection>

      <LuxurySection className="private-invitation-section" tone="warm">
        <div className="container private-invitation-grid">
          <div>
            <p className="mono-label accent">Private interest</p>
            <h2 data-gsap-heading>Interested in future numbered builds?</h2>
            <span className="gsap-rule" aria-hidden="true" />
          </div>
          <div className="private-invitation-copy">
            <motion.aside className="invitation-panel gsap-item" {...cardMotion}>
              <span
                className="invitation-corner invitation-corner--tl"
                aria-hidden="true"
              />
              <span
                className="invitation-corner invitation-corner--br"
                aria-hidden="true"
              />

              <dl className="invitation-meta">
                <div className="invitation-meta-row">
                  <dt>Status</dt>
                  <dd>Preview — registry concept</dd>
                </div>
                <div className="invitation-meta-row">
                  <dt>Access</dt>
                  <dd>By private discussion</dd>
                </div>
              </dl>

              <p className="invitation-copy-text">
                Request a private registry discussion. No automated outreach,
                payment, or public offer is connected in this preview.
              </p>

              <Link href="/contact" className="luxury-cta invitation-cta">
                Request Registry Discussion
              </Link>

              <p className="invitation-note">
                Responses are handled personally. Expect a considered reply, not
                an instant one.
              </p>
            </motion.aside>
          </div>
        </div>
      </LuxurySection>
    </div>
  );
}
