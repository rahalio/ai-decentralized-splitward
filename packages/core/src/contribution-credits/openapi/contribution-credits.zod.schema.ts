import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const recordContributionCredit_Body = z
  .object({
    studyId: z.string(),
    siteId: z.string(),
    roundsCompleted: z.number().int().gte(0),
    dataVolumeClass: z.enum(['S', 'M', 'L', 'XL']),
    creditPoints: z.number().optional(),
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
const CreditId = z.string();
const ContributionCredit = z
  .object({
    creditId: z.string().regex(/^crd_[0-9A-HJKMNP-TV-Z]{26}$/),
    studyId: z.string(),
    siteId: z.string(),
    roundsCompleted: z.number().int().gte(0),
    dataVolumeClass: z.enum(['S', 'M', 'L', 'XL']),
    creditPoints: z.number().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ContributionCreditListData = z
  .object({
    items: z.array(
      z
        .object({
          creditId: z.string().regex(/^crd_[0-9A-HJKMNP-TV-Z]{26}$/),
          studyId: z.string(),
          siteId: z.string(),
          roundsCompleted: z.number().int().gte(0),
          dataVolumeClass: z.enum(['S', 'M', 'L', 'XL']),
          creditPoints: z.number().optional(),
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
const ContributionCreditListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              creditId: z.string().regex(/^crd_[0-9A-HJKMNP-TV-Z]{26}$/),
              studyId: z.string(),
              siteId: z.string(),
              roundsCompleted: z.number().int().gte(0),
              dataVolumeClass: z.enum(['S', 'M', 'L', 'XL']),
              creditPoints: z.number().optional(),
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
const ContributionCreditCreateRequest = z
  .object({
    studyId: z.string(),
    siteId: z.string(),
    roundsCompleted: z.number().int().gte(0),
    dataVolumeClass: z.enum(['S', 'M', 'L', 'XL']),
    creditPoints: z.number().optional(),
  })
  .passthrough();
const ContributionCreditResponse = z
  .object({
    data: z
      .object({
        creditId: z.string().regex(/^crd_[0-9A-HJKMNP-TV-Z]{26}$/),
        studyId: z.string(),
        siteId: z.string(),
        roundsCompleted: z.number().int().gte(0),
        dataVolumeClass: z.enum(['S', 'M', 'L', 'XL']),
        creditPoints: z.number().optional(),
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

export const schemas: any = {
  recordContributionCredit_Body,
  Problem,
  CreditId,
  ContributionCredit,
  ContributionCreditListData,
  ResponseMeta,
  ContributionCreditListResponse,
  ContributionCreditCreateRequest,
  ContributionCreditResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/contribution-credits',
    alias: 'listContributionCredits',
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
                  creditId: z.string().regex(/^crd_[0-9A-HJKMNP-TV-Z]{26}$/),
                  studyId: z.string(),
                  siteId: z.string(),
                  roundsCompleted: z.number().int().gte(0),
                  dataVolumeClass: z.enum(['S', 'M', 'L', 'XL']),
                  creditPoints: z.number().optional(),
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
    path: '/v0/tenants/me/contribution-credits',
    alias: 'recordContributionCredit',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: recordContributionCredit_Body,
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
            creditId: z.string().regex(/^crd_[0-9A-HJKMNP-TV-Z]{26}$/),
            studyId: z.string(),
            siteId: z.string(),
            roundsCompleted: z.number().int().gte(0),
            dataVolumeClass: z.enum(['S', 'M', 'L', 'XL']),
            creditPoints: z.number().optional(),
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
    path: '/v0/tenants/me/contribution-credits/:creditId',
    alias: 'getContributionCredit',
    requestFormat: 'json',
    parameters: [
      {
        name: 'creditId',
        type: 'Path',
        schema: z.string().regex(/^crd_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            creditId: z.string().regex(/^crd_[0-9A-HJKMNP-TV-Z]{26}$/),
            studyId: z.string(),
            siteId: z.string(),
            roundsCompleted: z.number().int().gte(0),
            dataVolumeClass: z.enum(['S', 'M', 'L', 'XL']),
            creditPoints: z.number().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
