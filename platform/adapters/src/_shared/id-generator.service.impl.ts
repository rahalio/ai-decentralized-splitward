/**
 * ID Generator Service Implementation — Splitward prefixes.
 */

import type { DomainCode } from '@splitward/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@splitward/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@splitward/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  sitId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.sites);
  }
  stuId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.studies);
  }
  rndId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.trainingRounds);
  }
  crdId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.contributionCredits);
  }
  incId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.incidents);
  }
  relId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.modelReleases);
  }
  ldsId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.localDatasets);
  }
  rexId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.rightsExclusions);
  }
  audId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auditPacks);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
