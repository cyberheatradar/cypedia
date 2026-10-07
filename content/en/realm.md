---
canonical_id: kerberos.realm
title: Realm
lang: en
slug: realm
aliases:
  - realm
categories:
  - Kerberos
status: published
summary: Kerberos Realms as authentication administrative domains, Principal namespaces, KDC scopes, and cross-realm relationships.
---

## Overview

> **Primary source:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

A [[kerberos.realm|Realm]] is an authentication administrative domain in [[auth.kerberos|Kerberos]].

A Realm is associated with [[kerberos.principal|Principals]] and the [[kerberos.kdc|Key Distribution Center (KDC)]] responsible for their authentication.

## Realm Names

A Realm name forms part of the namespace used to identify Kerberos Principals.

DNS-style names are commonly used for Realms, but a Kerberos Realm and a DNS namespace are not conceptually the same object.

## Principals

A Principal is identified in conjunction with its Realm.

For example, a displayed identity can take the form `user@EXAMPLE.COM`.

The same local Principal name can exist in separate Realms and represent different identities.

## KDC

A Realm has KDC infrastructure responsible for its Principal database and Kerberos authentication.

The KDC provides [[kerberos.authentication-server|Authentication Server]] and [[kerberos.ticket-granting-server|Ticket-Granting Server]] functionality.

## Cross-Realm Authentication

[[kerberos.cross-realm-authentication|Cross-Realm Authentication]] allows authentication relationships between Realms.

Inter-realm keys and authentication paths can be used to obtain tickets required to reach services in another Realm.

## Active Directory

In [[ad.active-directory|Active Directory]], Microsoft describes a Kerberos Realm as the authentication administrative domain corresponding to a Windows [[ad.domain|Domain]].

RFC 4120 recommends, by convention, converting an Internet domain name to uppercase when establishing a domain-style Realm name from it.

Kerberos Realms, however, are not specific to Active Directory.

## Trusts

[[ad.trust|Active Directory Trusts]] are important when Windows KDCs construct referrals to other Domains.

Trusted-domain information allows a KDC to issue referral TGTs for authentication paths across Domain boundaries.

## Security Considerations

Cross-Realm authentication crosses authentication boundaries.

Inter-realm keys, trust configuration, and Realm mapping therefore require careful protection and configuration.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.principal|Principal]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.cross-realm-authentication|Cross-Realm Authentication]]
- [[ad.domain|Active Directory Domain]]
- [[ad.trust|Active Directory Trust]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[protocol.dns|DNS]]

## References

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Key Distribution](https://learn.microsoft.com/en-us/windows/win32/secauthn/key-distribution)
- [MS-KILE - Cross-Domain Trust and Referrals](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/bac4dc69-352d-416c-a9f4-730b81ababb3)
