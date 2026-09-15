/**
 * RightsExclusions Domain Facade
 *
 * High-level API for rights-exclusions domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { rights-exclusionsService } from "./rights-exclusions.service";
// TODO: Import types
// import type { ... } from "./rights-exclusions.api-types";

/**
 * RightsExclusions Facade
 *
 * High-level API for rights-exclusions operations.
 * Components should use this facade instead of services directly.
 */
export const rights-exclusionsFacade = {
  /**
   * List RightsExclusions
   */
  async getRightsExclusion(...args: Parameters<typeof rights-exclusionsService.getRightsExclusion>): Promise<any> {
    return rights-exclusionsService.getRightsExclusion(...args);
  }

  /**
   * Create RightsExclusion
   */
  async createRightsExclusion(...args: Parameters<typeof rights-exclusionsService.createRightsExclusion>): Promise<any> {
    return rights-exclusionsService.createRightsExclusion(...args);
  }

  /**
   * Get RightsExclusion
   */
  async getRightsExclusion(...args: Parameters<typeof rights-exclusionsService.getRightsExclusion>): Promise<any> {
    return rights-exclusionsService.getRightsExclusion(...args);
  }

  /**
   * Attest local suppression/deletion per site policy
   */
  async getAttest(...args: Parameters<typeof rights-exclusionsService.getAttest>): Promise<any> {
    return rights-exclusionsService.getAttest(...args);
  }
};
