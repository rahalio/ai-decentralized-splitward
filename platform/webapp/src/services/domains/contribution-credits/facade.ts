/**
 * ContributionCredits Domain Facade
 *
 * High-level API for contribution-credits domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { contribution-creditsService } from "./contribution-credits.service";
// TODO: Import types
// import type { ... } from "./contribution-credits.api-types";

/**
 * ContributionCredits Facade
 *
 * High-level API for contribution-credits operations.
 * Components should use this facade instead of services directly.
 */
export const contribution-creditsFacade = {
  /**
   * List ContributionCredits
   */
  async getContributionCredit(...args: Parameters<typeof contribution-creditsService.getContributionCredit>): Promise<any> {
    return contribution-creditsService.getContributionCredit(...args);
  }

  /**
   * Create ContributionCredit
   */
  async getContributionCredit(...args: Parameters<typeof contribution-creditsService.getContributionCredit>): Promise<any> {
    return contribution-creditsService.getContributionCredit(...args);
  }

  /**
   * Get ContributionCredit
   */
  async getContributionCredit(...args: Parameters<typeof contribution-creditsService.getContributionCredit>): Promise<any> {
    return contribution-creditsService.getContributionCredit(...args);
  }
};
