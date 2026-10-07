---
canonical_id: ad.ntds-dit
title: NTDS.dit
lang: en
slug: ntds-dit
aliases: []
categories:
  - Active Directory
status: published
summary: NTDS.dit as the Active Directory database file, the data it represents, and its security significance.
---

## Overview

> **Primary source:** [Microsoft - AD DS Configuration Wizard Page Descriptions](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/ad-ds-installation-and-removal-wizard-page-descriptions)

NTDS.dit is the database file used by [[ad.active-directory|Active Directory Domain Services]] on a [[ad.domain-controller|Domain Controller]].

AD DS installation allows configuration of locations for the database file, transaction logs, and [[ad.sysvol|SYSVOL]].

## Stored Information

The Active Directory database contains object information for users, computers, groups, [[windows.security-principal|Security Principals]], and directory configuration.

NTDS.dit is the central file containing this directory data.

## Domain Controllers

A Domain Controller maintains replicas of its [[ad.directory-partition|Directory Partitions]] in the directory database.

Changes are synchronized with other Domain Controllers through [[ad.replication|Active Directory Replication]].

## Difference from SYSVOL

NTDS.dit and SYSVOL serve different purposes.

Directory objects and the directory-side portion of a GPO are stored in Active Directory.

File-based data such as the Group Policy Template for [[windows.group-policy|Group Policy]] is stored in SYSVOL.

## Security Importance

Microsoft documents that passwords at rest are stored in several attributes of the Active Directory database (the NTDS.DIT file).

Unauthorized access to NTDS.dit, backups, or equivalent copies can therefore result in significant credential exposure.

## NTDS Credential Dumping

> **Primary source:** [MITRE ATT&CK T1003.003 - NTDS](https://attack.mitre.org/techniques/T1003/003/)

[[attack.ntds-credential-dumping|NTDS Credential Dumping]] refers to attempts to obtain Active Directory database data and extract credential material.

Attackers may attempt to obtain copies through mechanisms such as backups or snapshots rather than accessing the live database file directly.

## Difference from DCSync

[[attack.dcsync|DCSync]] does not require directly copying NTDS.dit.

Instead, DCSync abuses directory replication behavior and replication privileges to request credential information.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.replication|Active Directory Replication]]
- [[ad.sysvol|SYSVOL]]
- [[windows.security-principal|Security Principal]]
- [[windows.group-policy|Group Policy]]
- [[attack.ntds-credential-dumping|NTDS Credential Dumping]]
- [[attack.dcsync|DCSync]]
- [[ad.domain|Domain]]

## References

- [Microsoft - AD DS Configuration Wizard Page Descriptions](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/ad-ds-installation-and-removal-wizard-page-descriptions)
- [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/active-directory-domain-services)
- [MITRE ATT&CK T1003.003 - NTDS](https://attack.mitre.org/techniques/T1003/003/)
- [Microsoft - Passwords technical overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/passwords-technical-overview)
- [MITRE ATT&CK T1003.006 - DCSync](https://attack.mitre.org/techniques/T1003/006/)
