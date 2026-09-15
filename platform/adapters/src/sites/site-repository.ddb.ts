/**
 * SiteRepositoryDdb — in-memory sandbox implementation (Splitward).
 */

import type { SiteRepository } from "@splitward/services/sites";
import {
  sitesById,
  envelopeItem,
  envelopeList,
  listFromMap,
  nowIso,
  sandboxId,
  type JsonRecord,
} from "../_shared/sandbox-store.js";

export class SiteRepositoryDdb implements SiteRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listSites(
    input: Parameters<SiteRepository["listSites"]>[0]
  ): Promise<Awaited<ReturnType<SiteRepository["listSites"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    return envelopeList(listFromMap(sitesById), correlationId) as never;
  }

  async registerSite(
    input: Parameters<SiteRepository["registerSite"]>[0]
  ): Promise<Awaited<ReturnType<SiteRepository["registerSite"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? raw.siteId ?? sandboxId("sit"));
    const now = nowIso();
    const entity: JsonRecord = {
      siteId: id,
      status: 'active',
      name: '',
      maxGpu: 0,
      maxEgressMbps: 0,
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
    sitesById.set(id, entity);
    return envelopeItem(entity, correlationId) as never;
  }

  async getSite(
    input: Parameters<SiteRepository["getSite"]>[0]
  ): Promise<Awaited<ReturnType<SiteRepository["getSite"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.siteId ?? "");
    const entity = sitesById.get(id);
    if (!entity) return null as never;
    return envelopeItem(entity, correlationId) as never;
  }
}
