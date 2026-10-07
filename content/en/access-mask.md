---
canonical_id: windows.access-mask
title: Access Mask
lang: en
slug: access-mask
aliases:
  - ACCESS_MASK
  - Access Masks
categories:
  - Windows
status: published
summary: The Windows ACCESS_MASK 32-bit representation for specific, standard, and generic access rights.
---
> **Primary sources:** [Microsoft - ACCESS_MASK](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-mask) / [Microsoft - Access Rights and Access Masks](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-rights-and-access-masks)

An [[windows.access-mask|Access Mask]] is a 32-bit value used by Windows to represent requested or granted [[windows.access-rights|Access Rights]].

The Windows API defines the `ACCESS_MASK` data type as a `DWORD`.

## Bit Layout

Microsoft documents multiple classes of rights within the Access Mask format.

- low-order bits represent object-specific rights;
- another region represents standard rights shared across many object types;
- high-order generic-right bits include `GENERIC_READ`, `GENERIC_WRITE`, `GENERIC_EXECUTE`, and `GENERIC_ALL`; and
- `ACCESS_SYSTEM_SECURITY` is associated with access to a [[windows.system-access-control-list|SACL]].

Generic rights are mapped to standard and object-specific rights according to the object type.

## Use in ACEs

An [[windows.access-control-entry|ACE]] uses an Access Mask to identify the Access Rights controlled by the ACE.

For example, an allow ACE identifies rights being allowed, a deny ACE identifies rights being denied, and an audit ACE identifies rights being monitored.

## Requested and Granted Access

When opening an object handle, a caller can request required Access Rights through an Access Mask.

Authorization results can also represent granted rights as an Access Mask.

The [[windows.access-check|Access Check]] API uses Access Masks for desired and granted access.

## Security Considerations

An Access Mask needs to be interpreted in the context of the associated object type.

A generic bit can map to different specific rights for different securable object types.

## Related Pages

- [[windows.access-rights|Access Rights]]
- [[windows.access-control-entry|Access Control Entry]]
- [[windows.access-check|Access Check]]
- [[windows.system-access-control-list|System Access Control List]]
- [[windows.securable-object|Securable Object]]

## References

- [Microsoft - ACCESS_MASK](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-mask)
- [Microsoft - Access Rights and Access Masks](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-rights-and-access-masks)
