import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { splitwardApi } from "@/services/api/splitward-api";

export function IncidentsPage() {
  const qc = useQueryClient();
  const incidents = useQuery({ queryKey: ["incidents"], queryFn: splitwardApi.listIncidents });
  const [studyId, setStudyId] = useState("");
  const [detail, setDetail] = useState("");
  const [incidentType, setType] = useState("suspectedLeakage");
  const [severity, setSeverity] = useState("high");

  const open = useMutation({
    mutationFn: () =>
      splitwardApi.openIncident({
        studyId,
        incidentType,
        severity,
        detail,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["incidents"] }),
  });

  const halt = useMutation({
    mutationFn: (incidentId: string) => splitwardApi.haltStudy(incidentId, { quarantineArtefacts: true }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["incidents"] });
      qc.invalidateQueries({ queryKey: ["studies"] });
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    open.mutate();
  }

  return (
    <div className="page stack">
      <header className="page-header">
        <div>
          <h1>Incidents</h1>
          <p>Suspected leakage or protocol violation stops the round and quarantines artefacts (BR-8).</p>
        </div>
      </header>

      {(incidents.data ?? []).some((i) => i.status !== "closed") ? (
        <div className="banner halt" role="alert">
          IncidentHaltBanner — open incidents require halt / quarantine review.
        </div>
      ) : (
        <div className="banner">Sealed — no open leakage incidents.</div>
      )}

      <div className="panel stack">
        <form className="stack" onSubmit={onSubmit}>
          <div className="row">
            <label className="field">
              Study id
              <input className="mono" value={studyId} onChange={(e) => setStudyId(e.target.value)} required />
            </label>
            <label className="field">
              Type
              <select value={incidentType} onChange={(e) => setType(e.target.value)}>
                <option value="suspectedLeakage">Suspected leakage</option>
                <option value="protocolViolation">Protocol violation</option>
                <option value="egressBreach">Egress breach</option>
              </select>
            </label>
            <label className="field">
              Severity
              <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
                <option value="critical">critical</option>
              </select>
            </label>
          </div>
          <label className="field">
            Detail (activation anomaly summary — not PHI)
            <textarea value={detail} onChange={(e) => setDetail(e.target.value)} required rows={3} />
          </label>
          <button className="btn halt" type="submit">
            Open incident
          </button>
        </form>
      </div>

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Incident</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(incidents.data ?? []).map((i) => (
              <tr key={i.incidentId}>
                <td className="mono">{i.incidentId}</td>
                <td>{i.incidentType}</td>
                <td>{i.severity}</td>
                <td>
                  <span className={`chip ${i.status === "quarantined" ? "halt" : ""}`}>{i.status}</span>
                </td>
                <td>
                  {i.status === "open" ? (
                    <button className="btn halt" type="button" onClick={() => halt.mutate(i.incidentId)}>
                      Halt study
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
