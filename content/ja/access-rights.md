---
canonical_id: windows.access-rights
title: Access Rights
lang: ja
slug: access-rights
aliases:
  - Access Right
categories:
  - Windows
status: published
summary: Windows securable objectに対するAccess Rightsとstandard/object-specific rights、Access Maskとの関係を解説する。
---
> **主な出典:** [Microsoft - Access Rights and Access Masks](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-rights-and-access-masks) / [Microsoft - Standard Access Rights](https://learn.microsoft.com/en-us/windows/win32/secauthz/standard-access-rights)

[[windows.access-rights|Access Rights]]は、threadが[[windows.securable-object|Securable Object]]に対して実行できるoperationを表すWindows access-control概念です。

## Object-Specific Rights

object typeごとに、そのobject固有のoperationを表すAccess Rightがあります。

例えばfile、registry key、process、directory-service objectなどでは、それぞれ異なるspecific rightが定義されます。

## Standard Rights

Windowsは多くのSecurable Objectで共通するstandard access rightsも定義しています。

代表例には`DELETE`、`READ_CONTROL`、`WRITE_DAC`、`WRITE_OWNER`などがあります。

`WRITE_DAC`は[[windows.security-descriptor|Security Descriptor]]内の[[windows.discretionary-access-control-list|DACL]]を変更するright、`WRITE_OWNER`はownerを変更するrightです。

## Access Mask

Access Rightsは[[windows.access-mask|Access Mask]]のbitとして表現されます。

threadがobject handleをopenするときなどに、必要なAccess RightsをAccess Maskとしてrequestします。

[[windows.access-control-entry|ACE]]でもAccess Maskによってallow / deny / audit対象となるrightが指定されます。

## Access Rights and Privileges

Access Rightsと[[windows.privilege|Windows Privilege]]は別概念です。

Access RightsはSecurable Objectへのoperationを制御します。

Windows Privilegeはsystem-related operationを実行するaccount-level rightであり、object DACLから与えられるAccess Rightsとは異なります。

## Security Considerations

必要以上のAccess Rightsをrequestまたはgrantすると、意図しないoperationを許可する可能性があります。

object typeごとのspecific rightまで確認し、`GENERIC_ALL`やfull-control相当の表示だけで判断しないことが重要です。

## 関連項目

- [[windows.access-mask|Access Mask]]
- [[windows.access-control-entry|Access Control Entry]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]
- [[windows.securable-object|Securable Object]]
- [[windows.privilege|Windows Privilege]]

## 参考文献

- [Microsoft - Access Rights and Access Masks](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-rights-and-access-masks)
- [Microsoft - Standard Access Rights](https://learn.microsoft.com/en-us/windows/win32/secauthz/standard-access-rights)
- [Microsoft - Access Control Entries](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-entries)
