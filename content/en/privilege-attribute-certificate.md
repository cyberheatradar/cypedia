---
canonical_id: windows.privilege-attribute-certificate
title: Privilege Attribute Certificate
lang: en
slug: privilege-attribute-certificate
aliases:
  - PAC
categories:
  - Windows
  - Kerberos
status: published
summary: Windows Kerberos Privilege Attribute Certificate (PAC) authorization data, group information, signatures, and ticket relationships.
---

## Overview

> **Primary source:** [MS-PAC - Privilege Attribute Certificate Data Structure](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/166d8064-c863-41e1-9c23-edaaa5f36962)

A [[windows.privilege-attribute-certificate|Privilege Attribute Certificate (PAC)]] is a data structure used by Microsoft Kerberos to encode authorization information.

Despite the word Certificate in its name, a PAC is not an X.509 certificate used by PKI.

A PAC can contain authorization information related to users and groups, additional credential information, profile and policy information, and supporting security metadata.

## Kerberos Tickets

A PAC is carried as authorization data associated with a [[kerberos.ticket|Kerberos Ticket]].

In [[ad.active-directory|Active Directory]], PAC information can be included in [[kerberos.ticket-granting-ticket|TGTs]] and [[kerberos.service-ticket|Service Tickets]].

## Authorization Information

A PAC provides information that Windows services can use when making authorization decisions.

This includes information associated with a [[windows.security-principal|Security Principal]], such as group-related authorization data.

[[windows.security-identifier|SIDs]] are also fundamental identifiers in Windows authorization information.

## KDC Relationship

The [[kerberos.kdc|Key Distribution Center (KDC)]] participates in creating and processing PAC information during ticket issuance.

Microsoft defines PAC creation, validation, and signature behavior through MS-KILE and MS-PAC.

## Signatures

PAC structures include checksum or signature information used to protect integrity.

Validation can involve service-side and KDC-side processing.

The exact signature fields and validation requirements depend on protocol and scenario, so the current MS-PAC and MS-KILE specifications are authoritative.

## Service Tickets

When an application service processes a Service Ticket, PAC authorization information can contribute to construction of the Windows security context used for access decisions.

Validation behavior depends on the protocol flow and configuration.

## Golden and Silver Tickets

[[attack.golden-ticket|Golden Ticket]] and [[attack.silver-ticket|Silver Ticket]] techniques can involve manipulated PAC authorization information in forged tickets.

Protecting service keys and [[ad.krbtgt|KRBTGT]] key material is therefore important.

## Security Significance

PAC data directly influences authorization rather than merely proving authentication.

Incorrect acceptance or validation of PAC information can cause unauthorized group or privilege information to be trusted.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.kdc|Key Distribution Center]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|SID]]
- [[ad.krbtgt|KRBTGT]]
- [[attack.golden-ticket|Golden Ticket]]
- [[attack.silver-ticket|Silver Ticket]]

## References

- [MS-PAC - Privilege Attribute Certificate Data Structure](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/166d8064-c863-41e1-9c23-edaaa5f36962)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
- [MS-KILE - PAC Generation](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/c25d48df-67f0-4c5f-9e46-27a7d5710909)
- [MS-KILE - Processing Authorization Data](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/4ad7ed1f-0bfa-4b5f-bda3-fedbc549a6c0)
- [MS-PAC - Signatures](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/4174c356-68c7-4c60-91e1-50a02d1383be)
