---
canonical_id: ad.standalone-managed-service-account
title: Standalone Managed Service Account
lang: en
slug: standalone-managed-service-account
aliases:
  - sMSA
categories:
  - Active Directory
  - Service Identity
status: published
summary: Standalone Managed Service Accounts (sMSAs) for services on a single computer with managed credentials and simplified SPN management.
---

## Overview

A [[ad.standalone-managed-service-account|Standalone Managed Service Account (sMSA)]] is a type of [[ad.service-account|Service Account]] managed through [[ad.active-directory|Active Directory]].

Microsoft describes an sMSA as a managed domain account intended for services on a single computer.

## Password Management

Windows can automatically maintain the account password for an sMSA.

This reduces the need to manually rotate long-lived credentials when compared with a conventional [[ad.user-account|User Account]] used as a service identity.

## SPN Management

sMSAs also simplify management of [[ad.service-principal-name|Service Principal Names (SPNs)]].

SPNs are important for identifying service identities during [[auth.kerberos|Kerberos]] authentication.

## Single-Computer Scope

An sMSA is designed for service use associated with one [[ad.computer-account|Computer Account]].

For a common service identity used across multiple servers, Windows Server provides the [[ad.group-managed-service-account|Group Managed Service Account (gMSA)]].

## Security Position

sMSAs reduce manual service-credential administration and make it easier to isolate service identities.

Their single-computer scope is a major distinction from gMSAs.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.service-account|Service Account]]
- [[ad.group-managed-service-account|Group Managed Service Account]]
- [[ad.delegated-managed-service-account|Delegated Managed Service Account]]
- [[ad.computer-account|Computer Account]]
- [[ad.service-principal-name|Service Principal Name]]
- [[windows.security-principal|Security Principal]]
- [[auth.kerberos|Kerberos]]

## References

- [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)
- [Microsoft - Group Managed Service Accounts Overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview)
