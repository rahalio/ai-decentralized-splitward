import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { splitwardApi } from "@/services/api/splitward-api";

export function PrivacyDeskPage() {
  const qc = useQueryClient();
  const studies = useQuery({ queryKey: ["studies"], queryFn: splitwardApi.listStudies });
  const queue = (studies.data ?? []).filter(
    (s) => s.privacyApprovalStatus === "pending" || s.status === "pendingPrivacy"
  );

  const decide = useMutation({
    mutationFn: ({ studyId, decision }: { studyId: string; decision: "approved" | "rejected" }) =>
      splitwardApi.approvePrivacy(studyId, { decision }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["studies"] }),
  });

  return (
    <div className="page stack">
      <header className="page-header">
        <div>
          <h1>Privacy desk</h1>
          <p>Approve purpose, activation retention, and participant list before cut-layer traffic (BR-4).</p>
        </div>
      </header>

      <div className="panel stack">
        <h2>Protocol approvals</h2>
        {queue.length === 0 ? (
          <p className="empty">Empty queue — healthy. No overdue ethics packets.</p>
        ) : (
          queue.map((s) => (
            <div key={s.studyId} className="stack">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div>
                  <strong>{s.title}</strong>
                  <div className="mono">{s.studyId}</div>
                  <div>Strategy {s.strategy} · TTL {s.activationTtlHours ?? "—"}h</div>
                  <div>Purpose: {s.purpose || "—"}</div>
                </div>
                <span className="chip amber">{s.privacyApprovalStatus}</span>
              </div>
              <div className="row">
                <button className="btn pass" type="button" onClick={() => decide.mutate({ studyId: s.studyId, decision: "approved" })}>
                  Approve
                </button>
                <button className="btn halt" type="button" onClick={() => decide.mutate({ studyId: s.studyId, decision: "rejected" })}>
                  Deny
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
