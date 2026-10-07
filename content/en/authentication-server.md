---
canonical_id: kerberos.authentication-server
title: Authentication Server
lang: en
slug: authentication-server
aliases:
  - AS
categories:
  - Kerberos
status: published
summary: Kerberos Authentication Server initial authentication, AS-REQ/AS-REP, TGT issuance, and Pre-Authentication.
---

## Overview

> **Primary source:** [RFC 4120 - Kerberos Authentication Service Exchange](https://www.rfc-editor.org/rfc/rfc4120.html)

The Authentication Server ([[kerberos.authentication-server|AS]]) is one of the services provided by a [[kerberos.kdc|Key Distribution Center (KDC)]].

It performs initial [[auth.kerberos|Kerberos]] authentication and, when the request succeeds, returns an AS-REP containing a [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket (TGT)]] and information associated with the client/TGS [[kerberos.session-key|Session Key]].

## AS-REQ

A client sends an AS-REQ to the AS.

The request identifies information including the client [[kerberos.principal|Principal]] and the ticket-granting service being requested.

## Pre-Authentication

Where [[kerberos.pre-authentication|Pre-Authentication]] is required, the client supplies authentication evidence as part of the initial exchange.

The KDC validates this information before issuing the TGT.

Accounts that do not require Pre-Authentication can be relevant to [[attack.as-rep-roasting|AS-REP Roasting]].

## AS-REP

When the AS accepts the request, it returns an AS-REP.

The response contains a TGT and information concerning the [[kerberos.session-key|Session Key]] used between the client and the [[kerberos.ticket-granting-server|Ticket-Granting Server (TGS)]].

The client caches the TGT for later ticket requests.

## PKINIT

Initial authentication can also use [[kerberos.pkinit|PKINIT]] to integrate public-key cryptography rather than relying only on password-derived keys.

PKINIT is standardized in RFC 4556.

## Active Directory

In [[ad.active-directory|Active Directory]], KDC functionality on a [[ad.domain-controller|Domain Controller]] provides the AS service.

Windows-specific Kerberos behavior and extensions are documented in MS-KILE.

## Security Significance

The AS exchange is the entry point to the Kerberos authentication chain.

Pre-Authentication policy, encryption configuration, credential protection, and KDC security directly affect the security of initial authentication.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.pre-authentication|Pre-Authentication]]
- [[kerberos.pkinit|PKINIT]]
- [[kerberos.principal|Principal]]
- [[attack.as-rep-roasting|AS-REP Roasting]]
- [[kerberos.ticket|Kerberos Ticket]]

## References

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Authentication Service Exchange](https://learn.microsoft.com/en-us/windows/win32/secauthn/authentication-service-exchange)
- [RFC 4556 - Public Key Cryptography for Initial Authentication in Kerberos](https://www.rfc-editor.org/rfc/rfc4556.html)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
