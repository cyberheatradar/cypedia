---
canonical_id: ad.site-link
title: Site Link
lang: ja
slug: site-link
aliases: []
categories:
  - Active Directory
  - Replication
status: published
summary: Active Directory Site間replicationのlogical path、cost、schedule、intervalを定義するSite Linkを解説する。
---

## 概要

[[ad.site-link|Site Link]]は、[[ad.site|Active Directory Site]]間の[[ad.replication|Active Directory Replication]]で使用されるlogical connectivityを表すActive Directory objectです。

Microsoftは、Site Linkを[[ad.knowledge-consistency-checker|Knowledge Consistency Checker（KCC）]]がreplication connectionを確立するために利用するlogical pathと説明しています。

## 構成

Site Linkには複数のSiteを関連付けることができます。

同一Site Linkに含まれるSiteは、指定されたinter-site transportを介して一定のcostで通信できるものとして扱われます。

## Cost

Site Linkのcostは、KCCがSite間replication pathを選択する際のmetricとして利用されます。

複数pathが存在する場合、costはreplication topologyの選択に影響します。

## ScheduleとInterval

Site Linkではinter-site replicationを許可するscheduleとreplication intervalを設定できます。

scheduleはreplication可能な時間帯を、intervalは許可時間内でreplicationを試行する頻度を定義します。

## Connection Objectとの関係

Site Link自体がDomain Controller間の個別connectionではありません。

KCCはSite Link informationを利用してspecific Domain Controller間の[[ad.connection-object|Connection Object]]を生成します。

## Physical Networkとの違い

Site Linkはnetwork packetが実際に通過するphysical routeを直接表すものではありません。

Active Directoryがreplication topologyを計算するためのlogical connectivity modelです。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.replication|Active Directory Replication]]
- [[ad.site|Active Directory Site]]
- [[ad.knowledge-consistency-checker|Knowledge Consistency Checker]]
- [[ad.connection-object|Connection Object]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.domain|Active Directory Domain]]

## 参考文献

- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [Microsoft - Setting Site Link Properties](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/setting-site-link-properties)
- [Microsoft Open Specifications - MS-ADTS Site Link Object](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/f148e965-e4d7-413a-acfc-0e9a9e591708)
