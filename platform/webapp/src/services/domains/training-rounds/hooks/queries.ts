/**
 * TrainingRounds Query Hooks
 *
 * React Query hooks for fetching training-rounds data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { training-roundsService } from "../training-rounds.service";

/**
 * Hook to list trainingrounds
 *
 * Query key: ["training-rounds", "TrainingRound", ]
 */
export function useTrainingRound(params?: Record<string, any>) {
  return useTenantQuery(
    ["training-rounds", "TrainingRound", ],
    async (orgId: string, signal?: AbortSignal) => {
      return training-roundsService.getTrainingRound(params, signal);
    }
  );
}

/**
 * Hook to get traininground
 *
 * Query key: ["training-rounds", "TrainingRound", roundId]
 */
export function useTrainingRound(roundId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["training-rounds", "TrainingRound", roundId],
    async (orgId: string, signal?: AbortSignal) => {
      return training-roundsService.getTrainingRound(roundId, params, signal);
    },
    {
      enabled: !!roundId
    }
  );
}
