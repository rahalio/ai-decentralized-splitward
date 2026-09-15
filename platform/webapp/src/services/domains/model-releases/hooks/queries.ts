/**
 * ModelReleases Query Hooks
 *
 * React Query hooks for fetching model-releases data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { model-releasesService } from "../model-releases.service";

/**
 * Hook to list modelreleases
 *
 * Query key: ["model-releases", "ModelRelease", ]
 */
export function useModelRelease(params?: Record<string, any>) {
  return useTenantQuery(
    ["model-releases", "ModelRelease", ],
    async (orgId: string, signal?: AbortSignal) => {
      return model-releasesService.getModelRelease(params, signal);
    }
  );
}

/**
 * Hook to get modelrelease
 *
 * Query key: ["model-releases", "ModelRelease", releaseId]
 */
export function useModelRelease(releaseId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["model-releases", "ModelRelease", releaseId],
    async (orgId: string, signal?: AbortSignal) => {
      return model-releasesService.getModelRelease(releaseId, params, signal);
    },
    {
      enabled: !!releaseId
    }
  );
}
