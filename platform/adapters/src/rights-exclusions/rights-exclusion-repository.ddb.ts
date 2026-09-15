/**
 * RightsExclusionRepositoryDdb — in-memory sandbox implementation (Splitward).
 */

import type { RightsExclusionRepository } from "@splitward/services/rights-exclusions";
import {
  rightsExclusionsById,
  envelopeItem,
  envelopeList,
  listFromMap,
  nowIso,
  sandboxId,
  type JsonRecord,
} from "../_shared/sandbox-store.js";

export class RightsExclusionRepositoryDdb implements RightsExclusionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listRightsExclusions(
    input: Parameters<RightsExclusionRepository["listRightsExclusions"]>[0]
  ): Promise<Awaited<ReturnType<RightsExclusionRepository["listRightsExclusions"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    return envelopeList(listFromMap(rightsExclusionsById), correlationId) as never;
  }

  async createRightsExclusion(
    input: Parameters<RightsExclusionRepository["createRightsExclusion"]>[0]
  ): Promise<Awaited<ReturnType<RightsExclusionRepository["createRightsExclusion"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? raw.exclusionId ?? sandboxId("rex"));
    const now = nowIso();
    const entity: JsonRecord = {
      exclusionId: id,
      status: 'requested',
      ...Object.fromEntries(
        Object.entries(raw).filter(
          ([k]) =>
            ![
              "id",
              "correlationId",
              "orgId",
              "createdByActorId",
              "createdByActorType",
            ].includes(k)
        )
      ),
      createdAt: now,
      updatedAt: now,
    };
    rightsExclusionsById.set(id, entity);
    return envelopeItem(entity, correlationId) as never;
  }

  async getRightsExclusion(
    input: Parameters<RightsExclusionRepository["getRightsExclusion"]>[0]
  ): Promise<Awaited<ReturnType<RightsExclusionRepository["getRightsExclusion"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.exclusionId ?? "");
    const entity = rightsExclusionsById.get(id);
    if (!entity) return null as never;
    return envelopeItem(entity, correlationId) as never;
  }
}
