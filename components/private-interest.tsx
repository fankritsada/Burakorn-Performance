import Link from "next/link";

export function PrivateInterest() {
  return (
    <section className="private-interest">
      <div className="container private-interest-grid">
        <div className="private-interest-lede">
          <p className="mono-label accent">Private interest</p>
          <h2>Interested in future numbered builds?</h2>
          <span className="private-interest-rule" aria-hidden="true" />
        </div>

        <aside className="request-panel">
          <span className="request-corner request-corner--tl" aria-hidden="true" />
          <span className="request-corner request-corner--br" aria-hidden="true" />

          <dl className="request-meta">
            <div className="request-meta-row">
              <dt>Status</dt>
              <dd>Preview — registry concept</dd>
            </div>
            <div className="request-meta-row">
              <dt>Access</dt>
              <dd>By private discussion</dd>
            </div>
          </dl>

          <p className="request-copy">
            Request a private registry discussion. No automated outreach,
            payment, or public offer is connected in this preview.
          </p>

          <Link href="/contact" className="outline-cta request-cta">
            Request Registry Discussion
          </Link>

          <p className="request-note">
            Responses are handled personally. Expect a considered reply, not an
            instant one.
          </p>
        </aside>
      </div>
    </section>
  );
}
