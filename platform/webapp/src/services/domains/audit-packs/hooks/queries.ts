/**
 * AuditPacks Query Hooks
 *
 * React Query hooks for fetching audit-packs data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { audit-packsService } from "../audit-packs.service";

/**
 * Hook to list auditpacks
 *
 * Query key: ["audit-packs", "AuditPack", ]
 */
export function useAuditPack(params?: Record<string, any>) {
  return useTenantQuery(
    ["audit-packs", "AuditPack", ],
    async (orgId: string, signal?: AbortSignal) => {
      return audit-packsService.getAuditPack(params, signal);
    }
  );
}

/**
 * Hook to get auditpack
 *
 * Query key: ["audit-packs", "AuditPack", packId]
 */
export function useAuditPack(packId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["audit-packs", "AuditPack", packId],
    async (orgId: string, signal?: AbortSignal) => {
      return audit-packsService.getAuditPack(packId, params, signal);
    },
    {
      enabled: !!packId
    }
  );
}
