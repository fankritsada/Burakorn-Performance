import Link from "next/link";
import Image from "next/image";
import { registryBuilds } from "@/content/registry";

function statusModifier(status: string) {
  return status.toLowerCase().split(" ")[0];
}

const cardVisuals: Record<string, string> = {
  "BP-001": "/visuals/burakorn-founder-card.png",
  "BP-002": "/visuals/burakorn-moray-card.png",
  "BP-003": "/visuals/burakorn-black-current-card.png",
  "BP-004": "/visuals/burakorn-krait-card.png",
  "BP-005": "/visuals/burakorn-obsidian-card.png",
};

export function RegistryTable() {
  return (
    <div className="dossier-table" role="region" aria-label="Registry table">
      <div className="dossier-row dossier-head">
        <span>Build</span>
        <span>Registry No.</span>
        <span>Codename</span>
        <span>Platform</span>
        <span>Status</span>
        <span>Notes</span>
      </div>
      {registryBuilds.map((build) => (
        <Link key={build.registryNumber} href={build.href} className="dossier-row">
          <span className="dossier-thumb">
            <Image
              src={cardVisuals[build.registryNumber]}
              alt={`${build.registryNumber} ${build.codename}`}
              width={1536}
              height={449}
              sizes="120px"
            />
          </span>
          <span className="dossier-number">{build.registryNumber}</span>
          <span className="dossier-codename">{build.codename}</span>
          <span>{build.platform}</span>
          <span>
            <span className={`status-badge status-${statusModifier(build.status)}`}>
              {build.status}
            </span>
          </span>
          <span className="dossier-note">
            {build.note}
            <span className="dossier-arrow" aria-hidden="true">
              &rarr;
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
