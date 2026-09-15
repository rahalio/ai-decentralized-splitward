import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerLocalDataset_Body = z
  .object({
    siteId: z.string(),
    handle: z.string().min(1).max(500),
    labelStatus: z.enum(['unlabelled', 'inProgress', 'complete']).optional(),
    recordCountClass: z.enum(['S', 'M', 'L', 'XL']).optional(),
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
const DatasetId = z.string();
const LocalDataset = z
  .object({
    datasetId: z.string().regex(/^lds_[0-9A-HJKMNP-TV-Z]{26}$/),
    siteId: z.string(),
    handle: z.string().min(1).max(500),
    labelStatus: z.enum(['unlabelled', 'inProgress', 'complete']),
    recordCountClass: z.enum(['S', 'M', 'L', 'XL']).optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const LocalDatasetListData = z
  .object({
    items: z.array(
      z
        .object({
          datasetId: z.string().regex(/^lds_[0-9A-HJKMNP-TV-Z]{26}$/),
          siteId: z.string(),
          handle: z.string().min(1).max(500),
          labelStatus: z.enum(['unlabelled', 'inProgress', 'complete']),
          recordCountClass: z.enum(['S', 'M', 'L', 'XL']).optional(),
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
const LocalDatasetListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              datasetId: z.string().regex(/^lds_[0-9A-HJKMNP-TV-Z]{26}$/),
              siteId: z.string(),
              handle: z.string().min(1).max(500),
              labelStatus: z.enum(['unlabelled', 'inProgress', 'complete']),
              recordCountClass: z.enum(['S', 'M', 'L', 'XL']).optional(),
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
const LocalDatasetCreateRequest = z
  .object({
    siteId: z.string(),
    handle: z.string().min(1).max(500),
    labelStatus: z.enum(['unlabelled', 'inProgress', 'complete']).optional(),
    recordCountClass: z.enum(['S', 'M', 'L', 'XL']).optional(),
  })
  .passthrough();
const LocalDatasetResponse = z
  .object({
    data: z
      .object({
        datasetId: z.string().regex(/^lds_[0-9A-HJKMNP-TV-Z]{26}$/),
        siteId: z.string(),
        handle: z.string().min(1).max(500),
        labelStatus: z.enum(['unlabelled', 'inProgress', 'complete']),
        recordCountClass: z.enum(['S', 'M', 'L', 'XL']).optional(),
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

export const schemas: any = {
  registerLocalDataset_Body,
  Problem,
  DatasetId,
  LocalDataset,
  LocalDatasetListData,
  ResponseMeta,
  LocalDatasetListResponse,
  LocalDatasetCreateRequest,
  LocalDatasetResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/local-datasets',
    alias: 'listLocalDatasets',
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
                  datasetId: z.string().regex(/^lds_[0-9A-HJKMNP-TV-Z]{26}$/),
                  siteId: z.string(),
                  handle: z.string().min(1).max(500),
                  labelStatus: z.enum(['unlabelled', 'inProgress', 'complete']),
                  recordCountClass: z.enum(['S', 'M', 'L', 'XL']).optional(),
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
    path: '/v0/tenants/me/local-datasets',
    alias: 'registerLocalDataset',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerLocalDataset_Body,
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
            datasetId: z.string().regex(/^lds_[0-9A-HJKMNP-TV-Z]{26}$/),
            siteId: z.string(),
            handle: z.string().min(1).max(500),
            labelStatus: z.enum(['unlabelled', 'inProgress', 'complete']),
            recordCountClass: z.enum(['S', 'M', 'L', 'XL']).optional(),
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
    path: '/v0/tenants/me/local-datasets/:datasetId',
    alias: 'getLocalDataset',
    requestFormat: 'json',
    parameters: [
      {
        name: 'datasetId',
        type: 'Path',
        schema: z.string().regex(/^lds_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            datasetId: z.string().regex(/^lds_[0-9A-HJKMNP-TV-Z]{26}$/),
            siteId: z.string(),
            handle: z.string().min(1).max(500),
            labelStatus: z.enum(['unlabelled', 'inProgress', 'complete']),
            recordCountClass: z.enum(['S', 'M', 'L', 'XL']).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
