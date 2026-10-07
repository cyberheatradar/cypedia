---
canonical_id: kerberos.service-ticket
title: Service Ticket
lang: en
slug: service-ticket
aliases: []
categories:
  - Kerberos
status: published
summary: Kerberos Service Ticket issuance, service keys, Session Keys, SPNs, Kerberoasting, and Silver Ticket relationships.
---

## Overview

> **Primary source:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

A [[kerberos.service-ticket|Service Ticket]] is a [[kerberos.ticket|Kerberos Ticket]] used by a [[auth.kerberos|Kerberos]] client to authenticate to a particular application service.

The Service Ticket is issued by the [[kerberos.ticket-granting-server|Ticket-Granting Server (TGS)]].

## Acquisition

The client presents a [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket (TGT)]] and a [[kerberos.authenticator|Kerberos Authenticator]] to the TGS and requests credentials for the target service.

If the request is accepted, the TGS returns the Service Ticket in a TGS-REP.

## Service Session Key

The TGS generates a [[kerberos.session-key|Session Key]] for the client and target service.

The ticket contains information allowing the service to obtain its copy of the Session Key.

The client receives information needed to use the corresponding Session Key in the TGS response.

## Service Key

In the normal case, the encrypted portion of a Service Ticket is protected with the target service's secret key.

RFC 4120 defines a user-to-user authentication exception in which the ENC-TKT-IN-SKEY option causes the Service Ticket to be encrypted with a Session Key from the server's [[kerberos.ticket-granting-ticket|TGT]].

In a normal AP exchange, the target service processes the ticket using key material available to that service.

## Active Directory and SPNs

In [[ad.active-directory|Active Directory]], a service instance is identified by a [[ad.service-principal-name|Service Principal Name (SPN)]].

The SPN is normally registered on an account such as a computer account or [[ad.service-account|Service Account]].

The requested SPN determines the service identity for which the TGS issues the ticket.

## PAC

Windows Kerberos Service Tickets can contain a [[windows.privilege-attribute-certificate|Privilege Attribute Certificate (PAC)]] carrying authorization data such as group-related information.

## AP Exchange

The client presents the Service Ticket and Authenticator to the application server.

The server validates the ticket and Authenticator as part of Kerberos application authentication.

## Kerberoasting

[[attack.kerberoasting|Kerberoasting]] can use encrypted data from legitimately requested Service Tickets for offline password guessing.

The security of Service Account passwords and the encryption types in use are therefore important.

## Silver Ticket

[[attack.silver-ticket|Silver Ticket]] refers to forging Service Tickets using service-side key material.

This differs from [[attack.golden-ticket|Golden Ticket]], which targets TGTs and KRBTGT key material.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.authenticator|Authenticator]]
- [[ad.service-principal-name|Service Principal Name]]
- [[ad.service-account|Service Account]]
- [[windows.privilege-attribute-certificate|PAC]]
- [[attack.kerberoasting|Kerberoasting]]
- [[attack.silver-ticket|Silver Ticket]]
- [[ad.krbtgt|KRBTGT]]
- [[ad.computer-account|Computer Account]]

## References

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Kerberos authentication overview in Windows Server](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft - Key Distribution Center](https://learn.microsoft.com/en-us/windows/win32/secauthn/key-distribution-center)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
- [Microsoft - Service principal names](https://learn.microsoft.com/en-us/windows/win32/ad/service-principal-names)
- [MS-KILE - Authentication to Services](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/9bf9252a-0bc9-497e-8c25-c77d28d4767b)
- [MS-KILE - PAC Generation](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/c25d48df-67f0-4c5f-9e46-27a7d5710909)
- [MITRE ATT&CK T1558.003 - Kerberoasting](https://attack.mitre.org/techniques/T1558/003/)
- [MITRE ATT&CK T1558.002 - Silver Ticket](https://attack.mitre.org/techniques/T1558/002/)
