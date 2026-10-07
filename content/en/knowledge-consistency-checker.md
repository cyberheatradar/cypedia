---
canonical_id: ad.knowledge-consistency-checker
title: Knowledge Consistency Checker
lang: en
slug: knowledge-consistency-checker
aliases:
  - KCC
categories:
  - Active Directory
  - Replication
status: published
summary: The Knowledge Consistency Checker (KCC), which automatically generates and maintains Active Directory replication topology.
---

## Overview

The [[ad.knowledge-consistency-checker|Knowledge Consistency Checker (KCC)]] is a built-in process that runs on [[ad.domain-controller|Domain Controllers]] and generates [[ad.replication|Active Directory Replication]] topology.

Current Microsoft Windows Server documentation describes the KCC as generating replication topology for the forest, with separate handling for intra-site and inter-site replication.

## Replication Topology

Because replication within an [[ad.site|Active Directory Site]] differs from replication between Sites, the KCC builds topology for those contexts separately.

It dynamically adjusts topology when Domain Controllers are added, removed, moved between Sites, become unavailable, or when relevant costs and schedules change.

## Connection Objects

The relationships calculated by the KCC are represented through [[ad.connection-object|Connection Objects]].

A Connection Object is stored under the NTDS Settings object of the destination Domain Controller and represents inbound replication from a source Domain Controller.

The KCC can create these objects automatically, while administrators can also create manual connections.

## Site Links

For inter-site replication, the KCC uses [[ad.site-link|Site Links]] and their connectivity, cost, and scheduling information when constructing replication paths.

A Site Link represents a logical replication relationship rather than the literal physical route taken by network packets.

## Operational Significance

Normal Active Directory operation relies heavily on automatically generated topology rather than requiring administrators to manually create every replication connection.

Troubleshooting replication therefore commonly requires examining Sites, Site Links, Connection Objects, and [[ad.directory-partition|Directory Partitions]] together.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]
- [[ad.site|Active Directory Site]]
- [[ad.site-link|Site Link]]
- [[ad.connection-object|Connection Object]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.domain|Active Directory Domain]]
- [[ad.forest|Active Directory Forest]]

## References

- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [Microsoft - Setting Site Link Properties](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/setting-site-link-properties)
