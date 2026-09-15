/**
 * LocalDatasets Mutation Hooks
 *
 * React Query hooks for mutating local-datasets data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { local-datasetsService } from "../local-datasets.service";
// TODO: Import types
// import type { ... } from "../local-datasets.api-types";

/**
 * Hook to create localdataset
 *
 * Automatically invalidates local-datasets queries on success.
 */
export function useCreateLocalDataset() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return local-datasetsService.createLocalDataset(data);
    },
    {
      invalidateQueries: [["local-datasets", "LocalDataset"]],
    }
  );
}
