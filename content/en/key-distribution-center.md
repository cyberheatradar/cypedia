---
canonical_id: kerberos.kdc
title: Key Distribution Center
lang: en
slug: key-distribution-center
aliases:
  - KDC
categories:
  - Kerberos
status: published
summary: Kerberos Key Distribution Center AS/TGS services, ticket and session-key issuance, Realm trust, and Active Directory implementation.
---

## Overview

> **Primary source:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

The Key Distribution Center ([[kerberos.kdc|KDC]]) is the central trusted service in [[auth.kerberos|Kerberos]].

A KDC supplies [[kerberos.ticket|tickets]] and temporary [[kerberos.session-key|Session Keys]] and supports authentication of [[kerberos.principal|principals]] registered in a [[kerberos.realm|Realm]].

## AS and TGS

A KDC logically provides two services:

- [[kerberos.authentication-server|Authentication Server (AS)]];
- [[kerberos.ticket-granting-server|Ticket-Granting Server (TGS)]].

The AS performs initial authentication and issues a [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket (TGT)]].

The TGS accepts a valid TGT and can issue a [[kerberos.service-ticket|Service Ticket]] for a target service.

## Account Database

The KDC requires access to information about principals in its Realm and to the long-term keys required by the protocol.

The KDC is therefore a highly trusted component of a Kerberos Realm.

## Session Keys

The KDC creates and distributes temporary Session Keys for Kerberos exchanges.

Different Session Keys are used between the client and TGS and between the client and application services.

## Active Directory

> **Primary source:** [Microsoft - Key Distribution Center](https://learn.microsoft.com/en-us/windows/win32/secauthn/key-distribution-center)

In [[ad.active-directory|Active Directory]], the KDC is implemented as a domain service on a [[ad.domain-controller|Domain Controller]].

It uses Active Directory as its account database.

Microsoft also documents use of the [[ad.global-catalog|Global Catalog]] for referrals to KDCs in other [[ad.domain|Domains]].

## Availability

Multiple Domain Controllers can handle KDC requests in an AD DS Domain.

This provides availability for authentication and ticket-granting operations.

## Security Significance

A KDC participates in management of principal key information and ticket issuance.

Compromise of the KDC or critical KDC key material can undermine authentication trust throughout the Realm.

In Active Directory, [[ad.krbtgt|KRBTGT]] key material is especially important to TGT security.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.authentication-server|Authentication Server]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.realm|Realm]]
- [[kerberos.principal|Principal]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.krbtgt|KRBTGT]]

## References

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Key Distribution Center](https://learn.microsoft.com/en-us/windows/win32/secauthn/key-distribution-center)
- [Microsoft - Kerberos authentication overview in Windows Server](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
