/**
 * TrainingRounds Domain Facade
 *
 * High-level API for training-rounds domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { training-roundsService } from "./training-rounds.service";
// TODO: Import types
// import type { ... } from "./training-rounds.api-types";

/**
 * TrainingRounds Facade
 *
 * High-level API for training-rounds operations.
 * Components should use this facade instead of services directly.
 */
export const training-roundsFacade = {
  /**
   * List TrainingRounds
   */
  async getTrainingRound(...args: Parameters<typeof training-roundsService.getTrainingRound>): Promise<any> {
    return training-roundsService.getTrainingRound(...args);
  }

  /**
   * Create TrainingRound
   */
  async createTrainingRound(...args: Parameters<typeof training-roundsService.createTrainingRound>): Promise<any> {
    return training-roundsService.createTrainingRound(...args);
  }

  /**
   * Get TrainingRound
   */
  async getTrainingRound(...args: Parameters<typeof training-roundsService.getTrainingRound>): Promise<any> {
    return training-roundsService.getTrainingRound(...args);
  }
};
