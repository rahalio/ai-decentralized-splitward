/**
 * ContributionCreditRepositoryDdb — in-memory sandbox implementation (Splitward).
 */

import type { ContributionCreditRepository } from "@splitward/services/contribution-credits";
import {
  contributionCreditsById,
  envelopeItem,
  envelopeList,
  listFromMap,
  nowIso,
  sandboxId,
  type JsonRecord,
} from "../_shared/sandbox-store.js";

export class ContributionCreditRepositoryDdb implements ContributionCreditRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listContributionCredits(
    input: Parameters<ContributionCreditRepository["listContributionCredits"]>[0]
  ): Promise<Awaited<ReturnType<ContributionCreditRepository["listContributionCredits"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    return envelopeList(listFromMap(contributionCreditsById), correlationId) as never;
  }

  async recordContributionCredit(
    input: Parameters<ContributionCreditRepository["recordContributionCredit"]>[0]
  ): Promise<Awaited<ReturnType<ContributionCreditRepository["recordContributionCredit"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? raw.creditId ?? sandboxId("crd"));
    const now = nowIso();
    const entity: JsonRecord = {
      creditId: id,
      roundsCompleted: 0,
      dataVolumeClass: 'S',
      creditPoints: 0,
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
    contributionCreditsById.set(id, entity);
    return envelopeItem(entity, correlationId) as never;
  }

  async getContributionCredit(
    input: Parameters<ContributionCreditRepository["getContributionCredit"]>[0]
  ): Promise<Awaited<ReturnType<ContributionCreditRepository["getContributionCredit"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.creditId ?? "");
    const entity = contributionCreditsById.get(id);
    if (!entity) return null as never;
    return envelopeItem(entity, correlationId) as never;
  }
}
