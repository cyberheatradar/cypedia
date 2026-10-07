---
canonical_id: ad.directory-partition
title: Directory Partition
lang: en
slug: directory-partition
aliases:
  - Naming Context
categories:
  - Active Directory
status: published
summary: Active Directory Directory Partitions, Naming Contexts, and replication scope.
---

## Overview

> **Primary source:** [Microsoft - Naming Contexts and Directory Partitions](https://learn.microsoft.com/en-us/windows/win32/ad/naming-contexts-and-partitions)

A Directory Partition divides the [[ad.active-directory|Active Directory]] directory into independently replicated portions.

Directory Partitions are also called Naming Contexts (NCs).

## Main Partitions

A typical AD DS environment includes:

- Schema Partition;
- Configuration Partition;
- Domain Partition;
- Application Directory Partition.

## Schema Partition

The Schema Partition contains the [[ad.schema|Active Directory Schema]].

Domain Controllers throughout the Forest maintain replicas of the Schema Partition.

## Configuration Partition

The Configuration Partition contains Forest-wide configuration information such as [[ad.site|Site]] and replication-topology information.

## Domain Partition

A Domain Partition contains directory objects associated with one [[ad.domain|Domain]], including users, computers, and groups.

A writable [[ad.domain-controller|Domain Controller]] stores a full writable replica of its own Domain Partition.

A [[ad.read-only-domain-controller|Read-Only Domain Controller (RODC)]] instead hosts a read-only replica and does not accept originating updates.

## Application Directory Partition

Application Directory Partitions can be used to store application data.

Their replicas can be placed on selected Domain Controllers, allowing a replication scope different from a normal Domain Partition.

## Replication

[[ad.replication|Active Directory Replication]] operates on Directory Partitions.

The set of Domain Controllers holding a replica determines the replication scope for that partition.

The [[ad.global-catalog|Global Catalog]] also stores partial information concerning Domain Partitions from other Domains in the Forest.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.schema|Active Directory Schema]]
- [[ad.forest|Forest]]
- [[ad.domain|Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]
- [[ad.global-catalog|Global Catalog]]

## References

- [Microsoft - Naming Contexts and Directory Partitions](https://learn.microsoft.com/en-us/windows/win32/ad/naming-contexts-and-partitions)
- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [Microsoft - Planning Domain Controller Placement](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/planning-domain-controller-placement)
