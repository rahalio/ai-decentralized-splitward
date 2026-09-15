import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CutLayerDiagram } from "@/components/CutLayerDiagram";
import { StrategyCompareTable } from "@/components/StrategyCompareTable";
import { splitwardApi } from "@/services/api/splitward-api";

export function StudiesPage() {
  const qc = useQueryClient();
  const studies = useQuery({ queryKey: ["studies"], queryFn: splitwardApi.listStudies });
  const sites = useQuery({ queryKey: ["sites"], queryFn: splitwardApi.listSites });
  const [title, setTitle] = useState("");
  const [strategy, setStrategy] = useState<"split" | "federated" | "hybrid">("split");
  const [purpose, setPurpose] = useState("");
  const [ttl, setTtl] = useState(24);
  const [marketHook, setMarketHook] = useState(false);
  const [selectedSites, setSelectedSites] = useState<string[]>([]);

  const create = useMutation({
    mutationFn: () =>
      splitwardApi.createStudy({
        title,
        strategy,
        purpose,
        activationTtlHours: ttl,
        marketHookEnabled: marketHook,
        participantSiteIds: selectedSites,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["studies"] });
      setTitle("");
      setPurpose("");
    },
  });

  const submit = useMutation({
    mutationFn: (studyId: string) => splitwardApi.submitPrivacy(studyId, { notes: "Submitted from Splitward UI" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["studies"] }),
  });

  function onCreate(e: FormEvent) {
    e.preventDefault();
    if (!title || selectedSites.length === 0) return;
    create.mutate();
  }

  return (
    <div className="page stack">
      <header className="page-header">
        <div>
          <h1>Studies</h1>
          <p>Compose split topology, compare strategies, then submit for privacy approval before any cut-layer leaves a vault.</p>
        </div>
      </header>

      <div className="panel stack">
        <h2>Study composer</h2>
        <CutLayerDiagram />
        <StrategyCompareTable selected={strategy} />
        <form className="stack" onSubmit={onCreate}>
          <div className="row">
            <label className="field">
              Title
              <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label className="field">
              Strategy
              <select value={strategy} onChange={(e) => setStrategy(e.target.value as typeof strategy)}>
                <option value="split">Split</option>
                <option value="federated">Federated</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </label>
            <label className="field">
              Activation TTL (hours)
              <input type="number" min={1} value={ttl} onChange={(e) => setTtl(Number(e.target.value))} />
            </label>
          </div>
          <label className="field">
            Purpose
            <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} rows={3} />
          </label>
          <label className="row">
            <input type="checkbox" checked={marketHook} onChange={(e) => setMarketHook(e.target.checked)} />
            Commercial market hook (still forbids raw exchange — BR-12)
          </label>
          <div className="stack">
            <strong>Participant sites</strong>
            {(sites.data ?? []).map((s) => (
              <label key={s.siteId} className="row">
                <input
                  type="checkbox"
                  checked={selectedSites.includes(s.siteId)}
                  onChange={(e) =>
                    setSelectedSites((prev) =>
                      e.target.checked ? [...prev, s.siteId] : prev.filter((id) => id !== s.siteId)
                    )
                  }
                />
                {s.name} <span className="mono">{s.siteId}</span>
              </label>
            ))}
            {(sites.data ?? []).length === 0 ? <p className="empty">Register sites before composing a study.</p> : null}
          </div>
          <button className="btn" type="submit" disabled={create.isPending || selectedSites.length === 0}>
            Save draft study
          </button>
        </form>
      </div>

      <div className="panel stack">
        <h2>Study list</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Strategy</th>
              <th>Gates</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(studies.data ?? []).map((s) => (
              <tr key={s.studyId}>
                <td>
                  {s.title}
                  <div className="mono">{s.studyId}</div>
                </td>
                <td>{s.strategy}</td>
                <td>
                  <span className={`chip ${s.privacyApprovalStatus === "approved" ? "pass" : "amber"}`}>
                    privacy: {s.privacyApprovalStatus}
                  </span>
                </td>
                <td>
                  {s.privacyApprovalStatus === "pending" && s.status !== "pendingPrivacy" ? (
                    <button className="btn secondary" type="button" onClick={() => submit.mutate(s.studyId)}>
                      Submit for privacy
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
