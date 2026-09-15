/**
 * Splitward API clients — correct tenant-keyed paths for the control plane.
 * Generated domain stubs remain under services/domains; UI uses these clients.
 */

import { apiClient, type ApiResponse } from "@/services/shared/infrastructure";

export type Site = {
  siteId: string;
  name: string;
  status: "active" | "paused" | "offboarded";
  maxGpu: number;
  maxEgressMbps: number;
};

export type Study = {
  studyId: string;
  title: string;
  strategy: "split" | "federated" | "hybrid";
  status: string;
  privacyApprovalStatus: string;
  activationTtlHours?: number;
  participantSiteIds?: string[];
  marketHookEnabled?: boolean;
  purpose?: string;
};

export type TrainingRound = {
  roundId: string;
  studyId: string;
  roundNumber: number;
  status: string;
  sitesExpected: number;
  sitesCompleted: number;
  stragglerTimeoutSec: number;
  partialAggregationAllowed?: boolean;
};

export type ContributionCredit = {
  creditId: string;
  studyId: string;
  siteId: string;
  roundsCompleted: number;
  dataVolumeClass: "S" | "M" | "L" | "XL";
  creditPoints?: number;
};

export type Incident = {
  incidentId: string;
  studyId: string;
  incidentType: string;
  severity: string;
  status: string;
  detail?: string;
};

export type ModelRelease = {
  releaseId: string;
  studyId: string;
  version: string;
  status: string;
  clinicianSignOffBy?: string;
  metricsSummary?: string;
};

export type LocalDataset = {
  datasetId: string;
  siteId: string;
  handle: string;
  labelStatus: string;
  recordCountClass?: string;
};

export type RightsExclusion = {
  exclusionId: string;
  siteId: string;
  studyId?: string;
  status: string;
  reason: string;
  attestedAt?: string;
};

export type AuditPack = {
  packId: string;
  studyId: string;
  periodStart: string;
  periodEnd: string;
  status: string;
  packHash?: string;
  siteAttestationCount?: number;
};

type ListData<T> = { items: T[]; nextCursor?: string };

async function listResource<T>(path: string): Promise<T[]> {
  const res = await apiClient.get<ListData<T>>(path);
  return res.data?.items ?? [];
}

async function createResource<T>(path: string, body: unknown): Promise<T> {
  const res = await apiClient.post<T>(path, body);
  return res.data;
}

export const splitwardApi = {
  listSites: () => listResource<Site>("/v0/tenants/me/sites"),
  createSite: (body: Omit<Site, "siteId">) =>
    createResource<Site>("/v0/tenants/me/sites", body),
  getSite: async (siteId: string) =>
    (await apiClient.get<Site>(`/v0/tenants/me/sites/${siteId}`)).data,

  listStudies: () => listResource<Study>("/v0/tenants/me/studies"),
  createStudy: (body: Partial<Study> & Pick<Study, "title" | "strategy">) =>
    createResource<Study>("/v0/tenants/me/studies", body),
  getStudy: async (studyId: string) =>
    (await apiClient.get<Study>(`/v0/tenants/me/studies/${studyId}`)).data,
  submitPrivacy: async (studyId: string, body: Record<string, unknown> = {}) =>
    (await apiClient.post<Study>(`/v0/tenants/me/studies/${studyId}/submit-privacy`, body)).data,
  approvePrivacy: async (
    studyId: string,
    body: { decision: "approved" | "rejected"; reason?: string }
  ) =>
    (await apiClient.post<Study>(`/v0/tenants/me/studies/${studyId}/approve-privacy`, body)).data,

  listRounds: () => listResource<TrainingRound>("/v0/tenants/me/training-rounds"),
  startRound: (body: Partial<TrainingRound> & Pick<TrainingRound, "studyId" | "roundNumber" | "sitesExpected" | "stragglerTimeoutSec">) =>
    createResource<TrainingRound>("/v0/tenants/me/training-rounds", body),

  listCredits: () => listResource<ContributionCredit>("/v0/tenants/me/contribution-credits"),
  recordCredit: (body: Omit<ContributionCredit, "creditId">) =>
    createResource<ContributionCredit>("/v0/tenants/me/contribution-credits", body),

  listIncidents: () => listResource<Incident>("/v0/tenants/me/incidents"),
  openIncident: (body: Omit<Incident, "incidentId" | "status"> & { detail: string }) =>
    createResource<Incident>("/v0/tenants/me/incidents", body),
  haltStudy: async (incidentId: string, body: Record<string, unknown> = {}) =>
    (await apiClient.post<Incident>(`/v0/tenants/me/incidents/${incidentId}/halt-study`, body)).data,

  listReleases: () => listResource<ModelRelease>("/v0/tenants/me/model-releases"),
  createRelease: (body: Pick<ModelRelease, "studyId" | "version"> & { metricsSummary?: string }) =>
    createResource<ModelRelease>("/v0/tenants/me/model-releases", body),
  clinicalSignOff: async (
    releaseId: string,
    body: { decision: "clinicallyApproved" | "rejected"; clinicianId?: string; notes?: string }
  ) =>
    (await apiClient.post<ModelRelease>(`/v0/tenants/me/model-releases/${releaseId}/clinical-signoff`, body)).data,

  listDatasets: () => listResource<LocalDataset>("/v0/tenants/me/local-datasets"),
  registerDataset: (body: Omit<LocalDataset, "datasetId">) =>
    createResource<LocalDataset>("/v0/tenants/me/local-datasets", body),

  listExclusions: () => listResource<RightsExclusion>("/v0/tenants/me/rights-exclusions"),
  createExclusion: (body: Pick<RightsExclusion, "siteId" | "reason"> & { studyId?: string }) =>
    createResource<RightsExclusion>("/v0/tenants/me/rights-exclusions", body),
  attestExclusion: async (exclusionId: string, body: Record<string, unknown> = {}) =>
    (await apiClient.post<RightsExclusion>(`/v0/tenants/me/rights-exclusions/${exclusionId}/attest`, body)).data,

  listAuditPacks: () => listResource<AuditPack>("/v0/tenants/me/audit-packs"),
  generateAuditPack: (body: Pick<AuditPack, "studyId" | "periodStart" | "periodEnd">) =>
    createResource<AuditPack>("/v0/tenants/me/audit-packs", body),
};

export type { ApiResponse };
