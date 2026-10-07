---
canonical_id: windows.securable-object
title: Securable Object
lang: en
slug: securable-object
aliases:
  - Securable Objects
categories:
  - Windows
status: published
summary: Windows securable objects that can have security descriptors, with representative object types.
---
> **Primary sources:** [Microsoft - Securable Objects](https://learn.microsoft.com/en-us/windows/win32/secauthz/securable-objects) / [Microsoft - Security Descriptors](https://learn.microsoft.com/en-us/windows/win32/secauthz/security-descriptors)

A [[windows.securable-object|Securable Object]] is a Windows object that can have a [[windows.security-descriptor|Security Descriptor]].

A Security Descriptor associates security information such as ownership and ACLs with the object.

## Representative Objects

Microsoft documents representative securable object types including:

- NTFS files and directories;
- registry keys;
- processes;
- threads;
- file-mapping objects;
- access tokens;
- window stations and desktops;
- Windows services;
- printers;
- network shares;
- synchronization objects; and
- job objects.

Directory-service objects also participate in the Windows access-control model.

## Security Descriptor

A securable object can have a Security Descriptor describing its security information.

A Security Descriptor can contain owner and primary-group information, a [[windows.discretionary-access-control-list|DACL]], and a [[windows.system-access-control-list|SACL]].

## Object-Specific Rights

Available [[windows.access-rights|Access Rights]] differ by securable object type.

Therefore, even though objects use the common Access Mask model, the meaning of specific-right bits depends on the object type.

## Access Control

When access is requested, the requester's [[windows.access-token|Windows Access Token]] and the object's Security Descriptor are important inputs to an [[windows.access-check|Access Check]].

## Security Considerations

The terms Windows object and Securable Object are not interchangeable in every context.

This article is limited to objects that can carry security descriptors and participate in Windows access control rather than attempting to document the entire Windows object taxonomy.

## Related Pages

- [[windows.security-descriptor|Security Descriptor]]
- [[windows.access-control-list|Access Control List]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]
- [[windows.system-access-control-list|System Access Control List]]
- [[windows.access-rights|Access Rights]]
- [[windows.access-token|Windows Access Token]]
- [[windows.access-check|Access Check]]
- [[windows.access-mask|Access Mask]]

## References

- [Microsoft - Securable Objects](https://learn.microsoft.com/en-us/windows/win32/secauthz/securable-objects)
- [Microsoft - Security Descriptors](https://learn.microsoft.com/en-us/windows/win32/secauthz/security-descriptors)
- [Microsoft - Access Control](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control)
