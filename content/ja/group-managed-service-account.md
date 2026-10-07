---
canonical_id: ad.group-managed-service-account
title: Group Managed Service Account
lang: ja
slug: group-managed-service-account
aliases:
  - gMSA
categories:
  - Active Directory
  - Service Identity
status: published
summary: 複数serverで利用可能なmanaged service identityとしてpasswordとSPN管理を自動化するGroup Managed Service Account（gMSA）を解説する。
---

## 概要

[[ad.group-managed-service-account|Group Managed Service Account（gMSA）]]は、[[ad.standalone-managed-service-account|sMSA]]のmanaged service identity機能を複数serverへ拡張した[[ad.service-account|Service Account]]です。

[[ad.active-directory|Active Directory]]の[[ad.domain-controller|Domain Controller]]がpasswordを管理し、利用を許可されたhostがそのcredentialを取得します。

## Multi-Server Service Identity

gMSAはserver farmや複数server上で同一service identityを利用する用途を想定しています。

Microsoftは、mutual authenticationを利用するservice instanceが同じidentityを必要とする場合に、gMSAを複数serverで使用できるaccountとして説明しています。

## Password Management

gMSA passwordはadministratorが通常のservice passwordとして手動配布・同期するのではなく、Domain側で管理されます。

authorized hostが必要なcredentialを取得するため、複数serverで同一service identityを利用する場合のcredential管理を簡素化できます。

## SPN Management

gMSAは[[ad.service-principal-name|Service Principal Name（SPN）]]管理も簡素化します。

これは[[auth.kerberos|Kerberos]]を利用するservice authenticationで重要です。

## Kerberoastingとの関係

traditional service accountで弱い・長期固定passwordを利用する場合、[[attack.kerberoasting|Kerberoasting]]によるoffline password guessingのriskが問題になります。

MicrosoftはgMSAを自動管理credentialを持つservice identityとして提供しており、manualなstatic service passwordへの依存を減らせます。

## sMSAとの違い

[[ad.standalone-managed-service-account|sMSA]]は単一computer向けですが、gMSAは複数serverで利用できます。

## dMSAとの違い

[[ad.delegated-managed-service-account|dMSA]]はWindows Server 2025で導入された別のmanaged account typeで、authenticationをauthorized machine identityへ関連付ける設計を持ちます。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.service-account|Service Account]]
- [[ad.standalone-managed-service-account|Standalone Managed Service Account]]
- [[ad.delegated-managed-service-account|Delegated Managed Service Account]]
- [[ad.computer-account|Computer Account]]
- [[ad.service-principal-name|Service Principal Name]]
- [[windows.security-principal|Security Principal]]
- [[auth.kerberos|Kerberos]]
- [[attack.kerberoasting|Kerberoasting]]

## 参考文献

- [Microsoft - Manage Group Managed Service Accounts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/manage-group-managed-service-accounts)
- [Microsoft - Group Managed Service Accounts Overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview)
- [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)
- [MITRE ATT&CK T1558.003 - Kerberoasting](https://attack.mitre.org/techniques/T1558/003/)
