---
canonical_id: windows.privilege
title: Windows Privilege
lang: en
slug: windows-privilege
aliases:
  - Windows Privileges
categories:
  - Windows
status: published
summary: Windows privileges for system operations, their distinction from access rights, token state, and LUID identifiers.
---
> **Primary sources:** [Microsoft - Privileges](https://learn.microsoft.com/en-us/windows/win32/secauthz/privileges) / [Microsoft - Privilege Constants](https://learn.microsoft.com/en-us/windows/win32/secauthz/privilege-constants)

A [[windows.privilege|Windows Privilege]] is a right assigned to an account for performing system-related operations on the local computer.

To avoid semantic collision with generic privilege terminology and attack concepts such as privilege escalation, CyPedia names this Windows-specific concept Windows Privilege.

## Privileges and Access Rights

Windows Privileges and [[windows.access-rights|Access Rights]] are different concepts.

Access Rights control operations on a [[windows.securable-object|Securable Object]] and are granted or denied through object access-control information such as DACL ACEs.

A Windows Privilege is an account-level right for performing a system-related task.

## Access Tokens

When a user logs on, Windows creates an [[windows.access-token|Access Token]] representing the associated security context.

The token contains a list of privileges derived from the user and applicable group accounts.

When a privileged operation is requested, Windows checks whether the required privilege is present and whether it is enabled.

## Enabled and Disabled State

Privileges can have enabled or disabled state in an Access Token.

Microsoft documents that most privileges are disabled by default.

Presence of a privilege in a token therefore does not necessarily mean it is currently enabled for use.

## Identifiers

Windows defines string constants such as `SeSecurityPrivilege` for named privileges.

APIs that retrieve or adjust token privileges use LUID values to identify privileges.

Microsoft notes that a privilege's LUID value can vary between computers and even between boots on the same computer.

## Security Considerations

Some Windows Privileges can have high security impact independently of ordinary DACL permissions.

Privilege review should therefore distinguish account assignment, presence in the effective Access Token, and enabled state.

## Related Pages

- [[windows.access-token|Windows Access Token]]
- [[windows.access-rights|Access Rights]]
- [[windows.securable-object|Securable Object]]
- [[windows.system-access-control-list|System Access Control List]]
- [[windows.access-control-entry|Access Control Entry]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]

## References

- [Microsoft - Privileges](https://learn.microsoft.com/en-us/windows/win32/secauthz/privileges)
- [Microsoft - Privilege Constants](https://learn.microsoft.com/en-us/windows/win32/secauthz/privilege-constants)
- [Microsoft - Access Tokens](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-tokens)
