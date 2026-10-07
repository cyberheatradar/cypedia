---
canonical_id: attack.dcsync
title: DCSync
lang: ja
slug: dcsync
aliases: []
categories:
  - Active Directory
  - Credential Access
status: published
summary: DCSyncによるActive Directory replication API悪用、DRSGetNCChanges、credential material取得、権限、検知とNTDS dumpingとの違いを解説する。
---

## 概要

> **主な出典:** [MITRE ATT&CK T1003.006 - DCSync](https://attack.mitre.org/techniques/T1003/006/) / [MS-DRSR - IDL_DRSGetNCChanges](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-drsr/b63730ac-614c-431c-9501-28d6aca91894)

[[attack.dcsync|DCSync]]は、[[ad.active-directory|Active Directory]]の正規[[ad.replication|replication]] protocol/APIを悪用し、攻撃者が制御する[[windows.security-principal|セキュリティ主体]]がreplication partnerのように振る舞ってdirectory credential materialを取得するcredential access techniqueです。

## Replication Mechanism

AD DSの[[ad.domain-controller|Domain Controller]]間replicationではMicrosoft Directory Replication Service Remote Protocol（MS-DRSR）が利用されます。

`IDL_DRSGetNCChanges` methodはserver上のNaming Context replicaからupdateをreplicateするためのmethodです。

DCSyncはこの正規mechanismをcredential theftへ転用します。

## Directory Partition

replication operationは[[ad.directory-partition|Directory Partition]]、すなわちNaming Context単位のdirectory stateと関係します。

Domain partitionにはuserやcomputerを含むDomain dataが存在します。

## Credential Material

MITRE ATT&CKはDCSyncによりpassword dataやhistorical hashesを含むsensitive informationが取得される可能性を示しています。

[[ad.krbtgt|KRBTGT]]など高価値accountのcredential materialが取得されると、後続の[[attack.golden-ticket|Golden Ticket]]などにつながる可能性があります。

## 必要な権限

DCSyncは単にnetwork上から誰でも実行できるoperationではありません。

requestingセキュリティ主体にはdirectory replication用のcontrol access rightsが必要です。

Microsoftは `DS-Replication-Get-Changes` をreplication change取得のrightとして定義し、`DS-Replication-Get-Changes-All` をsecret domain dataのreplicationを許可するrightとして定義しています。

通常のDomain Controller以外へこれらの権限をdelegationする場合は特に慎重な管理が必要です。

## NTDS Credential Dumpingとの違い

[[attack.ntds-credential-dumping|NTDS Credential Dumping]]は[[ad.ntds-dit|NTDS.dit]] databaseやそのcopyへaccessしてcredential dataを取得するtechniqueです。

DCSyncはdirectory database fileを直接copyするのではなく、正規replication protocolを利用してremoteでdataを要求します。

## 検知

重要な観測点は、replicationを行うべきでないhostやidentityからのDirectory Replication trafficです。

監視では次を確認します。

- non-DC hostからのreplication request
- 想定外のセキュリティ主体によるreplication operation
- sensitive replication rightsの変更
- Domain Controller RPC activityとのbaseline差異

## 緩和

- replication rightsをDomain Controllerと必要最小限のセキュリティ主体へ限定する
- privileged accountとdelegated permissionを定期監査する
- Domain Controllerへのnetwork accessを制限する
- directory permission changeを監視する
- non-DC systemからのreplication protocol利用を監視する

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.ntds-dit|NTDS.dit]]
- [[ad.krbtgt|KRBTGT]]
- [[windows.security-principal|セキュリティ主体]]
- [[attack.ntds-credential-dumping|NTDS Credential Dumping]]
- [[attack.golden-ticket|Golden Ticket]]

- [[windows.access-rights|Access Rights]]

## 参考文献

- [MITRE ATT&CK T1003.006 - DCSync](https://attack.mitre.org/techniques/T1003/006/)
- [MS-DRSR - IDL_DRSGetNCChanges](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-drsr/b63730ac-614c-431c-9501-28d6aca91894)
- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [MS-ADTS - DS-Replication-Get-Changes](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/1878718d-ca72-472e-a612-ebbf22514236)
- [MS-ADTS - DS-Replication-Get-Changes-All](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/c61ae7fd-c50f-4813-a8d2-ef81d4b48499)
