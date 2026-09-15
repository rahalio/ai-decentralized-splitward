/**
 * AuditPacks Mutation Hooks
 *
 * React Query hooks for mutating audit-packs data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { audit-packsService } from "../audit-packs.service";
// TODO: Import types
// import type { ... } from "../audit-packs.api-types";

/**
 * Hook to create auditpack
 *
 * Automatically invalidates audit-packs queries on success.
 */
export function useGetAuditPack() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return audit-packsService.getAuditPack(data);
    },
    {
      invalidateQueries: [["audit-packs", "AuditPack"]],
    }
  );
}
