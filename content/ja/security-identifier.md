---
canonical_id: windows.security-identifier
title: Security Identifier
lang: ja
slug: security-identifier
aliases:
  - SID
categories:
  - Windows
  - Active Directory
status: published
summary: Windows Security Identifier（SID）の役割、Domain SID、RID、Security Principalとの関係を解説する。
---

## 概要

> **主な出典:** [Microsoft - Security Identifiers](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-identifiers) / [Microsoft - Access Control Overview](https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/access-control)

Security Identifier（SID）は、Windowsが[[windows.security-principal|Security Principal]]を識別するために使用するidentifierです。

user、group、computerなどの[[windows.security-principal|Security Principal]]はSIDによってsecurity subsystem上で識別されます。

## Account名との違い

access controlでは表示名やaccount名そのものではなくSIDがidentityの識別に利用されます。

そのためaccountの表示名が変更されても、security descriptorやACLではSIDを基準としてpermissionが関連付けられます。

## Domain SIDとRID

[[ad.domain|Active Directory Domain]]で作成される[[windows.security-principal|Security Principal]]のSIDは、Domainに関連するSID部分とRelative ID（RID）を組み合わせて一意性を確保します。

RIDは同じDomain内で[[windows.security-principal|Security Principal]]を区別するために使われます。

## RID Master

[[ad.fsmo-roles|FSMO Roles]]の1つであるRID Masterは、[[ad.domain-controller|Domain Controller]]へRID poolを割り当てます。

Domain Controllerは割り当てられたRID poolから、新しく作成する[[windows.security-principal|Security Principal]]へRIDを付与します。

## Access Control

WindowsのACLではSIDを使用してpermissionを[[windows.security-principal|Security Principal]]へ関連付けます。

resource access時にはauthenticationされたsecurity context内のSIDとACL entryなどが評価されます。

## Well-Known SID

Windowsには特定の組み込みidentityやgroupを表すwell-known SIDもあります。

これらは通常のDomain account生成とは異なり、Windows security modelで定義された既知のidentifierです。

## Security上の意味

SIDはauthorization判断の基本identifierです。

そのためSIDの意味を理解することはWindows ACL、group membership、privilege、Active Directory authorizationを理解するうえで重要です。

## 関連項目

- [[windows.security-principal|Security Principal]]
- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.fsmo-roles|FSMO Roles]]
- [[windows.access-control-list|Access Control List]]
- [[windows.security-descriptor|Security Descriptor]]

## 参考文献

- [Microsoft - Security Identifiers](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-identifiers)
- [Microsoft - Access Control Overview](https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/access-control)
- [Microsoft - Flexible Single Master Operations roles](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-fsmo-roles)
- [Microsoft Open Specifications - MS-DTYP SID](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-dtyp/78eb9013-1c3a-4970-ad1f-2b1dad588a25)
