import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { splitwardApi } from "@/services/api/splitward-api";

export function CreditsPage() {
  const qc = useQueryClient();
  const credits = useQuery({ queryKey: ["credits"], queryFn: splitwardApi.listCredits });
  const [studyId, setStudyId] = useState("");
  const [siteId, setSiteId] = useState("");
  const [roundsCompleted, setRounds] = useState(1);
  const [dataVolumeClass, setCls] = useState<"S" | "M" | "L" | "XL">("M");

  const record = useMutation({
    mutationFn: () =>
      splitwardApi.recordCredit({
        studyId,
        siteId,
        roundsCompleted,
        dataVolumeClass,
        creditPoints: roundsCompleted * ({ S: 1, M: 2, L: 4, XL: 8 }[dataVolumeClass]),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["credits"] }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    record.mutate();
  }

  return (
    <div className="page stack">
      <header className="page-header">
        <div>
          <h1>Contribution credits</h1>
          <p>Append-only fairness ledger. Credits are not silently editable (BR-7).</p>
        </div>
      </header>
      <div className="panel stack">
        <form className="row" onSubmit={onSubmit}>
          <label className="field">
            Study id
            <input className="mono" value={studyId} onChange={(e) => setStudyId(e.target.value)} required />
          </label>
          <label className="field">
            Site id
            <input className="mono" value={siteId} onChange={(e) => setSiteId(e.target.value)} required />
          </label>
          <label className="field">
            Rounds completed
            <input type="number" min={0} value={roundsCompleted} onChange={(e) => setRounds(Number(e.target.value))} />
          </label>
          <label className="field">
            Volume class
            <select value={dataVolumeClass} onChange={(e) => setCls(e.target.value as typeof dataVolumeClass)}>
              {["S", "M", "L", "XL"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <button className="btn" type="submit">
            Record credit
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Credit</th>
              <th>Site</th>
              <th>Rounds</th>
              <th>Class</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {(credits.data ?? []).map((c) => (
              <tr key={c.creditId}>
                <td className="mono">{c.creditId}</td>
                <td className="mono">{c.siteId}</td>
                <td>{c.roundsCompleted}</td>
                <td>{c.dataVolumeClass}</td>
                <td>{c.creditPoints ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {(credits.data ?? []).length === 0 ? <p className="empty">No completed rounds credited yet.</p> : null}
      </div>
    </div>
  );
}
