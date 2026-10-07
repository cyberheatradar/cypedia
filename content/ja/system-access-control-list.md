---
canonical_id: windows.system-access-control-list
title: System Access Control List
lang: ja
slug: system-access-control-list
aliases:
  - SACL
  - SACLs
categories:
  - Windows
status: published
summary: Windows SACLのaudit ACE、success/failure auditing、ACCESS_SYSTEM_SECURITYとの関係を解説する。
---
> **主な出典:** [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists) / [Microsoft - Audit Generation](https://learn.microsoft.com/en-us/windows/win32/secauthz/audit-generation)

[[windows.system-access-control-list|System Access Control List（SACL）]]は、[[windows.securable-object|Securable Object]]へのどのaccess attemptをaudit対象とするかを指定するACLです。

## Audit ACE

SACLはsystem-audit [[windows.access-control-entry|ACE]]を保持できます。

各audit ACEはtrustee、対象となる[[windows.access-rights|Access Rights]]、およびsuccessful attempt / failed attemptのどちらをauditするかを指定できます。

条件に一致したaccess attemptについて、Windowsはsecurity event logへaudit recordを生成できます。

## Relationship with Security Descriptor

SACLは[[windows.security-descriptor|Security Descriptor]]に含めることができるsecurity informationです。

通常のallow / deny access decisionを担う[[windows.discretionary-access-control-list|DACL]]とは目的が異なり、SACLはsecurity auditingに使用されます。

## ACCESS_SYSTEM_SECURITY

SACLを取得または設定する能力は`ACCESS_SYSTEM_SECURITY` Access Rightによって制御されます。

Microsoft documentationでは、このrightを取得するにはrequesting threadの[[windows.access-token|Access Token]]で`SeSecurityPrivilege`がenabledである必要があると説明されています。

これは[[windows.privilege|Windows Privilege]]とobject access rightが組み合わさる代表例です。

## Security Considerations

SACLは「permissionを許可する仕組み」ではありません。

DACLとSACLを混同せず、access authorizationとaudit policyを別の観点として評価する必要があります。

File system objectについてMicrosoftは、matching SACLが存在していても、`Audit File System` policyが構成されていなければ該当object accessのsecurity audit eventは生成されないと説明しています。

## 関連項目

- [[windows.access-control-list|Access Control List]]
- [[windows.access-control-entry|Access Control Entry]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]
- [[windows.security-descriptor|Security Descriptor]]
- [[windows.access-rights|Access Rights]]
- [[windows.access-token|Windows Access Token]]
- [[windows.privilege|Windows Privilege]]

## 参考文献

- [Microsoft - Audit File System](https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/audit-file-system)

- [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists)
- [Microsoft - Audit Generation](https://learn.microsoft.com/en-us/windows/win32/secauthz/audit-generation)
- [Microsoft - SACL Access Right](https://learn.microsoft.com/en-us/windows/win32/secauthz/sacl-access-right)
- [Microsoft - Security Descriptors](https://learn.microsoft.com/en-us/windows/win32/secauthz/security-descriptors)
