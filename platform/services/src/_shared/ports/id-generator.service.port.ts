/**
 * IdGeneratorService Port — Splitward domain prefixes.
 */

import type { DomainCode } from '@splitward/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  sitId(): string;
  stuId(): string;
  rndId(): string;
  crdId(): string;
  incId(): string;
  relId(): string;
  ldsId(): string;
  rexId(): string;
  audId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
