---
canonical_id: ad.delegated-managed-service-account
title: Delegated Managed Service Account
lang: en
slug: delegated-managed-service-account
aliases:
  - dMSA
categories:
  - Active Directory
  - Service Identity
status: published
summary: Delegated Managed Service Accounts (dMSAs), introduced with Windows Server 2025 as device-bound managed service identities.
---

## Overview

A [[ad.delegated-managed-service-account|Delegated Managed Service Account (dMSA)]] is a managed [[ad.service-account|Service Account]] type introduced with Windows Server 2025.

Microsoft describes dMSAs as supporting migration from traditional service accounts to machine-managed identities while linking authentication to authorized device identity.

## Device-Bound Authentication

dMSA authentication is associated with specific authorized machine identities.

Only machines mapped for the account in [[ad.active-directory|Active Directory]] can use that identity.

This is an important distinction from a [[ad.group-managed-service-account|gMSA]], which is designed to support a common service identity across authorized servers.

## Managed Keys

Windows manages the keys associated with the dMSA.

Microsoft documents fully randomized keys and, when migrating from a traditional service account, disabling the original account password.

## Migration

dMSAs support migration from an existing traditional Service Account to a managed machine-bound identity.

This shifts service authentication away from reliance on the original account password.

Microsoft also documents creation of a standalone dMSA without migrating an existing service account.

## Kerberoasting Relationship

Microsoft identifies resistance to credential harvesting from compromised traditional service accounts, including [[attack.kerberoasting|Kerberoasting]], as one of the security motivations for dMSA.

## gMSA Comparison

A [[ad.group-managed-service-account|gMSA]] is a domain-managed service identity that can be used across multiple authorized servers.

A dMSA focuses on device-bound authentication and is specific to the newer Windows Server 2025 managed-account model.

## sMSA Relationship

A [[ad.standalone-managed-service-account|sMSA]] also provides managed credentials but is the earlier Managed Service Account model intended for services on one computer.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.service-account|Service Account]]
- [[ad.group-managed-service-account|Group Managed Service Account]]
- [[ad.standalone-managed-service-account|Standalone Managed Service Account]]
- [[ad.computer-account|Computer Account]]
- [[windows.security-principal|Security Principal]]
- [[auth.kerberos|Kerberos]]
- [[attack.kerberoasting|Kerberoasting]]

## References

- [Microsoft - Delegated Managed Service Accounts Overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/delegated-managed-service-accounts/delegated-managed-service-accounts-overview)
- [Microsoft - Setting up Delegated Managed Service Accounts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/delegated-managed-service-accounts/delegated-managed-service-accounts-set-up-dmsa)
- [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)
