---
canonical_id: windows.discretionary-access-control-list
title: Discretionary Access Control List
lang: en
slug: discretionary-access-control-list
aliases:
  - DACL
  - DACLs
categories:
  - Windows
status: published
summary: Windows DACLs, allow and deny ACEs, evaluation order, and the distinction between NULL and empty DACLs.
---
> **Primary sources:** [Microsoft - DACLs and ACEs](https://learn.microsoft.com/en-us/windows/win32/secauthz/dacls-and-aces) / [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists)

A [[windows.discretionary-access-control-list|Discretionary Access Control List (DACL)]] is an ACL containing [[windows.access-control-entry|ACEs]] that allow or deny access to a [[windows.securable-object|Securable Object]].

## Access Decision

When an object has a DACL, Windows uses ACEs in that DACL when evaluating requested [[windows.access-rights|Access Rights]].

Microsoft documents that access not explicitly allowed by applicable allow ACEs is not granted to the trustee.

During an [[windows.access-check|Access Check]], the requesting security context is evaluated against applicable DACL entries.

## ACE Ordering

ACE order matters in a DACL.

Microsoft documents cases where an access-denied ACE needs to appear before an access-allowed ACE. Because ACEs are processed in sequence, ordering can change whether requested access is granted or denied.

A DACL review therefore needs to consider both the contents and the order of ACEs.

## NULL DACL and Empty DACL

A NULL DACL and an empty DACL have opposite security semantics.

A NULL DACL permits full access because ordinary DACL restrictions are not applied.

An empty DACL is a valid DACL containing no ACE that grants access, so it grants no access to the object.

Confusing the two can invert the interpretation of an object's security configuration.

## Relationship with Security Descriptor

A DACL is an access-control component of a [[windows.security-descriptor|Security Descriptor]].

A Security Descriptor can also contain owner information, a primary-group identifier, and a [[windows.system-access-control-list|SACL]].

## Security Considerations

A useful DACL review separates:

- allow and deny ACEs;
- explicit and inherited ACEs;
- trustee SIDs;
- Access Masks;
- ACE ordering; and
- NULL versus empty DACL behavior.

## Related Pages

- [[windows.access-control-list|Access Control List]]
- [[windows.access-control-entry|Access Control Entry]]
- [[windows.system-access-control-list|System Access Control List]]
- [[windows.security-descriptor|Security Descriptor]]
- [[windows.access-check|Access Check]]
- [[windows.access-rights|Access Rights]]
- [[windows.access-mask|Access Mask]]
- [[windows.security-identifier|Security Identifier]]

## References

- [Microsoft - DACLs and ACEs](https://learn.microsoft.com/en-us/windows/win32/secauthz/dacls-and-aces)
- [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists)
- [Microsoft - How DACLs Control Access to an Object](https://learn.microsoft.com/en-us/windows/win32/secauthz/how-dacls-control-access-to-an-object)
