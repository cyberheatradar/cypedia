---
canonical_id: windows.access-token
title: Windows Access Token
lang: ja
slug: windows-access-token
aliases:
  - Windows Access Tokens
categories:
  - Windows
status: published
summary: Windowsのprocess/thread security contextを表すAccess Token、SID、group、Privilege、primary/impersonation tokenを解説する。
---
> **主な出典:** [Microsoft - Access Tokens](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-tokens) / [Microsoft - Impersonation Tokens](https://learn.microsoft.com/en-us/windows/win32/secauthz/impersonation-tokens)

[[windows.access-token|Windows Access Token]]は、processまたはthreadのsecurity contextを表すWindows objectです。

OAuthなど他分野にもAccess Tokenという用語が存在するため、CyPediaではWindowsのconceptを明示的にWindows Access Tokenとして扱います。

## Token Contents

Microsoft documentationでは、Access Tokenに次のようなsecurity informationが含まれると説明されています。

- user accountの[[windows.security-identifier|SID]]
- group membershipを表すgroup SID
- logon SID
- userまたはgroup由来の[[windows.privilege|Windows Privilege]]
- owner SID
- primary group SID
- default DACL
- token typeやその他のsecurity context information

この情報は、threadが[[windows.securable-object|Securable Object]]へaccessするときや、privileged system operationを要求するときに使用されます。

## Primary Token

processはprimary Access Tokenを持ちます。

primary tokenは、そのprocessに関連付けられたuser accountのsecurity contextを表します。

threadが通常のsecurity contextでobjectへaccessする場合、processのprimary tokenがauthorization判断に利用されます。

## Impersonation Token

threadはclientをimpersonateできます。

impersonating threadはprocessのprimary tokenに加え、client security contextを表すimpersonation tokenを持つことができます。

これによりserver processはclientのsecurity contextとしてresource accessを評価できます。

## Access Check

[[windows.access-check|Access Check]]では、Access Token内のSIDやgroup informationなどと、target objectの[[windows.security-descriptor|Security Descriptor]]を組み合わせてrequested accessを評価します。

Access Tokenは「permission listそのもの」ではなく、requesting security contextを表す側のinformationです。

## Privilege State

Access TokenにはPrivilege informationも含まれます。

Privilegeは保持しているだけで常に利用可能とは限らず、enabled / disabled stateを持つ場合があります。

## 関連項目

- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|Security Identifier]]
- [[windows.privilege|Windows Privilege]]
- [[windows.access-check|Access Check]]
- [[windows.security-descriptor|Security Descriptor]]
- [[windows.securable-object|Securable Object]]
- [[ad.user-account|User Account]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]

## 参考文献

- [Microsoft - Access Tokens](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-tokens)
- [Microsoft - How DACLs Control Access to an Object](https://learn.microsoft.com/en-us/windows/win32/secauthz/how-dacls-control-access-to-an-object)
- [Microsoft - Impersonation Tokens](https://learn.microsoft.com/en-us/windows/win32/secauthz/impersonation-tokens)
