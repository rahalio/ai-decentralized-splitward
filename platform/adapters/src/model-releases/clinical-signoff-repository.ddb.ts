/**
 * ClinicalSignoffRepositoryDdb — sandbox (Splitward).
 */

import type { ClinicalSignoffRepository } from "@splitward/services/model-releases";
import {
  modelReleasesById,
  envelopeItem,
  nowIso,
} from "../_shared/sandbox-store.js";

export class ClinicalSignoffRepositoryDdb implements ClinicalSignoffRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async clinicalSignOffModelRelease(
    input: Parameters<ClinicalSignoffRepository["clinicalSignOffModelRelease"]>[0]
  ): Promise<Awaited<ReturnType<ClinicalSignoffRepository["clinicalSignOffModelRelease"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const releaseId = String(raw.releaseId ?? "");
    const entity = modelReleasesById.get(releaseId);
    if (!entity) return null as never;
    const decision = String(raw.decision ?? "clinicallyApproved");
    entity.status = decision;
    entity.clinicianSignOffBy = String(raw.clinicianId ?? "clinician");
    entity.updatedAt = nowIso();
    modelReleasesById.set(releaseId, entity);
    return envelopeItem(entity, correlationId) as never;
  }
}
