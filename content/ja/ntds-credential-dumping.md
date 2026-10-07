---
canonical_id: attack.ntds-credential-dumping
title: NTDS Credential Dumping
lang: ja
slug: ntds-credential-dumping
aliases: []
categories:
  - Active Directory
  - Credential Access
status: published
summary: NTDS Credential DumpingによるNTDS.ditやbackupからのDomain credential取得、影響、検知、防御、DCSyncとの違いを解説する。
---

## 概要

> **主な出典:** [MITRE ATT&CK T1003.003 - NTDS](https://attack.mitre.org/techniques/T1003/003/)

[[attack.ntds-credential-dumping|NTDS Credential Dumping]]は、[[ad.domain-controller|Domain Controller]]上の[[ad.ntds-dit|NTDS.dit]]またはそのcopy・backupから[[ad.active-directory|Active Directory]] credential informationを取得するcredential access techniqueです。

## NTDS.dit

NTDS.ditはAD DS directory databaseです。

user、computer、groupなどのdirectory objectとともにauthenticationに関連するsensitive dataを保持します。

MITRE ATT&CKはdefault locationを `%SystemRoot%\NTDS\Ntds.dit` としています。

## Credential Impact

directory databaseが適切な関連materialとともに侵害されると、Domain accountのpassword hash等が攻撃者に取得される可能性があります。

[[ad.krbtgt|KRBTGT]]やprivileged accountのcredential materialが含まれるため、Domain-wide compromiseへ発展する可能性があります。

## Active DatabaseとBackup

credential exposure sourceは稼働中Domain Controllerのdatabaseだけではありません。

MITRE ATT&CKは、active Domain Controllerだけでなく、同じまたは類似したdirectory informationを含むbackupも攻撃者の探索対象になり得るとしています。

directory databaseを含むbackupもcredential exposure sourceになり得るため、sensitive credential materialを含むassetとして保護する必要があります。

## DCSyncとの違い

[[attack.dcsync|DCSync]]は[[ad.replication|Active Directory Replication]] protocolを利用してcredential materialをremote requestします。

NTDS Credential Dumpingはdatabase fileまたはそのcopyへaccessする点が異なります。

## Golden Ticketとの関係

NTDS.dit compromiseによってKRBTGT key materialまで取得された場合、[[attack.golden-ticket|Golden Ticket]]など後続のKerberos forgery riskにつながります。

## 検知

重要な観測点は次です。

- Domain Controller上でのNTDS.dit access
- directory database copyやbackup操作
- unusual Volume Shadow Copy activity
- backup infrastructureへの不審access
- privileged processによるdirectory database関連操作

正常なbackupやmaintenanceとの区別が必要なため、authorized operationのbaseline化が重要です。

## 緩和

- Domain Controllerへのinteractive/admin accessを最小化する
- backupをDomain Controller相当のsensitive assetとして扱う
- privileged credentialを保護する
- database/backup accessを監視する
- Domain Controllerが完全に侵害された場合は、Domain credential materialが広範に露出した可能性をincident scopeで評価する

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.ntds-dit|NTDS.dit]]
- [[ad.replication|Active Directory Replication]]
- [[ad.krbtgt|KRBTGT]]
- [[attack.dcsync|DCSync]]
- [[attack.golden-ticket|Golden Ticket]]
- [[auth.kerberos|Kerberos]]
- [[kerberos.ticket|Kerberos Ticket]]

## 参考文献

- [MITRE ATT&CK T1003.003 - NTDS](https://attack.mitre.org/techniques/T1003/003/)
- [Microsoft - Active Directory Domain Services Overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
- [MITRE ATT&CK DET0586 - Detection of NTDS.dit Credential Dumping](https://attack.mitre.org/detectionstrategies/DET0586/)
