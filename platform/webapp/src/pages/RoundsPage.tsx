import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { splitwardApi } from "@/services/api/splitward-api";

export function RoundsPage() {
  const qc = useQueryClient();
  const rounds = useQuery({ queryKey: ["rounds"], queryFn: splitwardApi.listRounds });
  const studies = useQuery({ queryKey: ["studies"], queryFn: splitwardApi.listStudies });
  const [studyId, setStudyId] = useState("");
  const [roundNumber, setRoundNumber] = useState(1);
  const [sitesExpected, setSitesExpected] = useState(2);
  const [timeoutSec, setTimeoutSec] = useState(300);

  const approved = (studies.data ?? []).filter((s) => s.privacyApprovalStatus === "approved");

  const start = useMutation({
    mutationFn: () =>
      splitwardApi.startRound({
        studyId,
        roundNumber,
        sitesExpected,
        stragglerTimeoutSec: timeoutSec,
        partialAggregationAllowed: true,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rounds"] }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!studyId) return;
    start.mutate();
  }

  return (
    <div className="page stack">
      <header className="page-header">
        <div>
          <h1>Training rounds</h1>
          <p>Run rounds under declared envelopes with straggler timeout and partial aggregation (BR-10).</p>
        </div>
      </header>

      {approved.length === 0 ? (
        <div className="banner amber" role="status">
          ProtocolGateBanner — privacy approval required before rounds can start.
        </div>
      ) : null}

      <div className="panel stack">
        <h2>Start round</h2>
        <form className="row" onSubmit={onSubmit}>
          <label className="field">
            Study
            <select value={studyId} onChange={(e) => setStudyId(e.target.value)} required>
              <option value="">Select approved study</option>
              {approved.map((s) => (
                <option key={s.studyId} value={s.studyId}>
                  {s.title}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Round #
            <input type="number" min={1} value={roundNumber} onChange={(e) => setRoundNumber(Number(e.target.value))} />
          </label>
          <label className="field">
            Sites expected
            <input type="number" min={1} value={sitesExpected} onChange={(e) => setSitesExpected(Number(e.target.value))} />
          </label>
          <label className="field">
            Straggler timeout (sec)
            <input type="number" min={1} value={timeoutSec} onChange={(e) => setTimeoutSec(Number(e.target.value))} />
          </label>
          <button className="btn" type="submit" disabled={!studyId}>
            Start round
          </button>
        </form>
      </div>

      <div className="panel stack">
        <h2>Round timeline</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Round</th>
              <th>Study</th>
              <th>Progress</th>
              <th>Timeout</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(rounds.data ?? []).map((r) => (
              <tr key={r.roundId}>
                <td className="mono">{r.roundId}</td>
                <td className="mono">{r.studyId}</td>
                <td>
                  {r.sitesCompleted}/{r.sitesExpected}
                  {r.sitesCompleted < r.sitesExpected ? <span className="chip amber">straggler window</span> : null}
                </td>
                <td className="mono">{r.stragglerTimeoutSec}s</td>
                <td>
                  <span className={`chip ${r.status === "halted" ? "halt" : ""}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
