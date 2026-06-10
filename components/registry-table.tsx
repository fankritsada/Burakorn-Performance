import Link from "next/link";
import { registryBuilds } from "@/content/registry";

function statusModifier(status: string) {
  return status.toLowerCase().split(" ")[0];
}

export function RegistryTable() {
  return (
    <div className="dossier-table" role="region" aria-label="Registry table">
      <div className="dossier-row dossier-head">
        <span>Registry No.</span>
        <span>Codename</span>
        <span>Platform</span>
        <span>Status</span>
        <span>Notes</span>
      </div>
      {registryBuilds.map((build) => (
        <Link key={build.registryNumber} href={build.href} className="dossier-row">
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
