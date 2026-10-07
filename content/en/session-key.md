---
canonical_id: kerberos.session-key
title: Session Key
lang: en
slug: session-key
aliases:
  - session key
categories:
  - Kerberos
status: published
summary: Kerberos Session Key generation and distribution, client/TGS and client/service use, and the distinction from long-term keys.
---

## Overview

> **Primary source:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

A [[kerberos.session-key|Session Key]] is temporary cryptographic key material used for a particular authentication context in [[auth.kerberos|Kerberos]].

The [[kerberos.kdc|Key Distribution Center (KDC)]] creates and distributes keys so that a client and Kerberos service can use corresponding key material.

## Difference from Long-Term Keys

A Principal's long-term key is associated with its identity and can be derived from a password or service-account key material.

A Session Key is temporary and associated with a particular ticket or exchange.

This separation reduces the need to disclose long-term secrets directly to application services.

## AS Exchange

When a client obtains a [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket (TGT)]] from the [[kerberos.authentication-server|Authentication Server]], a Session Key for communication between the client and TGS is established.

The client uses this key in later ticket requests.

## TGS Exchange

When the client requests a [[kerberos.service-ticket|Service Ticket]] from the [[kerberos.ticket-granting-server|Ticket-Granting Server]], another Session Key is created for the client and target service.

Information allowing each side to use the same Session Key is delivered through the Kerberos response and ticket structures.

## Authenticators

The client uses a Session Key to protect a [[kerberos.authenticator|Kerberos Authenticator]].

This allows the recipient to verify that the party presenting the ticket also possesses the corresponding Session Key.

## Tickets

The encrypted portion of a [[kerberos.ticket|Kerberos Ticket]] carries Session Key information for the service receiving the ticket.

The client receives corresponding information through the KDC reply.

## Lifetime

A Session Key is normally bounded by the lifetime of the associated ticket or authentication context.

It is not intended to be a permanent secret.

## Security Significance

Exposure of a Session Key can affect the security of the authentication context for which that key remains valid.

Client memory, ticket caches, and service processes handling Kerberos key material require appropriate protection.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.authenticator|Authenticator]]
- [[kerberos.principal|Principal]]
- [[ad.service-account|Service Account]]

## References

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
