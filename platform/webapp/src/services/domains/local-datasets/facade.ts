/**
 * LocalDatasets Domain Facade
 *
 * High-level API for local-datasets domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { local-datasetsService } from "./local-datasets.service";
// TODO: Import types
// import type { ... } from "./local-datasets.api-types";

/**
 * LocalDatasets Facade
 *
 * High-level API for local-datasets operations.
 * Components should use this facade instead of services directly.
 */
export const local-datasetsFacade = {
  /**
   * List LocalDatasets
   */
  async getLocalDataset(...args: Parameters<typeof local-datasetsService.getLocalDataset>): Promise<any> {
    return local-datasetsService.getLocalDataset(...args);
  }

  /**
   * Create LocalDataset
   */
  async createLocalDataset(...args: Parameters<typeof local-datasetsService.createLocalDataset>): Promise<any> {
    return local-datasetsService.createLocalDataset(...args);
  }

  /**
   * Get LocalDataset
   */
  async getLocalDataset(...args: Parameters<typeof local-datasetsService.getLocalDataset>): Promise<any> {
    return local-datasetsService.getLocalDataset(...args);
  }
};
