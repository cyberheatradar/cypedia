---
canonical_id: ad.forest
title: Active Directory Forest
lang: en
slug: active-directory-forest
aliases:
  - Forest
  - AD Forest
categories:
  - Active Directory
status: published
summary: Active Directory Forest structure, shared directory components, trust relationships, and security-boundary implications.
---

## Overview

> **Primary sources:** [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model) / [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)

An Active Directory Forest is the top-level logical structure in [[ad.active-directory|Active Directory Domain Services]].

A Forest contains one or more [[ad.domain|Domains]].

Domains in the same Forest share infrastructure including the [[ad.schema|Active Directory Schema]], configuration information, and [[ad.global-catalog|Global Catalog]].

## Relationship to Domains

A Forest can contain multiple Domains.

Domains partition directory data and administrative scope, while the Forest provides the higher-level structure joining those Domains.

Domains inside the same Forest are automatically connected through two-way, transitive [[ad.trust|Trust]] relationships.

## Shared Information

Important Forest-wide information includes:

- Active Directory Schema;
- configuration information;
- [[ad.site|Site]] and replication topology;
- Global Catalog information.

The Schema and Configuration directory partitions contain Forest-wide information.

## Security Boundary

Microsoft treats the Forest as an Active Directory security boundary.

Domains inside the same Forest should therefore not be considered fully independent security boundaries.

Compromise of Forest-level administrative control or sufficiently privileged [[ad.domain-controller|Domain Controllers]] can have consequences beyond one Domain.

## Design Implications

Multiple Forests can be used when stronger administrative or security isolation is required.

A single Forest simplifies sharing of Schema information, Global Catalog information, and automatic Domain trusts.

Forest design is therefore both a directory-architecture and security-boundary decision.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.schema|Active Directory Schema]]
- [[ad.global-catalog|Global Catalog]]
- [[ad.trust|Active Directory Trust]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.domain-controller|Domain Controller]]

## References

- [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)
- [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)
