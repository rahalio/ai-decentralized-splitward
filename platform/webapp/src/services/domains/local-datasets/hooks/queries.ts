/**
 * LocalDatasets Query Hooks
 *
 * React Query hooks for fetching local-datasets data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { local-datasetsService } from "../local-datasets.service";

/**
 * Hook to list localdatasets
 *
 * Query key: ["local-datasets", "LocalDataset", ]
 */
export function useLocalDataset(params?: Record<string, any>) {
  return useTenantQuery(
    ["local-datasets", "LocalDataset", ],
    async (orgId: string, signal?: AbortSignal) => {
      return local-datasetsService.getLocalDataset(params, signal);
    }
  );
}

/**
 * Hook to get localdataset
 *
 * Query key: ["local-datasets", "LocalDataset", datasetId]
 */
export function useLocalDataset(datasetId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["local-datasets", "LocalDataset", datasetId],
    async (orgId: string, signal?: AbortSignal) => {
      return local-datasetsService.getLocalDataset(datasetId, params, signal);
    },
    {
      enabled: !!datasetId
    }
  );
}
