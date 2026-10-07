---
canonical_id: windows.access-mask
title: Access Mask
lang: ja
slug: access-mask
aliases:
  - ACCESS_MASK
  - Access Masks
categories:
  - Windows
status: published
summary: Windows ACCESS_MASKの32-bit構造とspecific、standard、generic access rightsとの関係を解説する。
---
> **主な出典:** [Microsoft - ACCESS_MASK](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-mask) / [Microsoft - Access Rights and Access Masks](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-rights-and-access-masks)

[[windows.access-mask|Access Mask]]は、Windowsでrequestedまたはgranted [[windows.access-rights|Access Rights]]をbitで表現する32-bit valueです。

Windows APIでは`ACCESS_MASK` data typeが`DWORD`として定義されています。

## Bit Layout

Microsoft documentationでは、Access Mask内のbit領域が複数種類のrightに割り当てられています。

- low-order 16 bits: object-specific rights
- standard-right領域: 多くのobjectで共通するstandard rights
- generic-right領域: `GENERIC_READ`、`GENERIC_WRITE`、`GENERIC_EXECUTE`、`GENERIC_ALL`
- `ACCESS_SYSTEM_SECURITY`: [[windows.system-access-control-list|SACL]] accessに関係するright

generic rightはobject typeごとにstandard / specific rightへmappingされます。

## Use in ACEs

[[windows.access-control-entry|ACE]]ではAccess Maskが、そのACEによってcontrolされるAccess Rightsを指定します。

allow ACEなら許可対象、deny ACEなら拒否対象、audit ACEならaudit対象となるrightをmaskで表現します。

## Requested and Granted Access

object handleをopenするときなど、callerは必要なAccess RightsをAccess Maskでrequestできます。

authorization結果としてgrantされたrightもAccess Maskとして表現されます。

[[windows.access-check|Access Check]] APIでもrequested accessとgranted accessはAccess Maskとして扱われます。

## Security Considerations

Access Maskを読むときは数値だけでなく、そのobject typeにおけるbit mappingを確認する必要があります。

同じgeneric rightでも、object typeによって具体的にmappingされるspecific rightは異なります。

## 関連項目

- [[windows.access-rights|Access Rights]]
- [[windows.access-control-entry|Access Control Entry]]
- [[windows.access-check|Access Check]]
- [[windows.system-access-control-list|System Access Control List]]
- [[windows.securable-object|Securable Object]]

## 参考文献

- [Microsoft - ACCESS_MASK](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-mask)
- [Microsoft - Access Rights and Access Masks](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-rights-and-access-masks)
