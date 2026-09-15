/**
 * Studies Mutation Hooks
 *
 * React Query hooks for mutating studies data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { studiesService } from "../studies.service";
// TODO: Import types
// import type { ... } from "../studies.api-types";

/**
 * Hook to create study
 *
 * Automatically invalidates studies queries on success.
 */
export function useCreateStudy() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return studiesService.createStudy(data);
    },
    {
      invalidateQueries: [["studies", "Study"]],
    }
  );
}

/**
 * Hook to submit study protocol for privacy approval
 *
 * Automatically invalidates studies queries on success.
 */
export function useCreateSubmitPrivacy() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return studiesService.createSubmitPrivacy(data);
    },
    {
      invalidateQueries: [["studies", "SubmitPrivacy"]],
    }
  );
}

/**
 * Hook to privacy officer approve or reject protocol
 *
 * Automatically invalidates studies queries on success.
 */
export function useCreateApprovePrivacy() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return studiesService.createApprovePrivacy(data);
    },
    {
      invalidateQueries: [["studies", "ApprovePrivacy"]],
    }
  );
}
