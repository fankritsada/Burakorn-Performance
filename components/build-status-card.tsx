type BuildStatusCardProps = {
  facts: readonly (readonly [string, string])[];
};

export function BuildStatusCard({ facts }: BuildStatusCardProps) {
  return (
    <dl className="status-card">
      {facts.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
