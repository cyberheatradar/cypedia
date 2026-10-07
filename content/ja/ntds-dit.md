---
canonical_id: ad.ntds-dit
title: NTDS.dit
lang: ja
slug: ntds-dit
aliases: []
categories:
  - Active Directory
status: published
summary: NTDS.ditのActive Directory databaseとしての役割、格納情報、security上の重要性を解説する。
---

## 概要

> **主な出典:** [Microsoft - AD DS Configuration Wizard Page Descriptions](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/ad-ds-installation-and-removal-wizard-page-descriptions)

NTDS.ditは[[ad.domain-controller|Domain Controller]]で使用される[[ad.active-directory|Active Directory Domain Services]]のdatabase fileです。

AD DS installation時にはdatabase file、transaction log、[[ad.sysvol|SYSVOL]]の配置場所を設定できます。

## 格納される情報

Active Directory databaseにはuser、computer、group、[[windows.security-principal|Security Principal]]、directory configurationなどのobject informationが格納されます。

NTDS.ditはそのdirectory dataを保持する中核fileです。

## Domain Controllerとの関係

Domain Controllerは自分が保持する[[ad.directory-partition|Directory Partition]]のreplicaをdatabase内で管理します。

directory changeは[[ad.replication|Active Directory Replication]]によって他のDomain Controllerへ同期されます。

## SYSVOLとの違い

NTDS.ditとSYSVOLは同じものではありません。

directory objectやGPOのdirectory-side dataはActive Directory database側に存在します。

一方、[[windows.group-policy|Group Policy]]のfile-basedなGroup Policy TemplateなどはSYSVOL側に保存されます。

## Security上の重要性

Microsoftは、password at restがActive Directory database（NTDS.DIT file）の複数のattributeに保存されると説明しています。

そのため、NTDS.ditやそれを含むbackup、snapshotなどへの不正accessはcredential exposureにつながる重大なsecurity incidentになり得ます。

## NTDS Credential Dumping

> **主な出典:** [MITRE ATT&CK T1003.003 - NTDS](https://attack.mitre.org/techniques/T1003/003/)

[[attack.ntds-credential-dumping|NTDS Credential Dumping]]では、攻撃者がActive Directory databaseまたはそのcopyを取得し、credential materialを抽出しようとします。

Domain Controller上でdatabase fileが通常使用中であることやaccess controlが存在するため、実際のattackではbackup、snapshot、Volume Shadow Copyなど別の取得経路が利用される場合があります。

## DCSyncとの違い

[[attack.dcsync|DCSync]]はNTDS.dit fileそのものを直接copyする手法ではありません。

DCSyncはActive Directory replication protocolとreplication privilegeを悪用してcredential informationを要求する別の手法です。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.replication|Active Directory Replication]]
- [[ad.sysvol|SYSVOL]]
- [[windows.security-principal|Security Principal]]
- [[windows.group-policy|Group Policy]]
- [[attack.ntds-credential-dumping|NTDS Credential Dumping]]
- [[attack.dcsync|DCSync]]
- [[ad.domain|Domain]]

## 参考文献

- [Microsoft - AD DS Configuration Wizard Page Descriptions](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/ad-ds-installation-and-removal-wizard-page-descriptions)
- [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/active-directory-domain-services)
- [MITRE ATT&CK T1003.003 - NTDS](https://attack.mitre.org/techniques/T1003/003/)
- [Microsoft - Passwords technical overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/passwords-technical-overview)
- [MITRE ATT&CK T1003.006 - DCSync](https://attack.mitre.org/techniques/T1003/006/)
