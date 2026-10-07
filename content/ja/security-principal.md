---
canonical_id: windows.security-principal
title: Security Principal
lang: ja
slug: security-principal
aliases:
  - security principal
  - セキュリティプリンシパル
categories:
  - Windows
  - Active Directory
status: published
summary: Windows Security Principalの認証主体、SID、account、group、access controlとの関係を解説する。
---

## 概要

> **主な出典:** [Microsoft - Security Principals](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-principals)

WindowsにおけるSecurity Principalは、operating systemによってauthentication可能なentityです。

user account、computer account、security groupなどが代表例です。

各Security Principalは[[windows.security-identifier|Security Identifier（SID）]]によって識別されます。

## Active Directoryとの関係

[[ad.active-directory|Active Directory]] [[ad.domain|Domain]]で作成されるSecurity PrincipalはActive Directory objectとして保存されます。

これらのobjectはDomain resourceへのaccess controlに利用できます。

## User / Computer / Group

Security Principalには、たとえば次があります。

- user account
- computer account
- security group
- service identityに関連するaccount

security group自体もSIDを持つSecurity Principalです。

## AuthenticationとAuthorization

authenticationはidentityを確認するprocessです。

その後、authorizationではSecurity Principalに付与されたpermissionやgroup membershipなどを使用してresource accessを判断します。

## SID

SIDはSecurity Principalの一意なidentifierとしてWindows access controlで使用されます。

resourceのACLではaccount名そのものではなくSIDがpermission entryに利用されます。

## Access Control

file、registry key、Active Directory objectなどのsecurable objectではACLによってSecurity Principalへpermissionを付与または拒否できます。

groupを利用することで多数のuserへ共通permissionを管理できます。

## Kerberos Principalとの違い

Windows Security Principalと[[kerberos.principal|Kerberos Principal]]は同一の用語ではありません。

Kerberos Principalは[[auth.kerberos|Kerberos]] protocol上のidentity conceptです。

Windows Security PrincipalはWindows security modelでauthenticationやauthorizationの対象となるentityを表します。

Active Directoryでは両者が実際のauthentication処理で関係する場合がありますが、概念として区別する必要があります。

## Domain Controllerとの関係

[[ad.domain-controller|Domain Controller]]はDomain Security Principalのaccount informationやcredential-related dataをActive Directory databaseで管理します。

Domainで新しいSecurity Principalが作成される際のSID生成には[[ad.fsmo-roles|RID Master]]が管理するRID poolが関係します。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[windows.security-identifier|SID]]
- [[ad.fsmo-roles|FSMO Roles]]
- [[kerberos.principal|Kerberos Principal]]
- [[ad.user-account|User Account]]
- [[ad.computer-account|Computer Account]]
- [[ad.security-group|Security Group]]
- [[windows.access-control-list|Access Control List]]

- [[windows.securable-object|Securable Object]]

## 参考文献

- [Microsoft - Security Principals](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-principals)
- [Microsoft - Access Control Overview](https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/access-control)
- [Microsoft Open Specifications - MS-DTYP SID](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-dtyp/78eb9013-1c3a-4970-ad1f-2b1dad588a25)
- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
