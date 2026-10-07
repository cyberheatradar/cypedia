---
canonical_id: ad.knowledge-consistency-checker
title: Knowledge Consistency Checker
lang: ja
slug: knowledge-consistency-checker
aliases:
  - KCC
categories:
  - Active Directory
  - Replication
status: published
summary: Active Directory replication topologyを自動生成・維持するKnowledge Consistency Checker（KCC）を解説する。
---

## 概要

[[ad.knowledge-consistency-checker|Knowledge Consistency Checker（KCC）]]は、[[ad.domain-controller|Domain Controller]]上で動作し、[[ad.replication|Active Directory Replication]]のtopologyを生成する組み込みprocessです。

Microsoftの現行Windows Server documentationでは、KCCはforest内のreplication topologyを生成し、intra-siteとinter-siteでそれぞれtopologyを構成すると説明されています。

## Replication Topology

同一[[ad.site|Active Directory Site]]内とSite間ではnetwork characteristicsが異なるため、KCCはそれぞれを区別してreplication connectionを構成します。

Domain Controllerの追加・削除、Site間移動、costやscheduleの変更、Domain Controllerの一時的な利用不能などに応じてtopologyを調整します。

## Connection Objectとの関係

KCCが計算したreplication relationshipは[[ad.connection-object|Connection Object]]としてActive Directory内に表現されます。

Connection Objectはdestination Domain Controller側のNTDS Settings object配下に存在し、source Domain Controllerからのinbound replication connectionを表します。

KCCはConnection Objectを自動生成できます。一方、administratorがmanualで作成したconnectionも存在します。

## Site Linkとの関係

inter-site replicationでは、KCCは[[ad.site-link|Site Link]]に設定されたconnectivity、cost、scheduleなどを利用してreplication pathを決定します。

Site Linkは物理packet routeそのものではなく、AD replication topologyを構成するためのlogical relationshipです。

## 運用上の意味

通常の環境ではKCCがreplication connectionを自動管理するため、manual Connection Objectを大量に作成することは前提ではありません。

replication障害を調査する際は、Site、Site Link、Connection Object、Directory Partitionの関係を合わせて確認する必要があります。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]
- [[ad.site|Active Directory Site]]
- [[ad.site-link|Site Link]]
- [[ad.connection-object|Connection Object]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.domain|Active Directory Domain]]
- [[ad.forest|Active Directory Forest]]

## 参考文献

- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [Microsoft - Setting Site Link Properties](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/setting-site-link-properties)
