---
canonical_id: windows.system-access-control-list
title: System Access Control List
lang: en
slug: system-access-control-list
aliases:
  - SACL
  - SACLs
categories:
  - Windows
status: published
summary: Windows SACLs, audit ACEs, success and failure auditing, and ACCESS_SYSTEM_SECURITY.
---
> **Primary sources:** [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists) / [Microsoft - Audit Generation](https://learn.microsoft.com/en-us/windows/win32/secauthz/audit-generation)

A [[windows.system-access-control-list|System Access Control List (SACL)]] specifies which attempts to access a [[windows.securable-object|Securable Object]] can be audited.

## Audit ACEs

A SACL can contain system-audit [[windows.access-control-entry|ACEs]].

An audit ACE identifies a trustee, the relevant [[windows.access-rights|Access Rights]], and whether successful attempts, failed attempts, or both should generate auditing information.

For matching access attempts, Windows can write audit records to the security event log.

## Relationship with Security Descriptor

A SACL is security information that can be contained in a [[windows.security-descriptor|Security Descriptor]].

Its purpose differs from a [[windows.discretionary-access-control-list|DACL]]. A DACL participates in ordinary allow or deny authorization, whereas a SACL is used for security auditing.

## ACCESS_SYSTEM_SECURITY

The ability to get or set an object's SACL is controlled by the `ACCESS_SYSTEM_SECURITY` access right.

Microsoft documents that this right is granted only when `SeSecurityPrivilege` is enabled in the requesting thread's [[windows.access-token|Access Token]].

This is a representative interaction between a [[windows.privilege|Windows Privilege]] and an object access right.

## Security Considerations

A SACL is not a mechanism for granting ordinary access.

Authorization and auditing should therefore be evaluated separately rather than treating DACL and SACL configuration as interchangeable.

For file-system objects, Microsoft documents that even when a matching SACL exists, no security audit event is generated for object access if the `Audit File System` policy is not configured.

## Related Pages

- [[windows.access-control-list|Access Control List]]
- [[windows.access-control-entry|Access Control Entry]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]
- [[windows.security-descriptor|Security Descriptor]]
- [[windows.access-rights|Access Rights]]
- [[windows.access-token|Windows Access Token]]
- [[windows.privilege|Windows Privilege]]

## References

- [Microsoft - Audit File System](https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/audit-file-system)

- [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists)
- [Microsoft - Audit Generation](https://learn.microsoft.com/en-us/windows/win32/secauthz/audit-generation)
- [Microsoft - SACL Access Right](https://learn.microsoft.com/en-us/windows/win32/secauthz/sacl-access-right)
- [Microsoft - Security Descriptors](https://learn.microsoft.com/en-us/windows/win32/secauthz/security-descriptors)
