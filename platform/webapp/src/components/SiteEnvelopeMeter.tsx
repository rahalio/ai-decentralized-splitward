export function SiteEnvelopeMeter({
  label,
  used,
  max,
  unit,
}: {
  label: string;
  used: number;
  max: number;
  unit: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((used / max) * 100)) : 0;
  return (
    <div className="stack" style={{ gap: 8 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span>{label}</span>
        <span className="mono">
          {used}/{max} {unit}
        </span>
      </div>
      <div className="meter" aria-label={`${label} ${pct}%`}>
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
