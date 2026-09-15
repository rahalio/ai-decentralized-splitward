import { NavLink, Outlet } from "react-router-dom";
import type { Role } from "@/app/roles";

const LINKS: Array<{ to: string; label: string; roles: Role[] }> = [
  { to: "/coordinator", label: "Coordinator home", roles: ["coordinator", "governor"] },
  { to: "/studies", label: "Studies", roles: ["coordinator", "governor", "privacy"] },
  { to: "/rounds", label: "Training rounds", roles: ["coordinator", "site"] },
  { to: "/sites", label: "Sites & envelopes", roles: ["coordinator", "site"] },
  { to: "/datasets", label: "Local datasets", roles: ["site"] },
  { to: "/credits", label: "Contribution credits", roles: ["coordinator", "governor"] },
  { to: "/incidents", label: "Incidents", roles: ["coordinator", "governor", "privacy"] },
  { to: "/privacy", label: "Privacy desk", roles: ["privacy"] },
  { to: "/releases", label: "Model releases", roles: ["clinician", "coordinator"] },
  { to: "/rights", label: "Rights exclusions", roles: ["site", "privacy"] },
  { to: "/audit", label: "No-raw audit", roles: ["privacy", "auditor", "coordinator"] },
];

export function AppShell({
  role,
  onLogout,
}: {
  role: Role;
  onLogout: () => void;
}) {
  const links = LINKS.filter((l) => l.roles.includes(role));
  return (
    <div className="app-shell">
      <aside className="shell-nav">
        <div className="brand-seal">
          <strong>Splitward</strong>
          <span>Share wisdom, not data</span>
          <span className="chip">role: {role}</span>
        </div>
        <nav className="nav-links" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="btn secondary" onClick={onLogout}>
          Sign out
        </button>
      </aside>
      <main className="shell-main">
        <Outlet />
      </main>
    </div>
  );
}
