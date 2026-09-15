import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppShell } from "@/app/AppShell";
import { ROLE_HOME, type Role } from "@/app/roles";
import { AuditPage } from "@/pages/AuditPage";
import { CoordinatorHomePage } from "@/pages/CoordinatorHomePage";
import { CreditsPage } from "@/pages/CreditsPage";
import { DatasetsPage } from "@/pages/DatasetsPage";
import { IncidentsPage } from "@/pages/IncidentsPage";
import { LoginPage } from "@/pages/LoginPage";
import { PrivacyDeskPage } from "@/pages/PrivacyDeskPage";
import { ReleasesPage } from "@/pages/ReleasesPage";
import { RightsPage } from "@/pages/RightsPage";
import { RoundsPage } from "@/pages/RoundsPage";
import { SitesPage } from "@/pages/SitesPage";
import { StudiesPage } from "@/pages/StudiesPage";

export function App() {
  const [role, setRole] = useState<Role | null>(null);
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              role ? (
                <Navigate to={ROLE_HOME[role]} replace />
              ) : (
                <LoginPage onLogin={setRole} />
              )
            }
          />
          <Route
            path="/"
            element={
              role ? (
                <AppShell role={role} onLogout={() => setRole(null)} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<Navigate to={role ? ROLE_HOME[role] : "/login"} replace />} />
            <Route path="coordinator" element={<CoordinatorHomePage />} />
            <Route path="studies" element={<StudiesPage />} />
            <Route path="rounds" element={<RoundsPage />} />
            <Route path="sites" element={<SitesPage />} />
            <Route path="datasets" element={<DatasetsPage />} />
            <Route path="credits" element={<CreditsPage />} />
            <Route path="incidents" element={<IncidentsPage />} />
            <Route path="privacy" element={<PrivacyDeskPage />} />
            <Route path="releases" element={<ReleasesPage />} />
            <Route path="rights" element={<RightsPage />} />
            <Route path="audit" element={<AuditPage />} />
          </Route>
          <Route path="*" element={<Navigate to={role ? ROLE_HOME[role] : "/login"} replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
