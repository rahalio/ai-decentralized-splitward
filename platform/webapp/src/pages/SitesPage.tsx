import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SiteEnvelopeMeter } from "@/components/SiteEnvelopeMeter";
import { splitwardApi } from "@/services/api/splitward-api";

export function SitesPage() {
  const qc = useQueryClient();
  const sites = useQuery({ queryKey: ["sites"], queryFn: splitwardApi.listSites });
  const [name, setName] = useState("");
  const [maxGpu, setMaxGpu] = useState(4);
  const [maxEgressMbps, setMaxEgress] = useState(100);

  const create = useMutation({
    mutationFn: () =>
      splitwardApi.createSite({
        name,
        status: "active",
        maxGpu,
        maxEgressMbps,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sites"] });
      setName("");
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div className="page stack">
      <header className="page-header">
        <div>
          <h1>Sites & capacity envelopes</h1>
          <p>Cap local GPU/egress up front. Raw patient upload is not available — vaults stay sealed (BR-1, BR-2).</p>
        </div>
      </header>

      <div className="banner">No raw-upload control exists in Splitward. Register handles only.</div>

      <div className="panel stack">
        <h2>Register site</h2>
        <form className="row" onSubmit={onSubmit}>
          <label className="field">
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="field">
            Max GPU
            <input type="number" min={0} value={maxGpu} onChange={(e) => setMaxGpu(Number(e.target.value))} />
          </label>
          <label className="field">
            Max egress Mbps
            <input type="number" min={0} value={maxEgressMbps} onChange={(e) => setMaxEgress(Number(e.target.value))} />
          </label>
          <button className="btn" type="submit">
            Register
          </button>
        </form>
      </div>

      <div className="panel stack">
        <h2>Site home</h2>
        {(sites.data ?? []).length === 0 ? (
          <p className="empty">No sites yet — register the first hospital vault.</p>
        ) : (
          (sites.data ?? []).map((s) => (
            <div key={s.siteId} className="stack">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div>
                  <strong>{s.name}</strong>
                  <div className="mono">{s.siteId}</div>
                </div>
                <span className="chip">{s.status}</span>
              </div>
              <SiteEnvelopeMeter label="GPU envelope" used={Math.min(2, s.maxGpu)} max={s.maxGpu} unit="GPU" />
              <SiteEnvelopeMeter
                label="Egress envelope"
                used={Math.min(40, s.maxEgressMbps)}
                max={s.maxEgressMbps}
                unit="Mbps"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
