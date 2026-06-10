import Link from "next/link";

export function PrivateInterest() {
  return (
    <section className="private-interest">
      <div className="container private-interest-grid">
        <div>
          <p className="mono-label accent">Private interest</p>
          <h2>Interested in future numbered builds?</h2>
          <p>
            Request a private registry discussion. No automated outreach,
            payment, or public offer is connected in this preview.
          </p>
        </div>
        <Link href="/contact" className="outline-cta">
          Request Registry Discussion
        </Link>
      </div>
    </section>
  );
}
