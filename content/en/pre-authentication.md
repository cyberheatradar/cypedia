---
canonical_id: kerberos.pre-authentication
title: Pre-Authentication
lang: en
slug: pre-authentication
aliases:
  - pre-authentication
categories:
  - Kerberos
  - Authentication
status: published
summary: Kerberos Pre-Authentication PA-DATA, AS exchange behavior, RFC 6113 framework, PKINIT, and AS-REP Roasting relevance.
---

## Overview

> **Primary sources:** [RFC 4120](https://www.rfc-editor.org/rfc/rfc4120.html) / [RFC 6113 - A Generalized Framework for Kerberos Pre-Authentication](https://www.rfc-editor.org/rfc/rfc6113.html)

[[kerberos.pre-authentication|Pre-Authentication]] allows the [[kerberos.authentication-server|Authentication Server (AS)]] to require additional authentication evidence before issuing initial [[auth.kerberos|Kerberos]] credentials.

Pre-Authentication is a framework for multiple mechanisms rather than one fixed authentication algorithm.

## PA-DATA

Kerberos messages can carry pre-authentication information as PA-DATA.

If an AS-REQ does not contain required pre-authentication material, a KDC can return information describing acceptable methods so the client can construct a subsequent request.

## Purpose

Pre-Authentication mechanisms can provide functions including:

- additional proof of client identity;
- establishment of initial keys;
- public-key authentication;
- strengthening password-based initial authentication.

The exact security properties depend on the selected mechanism.

## Password-Based Pre-Authentication

Password-based Kerberos deployments can use timestamp-based pre-authentication protected by password-derived key material.

The [[kerberos.kdc|KDC]] validates the data before issuing a [[kerberos.ticket-granting-ticket|TGT]].

## PKINIT

[[kerberos.pkinit|PKINIT]] is a Pre-Authentication mechanism based on public-key cryptography.

RFC 4556 integrates certificates and public/private key material into the initial AS exchange.

## RFC 6113

RFC 6113 defines a generalized framework for Kerberos Pre-Authentication.

It provides a common model for how multiple pre-authentication mechanisms interact with Kerberos requests and replies.

## Active Directory

Pre-Authentication is also important in [[ad.active-directory|Active Directory]] Kerberos.

Windows behavior and extensions are documented in MS-KILE, with Windows PKINIT behavior documented in MS-PKCA.

## AS-REP Roasting

[[attack.as-rep-roasting|AS-REP Roasting]] becomes relevant when password-based accounts are configured so that Pre-Authentication is not required.

An attacker can potentially obtain AS-REP material suitable for offline password guessing.

Unnecessary disabling of Pre-Authentication should therefore be avoided.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.authentication-server|Authentication Server]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.pkinit|PKINIT]]
- [[attack.as-rep-roasting|AS-REP Roasting]]

## References

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [RFC 6113 - A Generalized Framework for Kerberos Pre-Authentication](https://www.rfc-editor.org/rfc/rfc6113.html)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
