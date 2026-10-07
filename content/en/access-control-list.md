---
canonical_id: windows.access-control-list
title: Access Control List
lang: en
slug: access-control-list
aliases:
  - ACL
categories:
  - Windows
  - Access Control
  - Active Directory
status: published
summary: Windows Access Control Lists (ACLs), ACEs, DACLs, SACLs, SIDs, and their role in Active Directory access control.
---

## Overview

An [[windows.access-control-list|Access Control List (ACL)]] is a list of Access Control Entries (ACEs) used by the Windows access control model to describe access or auditing rules for a securable object.

ACLs are stored as components of a [[windows.security-descriptor|Security Descriptor]].

## Access Control Entries

An ACL consists of zero or more ACEs.

An ACE identifies a trustee using a [[windows.security-identifier|Security Identifier (SID)]] and associates that trustee with access rules such as allow, deny, or audit behavior.

The trustee corresponds to a [[windows.security-principal|Security Principal]].

## DACL

A Discretionary Access Control List (DACL) contains ACEs that allow or deny access to a securable object.

When a process requests access, Windows evaluates the ACEs in the DACL as part of the access decision.

A missing DACL and an empty DACL have different meanings.

Microsoft documents that a NULL DACL grants full access, whereas an empty DACL grants no access because it contains no ACE that allows access.

## SACL

A System Access Control List (SACL) contains ACEs specifying how attempts to access an object are audited.

Unlike a DACL, the SACL is primarily concerned with security auditing rather than the ordinary allow or deny access decision.

## Security Descriptor Relationship

An ACL is normally associated with an object through its Security Descriptor.

The Security Descriptor can contain a DACL and SACL as well as security information such as owner and primary-group identifiers.

## Active Directory

[[ad.active-directory|Active Directory]] objects also participate in the Windows access control model.

ACLs and ACEs are therefore important when evaluating permissions such as directory-object read, write, and control access.

## Security Considerations

ACL analysis needs to account for allow and deny ACEs, inheritance, and object-specific rights rather than relying only on a simplified permission display.

The distinction between a NULL DACL and an empty DACL is particularly important because their security effects are opposite.

## Related Pages

- [[windows.security-descriptor|Security Descriptor]]
- [[windows.security-identifier|Security Identifier]]
- [[windows.security-principal|Security Principal]]
- [[ad.active-directory|Active Directory]]
- [[ad.user-account|User Account]]
- [[ad.computer-account|Computer Account]]
- [[ad.security-group|Security Group]]

- [[windows.access-control-entry|Access Control Entry]]

- [[windows.discretionary-access-control-list|Discretionary Access Control List]]

- [[windows.system-access-control-list|System Access Control List]]

- [[windows.access-rights|Access Rights]]

- [[windows.access-mask|Access Mask]]

- [[windows.access-check|Access Check]]

- [[windows.securable-object|Securable Object]]

## References

- [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists)
- [Microsoft - Parts of the Access Control Model](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-components)
- [Microsoft Open Specifications - ACL](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-dtyp/20233ed8-a6c6-4097-aafa-dd545ed24428)
- [Microsoft Open Specifications - MS-ADTS Null vs. Empty DACLs](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/ee18efbf-e8d4-4eb0-8b27-79773e96d61f)
