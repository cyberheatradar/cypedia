---
canonical_id: windows.access-rights
title: Access Rights
lang: en
slug: access-rights
aliases:
  - Access Right
categories:
  - Windows
status: published
summary: Windows access rights for securable objects, including standard and object-specific rights and their representation in access masks.
---
> **Primary sources:** [Microsoft - Access Rights and Access Masks](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-rights-and-access-masks) / [Microsoft - Standard Access Rights](https://learn.microsoft.com/en-us/windows/win32/secauthz/standard-access-rights)

[[windows.access-rights|Access Rights]] represent operations that a thread can perform on a [[windows.securable-object|Securable Object]].

## Object-Specific Rights

Different object types define rights corresponding to operations specific to those objects.

Files, registry keys, processes, and directory-service objects therefore expose different specific rights.

## Standard Rights

Windows also defines standard access rights shared by many securable object types.

Representative examples include `DELETE`, `READ_CONTROL`, `WRITE_DAC`, and `WRITE_OWNER`.

`WRITE_DAC` controls modification of the [[windows.discretionary-access-control-list|DACL]] in a [[windows.security-descriptor|Security Descriptor]], while `WRITE_OWNER` controls changing the object's owner.

## Access Masks

Access Rights are represented as bits in an [[windows.access-mask|Access Mask]].

When opening a handle to an object, a thread can request required rights through an Access Mask.

An [[windows.access-control-entry|ACE]] also uses an Access Mask to specify which rights are allowed, denied, or audited.

## Access Rights and Privileges

Access Rights and [[windows.privilege|Windows Privileges]] are separate concepts.

Access Rights control operations on securable objects.

A Windows Privilege is an account-level right for system-related operations and is not simply an object permission granted by a DACL.

## Security Considerations

Requesting or granting more Access Rights than required can enable unintended operations.

Security review therefore needs to consider the specific rights defined for the relevant object type instead of relying only on labels such as full control.

## Related Pages

- [[windows.access-mask|Access Mask]]
- [[windows.access-control-entry|Access Control Entry]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]
- [[windows.securable-object|Securable Object]]
- [[windows.privilege|Windows Privilege]]

## References

- [Microsoft - Access Rights and Access Masks](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-rights-and-access-masks)
- [Microsoft - Standard Access Rights](https://learn.microsoft.com/en-us/windows/win32/secauthz/standard-access-rights)
- [Microsoft - Access Control Entries](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-entries)
