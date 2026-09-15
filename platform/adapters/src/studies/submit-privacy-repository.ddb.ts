/**
 * SubmitPrivacyRepositoryDdb — sandbox (Splitward).
 */

import type { SubmitPrivacyRepository } from "@splitward/services/studies";
import {
  studiesById,
  envelopeItem,
  nowIso,
} from "../_shared/sandbox-store.js";

export class SubmitPrivacyRepositoryDdb implements SubmitPrivacyRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async submitStudyForPrivacy(
    input: Parameters<SubmitPrivacyRepository["submitStudyForPrivacy"]>[0]
  ): Promise<Awaited<ReturnType<SubmitPrivacyRepository["submitStudyForPrivacy"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const studyId = String(raw.studyId ?? "");
    const entity = studiesById.get(studyId);
    if (!entity) return null as never;
    entity.privacyApprovalStatus = "pending";
    entity.status = "pendingPrivacy";
    entity.updatedAt = nowIso();
    studiesById.set(studyId, entity);
    return envelopeItem(entity, correlationId) as never;
  }
}
