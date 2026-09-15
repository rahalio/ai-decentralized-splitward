/**
 * Identity Domain Contracts
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
 * @see @splitward/core/identity for the source schemas
 */

import { identitySchemas as coreIdentitySchemas } from "@splitward/core/identity";
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
} = coreIdentitySchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const identitySchemas = coreIdentitySchemas;
