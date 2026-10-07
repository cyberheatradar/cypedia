---
canonical_id: ad.read-only-domain-controller
title: Read-Only Domain Controller
lang: en
slug: read-only-domain-controller
aliases:
  - RODC
categories:
  - Active Directory
  - Domain Controller
status: published
summary: Read-Only Domain Controllers, read-only AD DS replicas, Password Replication Policy, credential caching, and RODC-specific KRBTGT accounts.
---

## Overview

A [[ad.read-only-domain-controller|Read-Only Domain Controller (RODC)]] is a [[ad.domain-controller|Domain Controller]] that hosts read-only [[ad.active-directory|Active Directory]] database partitions.

RODCs are primarily intended for locations such as branch offices where physical security, network connectivity, or local administrative conditions make deployment of a writable Domain Controller less desirable.

## Read-Only Replica

An RODC does not accept originating updates and does not perform outbound replication.

Directory changes originate on writable Domain Controllers and reach the RODC through inbound [[ad.replication|Active Directory Replication]].

## Password Replication Policy

The Password Replication Policy (PRP) controls which account credentials may be replicated and cached on an RODC.

Current Windows Server configuration interfaces expose RODC options for allowing or denying password replication.

Restricting cached credentials for [[ad.user-account|User Accounts]] and [[ad.computer-account|Computer Accounts]] is therefore an important part of the RODC security model.

## Delegated Administration

Local administration of an RODC can be delegated to a designated account without making that account a Domain-wide administrator.

This supports branch-office administration while limiting broader administrative privilege.

## KRBTGT

An RODC uses a different [[ad.krbtgt|KRBTGT]] account and password from the KDC on a writable Domain Controller when it signs or encrypts [[kerberos.ticket-granting-ticket|TGT]] requests.

Microsoft documents that the RODC recognizes TGTs signed with its RODC-specific KRBTGT account, while requests involving a TGT signed by another Domain Controller are forwarded to a writable Domain Controller.

## Replication and Sites

An RODC is placed in an [[ad.site|Active Directory Site]] and receives directory information from writable Domain Controllers.

RODC planning therefore involves physical security, WAN connectivity, replication behavior, and credential-caching requirements.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.site|Active Directory Site]]
- [[ad.krbtgt|KRBTGT]]
- [[ad.user-account|User Account]]
- [[ad.computer-account|Computer Account]]
- [[auth.kerberos|Kerberos]]
- [[ad.domain|Active Directory Domain]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket|Kerberos Ticket]]

## References

- [Microsoft - Planning Domain Controller Placement](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/planning-domain-controller-placement)
- [Microsoft - AD DS Configuration Wizard Page Descriptions](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/ad-ds-installation-and-removal-wizard-page-descriptions)
- [Microsoft - Default Active Directory accounts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-default-user-accounts)
- [Microsoft - Add-ADDSReadOnlyDomainControllerAccount](https://learn.microsoft.com/en-us/powershell/module/addsdeployment/add-addsreadonlydomaincontrolleraccount?view=windowsserver2025-ps)
- [Microsoft Open Specifications - MS-ADOD Glossary](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adod/afa7460b-713c-476d-9af1-5f9a5fe6ab27)
- [Microsoft - Active Directory Forest Recovery: reset the krbtgt password](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-reset-the-krbtgt-password)
