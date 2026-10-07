---
canonical_id: ad.domain-controller
title: Domain Controller
lang: ja
slug: domain-controller
aliases:
  - DC
categories:
  - Active Directory
status: published
summary: Domain Controllerのdirectory storage、authentication、replication、security上の重要性を解説する。
---

## 概要

> **主な出典:** [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)

Domain Controller（DC）は[[ad.active-directory|Active Directory Domain Services]]をホストするWindows Serverです。

Domain Controllerはdirectory dataを保持し、authentication、directory query、[[ad.replication|replication]]などの中核機能を提供します。

## Directory Data

writable Domain Controllerは、自分が所属する[[ad.domain|Domain]]のDomain Partitionについてfull writable replicaを保持します。

[[ad.read-only-domain-controller|Read-Only Domain Controller（RODC）]]はread-only replicaを保持し、originating updateを受け付けません。

Domain ControllerはForest-wideな[[ad.schema|Schema]] PartitionやConfiguration Partitionも保持します。

Active Directoryの主要なdatabase fileは[[ad.ntds-dit|NTDS.dit]]です。

## Authentication

AD DS環境ではDomain Controllerが[[auth.kerberos|Kerberos]]の[[kerberos.kdc|KDC]]として動作します。

互換性が必要な場合には[[auth.ntlm|NTLM]] authenticationにも関与します。

## LDAP

Domain Controllerは[[protocol.ldap|LDAP]]を利用したdirectory queryやdirectory updateを処理します。

Active Directoryは標準LDAPに加えてMicrosoft固有のextensionやbehaviorを持ちます。

## Replication

複数のwritable Domain Controllerを配置することでdirectory serviceのavailabilityを高められます。

directory changeはActive Directory Replicationによって他のDomain Controllerへ伝播します。

Domain Controllerは[[ad.global-catalog|Global Catalog]] serverとして構成される場合もあります。

## SYSVOL

Domain Controllerは[[ad.sysvol|SYSVOL]]を提供します。

SYSVOLには[[windows.group-policy|Group Policy]]などで利用されるfile-based dataが保存されます。

## Security上の重要性

> **主な出典:** [Microsoft - Securing Domain Controllers Against Attack](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/securing-domain-controllers-against-attack)

Domain ControllerはActive Directory環境で最も重要なsecurity assetの1つです。

Domain Controllerへのprivileged accessを攻撃者に取得された場合、AD DS database、credential material、authentication infrastructure、policy administrationなどへ重大な影響が及ぶ可能性があります。

Domain Controllerは一般的なmember serverやworkstationより厳格にhardeningする必要があります。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.forest|Forest]]
- [[ad.replication|Active Directory Replication]]
- [[ad.global-catalog|Global Catalog]]
- [[ad.ntds-dit|NTDS.dit]]
- [[ad.sysvol|SYSVOL]]
- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|KDC]]
- [[auth.ntlm|NTLM]]
- [[protocol.ldap|LDAP]]

## 参考文献

- [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
- [Microsoft - Securing Domain Controllers Against Attack](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/securing-domain-controllers-against-attack)
- [Microsoft - Planning Domain Controller Placement](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/planning-domain-controller-placement)
