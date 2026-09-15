/**
 * Studies Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/studies.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Study = components["schemas"]["Study"];
export type StudyId = components["schemas"]["StudyId"];
export type StudyListData = components["schemas"]["StudyListData"];
export type StudyApprovePrivacyRequest = components["schemas"]["StudyApprovePrivacyRequest"];
export type StudyCreateRequest = components["schemas"]["StudyCreateRequest"];
export type StudySubmitPrivacyRequest = components["schemas"]["StudySubmitPrivacyRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateStudyRequestInput = NonNullable<operations["createStudy"]["requestBody"]>["content"]["application/json"];
export type SubmitStudyForPrivacyRequestInput = NonNullable<operations["submitStudyForPrivacy"]["requestBody"]>["content"]["application/json"];
export type ApproveStudyPrivacyRequestInput = NonNullable<operations["approveStudyPrivacy"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListStudiesParams = NonNullable<operations["listStudies"]["parameters"]["query"]>;
export type GetStudyParams = operations["getStudy"]["parameters"]["path"];
export type SubmitStudyForPrivacyParams = operations["submitStudyForPrivacy"]["parameters"]["path"];
export type ApproveStudyPrivacyParams = operations["approveStudyPrivacy"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListStudiesResponse = operations["listStudies"]["responses"]["200"]["content"]["application/json"];
export type CreateStudyResponse = operations["createStudy"]["responses"]["201"]["content"]["application/json"];
export type GetStudyResponse = operations["getStudy"]["responses"]["200"]["content"]["application/json"];
export type SubmitStudyForPrivacyResponse = operations["submitStudyForPrivacy"]["responses"]["200"]["content"]["application/json"];
export type ApproveStudyPrivacyResponse = operations["approveStudyPrivacy"]["responses"]["200"]["content"]["application/json"];


