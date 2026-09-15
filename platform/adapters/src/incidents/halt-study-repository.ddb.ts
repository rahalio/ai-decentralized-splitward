/**
 * HaltStudyRepositoryDdb — sandbox (Splitward).
 */

import type { HaltStudyRepository } from "@splitward/services/incidents";
import {
  incidentsById,
  studiesById,
  envelopeItem,
  nowIso,
} from "../_shared/sandbox-store.js";

export class HaltStudyRepositoryDdb implements HaltStudyRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async haltStudyForIncident(
    input: Parameters<HaltStudyRepository["haltStudyForIncident"]>[0]
  ): Promise<Awaited<ReturnType<HaltStudyRepository["haltStudyForIncident"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const incidentId = String(raw.incidentId ?? "");
    const entity = incidentsById.get(incidentId);
    if (!entity) return null as never;
    entity.status = "quarantined";
    entity.updatedAt = nowIso();
    incidentsById.set(incidentId, entity);
    const studyId = String(entity.studyId ?? "");
    const study = studiesById.get(studyId);
    if (study) {
      study.status = "halted";
      study.updatedAt = nowIso();
      studiesById.set(studyId, study);
    }
    return envelopeItem(entity, correlationId) as never;
  }
}
