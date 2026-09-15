/**
 * Incidents Domain Facade
 *
 * High-level API for incidents domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { incidentsService } from "./incidents.service";
// TODO: Import types
// import type { ... } from "./incidents.api-types";

/**
 * Incidents Facade
 *
 * High-level API for incidents operations.
 * Components should use this facade instead of services directly.
 */
export const incidentsFacade = {
  /**
   * List Incidents
   */
  async getIncident(...args: Parameters<typeof incidentsService.getIncident>): Promise<any> {
    return incidentsService.getIncident(...args);
  }

  /**
   * Create Incident
   */
  async getIncident(...args: Parameters<typeof incidentsService.getIncident>): Promise<any> {
    return incidentsService.getIncident(...args);
  }

  /**
   * Get Incident
   */
  async getIncident(...args: Parameters<typeof incidentsService.getIncident>): Promise<any> {
    return incidentsService.getIncident(...args);
  }

  /**
   * Halt study and quarantine artefacts
   */
  async getHaltStudy(...args: Parameters<typeof incidentsService.getHaltStudy>): Promise<any> {
    return incidentsService.getHaltStudy(...args);
  }
};
