---
canonical_id: ad.connection-object
title: Connection Object
lang: ja
slug: connection-object
aliases: []
categories:
  - Active Directory
  - Replication
status: published
summary: source Domain Controllerからdestination Domain Controllerへのreplication connectionを表すActive Directory Connection Objectを解説する。
---

## 概要

[[ad.connection-object|Connection Object]]は、source [[ad.domain-controller|Domain Controller]]からdestination Domain Controllerへの[[ad.replication|replication]] connectionを表すActive Directory objectです。

## 配置

Connection Objectはdestination Domain Controllerを表すserver object配下のNTDS Settings objectの子として格納されます。

この構造により、そのDomain Controllerがどのsourceからinbound replicationを受けるかが表現されます。

## 保持する情報

Microsoft documentationでは、Connection Objectはreplication source serverを識別し、replication scheduleおよびreplication transportに関する情報を持つと説明されています。

## KCCとの関係

[[ad.knowledge-consistency-checker|Knowledge Consistency Checker（KCC）]]はConnection Objectを自動生成できます。

administratorがmanual Connection Objectを作成することもできます。

Microsoftは、manualまたはadministratorによって変更されたConnection Objectについて、KCCが通常のautomatic objectと同じように変更しないことを説明しています。

## Site Linkとの関係

inter-site replicationではKCCが[[ad.site-link|Site Link]] propertiesを利用してtopologyを計算し、その結果としてDomain Controller間のConnection Objectが構成されます。

Site LinkはSite間のlogical path、Connection Objectは具体的なDomain Controller間replication relationshipを表すという違いがあります。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.replication|Active Directory Replication]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.site|Active Directory Site]]
- [[ad.site-link|Site Link]]
- [[ad.knowledge-consistency-checker|Knowledge Consistency Checker]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.domain|Active Directory Domain]]

## 参考文献

- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
