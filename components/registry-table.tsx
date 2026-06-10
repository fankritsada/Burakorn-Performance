import Link from "next/link";
import { registryBuilds } from "@/content/registry";

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
          <span>{build.registryNumber}</span>
          <span>{build.codename}</span>
          <span>{build.platform}</span>
          <span>{build.status}</span>
          <span>{build.note}</span>
        </Link>
      ))}
    </div>
  );
}
