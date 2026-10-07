---
canonical_id: ad.sysvol
title: SYSVOL
lang: en
slug: sysvol
aliases: []
categories:
  - Active Directory
status: published
summary: SYSVOL storage for Group Policy Templates and sign-in scripts, and its replication between Domain Controllers.
---

## Overview

> **Primary source:** [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)

SYSVOL is a shared folder on [[ad.domain-controller|Domain Controllers]] that stores file-based data used in an [[ad.domain|Active Directory Domain]].

Important examples include Group Policy object files and sign-in scripts.

## Group Policy

A [[windows.group-policy|Group Policy]] Object (GPO) has two major components:

- Group Policy Container;
- Group Policy Template.

The Group Policy Container is stored in the Active Directory Domain Partition.

The Group Policy Template is stored in SYSVOL.

A GPO therefore depends on both directory-side and file-based data.

## Replication

SYSVOL content is replicated between Domain Controllers.

Current Windows Server environments use Distributed File System Replication (DFSR) for SYSVOL replication.

[[ad.replication|Active Directory Replication]] and SYSVOL replication are separate mechanisms.

## Historical Replication

Windows 2000 Server and Windows Server 2003 used File Replication Service (FRS) for SYSVOL replication.

Current Windows Server environments use DFSR rather than FRS for supported modern Domain deployments.

## Security Importance

SYSVOL can contain policy data and scripts that are distributed across a Domain.

Unauthorized modification can therefore affect large numbers of computers or users after replication.

## Difference from NTDS.dit

[[ad.ntds-dit|NTDS.dit]] is the Active Directory database file.

SYSVOL stores file-based Domain data.

Group Policy uses information from both Active Directory and SYSVOL.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.domain|Domain]]
- [[windows.group-policy|Group Policy]]
- [[ad.replication|Active Directory Replication]]
- [[ad.ntds-dit|NTDS.dit]]

## References

- [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)
- [Microsoft - Migrate SYSVOL replication from FRS to DFS Replication](https://learn.microsoft.com/en-us/windows-server/storage/dfs-replication/migrate-sysvol-to-dfsr)
