/**
 * Studies Query Hooks
 *
 * React Query hooks for fetching studies data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { studiesService } from "../studies.service";

/**
 * Hook to list studys
 *
 * Query key: ["studies", "Study", ]
 */
export function useStudy(params?: Record<string, any>) {
  return useTenantQuery(
    ["studies", "Study", ],
    async (orgId: string, signal?: AbortSignal) => {
      return studiesService.getStudy(params, signal);
    }
  );
}

/**
 * Hook to get study
 *
 * Query key: ["studies", "Study", studyId]
 */
export function useStudy(studyId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["studies", "Study", studyId],
    async (orgId: string, signal?: AbortSignal) => {
      return studiesService.getStudy(studyId, params, signal);
    },
    {
      enabled: !!studyId
    }
  );
}
