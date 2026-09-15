import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { splitwardApi } from "@/services/api/splitward-api";

export function ReleasesPage() {
  const qc = useQueryClient();
  const releases = useQuery({ queryKey: ["releases"], queryFn: splitwardApi.listReleases });
  const [studyId, setStudyId] = useState("");
  const [version, setVersion] = useState("0.1.0");
  const [metrics, setMetrics] = useState("");

  const create = useMutation({
    mutationFn: () =>
      splitwardApi.createRelease({
        studyId,
        version,
        metricsSummary: metrics,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["releases"] }),
  });

  const signOff = useMutation({
    mutationFn: ({
      releaseId,
      decision,
    }: {
      releaseId: string;
      decision: "clinicallyApproved" | "rejected";
    }) => splitwardApi.clinicalSignOff(releaseId, { decision, clinicianId: "clinician_demo" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["releases"] }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div className="page stack">
      <header className="page-header">
        <div>
          <h1>Clinical validation</h1>
          <p>Human clinical sign-off before production eligibility (BR-6). Unsigned candidates cannot be marked production.</p>
        </div>
      </header>

      <div className="panel stack">
        <form className="row" onSubmit={onSubmit}>
          <label className="field">
            Study id
            <input className="mono" value={studyId} onChange={(e) => setStudyId(e.target.value)} required />
          </label>
          <label className="field">
            Version
            <input value={version} onChange={(e) => setVersion(e.target.value)} required />
          </label>
          <label className="field" style={{ flex: 1 }}>
            Metrics vs single-site baseline
            <input value={metrics} onChange={(e) => setMetrics(e.target.value)} />
          </label>
          <button className="btn" type="submit">
            Create candidate
          </button>
        </form>
      </div>

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Release</th>
              <th>Version</th>
              <th>Status</th>
              <th>ClinicalSignOff</th>
            </tr>
          </thead>
          <tbody>
            {(releases.data ?? []).map((r) => (
              <tr key={r.releaseId}>
                <td className="mono">{r.releaseId}</td>
                <td>{r.version}</td>
                <td>
                  <span className={`chip ${r.status === "clinicallyApproved" ? "pass" : ""}`}>{r.status}</span>
                </td>
                <td className="row">
                  {r.status === "candidate" ? (
                    <>
                      <button className="btn pass" type="button" onClick={() => signOff.mutate({ releaseId: r.releaseId, decision: "clinicallyApproved" })}>
                        Approve production-eligible
                      </button>
                      <button className="btn halt" type="button" onClick={() => signOff.mutate({ releaseId: r.releaseId, decision: "rejected" })}>
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="mono">{r.clinicianSignOffBy ?? "—"}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(releases.data ?? []).length === 0 ? <p className="empty">No candidates in the validation queue.</p> : null}
      </div>
    </div>
  );
}
