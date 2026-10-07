---
canonical_id: windows.access-control-entry
title: Access Control Entry
lang: en
slug: access-control-entry
aliases:
  - ACE
  - ACEs
categories:
  - Windows
status: published
summary: Windows Access Control Entry (ACE), including trustees, access masks, ACE types, and inheritance.
---
> **Primary sources:** [Microsoft - Access Control Entries](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-entries) / [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists)

An [[windows.access-control-entry|Access Control Entry (ACE)]] is an entry in an [[windows.access-control-list|Access Control List (ACL)]]. An ACL can contain zero or more ACEs, and each ACE represents access-control or auditing information for a specified trustee.

## Core Fields

Microsoft documents the following core access-control information in an ACE:

- a [[windows.security-identifier|Security Identifier (SID)]] identifying the trustee;
- an [[windows.access-mask|Access Mask]] specifying the [[windows.access-rights|Access Rights]] controlled by the ACE;
- an ACE type; and
- flags controlling inheritance by child containers or objects.

An ACE therefore needs to be interpreted in terms of who it applies to, which rights it controls, whether it allows, denies, or audits activity, and how inheritance changes its scope.

## ACE Types

Representative ACE types supported by securable objects include access-allowed ACEs, access-denied ACEs, and system-audit ACEs.

Allow and deny ACEs participate in a [[windows.discretionary-access-control-list|DACL]]. System-audit ACEs are used in a [[windows.system-access-control-list|SACL]].

Windows also defines object-specific ACEs for directory-service objects. Those ACEs can express finer-grained object or property-related scope, but a full subtype catalog is outside this article.

## Inheritance

ACE flags control whether and how an ACE can be inherited by child containers or child objects.

Inheritance behavior differs according to the combination of inheritance flags and the type of child object, so ACL review should distinguish explicit ACEs from inherited ACEs.

## Security Considerations

ACE ordering can affect a DACL access decision. In particular, deny and allow behavior should not be evaluated only from a simplified permission summary.

Active Directory permissions also use object-specific ACEs. Detailed directory-service object rights and object GUID semantics are deferred to a later Active Directory permissions cluster.

## Related Pages

- [[windows.access-control-list|Access Control List]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]
- [[windows.system-access-control-list|System Access Control List]]
- [[windows.security-identifier|Security Identifier]]
- [[windows.access-mask|Access Mask]]
- [[windows.access-rights|Access Rights]]
- [[windows.securable-object|Securable Object]]
- [[ad.active-directory|Active Directory]]

## References

- [Microsoft - Access Control Entries](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-entries)
- [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists)
