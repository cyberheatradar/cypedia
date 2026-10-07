---
canonical_id: windows.security-principal
title: Security Principal
lang: en
slug: security-principal
aliases:
  - security principal
categories:
  - Windows
  - Active Directory
status: published
summary: Windows Security Principals, SIDs, accounts, groups, authentication, and access control.
---

## Overview

> **Primary source:** [Microsoft - Security Principals](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-principals)

A Windows Security Principal is an entity that can be authenticated by the operating system.

Examples include user accounts, computer accounts, and security groups.

Each Security Principal is represented by a unique [[windows.security-identifier|Security Identifier (SID)]].

## Active Directory

Security Principals created in an [[ad.active-directory|Active Directory]] [[ad.domain|Domain]] are Active Directory objects.

They can be used to control access to Domain resources.

## Users, Computers, and Groups

Examples of Security Principals include:

- user accounts;
- computer accounts;
- security groups;
- accounts associated with service identities.

A security group is itself a Security Principal and has its own SID.

## Authentication and Authorization

Authentication establishes the identity associated with a Security Principal.

Authorization then evaluates permissions, group memberships, and other security information to determine access to resources.

## SID

Windows uses a SID as the identifier for a Security Principal.

Access Control Lists use SIDs in permission entries rather than relying only on display names or account names.

## Access Control

Securable objects such as files, registry keys, and Active Directory objects can use ACLs to grant or deny permissions to Security Principals.

Groups make it possible to manage common permissions for many accounts.

## Difference from a Kerberos Principal

A Windows Security Principal is not identical to a [[kerberos.principal|Kerberos Principal]].

A Kerberos Principal is an identity concept defined by the [[auth.kerberos|Kerberos]] protocol.

A Windows Security Principal is an entity in the Windows security model that participates in authentication and authorization.

The concepts can interact in Active Directory authentication but should not be treated as interchangeable terms.

## Domain Controllers and RID Allocation

[[ad.domain-controller|Domain Controllers]] maintain Domain Security Principal account information in Active Directory.

When Domain Security Principals are created, SID generation uses RID pools associated with the RID Master [[ad.fsmo-roles|FSMO Role]].

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[windows.security-identifier|SID]]
- [[ad.fsmo-roles|FSMO Roles]]
- [[kerberos.principal|Kerberos Principal]]
- [[ad.user-account|User Account]]
- [[ad.computer-account|Computer Account]]
- [[ad.security-group|Security Group]]
- [[windows.access-control-list|Access Control List]]

## References

- [Microsoft - Security Principals](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-principals)
- [Microsoft - Access Control Overview](https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/access-control)
- [Microsoft Open Specifications - MS-DTYP SID](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-dtyp/78eb9013-1c3a-4970-ad1f-2b1dad588a25)
- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
