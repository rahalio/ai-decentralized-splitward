/**
 * Studies Domain Facade
 *
 * High-level API for studies domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { studiesService } from "./studies.service";
// TODO: Import types
// import type { ... } from "./studies.api-types";

/**
 * Studies Facade
 *
 * High-level API for studies operations.
 * Components should use this facade instead of services directly.
 */
export const studiesFacade = {
  /**
   * List Studys
   */
  async getStudy(...args: Parameters<typeof studiesService.getStudy>): Promise<any> {
    return studiesService.getStudy(...args);
  }

  /**
   * Create Study
   */
  async createStudy(...args: Parameters<typeof studiesService.createStudy>): Promise<any> {
    return studiesService.createStudy(...args);
  }

  /**
   * Get Study
   */
  async getStudy(...args: Parameters<typeof studiesService.getStudy>): Promise<any> {
    return studiesService.getStudy(...args);
  }

  /**
   * Submit study protocol for privacy approval
   */
  async createSubmitPrivacy(...args: Parameters<typeof studiesService.createSubmitPrivacy>): Promise<any> {
    return studiesService.createSubmitPrivacy(...args);
  }

  /**
   * Privacy officer approve or reject protocol
   */
  async createApprovePrivacy(...args: Parameters<typeof studiesService.createApprovePrivacy>): Promise<any> {
    return studiesService.createApprovePrivacy(...args);
  }
};
