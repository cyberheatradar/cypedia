---
canonical_id: windows.security-identifier
title: Security Identifier
lang: en
slug: security-identifier
aliases:
  - SID
categories:
  - Windows
  - Active Directory
status: published
summary: Windows Security Identifiers (SIDs), Domain SID structure, RIDs, and their relationship to Security Principals.
---

## Overview

> **Primary sources:** [Microsoft - Security Identifiers](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-identifiers) / [Microsoft - Access Control Overview](https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/access-control)

A Security Identifier (SID) is an identifier used by Windows to represent a [[windows.security-principal|Security Principal]].

Users, groups, computers, and other [[windows.security-principal|Security Principals]] are identified to the Windows security subsystem through SIDs.

## Difference from an Account Name

Windows access control relies on SIDs rather than only on display names or account names.

Permissions in security descriptors and ACLs are associated with SID values.

## Domain SID and RID

A [[windows.security-principal|Security Principal]] created in an [[ad.domain|Active Directory Domain]] receives a SID constructed using Domain-related SID information and a Relative ID (RID).

The RID distinguishes [[windows.security-principal|Security Principals]] within the Domain.

## RID Master

The RID Master, one of the [[ad.fsmo-roles|FSMO Roles]], allocates RID pools to [[ad.domain-controller|Domain Controllers]].

Domain Controllers use allocated RIDs when creating new Domain [[windows.security-principal|Security Principals]].

## Access Control

Windows ACLs use SIDs to associate permissions with [[windows.security-principal|Security Principals]].

During resource-access checks, SIDs in the authenticated security context are evaluated against access-control information.

## Well-Known SIDs

Windows defines well-known SIDs for selected built-in identities and groups.

These identifiers are defined by the Windows security model rather than being allocated in the same way as ordinary Domain account RIDs.

## Security Significance

SIDs are fundamental to Windows authorization.

Understanding them is important for interpreting ACLs, group memberships, privileges, and Active Directory access-control behavior.

## Related Pages

- [[windows.security-principal|Security Principal]]
- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.fsmo-roles|FSMO Roles]]
- [[windows.access-control-list|Access Control List]]
- [[windows.security-descriptor|Security Descriptor]]

## References

- [Microsoft - Security Identifiers](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-identifiers)
- [Microsoft - Access Control Overview](https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/access-control)
- [Microsoft - Flexible Single Master Operations roles](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-fsmo-roles)
- [Microsoft Open Specifications - MS-DTYP SID](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-dtyp/78eb9013-1c3a-4970-ad1f-2b1dad588a25)
