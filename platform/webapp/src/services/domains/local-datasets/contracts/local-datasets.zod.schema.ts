/**
 * LocalDatasets Domain Contracts
 *
 * Re-exports Zod schemas from @splitward/core for runtime validation.
 * This avoids duplication and ensures alignment with the API contract.
 *
 * Architecture:
 * - Single source of truth: @splitward/core
 * - No code duplication or drift
 * - Runtime validation of API responses
 * - Used in services to validate responses
 *
 * @see @splitward/core/local-datasets for the source schemas
 */

import { local-datasetsSchemas as coreLocalDatasetsSchemas } from "@splitward/core/local-datasets";
import type { z } from "zod";

/**
 * Re-export schemas from core
 * These are the same schemas used by the api-server, ensuring perfect alignment
 */
export const {
  // TODO: Add specific schema exports based on OpenAPI spec
  // ResponseMeta,
  // PageInfo,
  // etc.
} = coreLocalDatasetsSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const local-datasetsSchemas = coreLocalDatasetsSchemas;
