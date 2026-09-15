import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { splitwardApi } from "@/services/api/splitward-api";

export function RightsPage() {
  const qc = useQueryClient();
  const exclusions = useQuery({ queryKey: ["exclusions"], queryFn: splitwardApi.listExclusions });
  const [siteId, setSiteId] = useState("");
  const [reason, setReason] = useState("");

  const create = useMutation({
    mutationFn: () => splitwardApi.createExclusion({ siteId, reason }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["exclusions"] }),
  });

  const attest = useMutation({
    mutationFn: (exclusionId: string) =>
      splitwardApi.attestExclusion(exclusionId, { attestationNote: "Local suppression attested" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["exclusions"] }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div className="page stack">
      <header className="page-header">
        <div>
          <h1>Rights-driven cohort exclusion</h1>
          <p>Exclude a site’s local cohort from future rounds. Raw never moves (BR-11).</p>
        </div>
      </header>
      <div className="panel stack">
        <form className="stack" onSubmit={onSubmit}>
          <div className="row">
            <label className="field">
              Site id
              <input className="mono" value={siteId} onChange={(e) => setSiteId(e.target.value)} required />
            </label>
            <label className="field" style={{ flex: 1 }}>
              Reason
              <input value={reason} onChange={(e) => setReason(e.target.value)} required />
            </label>
            <button className="btn" type="submit">
              Apply exclusion
            </button>
          </div>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Exclusion</th>
              <th>Site</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(exclusions.data ?? []).map((x) => (
              <tr key={x.exclusionId}>
                <td className="mono">{x.exclusionId}</td>
                <td className="mono">{x.siteId}</td>
                <td>
                  <span className={`chip ${x.status === "attested" ? "pass" : "amber"}`}>{x.status}</span>
                </td>
                <td>
                  {x.status !== "attested" ? (
                    <button className="btn secondary" type="button" onClick={() => attest.mutate(x.exclusionId)}>
                      Attest local suppression
                    </button>
                  ) : (
                    <span className="mono">{x.attestedAt}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
