/**
 * AttestRepositoryDdb — sandbox (Splitward).
 */

import type { AttestRepository } from "@splitward/services/rights-exclusions";
import {
  rightsExclusionsById,
  envelopeItem,
  nowIso,
} from "../_shared/sandbox-store.js";

export class AttestRepositoryDdb implements AttestRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async attestRightsExclusion(
    input: Parameters<AttestRepository["attestRightsExclusion"]>[0]
  ): Promise<Awaited<ReturnType<AttestRepository["attestRightsExclusion"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const exclusionId = String(raw.exclusionId ?? "");
    const entity = rightsExclusionsById.get(exclusionId);
    if (!entity) return null as never;
    entity.status = "attested";
    entity.attestedAt = nowIso();
    entity.updatedAt = nowIso();
    rightsExclusionsById.set(exclusionId, entity);
    return envelopeItem(entity, correlationId) as never;
  }
}
