---
canonical_id: ad.service-account
title: Service Account
lang: en
slug: service-account
aliases:
  - service account
categories:
  - Active Directory
status: published
summary: Windows Service Account security contexts, traditional accounts, sMSA/gMSA/dMSA, SPNs, Kerberos, and credential management.
---

## Overview

> **Primary source:** [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)

A [[ad.service-account|Service Account]] provides a security context for a Windows service or application.

When a service accesses local or network resources, its identity and permissions are determined by the security context under which it runs.

## Traditional Service Accounts

A normal [[ad.active-directory|Active Directory]] user account can be configured as the identity for a service.

With this traditional model, administrators are responsible for password creation, storage, and rotation.

Long-lived passwords and excessive privileges can create security risk.

## Managed Service Accounts

Windows Server provides several account types intended to improve service-identity management.

### sMSA

A standalone Managed Service Account (sMSA) is a managed domain account intended for services on one computer.

Windows automates password management and simplifies [[ad.service-principal-name|Service Principal Name (SPN)]] administration.

### gMSA

A group Managed Service Account (gMSA) extends managed-account functionality across multiple servers.

It is useful for server farms and load-balanced services that need one service identity.

Windows and [[ad.domain-controller|Domain Controllers]] manage the credential, while authorized hosts obtain the required account secret.

### dMSA

A Delegated Managed Service Account (dMSA) is a newer managed account type designed to bind service authentication more strongly to authorized machine identities.

Current Windows Server supports migration scenarios from traditional service accounts to dMSAs.

### Virtual Accounts

A Virtual Account is a locally managed service identity.

For network authentication it can use the computer account's credentials.

## Kerberos

When a network service running under a Service Account uses [[auth.kerberos|Kerberos]], the service identity requires an appropriate SPN.

The [[kerberos.ticket-granting-server|Ticket-Granting Server]] issues a [[kerberos.service-ticket|Service Ticket]] for the account associated with the requested SPN.

## Service Ticket Protection

The encrypted portion of a Service Ticket is protected using key material available to the target service.

For a traditional Service Account, account password-derived keys can therefore be directly relevant to ticket security.

## Kerberoasting

[[attack.kerberoasting|Kerberoasting]] can request Service Tickets for service identities with registered SPNs and use ticket material for offline password guessing.

Traditional Service Accounts should therefore use strong, appropriately rotated passwords.

Where practical, managed identities such as gMSAs reduce dependence on manually maintained service passwords.

## Least Privilege

A Service Account should not receive unnecessary Domain or local privileges.

Permissions should be limited to resources and operations actually required by the service.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.service-principal-name|Service Principal Name]]
- [[auth.kerberos|Kerberos]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[ad.domain-controller|Domain Controller]]
- [[windows.security-principal|Security Principal]]
- [[attack.kerberoasting|Kerberoasting]]
- [[ad.domain|Active Directory Domain]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[ad.user-account|User Account]]
- [[ad.computer-account|Computer Account]]
- [[ad.standalone-managed-service-account|Standalone Managed Service Account]]
- [[ad.group-managed-service-account|Group Managed Service Account]]
- [[ad.delegated-managed-service-account|Delegated Managed Service Account]]

## References

- [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)
- [Microsoft - Group Managed Service Accounts overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview)
- [Microsoft - Manage Group Managed Service Accounts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/manage-group-managed-service-accounts)
- [MITRE ATT&CK T1558.003 - Kerberoasting](https://attack.mitre.org/techniques/T1558/003/)
