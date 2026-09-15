/**
 * Model Releases Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/model-releases.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ModelRelease = components["schemas"]["ModelRelease"];
export type ModelReleaseListData = components["schemas"]["ModelReleaseListData"];
export type ReleaseId = components["schemas"]["ReleaseId"];
export type ModelReleaseClinicalSignOffRequest = components["schemas"]["ModelReleaseClinicalSignOffRequest"];
export type ModelReleaseCreateRequest = components["schemas"]["ModelReleaseCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateModelReleaseRequestInput = NonNullable<operations["createModelRelease"]["requestBody"]>["content"]["application/json"];
export type ClinicalSignOffModelReleaseRequestInput = NonNullable<operations["clinicalSignOffModelRelease"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListModelReleasesParams = NonNullable<operations["listModelReleases"]["parameters"]["query"]>;
export type GetModelReleaseParams = operations["getModelRelease"]["parameters"]["path"];
export type ClinicalSignOffModelReleaseParams = operations["clinicalSignOffModelRelease"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListModelReleasesResponse = operations["listModelReleases"]["responses"]["200"]["content"]["application/json"];
export type CreateModelReleaseResponse = operations["createModelRelease"]["responses"]["201"]["content"]["application/json"];
export type GetModelReleaseResponse = operations["getModelRelease"]["responses"]["200"]["content"]["application/json"];
export type ClinicalSignOffModelReleaseResponse = operations["clinicalSignOffModelRelease"]["responses"]["200"]["content"]["application/json"];


