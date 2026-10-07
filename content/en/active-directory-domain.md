---
canonical_id: ad.domain
title: Active Directory Domain
lang: en
slug: active-directory-domain
aliases:
  - Domain
  - AD Domain
categories:
  - Active Directory
status: published
summary: Active Directory Domain directory partitioning, authentication, policy, replication, and trust relationships.
---

## Overview

> **Primary sources:** [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model) / [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)

An Active Directory Domain is a major logical unit inside an [[ad.forest|Active Directory Forest]].

A Domain represents a partition of the directory tree and contains objects such as users, computers, and groups.

## Domain Directory Partition

Each Domain has a Domain Directory Partition.

Writable [[ad.domain-controller|Domain Controllers]] in the Domain maintain full writable replicas of that Domain Partition.

A [[ad.read-only-domain-controller|Read-Only Domain Controller (RODC)]] instead hosts a read-only replica and does not accept originating updates. Credential replication is subject to additional RODC-specific controls.

Partitioning allows directory data to be distributed according to Domain scope rather than requiring every Domain Controller in the Forest to hold every full Domain Partition.

## Authentication

A Domain is an important authentication scope.

Domain Controllers authenticate Domain accounts and provide the [[kerberos.kdc|KDC]] role when [[auth.kerberos|Kerberos]] is used.

[[auth.ntlm|NTLM]] can remain available for compatibility scenarios.

## Policy Administration

A Domain is a scope for administrative policies including some account and password policies.

[[windows.group-policy|Group Policy]] can be linked at Domain and [[ad.organizational-unit|Organizational Unit]] levels.

## Replication

Writable Domain Controllers for the same Domain replicate directory changes through [[ad.replication|Active Directory Replication]].

## Trust

Domains in the same Forest are automatically connected through two-way, transitive [[ad.trust|Trust]] relationships.

A Domain is therefore an important administrative scope, but Domains inside one Forest are not fully independent security boundaries.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.forest|Forest]]
- [[ad.organizational-unit|Organizational Unit]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.replication|Active Directory Replication]]
- [[ad.trust|Active Directory Trust]]
- [[auth.kerberos|Kerberos]]
- [[auth.ntlm|NTLM]]
- [[windows.group-policy|Group Policy]]

## References

- [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)
- [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)
- [Microsoft - Planning Domain Controller Placement](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/planning-domain-controller-placement)
