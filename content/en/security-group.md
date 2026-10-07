---
canonical_id: ad.security-group
title: Security Group
lang: en
slug: security-group
aliases: []
categories:
  - Active Directory
  - Identity
  - Authorization
status: published
summary: Active Directory Security Groups, security-principal aggregation, permission assignment, and group scope.
---

## Overview

A [[ad.security-group|Security Group]] is a [[windows.security-principal|Security Principal]] used to collect [[ad.user-account|User Accounts]], [[ad.computer-account|Computer Accounts]], and other groups into manageable units.

Microsoft describes Security Groups as a mechanism for assigning rights and permissions to collections of accounts and groups.

A Security Group also has its own [[windows.security-identifier|Security Identifier (SID)]].

## Security and Distribution Groups

Active Directory supports security-enabled groups as well as groups intended for distribution purposes.

Security Groups can participate in authorization and permission assignment, while distribution groups are not security enabled and cannot be used for security permission assignment.

## Group Scope

Active Directory defines three primary group scopes:

- Universal
- Global
- Domain Local

Scope affects which principals can become members and where the group can be used when assigning permissions.

## Global Groups

A Global group primarily contains accounts and Global groups from the same [[ad.domain|Active Directory Domain]].

It can be used when assigning permissions within the same forest and in trusted environments subject to the documented scope rules.

## Domain Local Groups

A Domain Local group is commonly used on the resource side of authorization design and can contain a broad set of members, including principals from trusted Domains.

Its permission-assignment scope is primarily the Domain in which the group exists.

## Universal Groups

A Universal group can contain supported members from multiple Domains in the same [[ad.forest|Active Directory Forest]].

It is useful when authorization design spans multiple Domains.

## Authorization

Security Group membership allows permission assignments to be aggregated across multiple Security Principals.

Group membership is therefore important when evaluating least privilege, privileged access, and resource authorization.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.forest|Active Directory Forest]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|Security Identifier]]
- [[ad.user-account|User Account]]
- [[ad.computer-account|Computer Account]]
- [[ad.organizational-unit|Organizational Unit]]

## References

- [Microsoft - Active Directory Security Groups](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-groups)
- [Microsoft - Active Directory Accounts](https://learn.microsoft.com/windows/security/identity-protection/access-control/active-directory-accounts)
- [Microsoft - Security Principals](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-principals)
