import type { ReactNode } from "react";

type PageHeroMeta = {
  label: string;
  value: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  meta?: readonly PageHeroMeta[];
};

export function PageHero({ eyebrow, title, lede, meta }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div className="page-hero-head">
          <p className="mono-label accent">{eyebrow}</p>
          <h1>{title}</h1>
          <span className="page-hero-rule" aria-hidden="true" />
        </div>
        <div className="page-hero-aside">
          <p className="page-hero-lede">{lede}</p>
          {meta && meta.length > 0 ? (
            <dl className="page-hero-meta">
              {meta.map((item) => (
                <div key={item.label} className="page-hero-meta-row">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}
