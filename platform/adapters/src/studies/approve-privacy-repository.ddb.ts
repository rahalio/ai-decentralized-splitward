/**
 * ApprovePrivacyRepositoryDdb — sandbox (Splitward).
 */

import type { ApprovePrivacyRepository } from "@splitward/services/studies";
import {
  studiesById,
  envelopeItem,
  nowIso,
} from "../_shared/sandbox-store.js";

export class ApprovePrivacyRepositoryDdb implements ApprovePrivacyRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async approveStudyPrivacy(
    input: Parameters<ApprovePrivacyRepository["approveStudyPrivacy"]>[0]
  ): Promise<Awaited<ReturnType<ApprovePrivacyRepository["approveStudyPrivacy"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const studyId = String(raw.studyId ?? "");
    const entity = studiesById.get(studyId);
    if (!entity) return null as never;
    const decision = String(raw.decision ?? "approved");
    entity.privacyApprovalStatus = decision;
    entity.status = decision === "approved" ? "approved" : "draft";
    entity.updatedAt = nowIso();
    studiesById.set(studyId, entity);
    return envelopeItem(entity, correlationId) as never;
  }
}
