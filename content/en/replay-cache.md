---
canonical_id: kerberos.replay-cache
title: Replay Cache
lang: en
slug: replay-cache
aliases:
  - replay cache
categories:
  - Kerberos
status: published
summary: Kerberos Replay Cache detection of Authenticator reuse, timestamp validation, clock skew, and its distinction from a ticket cache.
---

## Overview

> **Primary source:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

A [[kerberos.replay-cache|Replay Cache]] is used by a [[auth.kerberos|Kerberos]] service to remember previously accepted authentication data and detect replay attacks.

It is particularly relevant to reuse of a [[kerberos.authenticator|Kerberos Authenticator]].

## Replay Attacks

A replay attack reuses previously valid authentication traffic.

Kerberos combines timestamp validation and replay detection to reject reuse of authentication data.

## Authenticators

An Authenticator contains client identity and time information.

The service verifies the Authenticator and checks whether the same relevant authentication data has already been accepted.

## Clock Skew

Kerberos relies on time-based validation, so clocks on clients, the [[kerberos.kdc|KDC]], and services need to remain sufficiently synchronized.

Excessive clock differences can cause legitimate authentication to fail.

## Difference from a Ticket Cache

A Replay Cache and a ticket cache serve different purposes.

A client ticket cache stores [[kerberos.ticket|Kerberos Tickets]] for legitimate reuse.

A Replay Cache is used by a service to detect replay of authentication attempts.

## Service Responsibility

Replay protection is not provided by the ticket alone.

The receiving service implementation must correctly enforce Authenticator freshness and replay detection.

## Security Significance

Disabling replay detection or failing to maintain replay state correctly can weaken Kerberos replay protection.

Cache availability and clock synchronization are also operational dependencies.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.authenticator|Authenticator]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.kdc|Key Distribution Center]]

## References

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
