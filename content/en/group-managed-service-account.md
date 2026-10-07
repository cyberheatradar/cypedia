---
canonical_id: ad.group-managed-service-account
title: Group Managed Service Account
lang: en
slug: group-managed-service-account
aliases:
  - gMSA
categories:
  - Active Directory
  - Service Identity
status: published
summary: Group Managed Service Accounts (gMSAs) for multi-server service identities with domain-managed credentials and simplified SPN management.
---

## Overview

A [[ad.group-managed-service-account|Group Managed Service Account (gMSA)]] extends the managed service identity capabilities of an [[ad.standalone-managed-service-account|sMSA]] across multiple servers.

The [[ad.domain-controller|Domain Controller]] in [[ad.active-directory|Active Directory]] manages the password, and authorized hosts retrieve the credential.

## Multi-Server Service Identity

A gMSA is designed for scenarios in which the same service identity must be used on multiple servers or across a server farm.

Microsoft documents gMSAs as accounts usable across multiple servers where service instances need a common identity for mutual authentication.

## Password Management

Administrators normally do not distribute or synchronize a conventional service password between hosts.

The Domain manages the credential and authorized hosts retrieve it, simplifying credential handling for multi-server service identities.

## SPN Management

gMSAs also simplify [[ad.service-principal-name|Service Principal Name (SPN)]] management.

SPNs are important when services use [[auth.kerberos|Kerberos]] authentication.

## Kerberoasting Relationship

Traditional service accounts with weak or long-lived manually managed passwords can be exposed to offline password guessing through [[attack.kerberoasting|Kerberoasting]].

gMSAs reduce dependence on manually maintained static service passwords by using automatically managed credentials.

## sMSA Comparison

An [[ad.standalone-managed-service-account|sMSA]] is limited to a single computer, while a gMSA can support multiple servers.

## dMSA Comparison

A [[ad.delegated-managed-service-account|dMSA]] is a separate managed account type introduced with Windows Server 2025 and links authentication to authorized machine identity.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.service-account|Service Account]]
- [[ad.standalone-managed-service-account|Standalone Managed Service Account]]
- [[ad.delegated-managed-service-account|Delegated Managed Service Account]]
- [[ad.computer-account|Computer Account]]
- [[ad.service-principal-name|Service Principal Name]]
- [[windows.security-principal|Security Principal]]
- [[auth.kerberos|Kerberos]]
- [[attack.kerberoasting|Kerberoasting]]

## References

- [Microsoft - Manage Group Managed Service Accounts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/manage-group-managed-service-accounts)
- [Microsoft - Group Managed Service Accounts Overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview)
- [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)
- [MITRE ATT&CK T1558.003 - Kerberoasting](https://attack.mitre.org/techniques/T1558/003/)
