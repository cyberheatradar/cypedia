---
canonical_id: ad.computer-account
title: Computer Account
lang: en
slug: computer-account
aliases: []
categories:
  - Active Directory
  - Identity
status: published
summary: Active Directory Computer Accounts, machine identity, domain join, security-principal behavior, SIDs, and service authentication.
---

## Overview

A [[ad.computer-account|Computer Account]] is an [[ad.active-directory|Active Directory]] object representing a computer joined to an [[ad.domain|Active Directory Domain]].

Like a User Account, it is a [[windows.security-principal|Security Principal]] and has its own [[windows.security-identifier|Security Identifier (SID)]].

## Machine Identity

A Computer Account represents a machine identity rather than a human user.

A domain-joined computer uses this identity as part of its trust relationship with the Domain and when authenticating to domain resources and services.

## Domain Join

Microsoft domain-join documentation describes both creating a new Computer Account during domain join and reusing a pre-provisioned Computer Account.

Creating or reusing the account requires appropriate Active Directory permissions.

## Credentials

A Computer Account has credentials associated with the machine identity.

These credentials are managed differently from an interactive user password, with Windows maintaining the machine-account secret used in the domain relationship.

## SPNs

A Computer Account can have host-based [[ad.service-principal-name|Service Principal Names (SPNs)]] associated with services running under the machine identity.

Computer Accounts are therefore also relevant to [[kerberos.service-ticket|Service Tickets]] and service authentication.

## Group Policy

[[windows.group-policy|Group Policy]] can be linked to Sites, Domains, and [[ad.organizational-unit|OUs]]. For a computer, applicable GPOs are determined using factors including the Site in which the computer resides, its Domain membership, and the parent OU hierarchy of the Computer Account.

## Security Groups

A Computer Account can belong to [[ad.security-group|Security Groups]], allowing authorization to be managed through group membership.

## Security Considerations

Inactive Computer Accounts, stale machine identities, excessive group membership, domain-join permissions, and rights to create or reuse Computer Accounts should be reviewed.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|Security Identifier]]
- [[ad.user-account|User Account]]
- [[ad.security-group|Security Group]]
- [[ad.service-account|Service Account]]
- [[ad.service-principal-name|Service Principal Name]]
- [[kerberos.service-ticket|Service Ticket]]
- [[ad.organizational-unit|Organizational Unit]]
- [[windows.group-policy|Group Policy]]
- [[ad.site|Active Directory Site]]

## References

- [Microsoft - Active Directory Accounts](https://learn.microsoft.com/windows/security/identity-protection/access-control/active-directory-accounts)
- [Microsoft - Active Directory Domain Join Permissions](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/active-directory-domain-join-permissions)
- [Microsoft - Security Principals](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-principals)
- [Microsoft - Group Policy scope](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-scope)
- [Microsoft - Domain member: Maximum machine account password age](https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/domain-member-maximum-machine-account-password-age)
