/**
 * IncidentRepositoryDdb — in-memory sandbox implementation (Splitward).
 */

import type { IncidentRepository } from "@splitward/services/incidents";
import {
  incidentsById,
  envelopeItem,
  envelopeList,
  listFromMap,
  nowIso,
  sandboxId,
  type JsonRecord,
} from "../_shared/sandbox-store.js";

export class IncidentRepositoryDdb implements IncidentRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listIncidents(
    input: Parameters<IncidentRepository["listIncidents"]>[0]
  ): Promise<Awaited<ReturnType<IncidentRepository["listIncidents"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    return envelopeList(listFromMap(incidentsById), correlationId) as never;
  }

  async openIncident(
    input: Parameters<IncidentRepository["openIncident"]>[0]
  ): Promise<Awaited<ReturnType<IncidentRepository["openIncident"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.id ?? raw.incidentId ?? sandboxId("inc"));
    const now = nowIso();
    const entity: JsonRecord = {
      incidentId: id,
      status: 'open',
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
    incidentsById.set(id, entity);
    return envelopeItem(entity, correlationId) as never;
  }

  async getIncident(
    input: Parameters<IncidentRepository["getIncident"]>[0]
  ): Promise<Awaited<ReturnType<IncidentRepository["getIncident"]>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? "");
    const id = String(raw.incidentId ?? "");
    const entity = incidentsById.get(id);
    if (!entity) return null as never;
    return envelopeItem(entity, correlationId) as never;
  }
}
