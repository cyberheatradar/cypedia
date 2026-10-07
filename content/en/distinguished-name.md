---
canonical_id: ldap.distinguished-name
title: Distinguished Name
lang: en
slug: distinguished-name
aliases:
  - DN
categories:
  - Network / Protocol
  - Active Directory
status: published
summary: Distinguished Names (DNs) in LDAP and Active Directory, including RDN structure, string representation, and escaping.
---

## Overview

A [[ldap.distinguished-name|Distinguished Name (DN)]] is a name used in X.500-based directory systems to unambiguously refer to a directory entry.

RFC 4514 defines the string representation used to transfer Distinguished Names in [[protocol.ldap|LDAP]].

[[ad.active-directory|Active Directory]] also uses a DN as an identity representing an object's current location in the directory hierarchy.

## Structure

A DN is structured as a sequence of Relative Distinguished Names (RDNs).

Each RDN consists of one or more attribute type and attribute value combinations, and the sequence identifies the location of the object in the directory tree.

A representative DN is `CN=Alice,OU=Users,DC=example,DC=com`.

## Relative Distinguished Name

An RDN identifies an object relative to its parent container.

Names such as CN and [[ad.organizational-unit|Organizational Unit (OU)]] components can appear in the hierarchy.

Microsoft describes an Active Directory object's DN as being formed from the object's RDN followed by the RDNs of its ancestors up to the root.

## Active Directory Behavior

In Active Directory, the DN is the current name of the object and is unique within an [[ad.forest|Active Directory Forest]].

The DN changes when the object is renamed or moved.

It is therefore important as a directory-location name, but its behavior differs from identifiers intended to remain unchanged across renames and moves.

## String Representation

RFC 4514 defines a UTF-8 string representation for Distinguished Names used with LDAP.

RDNs are separated by commas, while a multi-valued RDN can contain multiple attribute value assertions separated by plus signs.

## Escaping

Special characters such as commas, plus signs, quotation marks, and backslashes in attribute values must be handled according to RFC 4514 escaping rules.

Leading spaces, a leading number sign, and trailing spaces also have defined escaping requirements.

## Security Considerations

Applications constructing DN strings need to handle escaping correctly.

Designs that retain object references for long periods should also account for the fact that a DN changes when an Active Directory object is moved or renamed.

## Related Pages

- [[protocol.ldap|LDAP]]
- [[ad.active-directory|Active Directory]]
- [[ad.organizational-unit|Organizational Unit]]
- [[ad.forest|Active Directory Forest]]
- [[ad.domain|Active Directory Domain]]

## References

- [RFC 4514 - Lightweight Directory Access Protocol (LDAP): String Representation of Distinguished Names](https://www.rfc-editor.org/rfc/rfc4514.html)
- [Microsoft - Object Names and Identities](https://learn.microsoft.com/en-us/windows/win32/ad/object-names-and-identities)
