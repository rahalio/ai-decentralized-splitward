import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { splitwardApi } from "@/services/api/splitward-api";

export function DatasetsPage() {
  const qc = useQueryClient();
  const datasets = useQuery({ queryKey: ["datasets"], queryFn: splitwardApi.listDatasets });
  const sites = useQuery({ queryKey: ["sites"], queryFn: splitwardApi.listSites });
  const [siteId, setSiteId] = useState("");
  const [handle, setHandle] = useState("");

  const register = useMutation({
    mutationFn: () =>
      splitwardApi.registerDataset({
        siteId,
        handle,
        labelStatus: "unlabelled",
        recordCountClass: "M",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["datasets"] });
      setHandle("");
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    register.mutate();
  }

  return (
    <div className="page stack">
      <header className="page-header">
        <div>
          <h1>Local dataset refs</h1>
          <p>Handles only — labelling stays local. There is no upload-to-train affordance (BR-1, BR-5).</p>
        </div>
      </header>
      <div className="panel stack">
        <form className="row" onSubmit={onSubmit}>
          <label className="field">
            Site
            <select value={siteId} onChange={(e) => setSiteId(e.target.value)} required>
              <option value="">Select site</option>
              {(sites.data ?? []).map((s) => (
                <option key={s.siteId} value={s.siteId}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field" style={{ flex: 1 }}>
            Local handle
            <input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="vault://site/dataset-ref" required />
          </label>
          <button className="btn" type="submit">
            Register handle
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Dataset</th>
              <th>Site</th>
              <th>Handle</th>
              <th>Labels</th>
            </tr>
          </thead>
          <tbody>
            {(datasets.data ?? []).map((d) => (
              <tr key={d.datasetId}>
                <td className="mono">{d.datasetId}</td>
                <td className="mono">{d.siteId}</td>
                <td className="mono">{d.handle}</td>
                <td>{d.labelStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
