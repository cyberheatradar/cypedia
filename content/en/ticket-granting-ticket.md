---
canonical_id: kerberos.ticket-granting-ticket
title: Ticket-Granting Ticket
lang: en
slug: ticket-granting-ticket
aliases:
  - TGT
categories:
  - Kerberos
status: published
summary: Kerberos Ticket-Granting Ticket issuance, TGS exchange, caching, and its KRBTGT relationship in Active Directory.
---

## Overview

> **Primary sources:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html) / [Microsoft - Ticket-Granting Tickets](https://learn.microsoft.com/en-us/windows/win32/secauthn/ticket-granting-tickets)

A Ticket-Granting Ticket ([[kerberos.ticket-granting-ticket|TGT]]) is a [[kerberos.ticket|Kerberos Ticket]] that allows a [[auth.kerberos|Kerberos]] client to request [[kerberos.service-ticket|Service Tickets]] for individual services.

After initial authentication, the client can present the TGT to the [[kerberos.ticket-granting-server|Ticket-Granting Server (TGS)]] instead of repeatedly using the user's long-term secret for each service request.

## Issuance

The TGT is issued by the [[kerberos.authentication-server|Authentication Server (AS)]] component of the [[kerberos.kdc|Key Distribution Center (KDC)]].

The client sends an AS-REQ.

When the KDC accepts the request, it returns an AS-REP containing the TGT and information concerning a [[kerberos.session-key|Session Key]] used between the client and the TGS.

## Pre-Authentication

Depending on policy and implementation, the AS exchange can require [[kerberos.pre-authentication|Pre-Authentication]].

Pre-Authentication allows the KDC to require authentication evidence before issuing the TGT.

## Ticket Cache

The client stores the TGT in its ticket cache.

While valid, the TGT can be reused to request tickets for multiple services without requiring the user's password for every service connection.

## TGS Exchange

When a Service Ticket is needed, the client sends the TGT and a [[kerberos.authenticator|Kerberos Authenticator]] to the TGS.

After validating the request, the TGS can issue a Service Ticket for the target service.

## Realm

A TGT is associated with the ticket-granting service of a [[kerberos.realm|Kerberos Realm]].

[[kerberos.cross-realm-authentication|Cross-Realm Authentication]] can involve additional TGTs that establish an authentication path between Realms.

## Active Directory

> **Primary sources:** [Microsoft - Kerberos authentication overview in Windows Server](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview) / [MS-KILE](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)

In [[ad.active-directory|Active Directory]], a [[ad.domain-controller|Domain Controller]] provides KDC functionality.

The cryptographic protection of AD DS TGTs is associated with key material belonging to the [[ad.krbtgt|KRBTGT]] account.

Windows Kerberos tickets can also carry authorization information in a [[windows.privilege-attribute-certificate|Privilege Attribute Certificate (PAC)]].

## Security Significance

A TGT is a credential used to obtain additional Kerberos tickets.

If a valid TGT is stolen, it may be abused within the constraints of its validity and the surrounding Kerberos environment.

If KRBTGT key material is compromised, attackers can potentially forge TGTs in the technique known as [[attack.golden-ticket|Golden Ticket]].

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.authentication-server|Authentication Server]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.authenticator|Authenticator]]
- [[kerberos.pre-authentication|Pre-Authentication]]
- [[kerberos.realm|Realm]]
- [[ad.krbtgt|KRBTGT]]
- [[attack.golden-ticket|Golden Ticket]]

## References

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Ticket-Granting Tickets](https://learn.microsoft.com/en-us/windows/win32/secauthn/ticket-granting-tickets)
- [Microsoft - Kerberos authentication overview in Windows Server](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
