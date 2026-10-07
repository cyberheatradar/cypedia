---
canonical_id: protocol.ldap
title: LDAP
lang: en
slug: ldap
aliases:
  - Lightweight Directory Access Protocol
categories:
  - Network / Protocol
  - Active Directory
status: published
summary: LDAP directory models, Bind/Search/Modify operations, DNs, Active Directory use, signing, TLS, and channel binding.
---

## Overview

> **Primary source:** [RFC 4511 - Lightweight Directory Access Protocol (LDAP): The Protocol](https://www.rfc-editor.org/rfc/rfc4511.html)

[[protocol.ldap|Lightweight Directory Access Protocol (LDAP)]] is an application protocol used to access directory services.

RFC 4511 defines LDAP protocol elements, semantics, and encodings.

LDAP is not specific to one directory product and is based on directory concepts derived from the X.500 model.

## Directory Model

An LDAP directory is represented as a collection of entries.

Each entry has a Distinguished Name (DN) and contains attributes and attribute values.

A directory schema constrains the object classes and attributes that can exist.

In [[ad.active-directory|Active Directory]], the [[ad.schema|Active Directory Schema]] defines directory object classes and attributes.

## Distinguished Names

A DN identifies an entry in the directory tree.

It is composed hierarchically from Relative Distinguished Names (RDNs).

AD DS objects such as users, computers, and OUs can be addressed through LDAP DNs.

## Core Operations

RFC 4511 defines operations including:

- Bind;
- Unbind;
- Search;
- Modify;
- Add;
- Delete;
- Modify DN;
- Compare;
- Abandon;
- Extended Operation.

Search requests specify information such as a base object, scope, filter, and requested attributes.

## Bind

The Bind operation establishes authentication information for an LDAP session.

LDAP supports simple authentication and SASL mechanisms.

Authentication and authorization are distinct: after authentication, server policy determines which directory objects and attributes the identity may access.

## Active Directory

> **Primary source:** [Microsoft - Active Directory Domain Services](https://learn.microsoft.com/en-us/windows/win32/ad/active-directory-domain-services)

A [[ad.domain-controller|Domain Controller]] exposes LDAP interfaces for AD DS directory data.

LDAP can be used to search, read, and modify users, computers, groups, OUs, and configuration objects where authorization permits.

AD DS directory state is separated into [[ad.directory-partition|Directory Partitions]], which also define important replication scopes.

The [[ad.global-catalog|Global Catalog]] supports directory searches using a replica model and attribute set that differ from a full Domain partition replica.

## LDAP Signing

> **Primary source:** [Microsoft - LDAP signing for Active Directory Domain Services](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/ldap-signing)

LDAP signing provides cryptographic integrity protection for LDAP communication in AD DS.

Allowing unsigned LDAP traffic increases exposure to network tampering and man-in-the-middle attacks.

Microsoft provides policy and event-monitoring mechanisms for deploying and auditing LDAP signing requirements.

## TLS and Channel Binding

LDAP can use TLS to provide confidentiality and server authentication.

RFC 4511 defines the StartTLS extended operation.

AD DS also supports LDAP channel binding, which binds application-layer authentication to the TLS channel.

## Security Considerations

Important practices include:

- avoiding unnecessary unsigned LDAP;
- not exposing credentials over unprotected channels;
- validating TLS certificates correctly;
- auditing compatibility before enforcing signing and channel binding;
- applying least privilege to directory permissions.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.schema|Active Directory Schema]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.global-catalog|Global Catalog]]
- [[ad.organizational-unit|Organizational Unit]]
- [[windows.security-principal|Security Principal]]
- [[ad.domain|Active Directory Domain]]
- [[ldap.distinguished-name|Distinguished Name]]
- [[windows.access-control-list|Access Control List]]

## References

- [RFC 4510 - LDAP: Technical Specification Road Map](https://www.rfc-editor.org/rfc/rfc4510.html)
- [RFC 4511 - LDAP: The Protocol](https://www.rfc-editor.org/rfc/rfc4511.html)
- [RFC 4512 - LDAP: Directory Information Models](https://www.rfc-editor.org/rfc/rfc4512.html)
- [RFC 4513 - LDAP: Authentication Methods and Security Mechanisms](https://www.rfc-editor.org/rfc/rfc4513.html)
- [Microsoft - LDAP signing for Active Directory Domain Services](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/ldap-signing)
- [Microsoft - LDAP channel binding overview for Active Directory Domain Services](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/ldap-channel-binding)
