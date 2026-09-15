/**
 * Integration event type definition (hand-maintained contract for generated registry).
 */

export type IntegrationEventDeliveryMode = "sync" | "async";

export interface IntegrationEventTypeDefinition {
  type: string;
  domain: string;
  aggregateType: string;
  description: string;
  defaultDeliveryMode: IntegrationEventDeliveryMode;
}
