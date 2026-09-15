/**
 * Sites Mutation Hooks
 *
 * React Query hooks for mutating sites data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { sitesService } from "../sites.service";
// TODO: Import types
// import type { ... } from "../sites.api-types";

/**
 * Hook to create site
 *
 * Automatically invalidates sites queries on success.
 */
export function useCreateSite() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return sitesService.createSite(data);
    },
    {
      invalidateQueries: [["sites", "Site"]],
    }
  );
}
