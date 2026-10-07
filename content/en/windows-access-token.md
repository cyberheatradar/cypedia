---
canonical_id: windows.access-token
title: Windows Access Token
lang: en
slug: windows-access-token
aliases:
  - Windows Access Tokens
categories:
  - Windows
status: published
summary: Windows access tokens as process and thread security contexts, including SIDs, groups, privileges, and token types.
---
> **Primary sources:** [Microsoft - Access Tokens](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-tokens) / [Microsoft - Impersonation Tokens](https://learn.microsoft.com/en-us/windows/win32/secauthz/impersonation-tokens)

A [[windows.access-token|Windows Access Token]] is a Windows object describing the security context of a process or thread.

Because the term Access Token is also used by non-Windows technologies such as OAuth, CyPedia names this concept explicitly as Windows Access Token.

## Token Contents

Microsoft documents that an Access Token can contain security information including:

- the user's [[windows.security-identifier|SID]];
- group SIDs;
- a logon SID;
- [[windows.privilege|Windows Privileges]] held by the user or groups;
- owner and primary-group SIDs;
- a default DACL; and
- token-type and other security-context information.

Windows uses token information when a thread interacts with a [[windows.securable-object|Securable Object]] or attempts a system operation requiring a privilege.

## Primary Token

A process has a primary Access Token.

The primary token describes the security context of the user account associated with the process.

When a thread operates normally on behalf of that process, the process primary token supplies the requesting security context.

## Impersonation Token

A thread can impersonate a client.

An impersonating thread can have both the process primary token and an impersonation token representing the client security context.

This allows a server process to evaluate resource access using the client's security context.

## Access Check

During an [[windows.access-check|Access Check]], information such as SIDs and group membership from the Access Token is evaluated together with the target object's [[windows.security-descriptor|Security Descriptor]].

An Access Token is therefore the requesting-side security context, not simply a list of object permissions.

## Privilege State

Access Tokens also contain privilege information.

A privilege can have enabled or disabled state, so presence in a token does not necessarily mean that the privilege is currently enabled for use.

## Related Pages

- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|Security Identifier]]
- [[windows.privilege|Windows Privilege]]
- [[windows.access-check|Access Check]]
- [[windows.security-descriptor|Security Descriptor]]
- [[windows.securable-object|Securable Object]]
- [[ad.user-account|User Account]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]

## References

- [Microsoft - Access Tokens](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-tokens)
- [Microsoft - How DACLs Control Access to an Object](https://learn.microsoft.com/en-us/windows/win32/secauthz/how-dacls-control-access-to-an-object)
- [Microsoft - Impersonation Tokens](https://learn.microsoft.com/en-us/windows/win32/secauthz/impersonation-tokens)
