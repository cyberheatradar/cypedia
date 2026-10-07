---
canonical_id: ad.standalone-managed-service-account
title: Standalone Managed Service Account
lang: ja
slug: standalone-managed-service-account
aliases:
  - sMSA
categories:
  - Active Directory
  - Service Identity
status: published
summary: 単一computer上のservice向けにcredentialとSPN管理を自動化するStandalone Managed Service Account（sMSA）を解説する。
---

## 概要

[[ad.standalone-managed-service-account|Standalone Managed Service Account（sMSA）]]は、[[ad.active-directory|Active Directory]]で管理される[[ad.service-account|Service Account]]の一種です。

MicrosoftはsMSAを、単一computer上のserviceで利用するmanaged domain accountとして説明しています。

## Password Management

sMSAではWindowsがaccount passwordを自動的に管理できます。

通常の[[ad.user-account|User Account]]をservice identityとして利用する場合に必要となるmanual password rotationの負担を減らせます。

## SPN Management

sMSAは[[ad.service-principal-name|Service Principal Name（SPN）]]管理を簡素化するための仕組みも提供します。

SPNは[[auth.kerberos|Kerberos]]でservice identityを識別する重要な情報です。

## Single-Computer Scope

sMSAは基本的に1台の[[ad.computer-account|Computer Account]]に対応するservice用途を想定しています。

複数serverで同じservice identityを共有する用途には[[ad.group-managed-service-account|Group Managed Service Account（gMSA）]]が用意されています。

## Security Position

sMSAはservice credentialをadministratorが長期間手動管理する必要を減らし、serviceごとのidentity分離を行いやすくします。

ただし利用可能なcomputer scopeが単一computerであることは、gMSAとの重要な違いです。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.service-account|Service Account]]
- [[ad.group-managed-service-account|Group Managed Service Account]]
- [[ad.delegated-managed-service-account|Delegated Managed Service Account]]
- [[ad.computer-account|Computer Account]]
- [[ad.service-principal-name|Service Principal Name]]
- [[windows.security-principal|Security Principal]]
- [[auth.kerberos|Kerberos]]

## 参考文献

- [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)
- [Microsoft - Group Managed Service Accounts Overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview)
