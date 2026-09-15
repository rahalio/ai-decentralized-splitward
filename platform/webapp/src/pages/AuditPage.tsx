import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { splitwardApi } from "@/services/api/splitward-api";

export function AuditPage() {
  const qc = useQueryClient();
  const packs = useQuery({ queryKey: ["audit-packs"], queryFn: splitwardApi.listAuditPacks });
  const [studyId, setStudyId] = useState("");
  const [periodStart, setStart] = useState(new Date(Date.now() - 7 * 86400000).toISOString());
  const [periodEnd, setEnd] = useState(new Date().toISOString());

  const generate = useMutation({
    mutationFn: () => splitwardApi.generateAuditPack({ studyId, periodStart, periodEnd }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["audit-packs"] }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    generate.mutate();
  }

  return (
    <div className="page stack">
      <header className="page-header">
        <div>
          <h1>No-raw-export audit packs</h1>
          <p>Prove for a study period that no raw patient export occurred (BR-9).</p>
        </div>
      </header>
      <div className="panel stack">
        <form className="row" onSubmit={onSubmit}>
          <label className="field">
            Study id
            <input className="mono" value={studyId} onChange={(e) => setStudyId(e.target.value)} required />
          </label>
          <label className="field">
            Period start
            <input value={periodStart} onChange={(e) => setStart(e.target.value)} required />
          </label>
          <label className="field">
            Period end
            <input value={periodEnd} onChange={(e) => setEnd(e.target.value)} required />
          </label>
          <button className="btn" type="submit">
            Generate pack
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Pack</th>
              <th>Study</th>
              <th>Status</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {(packs.data ?? []).map((p) => (
              <tr key={p.packId}>
                <td className="mono">{p.packId}</td>
                <td className="mono">{p.studyId}</td>
                <td>
                  <span className={`chip ${p.status === "complete" ? "pass" : "amber"}`}>{p.status}</span>
                </td>
                <td className="mono">{p.packHash ?? "pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {(packs.data ?? []).length === 0 ? <p className="empty">No packs yet — generate for a study period.</p> : null}
      </div>
    </div>
  );
}
