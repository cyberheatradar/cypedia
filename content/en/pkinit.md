---
canonical_id: kerberos.pkinit
title: PKINIT
lang: en
slug: pkinit
aliases:
  - Public Key Cryptography for Initial Authentication in Kerberos
categories:
  - Kerberos
  - Authentication
status: published
summary: PKINIT public-key Kerberos initial authentication, certificates, key establishment, and Windows smart-card integration.
---

## Overview

> **Primary source:** [RFC 4556 - Public Key Cryptography for Initial Authentication in Kerberos](https://www.rfc-editor.org/rfc/rfc4556.html)

[[kerberos.pkinit|PKINIT]] is a [[kerberos.pre-authentication|Pre-Authentication]] mechanism that adds public-key cryptography to the initial [[auth.kerberos|Kerberos]] authentication exchange.

It is standardized in RFC 4556.

## AS Exchange

PKINIT operates during the [[kerberos.authentication-server|Authentication Server (AS)]] exchange.

The client includes information based on public/private key material and a certificate in its AS-REQ.

The [[kerberos.kdc|KDC]] validates the relevant signature and certificate information before producing a successful AS-REP.

## Key Establishment

PKINIT uses public-key cryptography to establish key material for initial Kerberos authentication.

This allows an authentication flow that does not rely exclusively on a traditional password-derived initial key.

## Certificates

PKINIT uses X.509 certificates.

Certificate trust for the client and authentication of the KDC are both important.

PKI configuration and certificate validation are therefore part of PKINIT security.

## Windows Implementation

> **Primary source:** [MS-PKCA - Public Key Cryptography for Initial Authentication in Kerberos Protocol](https://learn.microsoft.com/en-us/openspecs/windows_protocols/MS-PKCA/d0cf1763-3541-4008-a75f-a577fa5e8c5b)

Windows implements PKINIT based on RFC 4556 and documents Windows-specific behavior in MS-PKCA.

Smart-card logon in [[ad.active-directory|Active Directory]] is a major Windows use case.

## TGT

A successful PKINIT AS exchange results in acquisition of a [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket (TGT)]], like other successful Kerberos initial authentication flows.

Subsequent [[kerberos.ticket-granting-server|TGS]] exchanges continue through the normal Kerberos ticket flow.

## Security Considerations

PKINIT security depends on factors including:

- protection of private keys;
- certificate issuance;
- certificate mapping;
- KDC certificate validation;
- CA trust;
- revocation handling.

PKI misconfiguration can therefore directly affect Kerberos authentication security.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.pre-authentication|Pre-Authentication]]
- [[kerberos.authentication-server|Authentication Server]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[ad.active-directory|Active Directory]]
- [[kerberos.ticket|Kerberos Ticket]]

## References

- [RFC 4556 - Public Key Cryptography for Initial Authentication in Kerberos](https://www.rfc-editor.org/rfc/rfc4556.html)
- [MS-PKCA - Public Key Cryptography for Initial Authentication in Kerberos Protocol](https://learn.microsoft.com/en-us/openspecs/windows_protocols/MS-PKCA/d0cf1763-3541-4008-a75f-a577fa5e8c5b)
- [Microsoft - Smart Card Certificate Requirements and Enumeration](https://learn.microsoft.com/en-us/windows/security/identity-protection/smart-cards/smart-card-certificate-requirements-and-enumeration)
