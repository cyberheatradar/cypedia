---
canonical_id: kerberos.ticket
title: Kerberos Ticket
lang: en
slug: kerberos-ticket
aliases:
  - Ticket
  - ticket
categories:
  - Kerberos
status: published
summary: Kerberos Ticket structure, encrypted contents, lifetime, and the distinction between TGTs and Service Tickets.
---

## Overview

> **Primary source:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

A [[kerberos.ticket|Kerberos Ticket]] is a credential component issued by a [[kerberos.kdc|Key Distribution Center (KDC)]] and presented as part of authentication to a service.

Kerberos combines a ticket with a corresponding [[kerberos.session-key|Session Key]] during authentication exchanges.

## Basic Structure

The RFC 4120 Ticket structure contains information including:

- protocol version;
- [[kerberos.realm|Realm]];
- server [[kerberos.principal|Principal]];
- an encrypted part.

The encrypted part can contain ticket flags, a Session Key, client identity, time information, and authorization data.

## Encryption

The encrypted portion of a ticket is protected with long-term key material available to the target service.

A client therefore does not normally need to decrypt the service-protected portion of the ticket.

The client separately receives the Session Key needed for the associated authentication exchange.

## Ticket-Granting Ticket

A [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket (TGT)]] is a ticket for the ticket-granting service.

The client presents the TGT to the [[kerberos.ticket-granting-server|Ticket-Granting Server (TGS)]] to request tickets for individual services.

## Service Ticket

A [[kerberos.service-ticket|Service Ticket]] is intended for a particular application service.

The client presents the Service Ticket together with a [[kerberos.authenticator|Kerberos Authenticator]] to the target service.

## Lifetime

Tickets include time and flag information governing when they can be used and, where applicable, renewed.

A Kerberos ticket is therefore a time-bounded credential rather than an indefinite credential.

## Authorization Data

A ticket's encrypted part can contain authorization data.

In Windows Kerberos for [[ad.active-directory|Active Directory]], a [[windows.privilege-attribute-certificate|Privilege Attribute Certificate (PAC)]] is used to carry authorization information.

## Security Significance

Tickets are authentication credentials, so theft or forgery can have significant security consequences.

Forged TGTs are associated with [[attack.golden-ticket|Golden Ticket]], while forged Service Tickets are associated with [[attack.silver-ticket|Silver Ticket]].

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.authenticator|Authenticator]]
- [[kerberos.realm|Realm]]
- [[kerberos.principal|Principal]]
- [[windows.privilege-attribute-certificate|PAC]]

## References

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Microsoft Kerberos](https://learn.microsoft.com/en-us/windows/win32/secauthn/microsoft-kerberos)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
