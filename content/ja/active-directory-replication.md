---
canonical_id: ad.replication
title: Active Directory Replication
lang: ja
slug: active-directory-replication
aliases:
  - AD Replication
categories:
  - Active Directory
status: published
summary: Active Directory Replicationのmulti-master model、KCC、Site topology、Directory Partition単位の同期を解説する。
---

## 概要

> **主な出典:** [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)

Active Directory Replicationは、[[ad.active-directory|Active Directory Domain Services]]のdirectory dataを複数の[[ad.domain-controller|Domain Controller]]間で同期する仕組みです。

AD DSは分散directoryであり、同じ[[ad.domain|Domain]]に属する複数のwritable Domain Controllerがdirectory changeを受け付け、それらを相互にreplicateします。

## Multi-Master Model

Active Directoryの多くのdirectory updateはmulti-master modelで処理されます。

1台のDomain Controllerだけがすべての変更を受け付けるのではなく、複数のwritable Domain Controllerがoriginating updateを受け付けられます。

ただし、すべてのoperationがmulti-masterではありません。一部のoperationは[[ad.fsmo-roles|FSMO Roles]]によってsingle-master化されています。

## Directory Partition

Replicationは[[ad.directory-partition|Directory Partition]]単位で行われます。

代表的なpartitionには次があります。

- Domain Partition
- Configuration Partition
- [[ad.schema|Schema]] Partition
- Application Directory Partition

各partitionのreplicaをどのDomain Controllerが保持するかによってreplication scopeが決まります。

## Connection Object

Replication connectionはActive Directory内のconnection objectで表現されます。

connection objectはsource Domain Controllerからdestination Domain Controllerへのreplication connectionを表します。

## KCC

Knowledge Consistency Checker（KCC）はすべてのDomain Controller上で動作する組み込みprocessです。

KCCは[[ad.forest|Forest]]のreplication topologyを生成し、Domain Controllerの追加・削除、availability、network configurationなどの変化に応じてtopologyを調整します。

## Intra-Site / Inter-Site Replication

[[ad.site|Active Directory Site]]はreplication topologyに大きく関係します。

同一Site内部のreplicationとSite間replicationは別のtopologyとして扱われます。

Site間ではSite Link、cost、scheduleなどを使用してnetwork topologyを反映できます。

## Global Catalogとの関係

[[ad.global-catalog|Global Catalog]] serverは自Domainのfull replicaに加え、Forest内の他Domainについてpartial read-only replicaを保持します。

これらの情報もActive Directory Replicationによって維持されます。

## 障害時の影響

Replication failureが継続するとDomain Controller間でdirectory dataが一致しなくなる可能性があります。

その結果、authentication、authorization、Group Policy、directory-dependent serviceなどへ影響することがあります。

## Security上の論点

Replicationはcredentialやsecurity-sensitiveなdirectory informationをDomain Controller間で扱う重要な機能です。

[[attack.dcsync|DCSync]]は、このreplication機能に関連する権限を悪用してcredential informationを取得する攻撃です。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.domain|Domain]]
- [[ad.forest|Forest]]
- [[ad.site|Active Directory Site]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.global-catalog|Global Catalog]]
- [[ad.fsmo-roles|FSMO Roles]]
- [[attack.dcsync|DCSync]]
- [[windows.group-policy|Group Policy]]
- [[ad.knowledge-consistency-checker|Knowledge Consistency Checker]]
- [[ad.site-link|Site Link]]
- [[ad.connection-object|Connection Object]]

## 参考文献

- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [Microsoft - Troubleshooting Active Directory Replication](https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/troubleshoot-adreplication-guidance)
