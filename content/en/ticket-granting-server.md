---
canonical_id: kerberos.ticket-granting-server
title: Ticket-Granting Server
lang: en
slug: ticket-granting-server
aliases:
  - TGS
categories:
  - Kerberos
status: published
summary: Kerberos Ticket-Granting Server TGS-REQ/TGS-REP processing, TGT validation, and Service Ticket issuance.
---

## Overview

> **Primary source:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

The Ticket-Granting Server ([[kerberos.ticket-granting-server|TGS]]) is one of the services provided by a [[kerberos.kdc|Key Distribution Center (KDC)]].

The TGS accepts requests from [[auth.kerberos|Kerberos]] clients holding a valid [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket (TGT)]] and issues a [[kerberos.service-ticket|Service Ticket]] for a target service.

## TGS-REQ

The client sends a TGS-REQ to the TGS.

The request contains information including the TGT, a [[kerberos.authenticator|Kerberos Authenticator]], and the identity of the requested service.

In [[ad.active-directory|Active Directory]], a [[ad.service-principal-name|Service Principal Name (SPN)]] is important for identifying a service instance.

## TGT Validation

The TGS processes the TGT and uses the client/TGS [[kerberos.session-key|Session Key]] when validating the Authenticator and request.

If the request is accepted, the TGS generates credentials for the target service.

## TGS-REP

The TGS-REP contains a Service Ticket and information about the session key that the client will use with the target service.

The Service Ticket is protected with key material that the target service can use.

## Active Directory

In AD DS, SPNs are normally registered on accounts such as computer accounts or [[ad.service-account|Service Accounts]].

Key material associated with that account is relevant to the cryptographic protection of the Service Ticket.

Windows Kerberos tickets can also contain a [[windows.privilege-attribute-certificate|Privilege Attribute Certificate (PAC)]].

## Kerberoasting

[[attack.kerberoasting|Kerberoasting]] uses normal Kerberos behavior that permits a principal with a valid TGT to request Service Tickets.

Where weak Service Account passwords or vulnerable encryption choices exist, ticket material can become useful for offline password guessing.

## Silver Ticket

[[attack.silver-ticket|Silver Ticket]] refers to forging Service Tickets using service-side key material.

This differs from a [[attack.golden-ticket|Golden Ticket]], which involves forged TGTs.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.authenticator|Authenticator]]
- [[kerberos.session-key|Session Key]]
- [[ad.service-principal-name|Service Principal Name]]
- [[ad.service-account|Service Account]]
- [[windows.privilege-attribute-certificate|PAC]]
- [[attack.kerberoasting|Kerberoasting]]
- [[attack.silver-ticket|Silver Ticket]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.principal|Principal]]
- [[ad.computer-account|Computer Account]]

## References

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Key Distribution Center](https://learn.microsoft.com/en-us/windows/win32/secauthn/key-distribution-center)
- [Microsoft - Kerberos authentication overview in Windows Server](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
