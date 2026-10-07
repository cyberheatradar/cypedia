---
canonical_id: windows.discretionary-access-control-list
title: Discretionary Access Control List
lang: ja
slug: discretionary-access-control-list
aliases:
  - DACL
  - DACLs
categories:
  - Windows
status: published
summary: Windows DACLのallow/deny ACE、評価順序、NULL DACLとempty DACLの違いを解説する。
---
> **主な出典:** [Microsoft - DACLs and ACEs](https://learn.microsoft.com/en-us/windows/win32/secauthz/dacls-and-aces) / [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists)

[[windows.discretionary-access-control-list|Discretionary Access Control List（DACL）]]は、[[windows.securable-object|Securable Object]]へのaccessをallowまたはdenyする[[windows.access-control-entry|ACE]]を保持するACLです。

## Access Decision

objectにDACLが存在する場合、WindowsはDACL内のACEを使ってrequested [[windows.access-rights|Access Rights]]を評価します。

Microsoft documentationでは、DACL内にallow ACEが存在しないtrusteeに対しては、そのaccessが許可されないことが説明されています。

[[windows.access-check|Access Check]]では、requesting security contextとDACL内のACEを照合してaccess decisionを行います。

## ACE Ordering

DACLではACEの順序が重要です。

Microsoftは、deny ACEをallow ACEより先に評価する必要があるcaseを示しており、ACE sequenceによってaccess granted / deniedの結果が変わり得ます。

そのためDACLを読むときは、個々のACEだけでなくorderingも確認する必要があります。

## NULL DACL and Empty DACL

NULL DACLとempty DACLは意味が正反対です。

NULL DACLでは通常のDACL security checkによる制限がなく、requested accessが許可されます。

一方、empty DACLは有効なDACLですがallow ACEを1つも持たないため、objectへのaccessを許可しません。

この2つを混同するとWindows permissionの意味を逆に解釈する可能性があります。

## Relationship with Security Descriptor

DACLは[[windows.security-descriptor|Security Descriptor]]に含まれるaccess-control componentです。

Security DescriptorにはDACL以外にもowner、primary group、[[windows.system-access-control-list|SACL]]などのsecurity informationが含まれます。

## Security Considerations

DACL reviewでは次を分離して確認する必要があります。

- allow / deny ACE
- explicit / inherited ACE
- trustee SID
- Access Mask
- ACE ordering
- NULL DACL / empty DACL

## 関連項目

- [[windows.access-control-list|Access Control List]]
- [[windows.access-control-entry|Access Control Entry]]
- [[windows.system-access-control-list|System Access Control List]]
- [[windows.security-descriptor|Security Descriptor]]
- [[windows.access-check|Access Check]]
- [[windows.access-rights|Access Rights]]
- [[windows.access-mask|Access Mask]]
- [[windows.security-identifier|Security Identifier]]

## 参考文献

- [Microsoft - DACLs and ACEs](https://learn.microsoft.com/en-us/windows/win32/secauthz/dacls-and-aces)
- [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists)
- [Microsoft - How DACLs Control Access to an Object](https://learn.microsoft.com/en-us/windows/win32/secauthz/how-dacls-control-access-to-an-object)
