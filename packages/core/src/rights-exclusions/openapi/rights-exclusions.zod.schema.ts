import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createRightsExclusion_Body = z
  .object({
    siteId: z.string(),
    studyId: z.string().optional(),
    reason: z.string().max(2000),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const ExclusionId = z.string();
const RightsExclusion = z
  .object({
    exclusionId: z.string().regex(/^rex_[0-9A-HJKMNP-TV-Z]{26}$/),
    siteId: z.string(),
    studyId: z.string().optional(),
    status: z.enum(['requested', 'applied', 'attested']),
    reason: z.string().max(2000),
    attestedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const RightsExclusionListData = z
  .object({
    items: z.array(
      z
        .object({
          exclusionId: z.string().regex(/^rex_[0-9A-HJKMNP-TV-Z]{26}$/),
          siteId: z.string(),
          studyId: z.string().optional(),
          status: z.enum(['requested', 'applied', 'attested']),
          reason: z.string().max(2000),
          attestedAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const RightsExclusionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              exclusionId: z.string().regex(/^rex_[0-9A-HJKMNP-TV-Z]{26}$/),
              siteId: z.string(),
              studyId: z.string().optional(),
              status: z.enum(['requested', 'applied', 'attested']),
              reason: z.string().max(2000),
              attestedAt: z.string().datetime({ offset: true }).optional(),
              createdAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const RightsExclusionCreateRequest = z
  .object({
    siteId: z.string(),
    studyId: z.string().optional(),
    reason: z.string().max(2000),
  })
  .passthrough();
const RightsExclusionResponse = z
  .object({
    data: z
      .object({
        exclusionId: z.string().regex(/^rex_[0-9A-HJKMNP-TV-Z]{26}$/),
        siteId: z.string(),
        studyId: z.string().optional(),
        status: z.enum(['requested', 'applied', 'attested']),
        reason: z.string().max(2000),
        attestedAt: z.string().datetime({ offset: true }).optional(),
        createdAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const RightsExclusionAttestRequest = z
  .object({ attestationNote: z.string().max(2000) })
  .partial()
  .passthrough();

export const schemas: any = {
  createRightsExclusion_Body,
  Problem,
  ExclusionId,
  RightsExclusion,
  RightsExclusionListData,
  ResponseMeta,
  RightsExclusionListResponse,
  RightsExclusionCreateRequest,
  RightsExclusionResponse,
  RightsExclusionAttestRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/rights-exclusions',
    alias: 'listRightsExclusions',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  exclusionId: z.string().regex(/^rex_[0-9A-HJKMNP-TV-Z]{26}$/),
                  siteId: z.string(),
                  studyId: z.string().optional(),
                  status: z.enum(['requested', 'applied', 'attested']),
                  reason: z.string().max(2000),
                  attestedAt: z.string().datetime({ offset: true }).optional(),
                  createdAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v0/tenants/me/rights-exclusions',
    alias: 'createRightsExclusion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createRightsExclusion_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            exclusionId: z.string().regex(/^rex_[0-9A-HJKMNP-TV-Z]{26}$/),
            siteId: z.string(),
            studyId: z.string().optional(),
            status: z.enum(['requested', 'applied', 'attested']),
            reason: z.string().max(2000),
            attestedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v0/tenants/me/rights-exclusions/:exclusionId',
    alias: 'getRightsExclusion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'exclusionId',
        type: 'Path',
        schema: z.string().regex(/^rex_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            exclusionId: z.string().regex(/^rex_[0-9A-HJKMNP-TV-Z]{26}$/),
            siteId: z.string(),
            studyId: z.string().optional(),
            status: z.enum(['requested', 'applied', 'attested']),
            reason: z.string().max(2000),
            attestedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v0/tenants/me/rights-exclusions/:exclusionId/attest',
    alias: 'attestRightsExclusion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ attestationNote: z.string().max(2000) })
          .partial()
          .passthrough()
          .optional(),
      },
      {
        name: 'exclusionId',
        type: 'Path',
        schema: z.string().regex(/^rex_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            exclusionId: z.string().regex(/^rex_[0-9A-HJKMNP-TV-Z]{26}$/),
            siteId: z.string(),
            studyId: z.string().optional(),
            status: z.enum(['requested', 'applied', 'attested']),
            reason: z.string().max(2000),
            attestedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
