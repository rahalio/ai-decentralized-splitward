/**
 * ModelReleaseRepositoryDdb — in-memory sandbox implementation (Splitward).
 */

import type { ModelReleaseRepository } from "@splitward/services/model-releases";
import {
  modelReleasesById,
  envelopeItem,
  envelopeList,
  listFromMap,
  nowIso,
  sandboxId,
  type JsonRecord,
} from "../_shared/sandbox-store.js";

export class ModelReleaseRepositoryDdb implements ModelReleaseRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listModelReleases(
    input: Parameters<ModelReleaseRepository["listModelReleases"]>[0]
  ): Promise<Awaited<ReturnType<ModelReleaseRepository["listModelReleases"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    return envelopeList(listFromMap(modelReleasesById), correlationId) as never;
  }

  async createModelRelease(
    input: Parameters<ModelReleaseRepository["createModelRelease"]>[0]
  ): Promise<Awaited<ReturnType<ModelReleaseRepository["createModelRelease"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? raw.releaseId ?? sandboxId("rel"));
    const now = nowIso();
    const entity: JsonRecord = {
      releaseId: id,
      status: 'candidate',
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
    modelReleasesById.set(id, entity);
    return envelopeItem(entity, correlationId) as never;
  }

  async getModelRelease(
    input: Parameters<ModelReleaseRepository["getModelRelease"]>[0]
  ): Promise<Awaited<ReturnType<ModelReleaseRepository["getModelRelease"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.releaseId ?? "");
    const entity = modelReleasesById.get(id);
    if (!entity) return null as never;
    return envelopeItem(entity, correlationId) as never;
  }
}
