---
canonical_id: windows.security-descriptor
title: Security Descriptor
lang: en
slug: security-descriptor
aliases: []
categories:
  - Windows
  - Access Control
  - Active Directory
status: published
summary: Windows Security Descriptors and their owner, SID, DACL, SACL, and control information for securable objects.
---

## Overview

A [[windows.security-descriptor|Security Descriptor]] contains security information associated with a Windows securable object.

Microsoft documentation states that a Security Descriptor can include [[windows.security-identifier|Security Identifiers (SIDs)]] for the owner and primary group, a DACL, a SACL, and control bits.

## Owner and Primary Group

A Security Descriptor can contain the SID of the object's owner.

It can also contain the SID of the primary group.

These identifiers refer to [[windows.security-principal|Security Principals]] through their SIDs.

## DACL

A Discretionary Access Control List (DACL) contains rules that allow or deny access to an object for specified trustees.

A DACL is a type of [[windows.access-control-list|Access Control List (ACL)]].

## SACL

A System Access Control List (SACL) specifies which types of access attempts are audited for the object.

DACLs and SACLs are both composed of ACEs, but their purposes differ.

## Control Information

Security Descriptors contain control bits that qualify the meaning of the descriptor or its individual components.

Microsoft recommends using the Windows security APIs to retrieve and modify Security Descriptor information rather than directly manipulating internal structures.

## Active Directory

Security Descriptors are also used for access control on [[ad.active-directory|Active Directory]] objects.

Understanding directory permissions therefore requires understanding the relationship among Security Descriptors, ACLs, SIDs, and Security Principals.

## Security Descriptor String Format

Windows also defines a text representation for Security Descriptor information that can represent components such as owner, group, DACL, and SACL.

This representation is commonly associated with Security Descriptor Definition Language (SDDL).

## Security Considerations

Incorrect Security Descriptor configuration can produce excessive access or insufficient auditing.

DACL allow and deny rules, inheritance, ownership, and SACL auditing configuration should be evaluated as distinct parts of the security model.

## Related Pages

- [[windows.access-control-list|Access Control List]]
- [[windows.security-identifier|Security Identifier]]
- [[windows.security-principal|Security Principal]]
- [[ad.active-directory|Active Directory]]
- [[ad.security-group|Security Group]]

- [[windows.access-control-entry|Access Control Entry]]

- [[windows.discretionary-access-control-list|Discretionary Access Control List]]

- [[windows.system-access-control-list|System Access Control List]]

- [[windows.securable-object|Securable Object]]

## References

- [Microsoft - Security Descriptors](https://learn.microsoft.com/en-us/windows/win32/secauthz/security-descriptors)
- [Microsoft - Parts of the Access Control Model](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-components)
- [Microsoft - Security Descriptor String Format](https://learn.microsoft.com/en-us/windows/win32/secauthz/security-descriptor-string-format)
