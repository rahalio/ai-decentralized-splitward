/**
 * StudyRepositoryDdb — in-memory sandbox implementation (Splitward).
 */

import type { StudyRepository } from "@splitward/services/studies";
import {
  studiesById,
  envelopeItem,
  envelopeList,
  listFromMap,
  nowIso,
  sandboxId,
  type JsonRecord,
} from "../_shared/sandbox-store.js";

export class StudyRepositoryDdb implements StudyRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listStudies(
    input: Parameters<StudyRepository["listStudies"]>[0]
  ): Promise<Awaited<ReturnType<StudyRepository["listStudies"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    return envelopeList(listFromMap(studiesById), correlationId) as never;
  }

  async createStudy(
    input: Parameters<StudyRepository["createStudy"]>[0]
  ): Promise<Awaited<ReturnType<StudyRepository["createStudy"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? raw.studyId ?? sandboxId("stu"));
    const now = nowIso();
    const entity: JsonRecord = {
      studyId: id,
      status: 'draft',
      privacyApprovalStatus: 'pending',
      title: '',
      strategy: 'split',
      marketHookEnabled: false,
      participantSiteIds: [],
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
    studiesById.set(id, entity);
    return envelopeItem(entity, correlationId) as never;
  }

  async getStudy(
    input: Parameters<StudyRepository["getStudy"]>[0]
  ): Promise<Awaited<ReturnType<StudyRepository["getStudy"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.studyId ?? "");
    const entity = studiesById.get(id);
    if (!entity) return null as never;
    return envelopeItem(entity, correlationId) as never;
  }
}
