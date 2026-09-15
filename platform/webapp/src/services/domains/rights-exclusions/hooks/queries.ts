/**
 * RightsExclusions Query Hooks
 *
 * React Query hooks for fetching rights-exclusions data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { rights-exclusionsService } from "../rights-exclusions.service";

/**
 * Hook to list rightsexclusions
 *
 * Query key: ["rights-exclusions", "RightsExclusion", ]
 */
export function useRightsExclusion(params?: Record<string, any>) {
  return useTenantQuery(
    ["rights-exclusions", "RightsExclusion", ],
    async (orgId: string, signal?: AbortSignal) => {
      return rights-exclusionsService.getRightsExclusion(params, signal);
    }
  );
}

/**
 * Hook to get rightsexclusion
 *
 * Query key: ["rights-exclusions", "RightsExclusion", exclusionId]
 */
export function useRightsExclusion(exclusionId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["rights-exclusions", "RightsExclusion", exclusionId],
    async (orgId: string, signal?: AbortSignal) => {
      return rights-exclusionsService.getRightsExclusion(exclusionId, params, signal);
    },
    {
      enabled: !!exclusionId
    }
  );
}
