type SectionHeadingProps = {
  label?: string;
  title: string;
  text?: string;
};

export function SectionHeading({ label, title, text }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      {label ? <p className="mono-label accent">{label}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
