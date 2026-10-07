---
canonical_id: kerberos.cross-realm-authentication
title: Cross-Realm Authentication
lang: en
slug: cross-realm-authentication
aliases:
  - cross-realm authentication
categories:
  - Kerberos
status: published
summary: Kerberos Cross-Realm Authentication, inter-realm trust, referral TGTs, authentication paths, and Active Directory trusts.
---

## Overview

> **Primary source:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

[[kerberos.cross-realm-authentication|Cross-Realm Authentication]] allows a client in one [[kerberos.realm|Kerberos Realm]] to authenticate to a service in another Realm.

It relies on trust relationships and inter-realm key material to establish an authentication path.

## Inter-Realm Principals

A Realm trust uses inter-realm [[kerberos.principal|Principals]] representing ticket-granting services together with shared inter-realm key material.

This allows a [[kerberos.kdc|KDC]] to issue a [[kerberos.ticket-granting-ticket|TGT]] leading toward another Realm.

## Authentication Path

When the home Realm and target Realm do not have a direct trust relationship, an authentication path through intermediate Realms can be used.

The client obtains cross-realm or referral TGTs along the path and eventually obtains a [[kerberos.service-ticket|Service Ticket]] for the target service.

## Referrals

Kerberos implementations can determine that the requested service belongs to another Realm and refer the client toward an appropriate KDC.

This reduces the need for the client to know every intermediate Realm in advance.

## Active Directory

> **Primary source:** [MS-KILE - Cross-Domain Trust and Referrals](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/bac4dc69-352d-416c-a9f4-730b81ababb3)

In [[ad.active-directory|Active Directory]], Kerberos authentication across [[ad.domain|Domains]] relies on [[ad.trust|Trust]] relationships.

Windows KDCs derive cross-domain trust information from Trusted Domain Objects and can issue referral TGTs when required.

## Forests

Domains in the same [[ad.forest|Active Directory Forest]] have automatic two-way transitive trusts.

Kerberos referral paths can also cross Forest boundaries where an appropriate Forest Trust exists.

## Security Considerations

Cross-Realm Authentication extends authentication between Realms through configured trust relationships and inter-realm key material.

Important controls include:

- inter-realm key protection;
- trust configuration;
- trust direction;
- Windows trust protections such as SID filtering where applicable;
- correct target-service identity.

Abuse of a trusted authentication path can allow compromise to extend beyond one Realm or Domain.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.realm|Realm]]
- [[kerberos.principal|Principal]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[ad.domain|Active Directory Domain]]
- [[ad.forest|Active Directory Forest]]
- [[ad.trust|Active Directory Trust]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[windows.security-identifier|SID]]

## References

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [MS-KILE - Cross-Domain Trust and Referrals](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/bac4dc69-352d-416c-a9f4-730b81ababb3)
- [MS-ADTS - Kerberos Usages of trustAuthInfo Attributes](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/cd20fbd1-eabe-4da2-bba3-31ab3036d019)
- [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)
