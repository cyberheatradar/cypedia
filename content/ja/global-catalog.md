---
canonical_id: ad.global-catalog
title: Global Catalog
lang: ja
slug: global-catalog
aliases:
  - GC
categories:
  - Active Directory
status: published
summary: Active Directory Global Catalogのreplica構成、Forest-wide search、replicationとの関係を解説する。
---

## 概要

> **主な出典:** [Microsoft - Global Catalog](https://learn.microsoft.com/en-us/windows/win32/ad/global-catalog) / [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)

Global Catalog（GC）は[[ad.forest|Active Directory Forest]]全体のobjectを検索できるようにするdirectory機能です。

Global Catalog serverは[[ad.domain-controller|Domain Controller]]です。

## 保持するDirectory Data

writable Global Catalog serverは、自身の[[ad.domain|Domain]]についてfull writable replicaを保持し、Forest内の他Domainについてpartial read-only replicaを保持します。

他Domainのpartial replicaには各objectと、Partial Attribute Setに含まれるattributeのsubsetが保持されます。

[[ad.read-only-domain-controller|Read-Only Domain Controller（RODC）]]もGlobal Catalogとして構成できますが、そのDomain Controller自体はread-onlyのままであり、RODC固有のreplication restrictionに従います。

## Forest-wide Search

Global Catalogによって、applicationやuserはobjectがどのDomainに存在するかを事前に把握せずにForest全体を検索できます。

multi-domain Forestでは特に重要な機能です。

## Partial Attribute Set

他DomainからGlobal Catalogへreplicateされるattributeの集合はPartial Attribute Setとして管理されます。

Forest-wide searchで必要となる代表的なattributeがGlobal Catalogへ保持されます。

## Replicationとの関係

Global Catalogが保持するdirectory dataは[[ad.replication|Active Directory Replication]]によって維持されます。

Global Catalog serverは通常のDomain Controllerとしてのreplicationに加え、他Domainのpartial replicaも受け取ります。

## Security上の論点

Global Catalog serverはForest全体に関するdirectory metadataを保持します。

そのため他のDomain Controllerと同様に高いsecurity priorityが必要です。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.forest|Forest]]
- [[ad.domain|Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.replication|Active Directory Replication]]
- [[ad.schema|Active Directory Schema]]

## 参考文献

- [Microsoft - Global Catalog](https://learn.microsoft.com/en-us/windows/win32/ad/global-catalog)
- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [Microsoft - Planning Global Catalog Server Placement](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/planning-global-catalog-server-placement)
