import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerSite_Body = z
  .object({
    name: z.string().min(1).max(200),
    status: z.enum(['active', 'paused', 'offboarded']),
    maxGpu: z.number().int().gte(0),
    maxEgressMbps: z.number().int().gte(0),
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
const SiteId = z.string();
const Site = z
  .object({
    siteId: z.string().regex(/^sit_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    status: z.enum(['active', 'paused', 'offboarded']),
    maxGpu: z.number().int().gte(0),
    maxEgressMbps: z.number().int().gte(0),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const SiteListData = z
  .object({
    items: z.array(
      z
        .object({
          siteId: z.string().regex(/^sit_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          status: z.enum(['active', 'paused', 'offboarded']),
          maxGpu: z.number().int().gte(0),
          maxEgressMbps: z.number().int().gte(0),
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
const SiteListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              siteId: z.string().regex(/^sit_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              status: z.enum(['active', 'paused', 'offboarded']),
              maxGpu: z.number().int().gte(0),
              maxEgressMbps: z.number().int().gte(0),
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
const SiteCreateRequest = z
  .object({
    name: z.string().min(1).max(200),
    status: z.enum(['active', 'paused', 'offboarded']),
    maxGpu: z.number().int().gte(0),
    maxEgressMbps: z.number().int().gte(0),
  })
  .passthrough();
const SiteResponse = z
  .object({
    data: z
      .object({
        siteId: z.string().regex(/^sit_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        status: z.enum(['active', 'paused', 'offboarded']),
        maxGpu: z.number().int().gte(0),
        maxEgressMbps: z.number().int().gte(0),
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
  registerSite_Body,
  Problem,
  SiteId,
  Site,
  SiteListData,
  ResponseMeta,
  SiteListResponse,
  SiteCreateRequest,
  SiteResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/sites',
    alias: 'listSites',
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
                  siteId: z.string().regex(/^sit_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  status: z.enum(['active', 'paused', 'offboarded']),
                  maxGpu: z.number().int().gte(0),
                  maxEgressMbps: z.number().int().gte(0),
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
    path: '/v0/tenants/me/sites',
    alias: 'registerSite',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerSite_Body,
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
            siteId: z.string().regex(/^sit_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            status: z.enum(['active', 'paused', 'offboarded']),
            maxGpu: z.number().int().gte(0),
            maxEgressMbps: z.number().int().gte(0),
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
    path: '/v0/tenants/me/sites/:siteId',
    alias: 'getSite',
    requestFormat: 'json',
    parameters: [
      {
        name: 'siteId',
        type: 'Path',
        schema: z.string().regex(/^sit_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            siteId: z.string().regex(/^sit_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            status: z.enum(['active', 'paused', 'offboarded']),
            maxGpu: z.number().int().gte(0),
            maxEgressMbps: z.number().int().gte(0),
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
