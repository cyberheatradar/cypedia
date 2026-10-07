---
canonical_id: windows.access-check
title: Access Check
lang: ja
slug: access-check
aliases:
  - AccessCheck
categories:
  - Windows
status: published
summary: WindowsのAccess Check modelとAccessCheck API、Access Token、Security Descriptor、DACL評価の関係を解説する。
---
> **主な出典:** [Microsoft - How DACLs Control Access to an Object](https://learn.microsoft.com/en-us/windows/win32/secauthz/how-dacls-control-access-to-an-object) / [Microsoft - AccessCheck](https://learn.microsoft.com/en-us/windows/win32/api/securitybaseapi/nf-securitybaseapi-accesscheck)

[[windows.access-check|Access Check]]は、requesting security contextが[[windows.securable-object|Securable Object]]に対してrequested [[windows.access-rights|Access Rights]]を取得できるかを判定するauthorization処理です。

## Authorization Inputs

Windows access-control modelでは、主に次のsecurity informationが関係します。

- requesterの[[windows.access-token|Windows Access Token]]
- target objectの[[windows.security-descriptor|Security Descriptor]]
- Security Descriptor内の[[windows.discretionary-access-control-list|DACL]]
- DACL内の[[windows.access-control-entry|ACE]]
- requested [[windows.access-mask|Access Mask]]

これらを組み合わせて、requested accessをgrantできるか評価します。

## DACL Evaluation

DACLのallow / deny ACEはaccess decisionに利用されます。

ACE orderも結果へ影響し得るため、単純にallow ACEの存在だけを見るのではなくDACL全体を評価する必要があります。

NULL DACLとempty DACLも意味が異なります。NULL DACLはrequested accessを許可する一方、empty DACLにはallow ACEがないためaccessを許可しません。

## Win32 AccessCheck API

Windowsには`AccessCheck()` APIがあります。

このAPIは指定されたSecurity Descriptorが、clientを表すAccess Tokenに対してrequested rightsをgrantするかを判定し、granted accessをAccess Maskで返します。

ただしCyPediaでは、Win32 `AccessCheck()` APIをWindows内部のすべてのauthorization pathと同一視しません。本記事はauthorization modelと代表的API surfaceの関係を説明するものです。

## Auditとの違い

`AccessCheck()`自体はaudit eventを生成しません。

auditが必要な場合は、Windowsにはaudit機能を組み合わせた別API familyがあります。

## 関連項目

- [[windows.access-token|Windows Access Token]]
- [[windows.securable-object|Securable Object]]
- [[windows.security-descriptor|Security Descriptor]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]
- [[windows.access-control-entry|Access Control Entry]]
- [[windows.access-rights|Access Rights]]
- [[windows.access-mask|Access Mask]]

## 参考文献

- [Microsoft - How DACLs Control Access to an Object](https://learn.microsoft.com/en-us/windows/win32/secauthz/how-dacls-control-access-to-an-object)
- [Microsoft - AccessCheck function](https://learn.microsoft.com/en-us/windows/win32/api/securitybaseapi/nf-securitybaseapi-accesscheck)
- [Microsoft - Access Control](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control)
