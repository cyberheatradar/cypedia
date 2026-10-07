---
canonical_id: ad.fsmo-roles
title: FSMO Roles
lang: en
slug: fsmo-roles
aliases:
  - FSMO
  - Operations Master Roles
categories:
  - Active Directory
status: published
summary: The five Active Directory FSMO Roles and their Forest-wide or Domain-wide scopes.
---

## Overview

> **Primary source:** [Microsoft - Flexible Single Master Operations roles](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-fsmo-roles)

Flexible Single Master Operations (FSMO) Roles assign selected [[ad.active-directory|Active Directory Domain Services]] operations to designated [[ad.domain-controller|Domain Controllers]].

Most directory updates can use [[ad.replication|multi-master replication]], but some operations are single-mastered to prevent conflicting updates.

## Five Roles

Five FSMO Roles exist.

### Forest-Wide Roles

One of each exists in an [[ad.forest|Active Directory Forest]]:

- Schema Master;
- Domain Naming Master.

### Domain-Wide Roles

One of each exists in every [[ad.domain|Domain]]:

- RID Master;
- PDC Emulator;
- Infrastructure Master.

## Schema Master

The Schema Master controls updates to the [[ad.schema|Active Directory Schema]].

Only one Schema Master exists in a Forest.

## Domain Naming Master

The Domain Naming Master controls operations involving addition or removal of [[ad.directory-partition|Domain Directory Partitions]] and Application Directory Partitions from the Forest.

## RID Master

The RID Master allocates RID pools to Domain Controllers in a Domain.

A domain-created [[windows.security-principal|Security Principal]] receives a [[windows.security-identifier|SID]] containing the Domain SID and a Relative ID (RID).

## PDC Emulator

The PDC Emulator is a Domain-wide role with several important responsibilities, including functions related to password changes, time synchronization hierarchy, and compatibility behavior.

## Infrastructure Master

The Infrastructure Master participates in maintaining references involving objects in other Domains.

## Transfer and Seizure

FSMO Roles can be transferred between Domain Controllers.

When a previous role holder is permanently unavailable, role seizure can be required.

Planned transfer is preferable during normal administration.

## Security Considerations

Loss of an FSMO role holder does not immediately stop every Active Directory function.

However, operations depending on the unavailable role can be affected.

FSMO role holders, particularly highly operationally significant servers such as the PDC Emulator, should be treated as important Domain Controllers.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]
- [[ad.forest|Forest]]
- [[ad.domain|Domain]]
- [[ad.schema|Active Directory Schema]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|SID]]

## References

- [Microsoft - Flexible Single Master Operations roles](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-fsmo-roles)
- [Microsoft - Active Directory FSMO roles in Windows](https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/fsmo-roles)
