/**
 * TrainingRoundRepositoryDdb — in-memory sandbox implementation (Splitward).
 */

import type { TrainingRoundRepository } from "@splitward/services/training-rounds";
import {
  trainingRoundsById,
  envelopeItem,
  envelopeList,
  listFromMap,
  nowIso,
  sandboxId,
  type JsonRecord,
} from "../_shared/sandbox-store.js";

export class TrainingRoundRepositoryDdb implements TrainingRoundRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listTrainingRounds(
    input: Parameters<TrainingRoundRepository["listTrainingRounds"]>[0]
  ): Promise<Awaited<ReturnType<TrainingRoundRepository["listTrainingRounds"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    return envelopeList(listFromMap(trainingRoundsById), correlationId) as never;
  }

  async startTrainingRound(
    input: Parameters<TrainingRoundRepository["startTrainingRound"]>[0]
  ): Promise<Awaited<ReturnType<TrainingRoundRepository["startTrainingRound"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? raw.roundId ?? sandboxId("rnd"));
    const now = nowIso();
    const entity: JsonRecord = {
      roundId: id,
      status: 'pending',
      sitesCompleted: 0,
      partialAggregationAllowed: true,
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
    trainingRoundsById.set(id, entity);
    return envelopeItem(entity, correlationId) as never;
  }

  async getTrainingRound(
    input: Parameters<TrainingRoundRepository["getTrainingRound"]>[0]
  ): Promise<Awaited<ReturnType<TrainingRoundRepository["getTrainingRound"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.roundId ?? "");
    const entity = trainingRoundsById.get(id);
    if (!entity) return null as never;
    return envelopeItem(entity, correlationId) as never;
  }
}
