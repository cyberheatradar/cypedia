---
canonical_id: ad.user-account
title: User Account
lang: ja
slug: user-account
aliases: []
categories:
  - Active Directory
  - Identity
status: published
summary: Active Directory User Accountのidentity、Security Principal、SID、group membership、認証・認可上の役割を解説する。
---

## 概要

[[ad.user-account|User Account]]は、[[ad.active-directory|Active Directory]]内でuser identityを表すdirectory objectです。

[[windows.security-principal|Security Principal]]として認証・認可に利用でき、[[windows.security-identifier|Security Identifier（SID）]]によって一意に識別されます。

MicrosoftはActive Directory accountについて、userやcomputerなどのidentityを表し、networkや[[ad.domain|Active Directory Domain]] resourceへのaccessに利用されると説明しています。

## 認証

User Accountにはuserがdomainへsign inし、network serviceやresourceへaccessするためのauthentication informationが関連付けられます。

Active Directory環境では[[auth.kerberos|Kerberos]]や[[auth.ntlm|NTLM]]などのauthentication mechanismと関係します。

## Authorization

authentication後のresource accessは、そのUser Account自身や所属する[[ad.security-group|Security Group]]へ付与されたrightsやpermissionsによって決まります。

SIDはaccess-control decisionでaccountを識別するために利用されます。

## Group Membership

User Accountは複数のSecurity Groupへ所属できます。

個別userへpermissionsを直接付与するよりも、役割に応じたSecurity Groupへaccountをまとめてauthorizationを管理する方式が一般的です。

## Organizational Unit

User Account objectは[[ad.organizational-unit|Organizational Unit（OU）]]などのdirectory containerへ配置できます。

OU配置はdelegated administrationや[[windows.group-policy|Group Policy]]適用scopeにも関係します。

## Service Identityとの関係

通常のUser Accountをapplicationやserviceのidentityとして利用することも可能ですが、service用途では[[ad.service-account|Service Account]]やmanaged service accountが利用される場合があります。

## セキュリティ上の論点

User Accountの保護では、credential管理、least privilege、不要accountのdisable、privileged accountの分離、group membershipの定期reviewが重要です。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|Security Identifier]]
- [[ad.security-group|Security Group]]
- [[ad.computer-account|Computer Account]]
- [[ad.service-account|Service Account]]
- [[ad.organizational-unit|Organizational Unit]]
- [[windows.group-policy|Group Policy]]
- [[auth.kerberos|Kerberos]]
- [[auth.ntlm|NTLM]]

## 参考文献

- [Microsoft - Active Directory Accounts](https://learn.microsoft.com/windows/security/identity-protection/access-control/active-directory-accounts)
- [Microsoft - Manage User Accounts in Windows Server](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage-user-accounts-in-windows-server)
- [Microsoft - Security Principals](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-principals)
