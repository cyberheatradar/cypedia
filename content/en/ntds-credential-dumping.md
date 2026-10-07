---
canonical_id: attack.ntds-credential-dumping
title: NTDS Credential Dumping
lang: en
slug: ntds-credential-dumping
aliases: []
categories:
  - Active Directory
  - Credential Access
status: published
summary: NTDS Credential Dumping from NTDS.dit or backups, Domain credential impact, detection, defense, and the difference from DCSync.
---

## Overview

> **Primary source:** [MITRE ATT&CK T1003.003 - NTDS](https://attack.mitre.org/techniques/T1003/003/)

[[attack.ntds-credential-dumping|NTDS Credential Dumping]] is a credential-access technique that obtains sensitive [[ad.active-directory|Active Directory]] credential information from [[ad.ntds-dit|NTDS.dit]] or copies and backups of the directory database on a [[ad.domain-controller|Domain Controller]].

## NTDS.dit

NTDS.dit is the AD DS directory database.

It stores directory objects such as users, computers, and groups together with sensitive authentication-related data.

MITRE ATT&CK identifies the default path as `%SystemRoot%\NTDS\Ntds.dit`.

## Credential Impact

Compromise of the directory database together with required supporting material can expose password hashes and other credential data for Domain accounts.

Because the database includes high-value accounts such as [[ad.krbtgt|KRBTGT]], compromise can result in Domain-wide security impact.

## Active Database and Backups

The active database on a Domain Controller is not the only possible source.

MITRE ATT&CK notes that adversaries may search not only active Domain Controllers but also backups containing the same or similar directory information.

Backups containing the directory database can therefore become credential-exposure sources and should be protected as assets containing sensitive credential material.

## Difference from DCSync

[[attack.dcsync|DCSync]] uses [[ad.replication|Active Directory Replication]] protocols to request credential material remotely.

NTDS Credential Dumping instead involves access to the directory database file or a copy of it.

## Golden Ticket Relationship

If NTDS compromise exposes KRBTGT key material, follow-on risk can include [[attack.golden-ticket|Golden Ticket]] forgery.

## Detection

Important observations include:

- access to NTDS.dit on Domain Controllers;
- directory-database copy or backup operations;
- unusual Volume Shadow Copy activity;
- suspicious access to backup infrastructure;
- privileged processes interacting with directory database material.

Authorized backup and maintenance operations should be baselined to reduce false positives.

## Mitigation

Important controls include:

- minimizing interactive and administrative access to Domain Controllers;
- treating backups as assets with Domain Controller-level sensitivity;
- protecting privileged credentials;
- monitoring database and backup access;
- assessing the possibility of broad Domain credential exposure after a Domain Controller is fully compromised.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.ntds-dit|NTDS.dit]]
- [[ad.replication|Active Directory Replication]]
- [[ad.krbtgt|KRBTGT]]
- [[attack.dcsync|DCSync]]
- [[attack.golden-ticket|Golden Ticket]]
- [[auth.kerberos|Kerberos]]
- [[kerberos.ticket|Kerberos Ticket]]

## References

- [MITRE ATT&CK T1003.003 - NTDS](https://attack.mitre.org/techniques/T1003/003/)
- [Microsoft - Active Directory Domain Services Overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
- [MITRE ATT&CK DET0586 - Detection of NTDS.dit Credential Dumping](https://attack.mitre.org/detectionstrategies/DET0586/)
