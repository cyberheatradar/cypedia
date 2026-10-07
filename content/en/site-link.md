---
canonical_id: ad.site-link
title: Site Link
lang: en
slug: site-link
aliases: []
categories:
  - Active Directory
  - Replication
status: published
summary: Active Directory Site Links and the logical connectivity, cost, schedule, and interval used for inter-site replication.
---

## Overview

A [[ad.site-link|Site Link]] is an Active Directory object representing logical connectivity used for [[ad.replication|Active Directory Replication]] between [[ad.site|Active Directory Sites]].

Microsoft describes a Site Link as a logical path used by the [[ad.knowledge-consistency-checker|Knowledge Consistency Checker (KCC)]] when establishing replication connections.

## Structure

A Site Link can contain multiple Sites.

Sites belonging to the same Site Link are treated as able to communicate at a uniform cost over the specified inter-site transport.

## Cost

The Site Link cost is a metric used by the KCC when selecting replication paths between Sites.

Where multiple possible paths exist, cost influences topology selection.

## Schedule and Interval

Site Links can define the schedule during which inter-site replication is permitted and the replication interval used within that schedule.

The schedule controls allowed replication time windows, while the interval controls how frequently replication occurs during those windows.

## Connection Objects

A Site Link is not itself the individual replication connection between two Domain Controllers.

The KCC uses Site Link information when creating specific [[ad.connection-object|Connection Objects]] between Domain Controllers.

## Physical Network

A Site Link does not directly represent the physical route traversed by network packets.

It is a logical connectivity model used by Active Directory when calculating replication topology.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.replication|Active Directory Replication]]
- [[ad.site|Active Directory Site]]
- [[ad.knowledge-consistency-checker|Knowledge Consistency Checker]]
- [[ad.connection-object|Connection Object]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.domain|Active Directory Domain]]

## References

- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [Microsoft - Setting Site Link Properties](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/setting-site-link-properties)
- [Microsoft Open Specifications - MS-ADTS Site Link Object](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/f148e965-e4d7-413a-acfc-0e9a9e591708)
