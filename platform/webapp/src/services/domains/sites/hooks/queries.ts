/**
 * Sites Query Hooks
 *
 * React Query hooks for fetching sites data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { sitesService } from "../sites.service";

/**
 * Hook to list sites
 *
 * Query key: ["sites", "Site", ]
 */
export function useSite(params?: Record<string, any>) {
  return useTenantQuery(
    ["sites", "Site", ],
    async (orgId: string, signal?: AbortSignal) => {
      return sitesService.getSite(params, signal);
    }
  );
}

/**
 * Hook to get site
 *
 * Query key: ["sites", "Site", siteId]
 */
export function useSite(siteId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["sites", "Site", siteId],
    async (orgId: string, signal?: AbortSignal) => {
      return sitesService.getSite(siteId, params, signal);
    },
    {
      enabled: !!siteId
    }
  );
}
