---
canonical_id: attack.silver-ticket
title: Silver Ticket
lang: en
slug: silver-ticket
aliases: []
categories:
  - Active Directory
  - Kerberos
status: published
summary: Silver Ticket Service Ticket forgery using compromised service-account key material, scope, PAC considerations, detection, and Golden Ticket differences.
---

## Overview

> **Primary source:** [MITRE ATT&CK T1558.002 - Silver Ticket](https://attack.mitre.org/techniques/T1558/002/)

[[attack.silver-ticket|Silver Ticket]] is a Kerberos ticket-forgery technique in which compromised key material for a target [[ad.service-account|Service Account]] or equivalent service identity is used to forge a [[kerberos.service-ticket|Service Ticket]].

## Service Identity

A [[ad.service-principal-name|Service Principal Name (SPN)]] identifies a Kerberos service instance.

The encrypted portion of a Service Ticket is protected with key material available to the target service.

Compromise of that key material can therefore make it possible to forge Service Tickets without the normal [[kerberos.ticket-granting-server|Ticket-Granting Server (TGS)]] issuance flow.

## KDC Interaction

MITRE ATT&CK notes that forged Silver Tickets can be created and used without contacting the [[kerberos.kdc|Key Distribution Center (KDC)]].

This can make KDC-side issuance logs insufficient for detection.

## Scope

A Silver Ticket is constrained by the service key that has been compromised.

Its scope is therefore normally narrower than a [[attack.golden-ticket|Golden Ticket]], which forges Domain-level TGT credentials.

## PAC

Windows Service Tickets can contain a [[windows.privilege-attribute-certificate|Privilege Attribute Certificate (PAC)]] carrying authorization information.

PAC integrity and validation behavior are therefore relevant to forged Service Ticket security.

## Relationship to Kerberoasting

[[attack.kerberoasting|Kerberoasting]] aims to recover a Service Account credential through offline guessing.

If that effort results in compromise of service key material, Silver Ticket forgery can become possible.

The two techniques are nevertheless distinct.

## Detection

Useful signals include:

- unusual Kerberos logons on the service host;
- service authentication inconsistent with KDC ticket issuance;
- anomalous PAC or authorization behavior;
- indicators of Service Account credential compromise.

Detection should correlate target-service telemetry rather than relying exclusively on KDC events.

## Mitigation

Important controls include:

- protecting Service Account credentials;
- using managed identities such as [[ad.group-managed-service-account|gMSAs]];
- applying least privilege;
- managing SPN ownership correctly;
- monitoring authentication on service hosts;
- rotating credentials after service-account compromise.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.kdc|Key Distribution Center]]
- [[ad.service-principal-name|Service Principal Name]]
- [[ad.service-account|Service Account]]
- [[windows.privilege-attribute-certificate|PAC]]
- [[attack.kerberoasting|Kerberoasting]]
- [[attack.golden-ticket|Golden Ticket]]
- [[ad.domain|Active Directory Domain]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]

## References

- [MITRE ATT&CK T1558.002 - Silver Ticket](https://attack.mitre.org/techniques/T1558/002/)
- [MS-PAC - Privilege Attribute Certificate Data Structure](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/)
- [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)
- [MS-PAC - Server Signature](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/a194aa34-81bd-46a0-a931-2e05b87d1098)
