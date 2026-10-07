---
canonical_id: attack.as-rep-roasting
title: AS-REP Roasting
lang: en
slug: as-rep-roasting
aliases: []
categories:
  - Active Directory
  - Kerberos
status: published
summary: AS-REP Roasting, Kerberos accounts without required Pre-Authentication, AS-REQ/AS-REP behavior, offline guessing, detection, and mitigation.
---

## Overview

> **Primary source:** [MITRE ATT&CK T1558.004 - AS-REP Roasting](https://attack.mitre.org/techniques/T1558/004/)

[[attack.as-rep-roasting|AS-REP Roasting]] is a credential-access technique that targets accounts for which [[kerberos.pre-authentication|Kerberos Pre-Authentication]] is not required.

An attacker can obtain an [[kerberos.authentication-server|Authentication Server (AS)]] response containing cryptographic material that may be subjected to offline password guessing.

## Normal Pre-Authentication

In normal password-based [[auth.kerberos|Kerberos]] initial authentication, the [[kerberos.kdc|Key Distribution Center (KDC)]] can require the client to demonstrate knowledge related to the account secret before issuing initial credentials.

This prevents useful password-derived response material from being returned before that proof is provided.

## Accounts without Required Pre-Authentication

If an Active Directory account is configured so that Kerberos Pre-Authentication is not required, the AS can return an AS-REP for a valid [[kerberos.principal|Principal]] without receiving ordinary Pre-Authentication proof.

Part of the reply is protected using password-derived key material.

A weak password can therefore make the response useful for offline guessing.

## TGT Relationship

A successful AS response carries a [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket (TGT)]].

The goal of AS-REP Roasting is not simply to use the TGT, but to exploit password-derived cryptographic material in the AS response for credential guessing.

## Difference from Kerberoasting

[[attack.kerberoasting|Kerberoasting]] uses Service Tickets associated with SPNs and Service Accounts.

AS-REP Roasting instead targets the initial AS exchange for accounts that do not require Pre-Authentication.

## Detection

Current MITRE ATT&CK detection guidance identifies Event ID 4768 with Pre-Authentication Type 0 as a key signal.

Organizations should baseline accounts legitimately configured without required Pre-Authentication and investigate unusual sources or bursts of requests.

## Mitigation

Important controls include:

- requiring Kerberos Pre-Authentication unless a documented exception exists;
- inventorying exception accounts;
- using long, random account passwords;
- reducing obsolete encryption dependencies;
- monitoring Event ID 4768.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.authentication-server|Authentication Server]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.pre-authentication|Pre-Authentication]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.principal|Principal]]
- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[attack.kerberoasting|Kerberoasting]]
- [[ad.service-account|Service Account]]
- [[ad.service-principal-name|Service Principal Name]]
- [[kerberos.service-ticket|Service Ticket]]

## References

- [MITRE ATT&CK T1558.004 - AS-REP Roasting](https://attack.mitre.org/techniques/T1558/004/)
- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [RFC 6113 - A Generalized Framework for Kerberos Pre-Authentication](https://www.rfc-editor.org/rfc/rfc6113.html)
- [Microsoft - Event 4768: A Kerberos authentication ticket was requested](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4768)
