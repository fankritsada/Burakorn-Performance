export type BuildStatus = "Origin Build" | "Active Build" | "Planned Build";

export type RegistryBuild = {
  registryNumber: string;
  codename: string;
  platform: string;
  status: BuildStatus;
  href: string;
  summary: string;
  note: string;
  visualLabel: string;
};

export const registryBuilds: RegistryBuild[] = [
  {
    registryNumber: "BP-001",
    codename: "The Founder",
    platform: "Honda Accord G8 K24",
    status: "Origin Build",
    href: "/bp-001",
    summary:
      "The origin build of the Burakorn Performance Registry. It is not for sale.",
    note: "Not for sale",
    visualLabel: "Origin exterior placeholder",
  },
  {
    registryNumber: "BP-002",
    codename: "Moray",
    platform: "Honda Accord G8 K24",
    status: "Active Build",
    href: "/bp-002-moray",
    summary:
      "The first commercial validation build in the Burakorn Performance Registry.",
    note: "Body inspection passed",
    visualLabel: "Active exterior placeholder",
  },
  {
    registryNumber: "BP-003",
    codename: "Black Current",
    platform: "Honda Accord G8 K24",
    status: "Planned Build",
    href: "/registry",
    summary: "A future numbered build reserved for the registry.",
    note: "Future build",
    visualLabel: "Silhouette only",
  },
  {
    registryNumber: "BP-004",
    codename: "Krait",
    platform: "Honda Accord G8 K24",
    status: "Planned Build",
    href: "/registry",
    summary: "A future numbered build reserved for the registry.",
    note: "Future build",
    visualLabel: "Silhouette only",
  },
  {
    registryNumber: "BP-005",
    codename: "Obsidian",
    platform: "Honda Accord G8 K24",
    status: "Planned Build",
    href: "/registry",
    summary: "A future numbered build reserved for the registry.",
    note: "Future build",
    visualLabel: "Silhouette only",
  },
];

export const bp001 = registryBuilds[0];
export const bp002 = registryBuilds[1];

export const bp002Facts = [
  ["Registry No.", "BP-002"],
  ["Codename", "Moray"],
  ["Platform", "Honda Accord G8 K24"],
  ["Country", "Thailand"],
  ["Status", "Active Build"],
  ["Body", "Inspection passed"],
  ["Mechanical", "Refresh in progress"],
  ["Visual", "Exterior package planning"],
] as const;

export const bp002Timeline = [
  {
    stage: "Stage 01",
    title: "Donor Acquired",
    status: "Recorded",
  },
  {
    stage: "Stage 02",
    title: "Body Inspection Passed",
    status: "Recorded",
  },
  {
    stage: "Stage 03",
    title: "Suspension / Brake Refresh",
    status: "In progress",
  },
  {
    stage: "Stage 04",
    title: "Lighting Package Selection",
    status: "Planning",
  },
  {
    stage: "Stage 05",
    title: "Exterior Package",
    status: "Planning",
  },
  {
    stage: "Stage 06",
    title: "Final Registry Certificate",
    status: "Pending",
  },
] as const;

export type PlatformPoint = {
  label: string;
  image: string;
  alt: string;
};

export const platformPoints: PlatformPoint[] = [
  {
    label: "Proven Honda platform.",
    image: "/platform/01-platform.png",
    alt: "Honda Accord G8 chassis blueprint with dimensions and platform specs.",
  },
  {
    label: "K24 engine.",
    image: "/platform/02-engine.png",
    alt: "Honda K24 i-VTEC DOHC engine on a dark studio background.",
  },
  {
    label: "Strong parts availability in Thailand.",
    image: "/platform/03-parts.png",
    alt: "Knolling layout of Honda performance and suspension parts.",
  },
  {
    label: "Low ownership pain.",
    image: "/platform/04-ownership.png",
    alt: "Honda gauge cluster reading 385,000 km of reliable service.",
  },
  {
    label: "Executive body shape.",
    image: "/platform/05-body.png",
    alt: "Side profile of a blacked-out Honda Accord G8 executive sedan.",
  },
  {
    label: "High visual transformation potential.",
    image: "/platform/06-transformation.png",
    alt: "Stock versus custom transformed Honda Accord comparison.",
  },
];
