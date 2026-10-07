---
canonical_id: ad.directory-partition
title: Directory Partition
lang: ja
slug: directory-partition
aliases:
  - Naming Context
categories:
  - Active Directory
status: published
summary: Active Directory Directory PartitionとNaming Context、replication scopeを解説する。
---

## 概要

> **主な出典:** [Microsoft - Naming Contexts and Directory Partitions](https://learn.microsoft.com/en-us/windows/win32/ad/naming-contexts-and-partitions)

Directory Partitionは[[ad.active-directory|Active Directory]] directoryを分割する単位で、それぞれ独立したreplication scopeを持ちます。

Directory PartitionはNaming Context（NC）とも呼ばれます。

## 主なPartition

AD DSには代表的に次のpartitionがあります。

- Schema Partition
- Configuration Partition
- Domain Partition
- Application Directory Partition

## Schema Partition

Schema Partitionは[[ad.schema|Active Directory Schema]]を保持します。

Forest内のDomain ControllerはSchema Partitionのreplicaを保持します。

## Configuration Partition

Configuration Partitionは[[ad.site|Site]]やreplication topologyなど、Forest-wideなconfiguration informationを保持します。

## Domain Partition

Domain Partitionはuser、computer、groupなど、その[[ad.domain|Domain]]に属するdirectory objectを保持します。

writable [[ad.domain-controller|Domain Controller]]は自DomainのDomain Partitionについてfull writable replicaを保持します。

[[ad.read-only-domain-controller|Read-Only Domain Controller（RODC）]]はread-only replicaを保持し、originating updateを受け付けません。

## Application Directory Partition

Application Directory Partitionはapplication dataなどを格納するために使用できます。

replicaを保持するDomain Controllerを選択できるため、Domain Partitionとは異なるreplication scopeを構成できます。

## Replicationとの関係

[[ad.replication|Active Directory Replication]]はDirectory Partition単位でdirectory dataを同期します。

どのDomain Controllerがどのpartitionのreplicaを保持するかによってreplication scopeが決まります。

[[ad.global-catalog|Global Catalog]]は他DomainのDomain Partitionについてpartial informationも保持します。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.schema|Active Directory Schema]]
- [[ad.forest|Forest]]
- [[ad.domain|Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]
- [[ad.global-catalog|Global Catalog]]

## 参考文献

- [Microsoft - Naming Contexts and Directory Partitions](https://learn.microsoft.com/en-us/windows/win32/ad/naming-contexts-and-partitions)
- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [Microsoft - Planning Domain Controller Placement](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/planning-domain-controller-placement)
