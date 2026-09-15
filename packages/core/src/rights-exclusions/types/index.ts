/**
 * Rights Exclusions Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/rights-exclusions.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ExclusionId = components["schemas"]["ExclusionId"];
export type RightsExclusion = components["schemas"]["RightsExclusion"];
export type RightsExclusionListData = components["schemas"]["RightsExclusionListData"];
export type RightsExclusionAttestRequest = components["schemas"]["RightsExclusionAttestRequest"];
export type RightsExclusionCreateRequest = components["schemas"]["RightsExclusionCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateRightsExclusionRequestInput = NonNullable<operations["createRightsExclusion"]["requestBody"]>["content"]["application/json"];
export type AttestRightsExclusionRequestInput = NonNullable<operations["attestRightsExclusion"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListRightsExclusionsParams = NonNullable<operations["listRightsExclusions"]["parameters"]["query"]>;
export type GetRightsExclusionParams = operations["getRightsExclusion"]["parameters"]["path"];
export type AttestRightsExclusionParams = operations["attestRightsExclusion"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListRightsExclusionsResponse = operations["listRightsExclusions"]["responses"]["200"]["content"]["application/json"];
export type CreateRightsExclusionResponse = operations["createRightsExclusion"]["responses"]["201"]["content"]["application/json"];
export type GetRightsExclusionResponse = operations["getRightsExclusion"]["responses"]["200"]["content"]["application/json"];
export type AttestRightsExclusionResponse = operations["attestRightsExclusion"]["responses"]["200"]["content"]["application/json"];


