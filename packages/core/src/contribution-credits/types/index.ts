/**
 * Contribution Credits Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/contribution-credits.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ContributionCredit = components["schemas"]["ContributionCredit"];
export type ContributionCreditListData = components["schemas"]["ContributionCreditListData"];
export type CreditId = components["schemas"]["CreditId"];
export type ContributionCreditCreateRequest = components["schemas"]["ContributionCreditCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RecordContributionCreditRequestInput = NonNullable<operations["recordContributionCredit"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListContributionCreditsParams = NonNullable<operations["listContributionCredits"]["parameters"]["query"]>;
export type GetContributionCreditParams = operations["getContributionCredit"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListContributionCreditsResponse = operations["listContributionCredits"]["responses"]["200"]["content"]["application/json"];
export type RecordContributionCreditResponse = operations["recordContributionCredit"]["responses"]["201"]["content"]["application/json"];
export type GetContributionCreditResponse = operations["getContributionCredit"]["responses"]["200"]["content"]["application/json"];


