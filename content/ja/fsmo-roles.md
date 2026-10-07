---
canonical_id: ad.fsmo-roles
title: FSMO Roles
lang: ja
slug: fsmo-roles
aliases:
  - FSMO
  - Operations Master Roles
categories:
  - Active Directory
status: published
summary: Active Directoryの5つのFSMO RoleとForest-wide / Domain-wide scopeを解説する。
---

## 概要

> **主な出典:** [Microsoft - Flexible Single Master Operations roles](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-fsmo-roles)

Flexible Single Master Operations（FSMO）Rolesは、[[ad.active-directory|Active Directory Domain Services]]の一部のoperationを特定の[[ad.domain-controller|Domain Controller]]だけで処理する仕組みです。

Active Directoryの多くのupdateは[[ad.replication|multi-master replication]]で処理できますが、競合を避けるためsingle-masterで実行する必要があるoperationも存在します。

## 5つのRole

FSMO Roleは5つあります。

### Forest-Wide Roles

[[ad.forest|Forest]]全体に1つずつ存在します。

- Schema Master
- Domain Naming Master

### Domain-Wide Roles

各[[ad.domain|Domain]]に1つずつ存在します。

- RID Master
- PDC Emulator
- Infrastructure Master

## Schema Master

Schema Masterは[[ad.schema|Active Directory Schema]]へのupdateを管理するForest-wide roleです。

Forest内には1つだけ存在します。

## Domain Naming Master

Domain Naming MasterはForestに対するDomain Directory PartitionやApplication Directory Partitionの追加・削除など、namespace structureに関係するoperationを担当します。

## RID Master

RID MasterはDomain内のDomain ControllerへRID poolを割り当てます。

Domainで作成される[[windows.security-principal|Security Principal]]の[[windows.security-identifier|SID]]にはDomain SIDとRelative ID（RID）が含まれます。

## PDC Emulator

PDC EmulatorはDomain単位のFSMO Roleです。

password changeの優先的な処理、time synchronization hierarchy、legacy compatibilityなど複数の重要な役割を持ちます。

## Infrastructure Master

Infrastructure MasterはDomain内のobject referenceに関連する処理を担当します。

## TransferとSeizure

FSMO Roleは必要に応じて別のDomain Controllerへtransferできます。

元のrole holderが恒久的に利用できない場合などにはseizureが必要になる場合があります。

通常運用では計画的なtransferが優先されます。

## Security上の論点

FSMO Role holderが停止してもすべてのActive Directory機能が直ちに停止するわけではありません。

一方、それぞれのroleに依存するoperationは影響を受けます。

特にPDC EmulatorやRID Masterなどのrole holderは重要なDomain Controllerとして適切に保護する必要があります。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]
- [[ad.forest|Forest]]
- [[ad.domain|Domain]]
- [[ad.schema|Active Directory Schema]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|SID]]
- [[ad.directory-partition|Directory Partition]]

## 参考文献

- [Microsoft - Flexible Single Master Operations roles](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-fsmo-roles)
- [Microsoft - Active Directory FSMO roles in Windows](https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/fsmo-roles)
