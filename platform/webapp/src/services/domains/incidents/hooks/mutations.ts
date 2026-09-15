/**
 * Incidents Mutation Hooks
 *
 * React Query hooks for mutating incidents data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { incidentsService } from "../incidents.service";
// TODO: Import types
// import type { ... } from "../incidents.api-types";

/**
 * Hook to create incident
 *
 * Automatically invalidates incidents queries on success.
 */
export function useGetIncident() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return incidentsService.getIncident(data);
    },
    {
      invalidateQueries: [["incidents", "Incident"]],
    }
  );
}

/**
 * Hook to halt study and quarantine artefacts
 *
 * Automatically invalidates incidents queries on success.
 */
export function useGetHaltStudy() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return incidentsService.getHaltStudy(data);
    },
    {
      invalidateQueries: [["incidents", "HaltStudy"]],
    }
  );
}
