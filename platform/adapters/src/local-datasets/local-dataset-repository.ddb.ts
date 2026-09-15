/**
 * LocalDatasetRepositoryDdb — in-memory sandbox implementation (Splitward).
 */

import type { LocalDatasetRepository } from "@splitward/services/local-datasets";
import {
  localDatasetsById,
  envelopeItem,
  envelopeList,
  listFromMap,
  nowIso,
  sandboxId,
  type JsonRecord,
} from "../_shared/sandbox-store.js";

export class LocalDatasetRepositoryDdb implements LocalDatasetRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listLocalDatasets(
    input: Parameters<LocalDatasetRepository["listLocalDatasets"]>[0]
  ): Promise<Awaited<ReturnType<LocalDatasetRepository["listLocalDatasets"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    return envelopeList(listFromMap(localDatasetsById), correlationId) as never;
  }

  async registerLocalDataset(
    input: Parameters<LocalDatasetRepository["registerLocalDataset"]>[0]
  ): Promise<Awaited<ReturnType<LocalDatasetRepository["registerLocalDataset"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? raw.datasetId ?? sandboxId("lds"));
    const now = nowIso();
    const entity: JsonRecord = {
      datasetId: id,
      labelStatus: 'unlabelled',
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
    localDatasetsById.set(id, entity);
    return envelopeItem(entity, correlationId) as never;
  }

  async getLocalDataset(
    input: Parameters<LocalDatasetRepository["getLocalDataset"]>[0]
  ): Promise<Awaited<ReturnType<LocalDatasetRepository["getLocalDataset"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.datasetId ?? "");
    const entity = localDatasetsById.get(id);
    if (!entity) return null as never;
    return envelopeItem(entity, correlationId) as never;
  }
}
