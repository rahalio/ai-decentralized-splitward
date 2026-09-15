const ROWS = [
  {
    strategy: "Split",
    memory: "Low at coordinator",
    bandwidth: "Activations only",
    notes: "Best when PHI must stay sealed in site vaults",
  },
  {
    strategy: "Federated",
    memory: "Weights on sites",
    bandwidth: "Model deltas",
    notes: "Higher egress; still no raw export",
  },
  {
    strategy: "Hybrid",
    memory: "Mixed",
    bandwidth: "Selective cut + deltas",
    notes: "Tradeoff when sites differ in GPU/egress",
  },
];

export function StrategyCompareTable({ selected }: { selected?: string }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Strategy</th>
          <th>Memory</th>
          <th>Bandwidth</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {ROWS.map((row) => (
          <tr key={row.strategy} style={selected === row.strategy.toLowerCase() ? { background: "rgba(42,143,140,0.08)" } : undefined}>
            <td>
              <strong>{row.strategy}</strong>
              {selected === row.strategy.toLowerCase() ? <span className="chip">selected</span> : null}
            </td>
            <td>{row.memory}</td>
            <td>{row.bandwidth}</td>
            <td>{row.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
