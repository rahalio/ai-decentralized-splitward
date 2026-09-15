/**
 * RightsExclusions Mutation Hooks
 *
 * React Query hooks for mutating rights-exclusions data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { rights-exclusionsService } from "../rights-exclusions.service";
// TODO: Import types
// import type { ... } from "../rights-exclusions.api-types";

/**
 * Hook to create rightsexclusion
 *
 * Automatically invalidates rights-exclusions queries on success.
 */
export function useCreateRightsExclusion() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return rights-exclusionsService.createRightsExclusion(data);
    },
    {
      invalidateQueries: [["rights-exclusions", "RightsExclusion"]],
    }
  );
}

/**
 * Hook to attest local suppression/deletion per site policy
 *
 * Automatically invalidates rights-exclusions queries on success.
 */
export function useGetAttest() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return rights-exclusionsService.getAttest(data);
    },
    {
      invalidateQueries: [["rights-exclusions", "Attest"]],
    }
  );
}
