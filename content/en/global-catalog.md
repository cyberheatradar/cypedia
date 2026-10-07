---
canonical_id: ad.global-catalog
title: Global Catalog
lang: en
slug: global-catalog
aliases:
  - GC
categories:
  - Active Directory
status: published
summary: Active Directory Global Catalog replicas, Forest-wide search, and replication behavior.
---

## Overview

> **Primary sources:** [Microsoft - Global Catalog](https://learn.microsoft.com/en-us/windows/win32/ad/global-catalog) / [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)

The Global Catalog (GC) provides Forest-wide directory search capability in an [[ad.forest|Active Directory Forest]].

A Global Catalog server is a [[ad.domain-controller|Domain Controller]] that stores directory information about objects across the Forest.

## Directory Data

A writable Global Catalog server stores a full writable replica of its own [[ad.domain|Domain]] and partial read-only replicas of the other Domains in the Forest.

Those partial replicas contain every object but only the subset of attributes included for Global Catalog replication.

A [[ad.read-only-domain-controller|Read-Only Domain Controller (RODC)]] can also be configured as a Global Catalog server, while remaining subject to RODC read-only replication restrictions.

## Forest-Wide Search

The Global Catalog allows users and applications to search for objects without first knowing which Domain contains the complete object.

This capability is particularly important in multi-domain Forests.

## Partial Attribute Set

The attributes replicated from other Domains into the Global Catalog are controlled through the Partial Attribute Set.

Attributes useful for Forest-wide searches are included in this set.

## Replication

Global Catalog information is maintained through [[ad.replication|Active Directory Replication]].

A Global Catalog server participates in its normal Domain replication while also receiving partial replicas from other Domains in the Forest.

## Security Considerations

A Global Catalog server stores directory metadata concerning objects across the Forest.

It therefore requires the high level of protection expected for other Domain Controllers.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.forest|Forest]]
- [[ad.domain|Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.replication|Active Directory Replication]]
- [[ad.schema|Active Directory Schema]]

## References

- [Microsoft - Global Catalog](https://learn.microsoft.com/en-us/windows/win32/ad/global-catalog)
- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [Microsoft - Planning Global Catalog Server Placement](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/planning-global-catalog-server-placement)
