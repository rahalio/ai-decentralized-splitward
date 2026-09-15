import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLE_HOME, ROLE_OPTIONS, type Role } from "@/app/roles";

export function LoginPage({ onLogin }: { onLogin: (role: Role) => void }) {
  const [role, setRole] = useState<Role>("coordinator");
  const navigate = useNavigate();

  return (
    <div className="login-screen">
      <div className="panel login-card">
        <div className="brand-seal" style={{ alignItems: "center" }}>
          <strong>Splitward</strong>
        </div>
        <h1>Splitward</h1>
        <p>Share wisdom, not data</p>
        <label className="field" style={{ textAlign: "left", marginBottom: 16 }}>
          Enter as
          <select value={role} onChange={(e) => setRole(e.target.value as Role)}>
            {ROLE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <button
          className="btn"
          type="button"
          onClick={() => {
            onLogin(role);
            navigate(ROLE_HOME[role]);
          }}
        >
          Enter consortium control plane
        </button>
      </div>
    </div>
  );
}
