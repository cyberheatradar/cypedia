---
canonical_id: ad.site
title: Active Directory Site
lang: ja
slug: active-directory-site
aliases:
  - Site
  - AD Site
categories:
  - Active Directory
status: published
summary: Active Directory Siteのnetwork topology、subnet、Domain Controller location、replicationとの関係を解説する。
---

## 概要

> **主な出典:** [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)

Active Directory Siteは[[ad.active-directory|Active Directory]]が物理network topologyを認識するための構造です。

Siteは、network connectivityによって関連付けられた1つ以上のTCP/IP subnetを表します。

## 論理構造との違い

[[ad.forest|Forest]]、[[ad.domain|Domain]]、[[ad.organizational-unit|OU]]はdirectoryの論理構造です。

一方、Siteはnetwork topologyを表現します。

1つのDomainは複数Siteにまたがることができ、1つのSiteに複数Domainの[[ad.domain-controller|Domain Controller]]が存在することもできます。

## Domain Controller Location

Site情報はclientがnetwork上で適切なDomain Controllerを選択する際に利用されます。

network locationに近いDomain Controllerを利用することで、不要なWAN trafficを減らせます。

## Replicationとの関係

Siteは[[ad.replication|Active Directory Replication]]のtopologyでも重要です。

Active Directoryではintra-site replicationとinter-site replicationが区別されます。

Site Link、cost、scheduleなどを利用してinter-site replicationを制御できます。

## KCC

Knowledge Consistency Checker（KCC）はDomain Controller上で動作し、replication topologyを自動生成します。

Domain ControllerやSiteの構成変更に応じてtopologyを再計算します。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.forest|Forest]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]
- [[ad.knowledge-consistency-checker|Knowledge Consistency Checker]]
- [[ad.site-link|Site Link]]

## 参考文献

- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
