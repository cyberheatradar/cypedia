---
canonical_id: windows.access-control-entry
title: Access Control Entry
lang: ja
slug: access-control-entry
aliases:
  - ACE
  - ACEs
categories:
  - Windows
status: published
summary: Windows Access Control Entry（ACE）の構造、SID、Access Mask、ACE type、inheritanceを解説する。
---
> **主な出典:** [Microsoft - Access Control Entries](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-entries) / [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists)

[[windows.access-control-entry|Access Control Entry（ACE）]]は、[[windows.access-control-list|Access Control List（ACL）]]を構成するentryです。1つのACLは0個以上のACEを持つことができ、各ACEは特定のtrusteeに対するaccess controlまたはaudit ruleを表します。

## Core Fields

Microsoft documentationでは、ACEには少なくとも次のaccess-control informationが含まれると説明されています。

- trusteeを識別する[[windows.security-identifier|Security Identifier（SID）]]
- ACEが制御する[[windows.access-rights|Access Rights]]を表す[[windows.access-mask|Access Mask]]
- ACE type
- child objectへのinheritanceを制御するflag

このためACEを評価するときは、「誰に」「どのrightを」「allow / deny / auditのどの意味で」「どの範囲へ継承するか」を分離して確認する必要があります。

## ACE Types

多くのWindows [[windows.securable-object|Securable Object]]で利用される代表的なtypeには、access-allowed ACE、access-denied ACE、system-audit ACEがあります。

access-allowed / access-denied ACEは[[windows.discretionary-access-control-list|DACL]]でaccess decisionに使用され、system-audit ACEは[[windows.system-access-control-list|SACL]]でaudit対象を定義します。

Microsoftはdirectory service object向けにobject-specific ACEも定義しています。これらはobject typeやproperty setなどをより細かく指定できる仕組みですが、本記事では全subtypeの列挙までは扱いません。

## Inheritance

ACE flagはchild containerやchild objectがACEをinheritできるかを制御します。

inheritanceは単にACEをcopyするだけではなく、container / non-containerの違いやinheritance flagの組み合わせによって結果が変わります。そのためACL reviewではexplicit ACEとinherited ACEを区別する必要があります。

## Security Considerations

DACLではACEの順序がaccess decisionに影響します。特にdeny ACEとallow ACEの関係を評価するときは、単純なpermission一覧だけで判断しないことが重要です。

Active Directory permissionではobject-specific ACEも利用されるため、将来的なAD permission clusterではACE type、object GUID、inheritance scopeをさらに詳細化します。

## 関連項目

- [[windows.access-control-list|Access Control List]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]
- [[windows.system-access-control-list|System Access Control List]]
- [[windows.security-identifier|Security Identifier]]
- [[windows.access-mask|Access Mask]]
- [[windows.access-rights|Access Rights]]
- [[windows.securable-object|Securable Object]]
- [[ad.active-directory|Active Directory]]

## 参考文献

- [Microsoft - Access Control Entries](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-entries)
- [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists)
