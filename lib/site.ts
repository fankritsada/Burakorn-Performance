export const siteConfig = {
  name: "Burakorn Performance Registry",
  shortName: "Burakorn Performance",
  url:
    process.env.SITE_URL?.replace(/\/$/, "") ||
    "https://burakorn-performance-registry.vercel.app",
  definition:
    "Burakorn Performance is a Bangkok-based numbered restomod registry creating dark executive builds from selected Honda Accord G8 K24 platforms.",
  thesis: "Status effect without status waste.",
  category: "Numbered executive restomod ownership",
  location: "Bangkok, Thailand",
  nav: [
    { label: "Registry", href: "/registry" },
    { label: "BP-002 / Moray", href: "/bp-002-moray" },
    { label: "Philosophy", href: "/philosophy" },
    { label: "Platform", href: "/platform" },
    { label: "Contact", href: "/contact" },
  ],
  disclaimer:
    "Honda, Accord, and any visible vehicle marks identify the base vehicle platform only. Burakorn Performance is an independent registry concept and does not claim affiliation, endorsement, or partnership with Honda.",
} as const;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function isIndexingEnabled() {
  return process.env.INDEXING_ENABLED === "true";
}
