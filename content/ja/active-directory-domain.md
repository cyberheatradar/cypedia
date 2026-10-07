---
canonical_id: ad.domain
title: Active Directory Domain
lang: ja
slug: active-directory-domain
aliases:
  - Domain
  - AD Domain
categories:
  - Active Directory
status: published
summary: Active Directory Domainのdirectory partition、authentication、policy、replication、Trustを解説する。
---

## 概要

> **主な出典:** [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model) / [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)

Active Directory Domainは[[ad.forest|Active Directory Forest]]内の主要な論理単位です。

Domainはdirectory treeのpartitionであり、user、computer、groupなどのobjectを保持します。

## Domain Directory Partition

各DomainにはDomain Directory Partitionがあります。

そのDomainのwritable [[ad.domain-controller|Domain Controller]]は、自DomainのDomain Partitionについてfull writable replicaを保持します。

[[ad.read-only-domain-controller|Read-Only Domain Controller（RODC）]]はread-only replicaを保持し、originating updateを受け付けません。credential replicationにはRODC固有の制御があります。

これによりdirectory dataをDomain単位で分割し、必要なDomain Controllerの範囲へreplicateできます。

## Authentication

Domainはauthenticationの重要なscopeです。

Domain ControllerはDomain accountのauthenticationを処理します。

[[auth.kerberos|Kerberos]]を使用する場合、Domain Controllerは[[kerberos.kdc|KDC]]として動作します。

互換性が必要な環境では[[auth.ntlm|NTLM]]も利用されます。

## Policy Administration

Domainは一部のaccount policyやadministrative policyのscopeになります。

また、[[windows.group-policy|Group Policy]]はDomainや[[ad.organizational-unit|Organizational Unit]]などへlinkできます。

## Replication

同じDomain内のwritable Domain Controllerは、Domain Partitionについて[[ad.replication|Active Directory Replication]]を行います。

directory changeはreplicationによって他のDomain Controllerへ伝播します。

## Trust

同一Forest内のDomain間にはautomatic two-way transitive [[ad.trust|Trust]]があります。

Domainは重要なadministrative scopeですが、同じForest内のDomainを完全に独立したsecurity boundaryとして扱うことはできません。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.forest|Forest]]
- [[ad.organizational-unit|Organizational Unit]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.replication|Active Directory Replication]]
- [[ad.trust|Active Directory Trust]]
- [[auth.kerberos|Kerberos]]
- [[auth.ntlm|NTLM]]
- [[windows.group-policy|Group Policy]]

## 参考文献

- [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)
- [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)
- [Microsoft - Planning Domain Controller Placement](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/planning-domain-controller-placement)
