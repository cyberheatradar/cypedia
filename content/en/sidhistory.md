---
canonical_id: ad.sid-history
title: SIDHistory
lang: en
slug: sidhistory
aliases:
  - SID History
categories:
  - Active Directory
  - Authorization
status: published
summary: Active Directory sIDHistory, previous SID retention, domain migration, authorization continuity, and security implications.
---

## Overview

[[ad.sid-history|SIDHistory]] is an [[ad.active-directory|Active Directory]] attribute used to retain previous [[windows.security-identifier|Security Identifiers (SIDs)]] associated with a [[windows.security-principal|Security Principal]] object.

Its LDAP display name is `sIDHistory`, and the attribute is multi-valued.

## Domain Migration

When an object moves from one [[ad.domain|Active Directory Domain]] to another Domain, a new SID becomes the current objectSID and the previous SID can be retained in sIDHistory.

This can preserve compatibility with resource permissions that still reference the previous SID after migration.

## Authorization

Windows access control stores SIDs in structures such as resource [[windows.access-control-list|Access Control Lists (ACLs)]].

When a migrated [[windows.security-principal|Security Principal]] retains an older SID in SIDHistory, authorization paths that still reference the old identity can continue to function where the SID is honored.

This is particularly relevant to migration of identities such as [[ad.user-account|User Accounts]].

## Active Directory Forests

SIDHistory is relevant to migration scenarios between Domains and [[ad.forest|Active Directory Forests]].

Microsoft's DsAddSidHistory API can add the SID of a [[windows.security-principal|Security Principal]] from one Domain to the sIDHistory of a [[windows.security-principal|Security Principal]] in another Forest.

## Security Implications

SIDHistory affects authorization and is therefore security-sensitive.

Microsoft describes DsAddSidHistory as a security-sensitive operation because adding a source SID can effectively give the destination identity access to resources available to the source identity.

MITRE ATT&CK tracks malicious insertion of SIDs into SIDHistory for privilege escalation or access-control bypass as SID-History Injection, T1134.005.

## Trusts and SID Filtering

Windows trust types expose different controls for accepting additional SIDs or SIDHistory.

Microsoft documents /Quarantine:Yes for an external trust as accepting only SIDs from the directly trusted Domain. For an outbound forest trust, /EnableSIDHistory controls whether migrated users in the trusted Forest can use SIDHistory to access resources.

SIDHistory-based migrations therefore need to account explicitly for the trust type and its SID filtering or SIDHistory configuration.

## Detection and Review

Unexpected sIDHistory modifications, addition of privileged SIDs, and changes outside approved migration windows are useful review targets.

MITRE ATT&CK documents detection strategies that correlate unauthorized SID-History modification with later privileged access.

## Domain Trust Discovery

Information obtained through [[attack.domain-trust-discovery|Domain Trust Discovery]] can be relevant when evaluating SIDHistory and cross-domain authorization paths.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.forest|Active Directory Forest]]
- [[windows.security-identifier|Security Identifier]]
- [[windows.security-principal|Security Principal]]
- [[windows.access-control-list|Access Control List]]
- [[ad.user-account|User Account]]
- [[ad.security-group|Security Group]]
- [[attack.domain-trust-discovery|Domain Trust Discovery]]
- [[ad.trust|Active Directory Trust]]
- [[protocol.ldap|LDAP]]

## References

- [Microsoft Open Specifications - Attribute sIDHistory](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-ada3/1c47c6a0-e614-49e5-bef3-f42f71f5eeb2)
- [Microsoft - SID-History attribute](https://learn.microsoft.com/en-us/windows/win32/adschema/a-sidhistory)
- [Microsoft - DsAddSidHistoryW](https://learn.microsoft.com/en-us/windows/win32/api/ntdsapi/nf-ntdsapi-dsaddsidhistoryw)
- [MITRE ATT&CK - T1134.005 SID-History Injection](https://attack.mitre.org/techniques/T1134/005/)
- [Microsoft - netdom trust](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netdom-trust)
