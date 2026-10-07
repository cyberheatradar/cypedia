---
canonical_id: attack.dcsync
title: DCSync
lang: en
slug: dcsync
aliases: []
categories:
  - Active Directory
  - Credential Access
status: published
summary: DCSync abuse of Active Directory replication APIs and DRSGetNCChanges to retrieve credential material, required privileges, detection, and NTDS dumping differences.
---

## Overview

> **Primary sources:** [MITRE ATT&CK T1003.006 - DCSync](https://attack.mitre.org/techniques/T1003/006/) / [MS-DRSR - IDL_DRSGetNCChanges](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-drsr/b63730ac-614c-431c-9501-28d6aca91894)

[[attack.dcsync|DCSync]] is a credential-access technique that abuses legitimate [[ad.active-directory|Active Directory]] [[ad.replication|replication]] protocols so that an attacker-controlled [[windows.security-principal|Security Principal]] behaves like a replication partner and requests sensitive directory information.

## Replication Mechanism

[[ad.domain-controller|Domain Controllers]] use the Microsoft Directory Replication Service Remote Protocol (MS-DRSR) for directory replication.

The `IDL_DRSGetNCChanges` method retrieves updates from a Naming Context replica on a server.

DCSync repurposes this legitimate mechanism for credential theft.

## Directory Partitions

Replication operates over directory state associated with a [[ad.directory-partition|Directory Partition]], also called a Naming Context.

A Domain partition contains Domain objects such as users and computers.

## Credential Material

MITRE ATT&CK documents that DCSync can expose password data and historical hashes.

Exposure of high-value credential material such as [[ad.krbtgt|KRBTGT]] keys can enable follow-on activity such as [[attack.golden-ticket|Golden Ticket]] forgery.

## Required Privileges

DCSync is not an unauthenticated operation available to arbitrary network users.

The requesting [[windows.security-principal|Security Principal]] requires directory-replication control access rights.

Microsoft defines `DS-Replication-Get-Changes` for replication-change access and `DS-Replication-Get-Changes-All` as the control access right that allows replication of secret domain data.

Delegation of these rights beyond actual Domain Controllers should therefore be tightly controlled.

## Difference from NTDS Credential Dumping

[[attack.ntds-credential-dumping|NTDS Credential Dumping]] accesses [[ad.ntds-dit|NTDS.dit]] or a copy of the directory database.

DCSync instead requests directory information remotely through the replication protocol and does not require direct copying of the database file.

## Detection

Important signals include replication activity originating from identities or systems that should not act as Domain Controllers.

Monitoring should consider:

- replication requests from non-DC hosts;
- unexpected principals performing replication;
- changes to sensitive replication rights;
- deviations from normal Domain Controller RPC activity.

## Mitigation

Important controls include:

- limiting replication rights to Domain Controllers and explicitly required principals;
- auditing privileged identities and delegated permissions;
- restricting network access to Domain Controllers;
- monitoring directory permission changes;
- detecting replication-protocol use from non-DC systems.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.ntds-dit|NTDS.dit]]
- [[ad.krbtgt|KRBTGT]]
- [[windows.security-principal|Security Principal]]
- [[attack.ntds-credential-dumping|NTDS Credential Dumping]]
- [[attack.golden-ticket|Golden Ticket]]

## References

- [MITRE ATT&CK T1003.006 - DCSync](https://attack.mitre.org/techniques/T1003/006/)
- [MS-DRSR - IDL_DRSGetNCChanges](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-drsr/b63730ac-614c-431c-9501-28d6aca91894)
- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [MS-ADTS - DS-Replication-Get-Changes](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/1878718d-ca72-472e-a612-ebbf22514236)
- [MS-ADTS - DS-Replication-Get-Changes-All](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/c61ae7fd-c50f-4813-a8d2-ef81d4b48499)
