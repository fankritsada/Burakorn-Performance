type TimelineItem = {
  stage: string;
  title: string;
  status: string;
};

type BuildTimelineProps = {
  items: readonly TimelineItem[];
};

export function BuildTimeline({ items }: BuildTimelineProps) {
  return (
    <ol className="timeline">
      {items.map((item) => (
        <li key={item.stage}>
          <span>{item.stage}</span>
          <strong>{item.title}</strong>
          <em>{item.status}</em>
        </li>
      ))}
    </ol>
  );
}
