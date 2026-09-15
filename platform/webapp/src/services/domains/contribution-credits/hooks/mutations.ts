/**
 * ContributionCredits Mutation Hooks
 *
 * React Query hooks for mutating contribution-credits data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { contribution-creditsService } from "../contribution-credits.service";
// TODO: Import types
// import type { ... } from "../contribution-credits.api-types";

/**
 * Hook to create contributioncredit
 *
 * Automatically invalidates contribution-credits queries on success.
 */
export function useGetContributionCredit() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return contribution-creditsService.getContributionCredit(data);
    },
    {
      invalidateQueries: [["contribution-credits", "ContributionCredit"]],
    }
  );
}
