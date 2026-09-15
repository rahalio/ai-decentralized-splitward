/**
 * Sites Domain Facade
 *
 * High-level API for sites domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { sitesService } from "./sites.service";
// TODO: Import types
// import type { ... } from "./sites.api-types";

/**
 * Sites Facade
 *
 * High-level API for sites operations.
 * Components should use this facade instead of services directly.
 */
export const sitesFacade = {
  /**
   * List Sites
   */
  async getSite(...args: Parameters<typeof sitesService.getSite>): Promise<any> {
    return sitesService.getSite(...args);
  }

  /**
   * Create Site
   */
  async createSite(...args: Parameters<typeof sitesService.createSite>): Promise<any> {
    return sitesService.createSite(...args);
  }

  /**
   * Get Site
   */
  async getSite(...args: Parameters<typeof sitesService.getSite>): Promise<any> {
    return sitesService.getSite(...args);
  }
};
