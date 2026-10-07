---
canonical_id: ad.delegated-managed-service-account
title: Delegated Managed Service Account
lang: ja
slug: delegated-managed-service-account
aliases:
  - dMSA
categories:
  - Active Directory
  - Service Identity
status: published
summary: Windows Server 2025で導入されたdevice-bound managed service identityであるDelegated Managed Service Account（dMSA）を解説する。
---

## 概要

[[ad.delegated-managed-service-account|Delegated Managed Service Account（dMSA）]]は、Windows Server 2025で導入された新しいmanaged [[ad.service-account|Service Account]] typeです。

MicrosoftはdMSAを、traditional service accountからmachine-managed identityへmigrationでき、authenticationをauthorized device identityへ関連付ける仕組みとして説明しています。

## Device-Bound Authentication

dMSA authenticationは特定のauthorized machine identityに関連付けられます。

[[ad.active-directory|Active Directory]]でmappingされたmachineだけがaccountを利用できる設計です。

この点は複数hostで共有可能な[[ad.group-managed-service-account|gMSA]]との重要な違いです。

## Managed Keys

dMSAではservice identity用のkeyをWindowsが管理します。

Microsoftはfully randomized keysを使用し、traditional service accountからmigrationする場合にはoriginal account passwordをdisableする仕組みを説明しています。

## Migration

dMSAは既存のtraditional Service Accountからmigrationする用途を持ちます。

migration後はservice authenticationをmanaged machine identityへ移行し、旧account passwordへの依存を減らします。

Microsoftは新規standalone dMSAを作成する手順も文書化しています。

## Kerberoastingとの関係

MicrosoftはdMSAの目的の一つとして、compromised traditional service accountからcredentialをharvestするrisk、特に[[attack.kerberoasting|Kerberoasting]]への耐性向上を挙げています。

## gMSAとの違い

[[ad.group-managed-service-account|gMSA]]は複数serverで共有できるdomain-managed service identityです。

dMSAはdevice identityとのbindingを中心に設計されたWindows Server 2025のmanaged identityです。

## sMSAとの関係

[[ad.standalone-managed-service-account|sMSA]]もmanaged credentialを提供しますが、単一computer上のservice向けの従来型Managed Service Accountです。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.service-account|Service Account]]
- [[ad.group-managed-service-account|Group Managed Service Account]]
- [[ad.standalone-managed-service-account|Standalone Managed Service Account]]
- [[ad.computer-account|Computer Account]]
- [[windows.security-principal|Security Principal]]
- [[auth.kerberos|Kerberos]]
- [[attack.kerberoasting|Kerberoasting]]

## 参考文献

- [Microsoft - Delegated Managed Service Accounts Overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/delegated-managed-service-accounts/delegated-managed-service-accounts-overview)
- [Microsoft - Setting up Delegated Managed Service Accounts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/delegated-managed-service-accounts/delegated-managed-service-accounts-set-up-dmsa)
- [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)
