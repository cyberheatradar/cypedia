---
canonical_id: windows.privilege
title: Windows Privilege
lang: ja
slug: windows-privilege
aliases:
  - Windows Privileges
categories:
  - Windows
status: published
summary: Windows Privilegeのsystem operation、Access Rightsとの差、Access Token内の状態、LUIDを解説する。
---
> **主な出典:** [Microsoft - Privileges](https://learn.microsoft.com/en-us/windows/win32/secauthz/privileges) / [Microsoft - Privilege Constants](https://learn.microsoft.com/en-us/windows/win32/secauthz/privilege-constants)

[[windows.privilege|Windows Privilege]]は、accountに割り当てられ、local computer上でsystem-related operationを実行するために利用されるrightです。

一般的な「権限」「privilege escalation」などとのsemantic collisionを避けるため、CyPediaではWindows固有conceptをWindows Privilegeとして扱います。

## Privilege and Access Rights

Windows Privilegeと[[windows.access-rights|Access Rights]]は異なります。

Access Rightsは[[windows.securable-object|Securable Object]]へのoperationを制御し、objectのDACL内のACEなどを通じてgrant / denyされます。

Windows Privilegeはsystem-related taskを実行するaccount-level rightです。

## Access Token

userがlogonすると、Windowsはそのsecurity contextに関連する[[windows.access-token|Access Token]]を生成します。

Access Tokenにはuserまたは所属groupから得られるPrivilegeのlistが含まれます。

systemがprivileged operationを評価するときは、必要なPrivilegeをtokenが保持しているか、さらにそのPrivilegeがenabledであるかを確認します。

## Enabled and Disabled State

PrivilegeはAccess Token内でenabled / disabled stateを持ちます。

Microsoft documentationでは多くのPrivilegeがdefaultでdisabledと説明されています。

したがってtoken内にPrivilegeが存在することと、そのoperationで直ちに使用可能であることは同義ではありません。

## Identifiers

Windows APIでは`SeSecurityPrivilege`などのstring constantによってPrivilegeを識別します。

一方、Privilegeを取得・調整するAPIではLUIDによってPrivilegeが識別されます。

MicrosoftはLUID valueがcomputer間、さらに同一computerのboot間でも変わり得ると説明しています。

## Security Considerations

high-impact Privilegeには、通常のDACL permissionとは異なるsecurity impactがあります。

Privilege reviewではassignmentだけでなく、実際のAccess Token内での存在とenabled stateも分けて確認する必要があります。

## 関連項目

- [[windows.access-token|Windows Access Token]]
- [[windows.access-rights|Access Rights]]
- [[windows.securable-object|Securable Object]]
- [[windows.system-access-control-list|System Access Control List]]
- [[windows.access-control-entry|Access Control Entry]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]

## 参考文献

- [Microsoft - Privileges](https://learn.microsoft.com/en-us/windows/win32/secauthz/privileges)
- [Microsoft - Privilege Constants](https://learn.microsoft.com/en-us/windows/win32/secauthz/privilege-constants)
- [Microsoft - Access Tokens](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-tokens)
