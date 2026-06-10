import Link from "next/link";
import type { RegistryBuild } from "@/content/registry";

type RegistryCardProps = {
  build: RegistryBuild;
};

export function RegistryCard({ build }: RegistryCardProps) {
  return (
    <Link href={build.href} className="registry-row">
      <span className="registry-number">{build.registryNumber}</span>
      <span className="registry-divider" aria-hidden="true" />
      <span className="registry-main">
        <strong>{build.codename}</strong>
        <span>
          Status <b>{build.status}</b>
        </span>
      </span>
      <span className="registry-platform">{build.platform}</span>
      <span className="sedan-line" aria-hidden="true">
        <svg viewBox="0 0 260 72" focusable="false">
          <path
            className="car-body"
            d="M18 47H31L46 26C51 19 59 15 68 15H143C156 15 169 20 178 29L194 46H229C237 46 244 50 248 57H18Z"
          />
          <path
            className="car-roof"
            d="M63 46L78 25H140C153 25 164 30 173 39L180 46"
          />
          <path className="car-hood" d="M18 47H62" />
          <path className="car-deck" d="M181 46H235" />
          <path className="car-ground" d="M11 57H252" />
          <circle className="car-wheel" cx="72" cy="57" r="11" />
          <circle className="car-wheel" cx="205" cy="57" r="11" />
          <circle className="car-hub" cx="72" cy="57" r="4" />
          <circle className="car-hub" cx="205" cy="57" r="4" />
        </svg>
      </span>
    </Link>
  );
}
