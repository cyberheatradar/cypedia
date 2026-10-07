---
canonical_id: attack.kerberoasting
title: Kerberoasting
lang: ja
slug: kerberoasting
aliases:
  - Kerberoast
categories:
  - Active Directory
  - Kerberos
status: published
summary: KerberoastingのService Ticket取得、SPN・Service Accountとの関係、offline password guessing、検知と緩和を解説する。
---

## 概要

> **主な出典:** [MITRE ATT&CK T1558.003 - Kerberoasting](https://attack.mitre.org/techniques/T1558/003/)

[[attack.kerberoasting|Kerberoasting]]は、[[auth.kerberos|Kerberos]]の通常のticket issuanceを利用し、[[ad.service-principal-name|Service Principal Name（SPN）]]に対応する[[kerberos.service-ticket|Service Ticket]]のcryptographic materialをoffline password guessingへ利用するcredential access techniqueです。

[[ad.active-directory|Active Directory]]ではservice identityがcomputer accountや[[ad.service-account|Service Account]]に関連付けられています。

## 前提

一般的なKerberoastingでは、[[kerberos.ticket-granting-ticket|Ticket-Granting Ticket（TGT）]]を持つauthenticated principalが、target SPN向けのService Ticketを要求します。

[[kerberos.ticket-granting-server|Ticket-Granting Server（TGS）]]は通常のKerberos処理としてticketを発行します。

攻撃者がDomain ControllerやKDCを侵害していること自体は、このticket requestの必須条件ではありません。

## Service Accountとの関係

Service Ticketのencrypted portionは、target service側が利用可能なkey materialによって保護されます。

traditional Service Accountではaccount passwordから導出されるkeyが関係するため、passwordが推測可能な場合にはoffline guessingが成立しやすくなります。

長くrandomなcredentialを自動管理するgMSAなどは、このriskを大幅に下げます。

## Encryption Type

> **主な出典:** [Microsoft - Detect and Remediate RC4 Usage in Kerberos](https://learn.microsoft.com/en-us/windows-server/security/kerberos/detect-remediate-rc4-kerberos)

RC4-HMACなどlegacy Kerberos encryption typeはKerberoasting対策上重要な監査対象です。

Microsoftは現行Windows Server向けにEvent ID 4768/4769を利用したRC4 usageの監査とremediation guidanceを提供しています。

ただしKerberoastingの本質は「RC4そのもの」ではなく、Service Ticketのkeyが推測可能なService Account credentialへ依存していることです。

## Offline Guessing

取得したticket materialに対するpassword guessingはKDCから切り離してofflineで実施できます。

したがって、account lockoutだけではService Account passwordのguessabilityを十分に補償できません。

## 検知

MITRE ATT&CKはKerberos Service Ticket requestの異常を主要な観測点として挙げています。

特に次のような観点が有効です。

- Event ID 4769の異常な増加
- 通常利用されないSPNへのrequest
- RC4などlegacy encryption type
- 短時間で多数のservice identityへ行われるrequest
- privileged Service Accountへの不自然なticket request

正常なKerberos利用でも4769は発生するため、volume・requester・target・encryption typeを組み合わせたbaselineが必要です。

## 緩和

重要な対策は次です。

- gMSA等のmanaged Service Accountを優先する
- traditional Service Accountには長くrandomなpasswordを使用する
- unnecessary privilegeをService Accountへ与えない
- 不要なSPNを削除する
- duplicate/stale SPNを管理する
- RC4 dependencyを把握しAESへ移行する
- Service Ticket requestを監査する

## 他のKerberos Attackとの違い

[[attack.as-rep-roasting|AS-REP Roasting]]はPre-Authenticationを要求しないaccountの[[kerberos.authentication-server|Authentication Server（AS）]] exchangeを対象とします。

[[attack.golden-ticket|Golden Ticket]]と[[attack.silver-ticket|Silver Ticket]]はticket materialをoffline guessingするのではなく、既に侵害されたkey materialを利用したticket forgeryです。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.principal|Principal]]
- [[ad.service-principal-name|Service Principal Name]]
- [[ad.service-account|Service Account]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[attack.as-rep-roasting|AS-REP Roasting]]
- [[attack.golden-ticket|Golden Ticket]]
- [[attack.silver-ticket|Silver Ticket]]
- [[kerberos.authentication-server|Authentication Server]]
- [[kerberos.pre-authentication|Pre-Authentication]]
- [[ad.computer-account|Computer Account]]
- [[ad.group-managed-service-account|Group Managed Service Account]]

## 参考文献

- [MITRE ATT&CK T1558.003 - Kerberoasting](https://attack.mitre.org/techniques/T1558/003/)
- [Microsoft - Detect and Remediate RC4 Usage in Kerberos](https://learn.microsoft.com/en-us/windows-server/security/kerberos/detect-remediate-rc4-kerberos)
- [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)
- [Microsoft - Service Principal Names](https://learn.microsoft.com/en-us/windows/win32/ad/service-principal-names)
- [Microsoft - Secure group managed service accounts](https://learn.microsoft.com/en-us/entra/architecture/service-accounts-group-managed)
