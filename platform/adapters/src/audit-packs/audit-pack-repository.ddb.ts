/**
 * AuditPackRepositoryDdb — in-memory sandbox implementation (Splitward).
 */

import type { AuditPackRepository } from "@splitward/services/audit-packs";
import {
  auditPacksById,
  envelopeItem,
  envelopeList,
  listFromMap,
  nowIso,
  sandboxId,
  type JsonRecord,
} from "../_shared/sandbox-store.js";

export class AuditPackRepositoryDdb implements AuditPackRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listAuditPacks(
    input: Parameters<AuditPackRepository["listAuditPacks"]>[0]
  ): Promise<Awaited<ReturnType<AuditPackRepository["listAuditPacks"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    return envelopeList(listFromMap(auditPacksById), correlationId) as never;
  }

  async generateAuditPack(
    input: Parameters<AuditPackRepository["generateAuditPack"]>[0]
  ): Promise<Awaited<ReturnType<AuditPackRepository["generateAuditPack"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? raw.packId ?? sandboxId("aud"));
    const now = nowIso();
    const entity: JsonRecord = {
      packId: id,
      status: 'pending',
      siteAttestationCount: 0,
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
    auditPacksById.set(id, entity);
    return envelopeItem(entity, correlationId) as never;
  }

  async getAuditPack(
    input: Parameters<AuditPackRepository["getAuditPack"]>[0]
  ): Promise<Awaited<ReturnType<AuditPackRepository["getAuditPack"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.packId ?? "");
    const entity = auditPacksById.get(id);
    if (!entity) return null as never;
    return envelopeItem(entity, correlationId) as never;
  }
}
