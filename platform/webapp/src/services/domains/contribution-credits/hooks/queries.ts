/**
 * ContributionCredits Query Hooks
 *
 * React Query hooks for fetching contribution-credits data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { contribution-creditsService } from "../contribution-credits.service";

/**
 * Hook to list contributioncredits
 *
 * Query key: ["contribution-credits", "ContributionCredit", ]
 */
export function useContributionCredit(params?: Record<string, any>) {
  return useTenantQuery(
    ["contribution-credits", "ContributionCredit", ],
    async (orgId: string, signal?: AbortSignal) => {
      return contribution-creditsService.getContributionCredit(params, signal);
    }
  );
}

/**
 * Hook to get contributioncredit
 *
 * Query key: ["contribution-credits", "ContributionCredit", creditId]
 */
export function useContributionCredit(creditId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["contribution-credits", "ContributionCredit", creditId],
    async (orgId: string, signal?: AbortSignal) => {
      return contribution-creditsService.getContributionCredit(creditId, params, signal);
    },
    {
      enabled: !!creditId
    }
  );
}
