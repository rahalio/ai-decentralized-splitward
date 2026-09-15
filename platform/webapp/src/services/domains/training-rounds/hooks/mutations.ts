/**
 * TrainingRounds Mutation Hooks
 *
 * React Query hooks for mutating training-rounds data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { training-roundsService } from "../training-rounds.service";
// TODO: Import types
// import type { ... } from "../training-rounds.api-types";

/**
 * Hook to create traininground
 *
 * Automatically invalidates training-rounds queries on success.
 */
export function useCreateTrainingRound() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return training-roundsService.createTrainingRound(data);
    },
    {
      invalidateQueries: [["training-rounds", "TrainingRound"]],
    }
  );
}
