---
canonical_id: auth.kerberos
title: Kerberos
lang: en
slug: kerberos
aliases:
  - Kerberos V5
categories:
  - Authentication
  - Active Directory
status: published
summary: Kerberos V5 authentication, architecture, protocol exchanges, cryptography, Active Directory integration, and security implications based on primary sources.
---

## Overview

> **Primary sources:** [RFC 4120 §1](https://www.rfc-editor.org/rfc/rfc4120.html#section-1)

Kerberos is a network authentication protocol in which a trusted third party, the [[kerberos.kdc|Key Distribution Center (KDC)]], authenticates [[kerberos.principal|principals]] and helps establish session keys used between them.

The current base specification is Kerberos Version 5 (Kerberos V5), defined by RFC 4120. RFC 4120 obsoleted the earlier RFC 1510 specification.

Rather than requiring a user to present long-term secret material directly to every service, Kerberos uses tickets issued by the KDC. After obtaining a [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket (TGT)]], a client can request tickets for multiple services.

## Historical Background

> **Primary sources:** [J. H. Saltzer - On the Origin of Kerberos](https://web.mit.edu/saltzer/www/publications/Kerberosorigin.pdf) / [Project Athena Technical Plan E.2.1](https://web.mit.edu/Saltzer/www/publications/athenaplan/e.2.1.pdf) / [RFC 4120](https://www.rfc-editor.org/info/rfc4120/)

Kerberos was developed as part of MIT Project Athena.

Jerome H. Saltzer's history of the project describes research during 1985 followed by the design and implementation of the Kerberos authentication system by Cliff Neuman and Steve Miller. An initial implementation was completed in the fall of 1986, and production use in Project Athena began in January 1987.

Kerberos Version 5 later replaced Version 4. RFC 1510 was published in 1993, and RFC 4120 replaced RFC 1510 in 2005.

Kerberos is not a vendor-specific authentication mechanism. It is an IETF-standardized protocol. Microsoft Windows and [[ad.active-directory|Active Directory]] implement Kerberos V5 with additional Windows-specific behavior and extensions documented in Microsoft Open Specifications such as MS-KILE.

## Current Role

> **Primary sources:** [MS-KILE](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/) / [MS-AUTHSOD: Kerberos Protocols](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-authsod/857b7719-bd1b-4cdd-ade0-84506b30b8df)

Kerberos V5 remains an important authentication protocol in enterprise environments and is a major authentication mechanism in Active Directory.

In Active Directory environments, a [[ad.domain-controller|Domain Controller]] can provide the KDC role. Microsoft's Kerberos implementation is based on RFC 4120 while also defining Windows-specific behavior related to authorization information, interactive logon, delegation, and directory integration.

For this reason, standard Kerberos V5 and Microsoft's Active Directory implementation should be distinguished when analyzing behavior.

## Core Architecture

> **Primary sources:** [RFC 4120](https://www.rfc-editor.org/rfc/rfc4120.html)

### [[kerberos.principal|Principal]]

A principal is an identity recognized by Kerberos.

Users, hosts, and network services can be represented as principals. Kerberos requests and tickets use principal names to identify participating entities.

### [[kerberos.realm|Realm]]

A realm is an administrative authentication namespace in Kerberos.

A KDC manages principals and associated key information within a realm. Kerberos V5 also defines [[kerberos.cross-realm-authentication|cross-realm authentication]] for authentication involving multiple realms.

### [[kerberos.kdc|Key Distribution Center]]

The Key Distribution Center is the central trusted component in Kerberos.

Conceptually, the KDC provides two major functions:

- [[kerberos.authentication-server|Authentication Server (AS)]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server (TGS)]]

The AS processes initial authentication and issues a TGT. The TGS uses the TGT to issue a [[kerberos.service-ticket|Service Ticket]] for a requested application service.

### [[kerberos.ticket|Kerberos Ticket]]

A Kerberos ticket is authentication data issued by the KDC.

Tickets carry information needed for authentication, including client and service identities, a session key, and validity information. Protected portions of a ticket are encrypted using key material associated with the target service.

Important ticket types include:

- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]

### [[kerberos.session-key|Session Key]]

Kerberos uses temporary session keys in addition to long-term keys.

During authentication exchanges, the KDC provides session-key material for communication between the client and TGS or between the client and an application service.

### [[kerberos.authenticator|Authenticator]]

An Authenticator is data used to demonstrate that the party presenting a ticket also possesses the corresponding session key.

Authenticators include time-related information and are used with tickets. RFC 4120 requires an application server to use a [[kerberos.replay-cache|Replay Cache]] to detect Authenticator reuse unless the application provides another suitable anti-replay mechanism.

## Authentication Flow

> **Primary sources:** [RFC 4120 §3](https://www.rfc-editor.org/rfc/rfc4120.html#section-3)

Kerberos V5 authentication normally consists of an AS exchange, TGS exchange, and Client/Server exchange.

### 1. AS-REQ / AS-REP

> **Primary sources:** [RFC 4120 §3.1](https://www.rfc-editor.org/rfc/rfc4120.html#section-3.1)

A client sends an AS-REQ to the Authentication Server.

Depending on configuration and policy, [[kerberos.pre-authentication|Pre-Authentication]] may be required. After successful client authentication, the KDC returns an AS-REP containing a TGT and information associated with the client/TGS session key.

The TGT is then used to request service-specific tickets.

### 2. TGS-REQ / TGS-REP

> **Primary sources:** [RFC 4120 §3.3](https://www.rfc-editor.org/rfc/rfc4120.html#section-3.3)

When the client wants to access a specific service, it sends a TGS-REQ using its TGT.

The TGS validates the TGT, Authenticator, and request. If the request is valid, it returns a Service Ticket in a TGS-REP.

This allows the client to obtain tickets for multiple services without repeatedly presenting its long-term secret.

### 3. AP-REQ / AP-REP

> **Primary sources:** [RFC 4120 §3.2](https://www.rfc-editor.org/rfc/rfc4120.html#section-3.2)

The client presents the Service Ticket and an Authenticator to the target application server in an AP-REQ.

The server processes the Service Ticket using its key and validates the Authenticator.

When mutual authentication is used, the server returns an AP-REP so the client can also authenticate the server.

## Ticket-Granting Ticket

> **Primary sources:** [RFC 4120 §3.3](https://www.rfc-editor.org/rfc/rfc4120.html#section-3.3)

A TGT is a central part of Kerberos single-sign-on behavior.

After initial authentication, the client can retain the TGT in a ticket cache and use it to request multiple Service Tickets.

This reduces the need to repeatedly provide the user's long-term secret when accessing different services.

## [[kerberos.pre-authentication|Pre-Authentication]]

> **Primary sources:** [RFC 4120 §3.1](https://www.rfc-editor.org/rfc/rfc4120.html#section-3.1) / [RFC 6113](https://www.rfc-editor.org/rfc/rfc6113.html)

Kerberos V5 supports pre-authentication mechanisms.

RFC 4120 defines the use of pre-authentication data, while RFC 6113 defines a generalized Kerberos pre-authentication framework.

Pre-authentication allows the KDC to require additional proof from a client before issuing an AS-REP.

In Windows / Active Directory environments, accounts that do not require pre-authentication can become targets for [[attack.as-rep-roasting|AS-REP Roasting]].

## Time Synchronization and Replay Protection

> **Primary sources:** [RFC 4120 §3.2.3](https://www.rfc-editor.org/rfc/rfc4120.html#section-3.2.3)

Time is important to Kerberos operation.

RFC 4120 assumes that participating hosts maintain reasonably synchronized clocks and discusses an allowable clock skew, commonly around five minutes.

Application servers validate timestamps carried in Authenticators. RFC 4120 requires a replay cache for Authenticators presented within the allowable clock skew unless the application provides another suitable replay-protection mechanism; a repeated Authenticator can then be rejected as a replay.

Reliable and secure time synchronization is consequently important to Kerberos deployments.

## Cryptography

> **Primary sources:** [RFC 3961](https://www.rfc-editor.org/rfc/rfc3961.html) / [RFC 3962](https://www.rfc-editor.org/rfc/rfc3962.html) / [RFC 8009](https://www.rfc-editor.org/rfc/rfc8009.html) / [RFC 8429](https://www.rfc-editor.org/rfc/rfc8429.html)

Kerberos V5 is not tied to a single encryption algorithm.

RFC 3961 defines the framework for Kerberos encryption types and checksum mechanisms.

RFC 3962 defines AES encryption types for Kerberos. RFC 8009 later defines Kerberos encryption types using AES with HMAC-SHA2.

RFC 8429 deprecates the use of 3DES and RC4 in Kerberos.

Deployments should therefore avoid unnecessary dependence on legacy encryption types and prefer currently supported stronger cryptographic mechanisms.

## [[kerberos.pkinit|PKINIT]]

> **Primary sources:** [RFC 4556](https://www.rfc-editor.org/rfc/rfc4556.html)

Public Key Cryptography for Initial Authentication in Kerberos (PKINIT) integrates public-key cryptography into Kerberos initial authentication.

RFC 4556 defines PKINIT using Kerberos pre-authentication data to incorporate public-key signatures and key establishment into the initial authentication exchange.

PKINIT is also relevant to certificate- and smart-card-based Kerberos authentication in Windows environments.

## Active Directory Integration

> **Primary sources:** [MS-KILE](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/) / [MS-AUTHSOD: Kerberos Protocols](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-authsod/857b7719-bd1b-4cdd-ade0-84506b30b8df)

Active Directory uses Kerberos V5 as one of its major authentication protocols.

Windows KDCs use Active Directory as an account database, and Kerberos tickets can contain Windows-specific authorization information.

MS-KILE defines Windows-specific Kerberos behavior and extensions relative to RFC 4120. The [[windows.privilege-attribute-certificate|Privilege Attribute Certificate (PAC)]] is used in Windows environments to carry authorization information.

Analyzing Active Directory Kerberos can therefore require not only RFC 4120 but also Microsoft protocol specifications such as MS-KILE, MS-PAC, MS-SFU, and MS-PKCA.

The [[ad.service-principal-name|Service Principal Name (SPN)]] associates service instances with accounts in Active Directory, while a [[ad.service-account|Service Account]] may hold the key material used by a Kerberos-enabled service.

## Security Considerations

> **Primary sources:** [RFC 4120 §10](https://www.rfc-editor.org/rfc/rfc4120.html#section-10)

Kerberos security depends on multiple components, including the KDC, long-term principal keys, session keys, tickets, clocks, and cryptographic algorithms.

Important security considerations include:

- protecting the KDC and its key database;
- protecting client and server long-term keys;
- correctly using replay protection;
- maintaining trustworthy time synchronization;
- avoiding obsolete encryption types;
- using pre-authentication appropriately;
- protecting ticket caches and credential material.

RFC 4120 explicitly discusses dictionary attacks against password-derived keys, clock synchronization, replay protection, and compromise of Kerberos infrastructure.

## Relationship to Attacks and Abuse

> **Primary sources:** [MITRE ATT&CK T1558](https://attack.mitre.org/techniques/T1558/)

Kerberos is widely used as an authentication infrastructure and is therefore an important target for attackers.

MITRE ATT&CK groups several techniques under T1558, Steal or Forge Kerberos Tickets, including [[attack.golden-ticket|Golden Ticket]], [[attack.silver-ticket|Silver Ticket]], [[attack.kerberoasting|Kerberoasting]], and [[attack.as-rep-roasting|AS-REP Roasting]].

### Kerberoasting

> **Primary sources:** [MITRE ATT&CK T1558.003](https://attack.mitre.org/techniques/T1558/003/)

Kerberoasting abuses the legitimate ability of an authenticated principal with a TGT to request a Service Ticket for a service principal.

Material from the returned ticket can be subjected to offline password cracking in an attempt to recover credentials associated with the service account.

### AS-REP Roasting

> **Primary sources:** [MITRE ATT&CK T1558.004](https://attack.mitre.org/techniques/T1558/004/)

AS-REP Roasting targets accounts for which Kerberos pre-authentication is not required.

In such configurations, an attacker may request an AS-REP and use password-derived protected data from the response for offline cracking attempts.

### Golden Ticket

> **Primary sources:** [MITRE ATT&CK T1558.001](https://attack.mitre.org/techniques/T1558/001/)

In an Active Directory environment, compromise of key material associated with the [[ad.krbtgt|KRBTGT]] account can enable an attacker to forge TGTs.

This attack is commonly called a Golden Ticket attack.

### Silver Ticket

> **Primary sources:** [MITRE ATT&CK T1558.002](https://attack.mitre.org/techniques/T1558/002/)

If an attacker obtains key material for a service account, the attacker may be able to forge Service Tickets for that service.

This technique is known as a Silver Ticket attack.

## Defense and Mitigation

> **Primary sources:** [RFC 8429](https://www.rfc-editor.org/rfc/rfc8429.html) / [Microsoft: Group Managed Service Accounts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview)

Kerberos defense requires protecting both the protocol and the surrounding identity infrastructure.

Active Directory environments should reduce reliance on legacy Kerberos encryption types such as RC4 where supported alternatives are available.

Service accounts should use sufficiently strong secrets, and managed service-account mechanisms can reduce dependence on manually maintained static passwords.

Pre-authentication should not be disabled without a justified requirement. KDCs, Domain Controllers, credential databases, ticket caches, and other authentication material should receive high protection priority.

## Limitations

> **Primary sources:** [RFC 4120 §10](https://www.rfc-editor.org/rfc/rfc4120.html#section-10)

Kerberos is primarily an authentication infrastructure. It does not by itself solve all authorization or endpoint-compromise problems.

If a client, server, or KDC is compromised and keys or tickets are stolen, the corresponding authentication material may be abused.

Kerberos replay protections also depend on operational assumptions such as clock synchronization, so the security of supporting infrastructure affects the security of the Kerberos system as a whole.

## Related Standards and Specifications

> **Primary sources:** [RFC 4120](https://www.rfc-editor.org/info/rfc4120/)

Important Kerberos-related standards and specifications include RFC 4120, the Kerberos cryptosystem framework, AES encryption specifications, pre-authentication specifications, PKINIT, GSS-API integration, and Microsoft Kerberos extensions.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.kdc|KDC]]
- [[kerberos.principal|Principal]]
- [[kerberos.realm|Realm]]
- [[kerberos.authentication-server|Authentication Server]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.authenticator|Authenticator]]
- [[kerberos.pre-authentication|Pre-Authentication]]
- [[kerberos.pkinit|PKINIT]]
- [[kerberos.replay-cache|Replay Cache]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.service-principal-name|SPN]]
- [[ad.service-account|Service Account]]
- [[windows.privilege-attribute-certificate|PAC]]
- [[attack.kerberoasting|Kerberoasting]]
- [[attack.as-rep-roasting|AS-REP Roasting]]
- [[attack.golden-ticket|Golden Ticket]]
- [[attack.silver-ticket|Silver Ticket]]
- [[ad.domain|Active Directory Domain]]

## References

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [RFC 3961 - Encryption and Checksum Specifications for Kerberos 5](https://www.rfc-editor.org/rfc/rfc3961.html)
- [RFC 3962 - Advanced Encryption Standard (AES) Encryption for Kerberos 5](https://www.rfc-editor.org/rfc/rfc3962.html)
- [RFC 4556 - Public Key Cryptography for Initial Authentication in Kerberos (PKINIT)](https://www.rfc-editor.org/rfc/rfc4556.html)
- [RFC 6113 - A Generalized Framework for Kerberos Pre-Authentication](https://www.rfc-editor.org/rfc/rfc6113.html)
- [RFC 8009 - AES Encryption with HMAC-SHA2 for Kerberos 5](https://www.rfc-editor.org/rfc/rfc8009.html)
- [RFC 8429 - Deprecate Triple-DES (3DES) and RC4 in Kerberos](https://www.rfc-editor.org/rfc/rfc8429.html)
- [J. H. Saltzer - On the Origin of Kerberos](https://web.mit.edu/saltzer/www/publications/Kerberosorigin.pdf)
- [MIT Project Athena Technical Plan E.2.1 - Kerberos Authentication and Authorization System](https://web.mit.edu/Saltzer/www/publications/athenaplan/e.2.1.pdf)
- [Microsoft Open Specifications - MS-KILE: Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
- [Microsoft Open Specifications - MS-AUTHSOD: Kerberos Protocols](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-authsod/857b7719-bd1b-4cdd-ade0-84506b30b8df)
- [Microsoft - Group Managed Service Accounts overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview)
- [MITRE ATT&CK T1558 - Steal or Forge Kerberos Tickets](https://attack.mitre.org/techniques/T1558/)
- [MITRE ATT&CK T1558.001 - Golden Ticket](https://attack.mitre.org/techniques/T1558/001/)
- [MITRE ATT&CK T1558.002 - Silver Ticket](https://attack.mitre.org/techniques/T1558/002/)
- [MITRE ATT&CK T1558.003 - Kerberoasting](https://attack.mitre.org/techniques/T1558/003/)
- [MITRE ATT&CK T1558.004 - AS-REP Roasting](https://attack.mitre.org/techniques/T1558/004/)
