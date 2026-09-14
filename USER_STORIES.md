# Splitward — User stories

**Product:** [PRODUCT.md](./PRODUCT.md)


### Clinical ML lead

- As a clinical ML lead, I want to launch a split-training study across five hospitals, so that rare-condition models see enough signal without a central lake.
- As a clinical ML lead, I want bandwidth and memory estimates per strategy, so that I pick Split vs Federated deliberately.

### Site IT admin

- As a site IT admin, I want to cap local GPU and egress, so that research jobs cannot starve clinical systems.
- As a site IT admin, I want straggler timeout policies, so that one offline site does not freeze the consortium.

### Privacy officer

- As a privacy officer, I want to approve protocols before any cut-layer leaves my network, so that ethics and law are satisfied.
- As a privacy officer, I want an audit proving no raw export, so that I can answer the regulator.

### Consortium governor

- As a consortium governor, I want contribution credits per site, so that freeloading is visible.
- As a consortium governor, I want to halt a round on leakage alerts, so that incidents have a kill switch.

### Clinician validator

- As a clinician validator, I want to sign off before a model is marked production-eligible, so that research weights do not silently become care-pathway software.
