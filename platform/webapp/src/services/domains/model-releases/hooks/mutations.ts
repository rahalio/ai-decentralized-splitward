/**
 * ModelReleases Mutation Hooks
 *
 * React Query hooks for mutating model-releases data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { model-releasesService } from "../model-releases.service";
// TODO: Import types
// import type { ... } from "../model-releases.api-types";

/**
 * Hook to create modelrelease
 *
 * Automatically invalidates model-releases queries on success.
 */
export function useCreateModelRelease() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return model-releasesService.createModelRelease(data);
    },
    {
      invalidateQueries: [["model-releases", "ModelRelease"]],
    }
  );
}

/**
 * Hook to clinician production eligibility sign-off
 *
 * Automatically invalidates model-releases queries on success.
 */
export function useGetClinicalSignoff() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return model-releasesService.getClinicalSignoff(data);
    },
    {
      invalidateQueries: [["model-releases", "ClinicalSignoff"]],
    }
  );
}
