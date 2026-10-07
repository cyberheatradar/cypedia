---
canonical_id: ad.user-account
title: User Account
lang: en
slug: user-account
aliases: []
categories:
  - Active Directory
  - Identity
status: published
summary: Active Directory User Accounts, identity, security-principal behavior, SIDs, group membership, authentication, and authorization.
---

## Overview

A [[ad.user-account|User Account]] is a directory object representing a user identity in [[ad.active-directory|Active Directory]].

It can act as a [[windows.security-principal|Security Principal]] for authentication and authorization and is identified by a [[windows.security-identifier|Security Identifier (SID)]].

Microsoft describes Active Directory accounts as representing identities such as users and computers and as providing access to network and [[ad.domain|Active Directory Domain]] resources.

## Authentication

A User Account is associated with authentication information that allows a user to sign in to the domain and access network services and resources.

In Active Directory environments, this identity can participate in authentication mechanisms such as [[auth.kerberos|Kerberos]] and [[auth.ntlm|NTLM]].

## Authorization

After authentication, access to resources is determined by rights and permissions assigned directly to the User Account or through its [[ad.security-group|Security Group]] memberships.

The SID identifies the account during Windows access-control decisions.

## Group Membership

A User Account can belong to multiple Security Groups.

Permissions are commonly managed through role-appropriate groups rather than assigning every permission separately to individual users.

## Organizational Units

User Account objects can be placed in directory containers such as [[ad.organizational-unit|Organizational Units (OUs)]].

OU placement can affect delegated administration and the scope of [[windows.group-policy|Group Policy]].

## Service Identity

A regular User Account can also be configured as an application or service identity, although [[ad.service-account|Service Accounts]] and managed service accounts may be preferable for service workloads.

## Security Considerations

Important controls include credential protection, least privilege, disabling unnecessary accounts, separating privileged identities, and regularly reviewing group membership.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|Security Identifier]]
- [[ad.security-group|Security Group]]
- [[ad.computer-account|Computer Account]]
- [[ad.service-account|Service Account]]
- [[ad.organizational-unit|Organizational Unit]]
- [[windows.group-policy|Group Policy]]
- [[auth.kerberos|Kerberos]]
- [[auth.ntlm|NTLM]]

## References

- [Microsoft - Active Directory Accounts](https://learn.microsoft.com/windows/security/identity-protection/access-control/active-directory-accounts)
- [Microsoft - Manage User Accounts in Windows Server](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage-user-accounts-in-windows-server)
- [Microsoft - Security Principals](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-principals)
