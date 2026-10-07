---
canonical_id: windows.security-descriptor
title: Security Descriptor
lang: ja
slug: security-descriptor
aliases: []
categories:
  - Windows
  - Access Control
  - Active Directory
status: published
summary: Windows securable objectのowner、SID、DACL、SACLなどのsecurity informationを保持するSecurity Descriptorを解説する。
---

## 概要

[[windows.security-descriptor|Security Descriptor]]は、Windowsのsecurable objectに関連付けられるsecurity informationを保持するdata structureです。

Microsoft documentationでは、Security Descriptorはobjectのownerやprimary groupの[[windows.security-identifier|Security Identifier（SID）]]、DACL、SACL、control bitなどを含むことができます。

## OwnerとPrimary Group

Security Descriptorにはobject ownerのSIDを保持できます。

primary groupのSIDも構成要素として含めることができます。

これらは[[windows.security-principal|Security Principal]]をSIDによって識別します。

## DACL

Discretionary Access Control List（DACL）は、特定のtrusteeに対してobjectへのaccessをallowまたはdenyするruleを保持します。

DACLは[[windows.access-control-list|Access Control List（ACL）]]の一種です。

## SACL

System Access Control List（SACL）は、objectへのどのaccess attemptをaudit対象とするかを指定します。

DACLとSACLはいずれもACEの集合として構成されますが、目的は異なります。

## Control Information

Security Descriptorには、そのdescriptorや個々のcomponentの意味を修飾するcontrol bitも存在します。

Windows APIではSecurity Descriptorの内部を直接書き換えるのではなく、提供されたsecurity APIを利用して取得・設定することが推奨されています。

## Active Directoryとの関係

[[ad.active-directory|Active Directory]] objectでもSecurity Descriptorがaccess controlに使用されます。

directory objectのpermissionを理解する際はSecurity Descriptor、ACL、SID、[[windows.security-principal|Security Principal]]の関係をまとめて理解する必要があります。

## Security Descriptor String Format

WindowsにはSecurity Descriptorをtextで表現するformatがあり、owner、group、DACL、SACLなどをcomponentとして表現できます。

これはSecurity Descriptor Definition Language（SDDL）としてsecurity configurationや管理interfaceで利用されます。

## セキュリティ上の論点

Security Descriptorの誤設定はobjectへの過剰accessや監査不足につながります。

特にDACLのallow/deny rule、inheritance、owner、SACLのaudit configurationを分離して評価することが重要です。

## 関連項目

- [[windows.access-control-list|Access Control List]]
- [[windows.security-identifier|Security Identifier]]
- [[windows.security-principal|Security Principal]]
- [[ad.active-directory|Active Directory]]
- [[ad.security-group|Security Group]]

- [[windows.access-control-entry|Access Control Entry]]

- [[windows.discretionary-access-control-list|Discretionary Access Control List]]

- [[windows.system-access-control-list|System Access Control List]]

- [[windows.securable-object|Securable Object]]

## 参考文献

- [Microsoft - Security Descriptors](https://learn.microsoft.com/en-us/windows/win32/secauthz/security-descriptors)
- [Microsoft - Parts of the Access Control Model](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-components)
- [Microsoft - Security Descriptor String Format](https://learn.microsoft.com/en-us/windows/win32/secauthz/security-descriptor-string-format)
