import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const openIncident_Body = z
  .object({
    studyId: z.string(),
    incidentType: z.enum([
      'suspectedLeakage',
      'protocolViolation',
      'egressBreach',
    ]),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    detail: z.string().max(4000),
  })
  .passthrough();
const haltStudyForIncident_Body = z
  .object({
    quarantineArtefacts: z.boolean().default(true),
    note: z.string().max(2000),
  })
  .partial()
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
const IncidentId = z.string();
const Incident = z
  .object({
    incidentId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
    studyId: z.string(),
    incidentType: z.enum([
      'suspectedLeakage',
      'protocolViolation',
      'egressBreach',
    ]),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    status: z.enum(['open', 'quarantined', 'closed']),
    detail: z.string().max(4000).optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const IncidentListData = z
  .object({
    items: z.array(
      z
        .object({
          incidentId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
          studyId: z.string(),
          incidentType: z.enum([
            'suspectedLeakage',
            'protocolViolation',
            'egressBreach',
          ]),
          severity: z.enum(['low', 'medium', 'high', 'critical']),
          status: z.enum(['open', 'quarantined', 'closed']),
          detail: z.string().max(4000).optional(),
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
const IncidentListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              incidentId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
              studyId: z.string(),
              incidentType: z.enum([
                'suspectedLeakage',
                'protocolViolation',
                'egressBreach',
              ]),
              severity: z.enum(['low', 'medium', 'high', 'critical']),
              status: z.enum(['open', 'quarantined', 'closed']),
              detail: z.string().max(4000).optional(),
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
const IncidentCreateRequest = z
  .object({
    studyId: z.string(),
    incidentType: z.enum([
      'suspectedLeakage',
      'protocolViolation',
      'egressBreach',
    ]),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    detail: z.string().max(4000),
  })
  .passthrough();
const IncidentResponse = z
  .object({
    data: z
      .object({
        incidentId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
        studyId: z.string(),
        incidentType: z.enum([
          'suspectedLeakage',
          'protocolViolation',
          'egressBreach',
        ]),
        severity: z.enum(['low', 'medium', 'high', 'critical']),
        status: z.enum(['open', 'quarantined', 'closed']),
        detail: z.string().max(4000).optional(),
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
const IncidentHaltStudyRequest = z
  .object({
    quarantineArtefacts: z.boolean().default(true),
    note: z.string().max(2000),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  openIncident_Body,
  haltStudyForIncident_Body,
  Problem,
  IncidentId,
  Incident,
  IncidentListData,
  ResponseMeta,
  IncidentListResponse,
  IncidentCreateRequest,
  IncidentResponse,
  IncidentHaltStudyRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/incidents',
    alias: 'listIncidents',
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
                  incidentId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  studyId: z.string(),
                  incidentType: z.enum([
                    'suspectedLeakage',
                    'protocolViolation',
                    'egressBreach',
                  ]),
                  severity: z.enum(['low', 'medium', 'high', 'critical']),
                  status: z.enum(['open', 'quarantined', 'closed']),
                  detail: z.string().max(4000).optional(),
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
    path: '/v0/tenants/me/incidents',
    alias: 'openIncident',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: openIncident_Body,
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
            incidentId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
            studyId: z.string(),
            incidentType: z.enum([
              'suspectedLeakage',
              'protocolViolation',
              'egressBreach',
            ]),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            status: z.enum(['open', 'quarantined', 'closed']),
            detail: z.string().max(4000).optional(),
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
    path: '/v0/tenants/me/incidents/:incidentId',
    alias: 'getIncident',
    requestFormat: 'json',
    parameters: [
      {
        name: 'incidentId',
        type: 'Path',
        schema: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            incidentId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
            studyId: z.string(),
            incidentType: z.enum([
              'suspectedLeakage',
              'protocolViolation',
              'egressBreach',
            ]),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            status: z.enum(['open', 'quarantined', 'closed']),
            detail: z.string().max(4000).optional(),
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
    path: '/v0/tenants/me/incidents/:incidentId/halt-study',
    alias: 'haltStudyForIncident',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: haltStudyForIncident_Body.optional(),
      },
      {
        name: 'incidentId',
        type: 'Path',
        schema: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            incidentId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
            studyId: z.string(),
            incidentType: z.enum([
              'suspectedLeakage',
              'protocolViolation',
              'egressBreach',
            ]),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            status: z.enum(['open', 'quarantined', 'closed']),
            detail: z.string().max(4000).optional(),
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
