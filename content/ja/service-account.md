---
canonical_id: ad.service-account
title: Service Account
lang: ja
slug: service-account
aliases:
  - サービスアカウント
  - service account
categories:
  - Active Directory
status: published
summary: Windows Service Accountのsecurity context、traditional account、sMSA/gMSA/dMSA、SPN、Kerberos、credential管理を解説する。
---

## 概要

> **主な出典:** [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)

[[ad.service-account|Service Account]]は、Windows serviceやapplicationへsecurity contextを提供するためのaccountです。

serviceがlocal resourceやnetwork resourceへaccessするとき、そのidentityとpermissionはService Accountのsecurity contextによって決まります。

## Traditional Service Account

traditionalなService Accountとして通常の[[ad.active-directory|Active Directory]] user accountをservice実行identityへ使用できます。

この場合、passwordの設定・rotation・保管などをadministrator側で管理する必要があります。

長期間変更されないpasswordや過剰なpermissionはsecurity riskになります。

## Managed Service Accounts

Windows ServerはService Account管理を改善する複数のaccount typeを提供します。

### sMSA

standalone Managed Service Account（sMSA）は、単一computer上のserviceで利用するmanaged domain accountです。

Windowsがpassword managementを自動化し、[[ad.service-principal-name|Service Principal Name（SPN）]]管理も簡素化します。

### gMSA

group Managed Service Account（gMSA）はsMSAの機能を複数serverへ拡張します。

server farmやload-balanced serviceで同じservice identityを利用するscenarioに適しています。

passwordはWindowsと[[ad.domain-controller|Domain Controller]]によって管理され、authorized hostが必要なcredentialを取得します。

### dMSA

Delegated Managed Service Account（dMSA）は新しいmanaged account typeで、service identityを特定machine identityへ強く関連付けることを目的としています。

Windows Server 2025世代ではtraditional service accountからdMSAへ移行する機能も提供されています。

### Virtual Account

Virtual Accountはlocal managed identityです。

network accessではcomputer accountのcredentialを利用できます。

## Kerberosとの関係

Service Accountで動作するnetwork serviceが[[auth.kerberos|Kerberos]] authenticationを利用する場合、service identityへ適切なSPNを登録する必要があります。

[[kerberos.ticket-granting-server|Ticket-Granting Server]]はSPNに対応するaccount向けに[[kerberos.service-ticket|Service Ticket]]を発行します。

## Service TicketのProtection

Service Ticketのencrypted portionはtarget service側で利用可能なkey materialによって保護されます。

traditional Service Accountではaccount passwordから導出されるkeyがこのsecurityへ直接関係します。

## Kerberoasting

[[attack.kerberoasting|Kerberoasting]]ではSPNが登録されたservice account向けのService Ticketを取得し、ticket materialをoffline password guessingへ利用できる場合があります。

このためtraditional Service Accountでは長くrandomなpasswordと適切なrotationが重要です。

可能な場合はgMSAなど自動credential managementを提供するmanaged accountの利用が有効です。

## Least Privilege

Service Accountへ必要以上のDomain privilegeやlocal privilegeを付与すべきではありません。

serviceが必要とするresourceとoperationに限定してpermissionを設計することが重要です。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.service-principal-name|Service Principal Name]]
- [[auth.kerberos|Kerberos]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[ad.domain-controller|Domain Controller]]
- [[windows.security-principal|Security Principal]]
- [[attack.kerberoasting|Kerberoasting]]
- [[ad.domain|Active Directory Domain]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[ad.user-account|User Account]]
- [[ad.computer-account|Computer Account]]
- [[ad.standalone-managed-service-account|Standalone Managed Service Account]]
- [[ad.group-managed-service-account|Group Managed Service Account]]
- [[ad.delegated-managed-service-account|Delegated Managed Service Account]]

## 参考文献

- [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)
- [Microsoft - Group Managed Service Accounts overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview)
- [Microsoft - Manage Group Managed Service Accounts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/manage-group-managed-service-accounts)
- [MITRE ATT&CK T1558.003 - Kerberoasting](https://attack.mitre.org/techniques/T1558/003/)
