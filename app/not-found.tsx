import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="mono-label accent">404</p>
        <h1>Not in the public registry.</h1>
        <p>
          This preview only exposes the approved MVP routes. Future journal,
          media, ownership care, and FAQ pages are intentionally not public yet.
        </p>
        <div className="button-row">
          <Link href="/registry" className="button-link primary">
            View Registry
          </Link>
          <Link href="/" className="button-link">
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
