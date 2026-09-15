export type Role =
  | "coordinator"
  | "site"
  | "privacy"
  | "governor"
  | "clinician"
  | "auditor";

export const ROLE_HOME: Record<Role, string> = {
  coordinator: "/studies",
  site: "/sites",
  privacy: "/privacy",
  governor: "/credits",
  clinician: "/releases",
  auditor: "/audit",
};

export const ROLE_OPTIONS: Array<{ id: Role; label: string }> = [
  { id: "coordinator", label: "Clinical ML lead / coordinator" },
  { id: "site", label: "Site IT admin" },
  { id: "privacy", label: "Privacy officer" },
  { id: "governor", label: "Consortium governor" },
  { id: "clinician", label: "Clinician validator" },
  { id: "auditor", label: "Auditor / regulator liaison" },
];
