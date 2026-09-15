import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createModelRelease_Body = z
  .object({
    studyId: z.string(),
    version: z.string().min(1),
    metricsSummary: z.string().max(4000).optional(),
  })
  .passthrough();
const clinicalSignOffModelRelease_Body = z
  .object({
    decision: z.enum(['clinicallyApproved', 'rejected']),
    clinicianId: z.string().optional(),
    notes: z.string().max(2000).optional(),
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
const ReleaseId = z.string();
const ModelRelease = z
  .object({
    releaseId: z.string().regex(/^rel_[0-9A-HJKMNP-TV-Z]{26}$/),
    studyId: z.string(),
    version: z.string().min(1),
    status: z.enum([
      'candidate',
      'clinicallyApproved',
      'rejected',
      'production',
    ]),
    clinicianSignOffBy: z.string().optional(),
    metricsSummary: z.string().max(4000).optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ModelReleaseListData = z
  .object({
    items: z.array(
      z
        .object({
          releaseId: z.string().regex(/^rel_[0-9A-HJKMNP-TV-Z]{26}$/),
          studyId: z.string(),
          version: z.string().min(1),
          status: z.enum([
            'candidate',
            'clinicallyApproved',
            'rejected',
            'production',
          ]),
          clinicianSignOffBy: z.string().optional(),
          metricsSummary: z.string().max(4000).optional(),
          createdAt: z.string().datetime({ offset: true }).optional(),
          updatedAt: z.string().datetime({ offset: true }).optional(),
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
const ModelReleaseListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              releaseId: z.string().regex(/^rel_[0-9A-HJKMNP-TV-Z]{26}$/),
              studyId: z.string(),
              version: z.string().min(1),
              status: z.enum([
                'candidate',
                'clinicallyApproved',
                'rejected',
                'production',
              ]),
              clinicianSignOffBy: z.string().optional(),
              metricsSummary: z.string().max(4000).optional(),
              createdAt: z.string().datetime({ offset: true }).optional(),
              updatedAt: z.string().datetime({ offset: true }).optional(),
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
const ModelReleaseCreateRequest = z
  .object({
    studyId: z.string(),
    version: z.string().min(1),
    metricsSummary: z.string().max(4000).optional(),
  })
  .passthrough();
const ModelReleaseResponse = z
  .object({
    data: z
      .object({
        releaseId: z.string().regex(/^rel_[0-9A-HJKMNP-TV-Z]{26}$/),
        studyId: z.string(),
        version: z.string().min(1),
        status: z.enum([
          'candidate',
          'clinicallyApproved',
          'rejected',
          'production',
        ]),
        clinicianSignOffBy: z.string().optional(),
        metricsSummary: z.string().max(4000).optional(),
        createdAt: z.string().datetime({ offset: true }).optional(),
        updatedAt: z.string().datetime({ offset: true }).optional(),
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
const ModelReleaseClinicalSignOffRequest = z
  .object({
    decision: z.enum(['clinicallyApproved', 'rejected']),
    clinicianId: z.string().optional(),
    notes: z.string().max(2000).optional(),
  })
  .passthrough();

export const schemas: any = {
  createModelRelease_Body,
  clinicalSignOffModelRelease_Body,
  Problem,
  ReleaseId,
  ModelRelease,
  ModelReleaseListData,
  ResponseMeta,
  ModelReleaseListResponse,
  ModelReleaseCreateRequest,
  ModelReleaseResponse,
  ModelReleaseClinicalSignOffRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/model-releases',
    alias: 'listModelReleases',
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
                  releaseId: z.string().regex(/^rel_[0-9A-HJKMNP-TV-Z]{26}$/),
                  studyId: z.string(),
                  version: z.string().min(1),
                  status: z.enum([
                    'candidate',
                    'clinicallyApproved',
                    'rejected',
                    'production',
                  ]),
                  clinicianSignOffBy: z.string().optional(),
                  metricsSummary: z.string().max(4000).optional(),
                  createdAt: z.string().datetime({ offset: true }).optional(),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v0/tenants/me/model-releases',
    alias: 'createModelRelease',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createModelRelease_Body,
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
            releaseId: z.string().regex(/^rel_[0-9A-HJKMNP-TV-Z]{26}$/),
            studyId: z.string(),
            version: z.string().min(1),
            status: z.enum([
              'candidate',
              'clinicallyApproved',
              'rejected',
              'production',
            ]),
            clinicianSignOffBy: z.string().optional(),
            metricsSummary: z.string().max(4000).optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v0/tenants/me/model-releases/:releaseId',
    alias: 'getModelRelease',
    requestFormat: 'json',
    parameters: [
      {
        name: 'releaseId',
        type: 'Path',
        schema: z.string().regex(/^rel_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            releaseId: z.string().regex(/^rel_[0-9A-HJKMNP-TV-Z]{26}$/),
            studyId: z.string(),
            version: z.string().min(1),
            status: z.enum([
              'candidate',
              'clinicallyApproved',
              'rejected',
              'production',
            ]),
            clinicianSignOffBy: z.string().optional(),
            metricsSummary: z.string().max(4000).optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v0/tenants/me/model-releases/:releaseId/clinical-signoff',
    alias: 'clinicalSignOffModelRelease',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: clinicalSignOffModelRelease_Body.optional(),
      },
      {
        name: 'releaseId',
        type: 'Path',
        schema: z.string().regex(/^rel_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            releaseId: z.string().regex(/^rel_[0-9A-HJKMNP-TV-Z]{26}$/),
            studyId: z.string(),
            version: z.string().min(1),
            status: z.enum([
              'candidate',
              'clinicallyApproved',
              'rejected',
              'production',
            ]),
            clinicianSignOffBy: z.string().optional(),
            metricsSummary: z.string().max(4000).optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
