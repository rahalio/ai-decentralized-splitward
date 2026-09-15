import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { splitwardApi } from "@/services/api/splitward-api";

export function CoordinatorHomePage() {
  const studies = useQuery({ queryKey: ["studies"], queryFn: splitwardApi.listStudies });
  const incidents = useQuery({ queryKey: ["incidents"], queryFn: splitwardApi.listIncidents });
  const rounds = useQuery({ queryKey: ["rounds"], queryFn: splitwardApi.listRounds });

  const halted = (studies.data ?? []).filter((s) => s.status === "halted");
  const awaiting = (studies.data ?? []).filter(
    (s) => s.privacyApprovalStatus === "pending" || s.status === "pendingPrivacy"
  );

  return (
    <div className="page stack">
      <header className="page-header">
        <div>
          <h1>Coordinator home</h1>
          <p>Which studies are training, halted, or awaiting gates — without any raw lake?</p>
        </div>
        <Link className="btn" to="/studies">
          New study
        </Link>
      </header>

      {halted.length > 0 ? (
        <div className="banner halt" role="status">
          {halted.length} study(ies) halted — open Incidents before resuming rounds.
        </div>
      ) : null}

      <div className="panel stack">
        <h2>Active programme</h2>
        <div className="row">
          <span className="chip">{studies.data?.length ?? 0} studies</span>
          <span className="chip">{rounds.data?.length ?? 0} rounds</span>
          <span className="chip amber">{awaiting.length} awaiting privacy</span>
          <span className="chip halt">{incidents.data?.filter((i) => i.status !== "closed").length ?? 0} open incidents</span>
        </div>
        {(studies.data ?? []).length === 0 ? (
          <p className="empty">Register first site + study to start the consortium clock.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Study</th>
                <th>Strategy</th>
                <th>Status</th>
                <th>Privacy</th>
              </tr>
            </thead>
            <tbody>
              {(studies.data ?? []).map((s) => (
                <tr key={s.studyId}>
                  <td>
                    <Link to={`/studies`}>{s.title}</Link>
                    <div className="mono">{s.studyId}</div>
                  </td>
                  <td>{s.strategy}</td>
                  <td>
                    <span className={`chip ${s.status === "halted" ? "halt" : ""}`}>{s.status}</span>
                  </td>
                  <td>
                    <span className={`chip ${s.privacyApprovalStatus === "approved" ? "pass" : "amber"}`}>
                      {s.privacyApprovalStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
