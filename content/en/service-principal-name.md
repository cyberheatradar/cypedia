---
canonical_id: ad.service-principal-name
title: Service Principal Name
lang: en
slug: service-principal-name
aliases:
  - SPN
categories:
  - Active Directory
  - Kerberos
status: published
summary: Service Principal Name (SPN) Kerberos service identity, syntax, Active Directory registration, uniqueness, and Kerberoasting relevance.
---

## Overview

> **Primary sources:** [Microsoft - Service principal names](https://learn.microsoft.com/en-us/windows/win32/ad/service-principal-names) / [Microsoft - Name Formats for Unique SPNs](https://learn.microsoft.com/en-us/windows/win32/ad/name-formats-for-unique-spns)

A [[ad.service-principal-name|Service Principal Name (SPN)]] identifies a service instance for [[auth.kerberos|Kerberos]] authentication in [[ad.active-directory|Active Directory]].

A Kerberos client identifies the target service through an SPN and requests a [[kerberos.service-ticket|Service Ticket]] for that identity from the [[kerberos.kdc|Key Distribution Center (KDC)]].

The service identity represented by an SPN is related to the server [[kerberos.principal|Principal]] used by Kerberos.

## Registration in Active Directory

An SPN is registered in the `servicePrincipalName` attribute of the computer account or [[ad.service-account|Service Account]] under which the service runs.

If the sign-in account for a service changes, its SPNs may need to be re-registered on the new account.

## Uniqueness

An SPN must be unique within the [[ad.forest|Active Directory Forest]] where it is registered.

Duplicate SPNs can prevent the KDC from identifying one account for the requested service and can cause Kerberos authentication failures.

`setspn -S` can be used to register an SPN while checking for duplicate values.

## Format

Microsoft documents the general SPN form as:

`serviceclass/host:port/servicename`

The service class and host are required.

The port and service name are optional components used where additional uniqueness is needed.

A common host-based form is:

`serviceclass/host`

## DNS Relationship

The host component of an SPN commonly uses an FQDN or other hostname.

[[protocol.dns|DNS]] resolution and the hostname selected by the client can therefore affect Kerberos service authentication.

A DNS record and an SPN are not the same object.

## Service Tickets

When a client connects to a service, the requested SPN is used in the TGS exchange.

The [[kerberos.ticket-granting-server|Ticket-Granting Server]] identifies the account associated with the SPN and issues the corresponding Service Ticket.

## Kerberoasting

[[attack.kerberoasting|Kerberoasting]] uses normal Kerberos functionality that permits Service Tickets to be requested for SPN-registered service identities.

Where a traditional Service Account uses a weak password, encrypted ticket material can become useful for offline password guessing.

## Security Considerations

Important SPN-management practices include:

- avoiding duplicate SPNs;
- removing stale SPNs when service accounts change;
- avoiding unnecessary registrations;
- protecting Service Accounts;
- using strong credentials or managed service accounts.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.principal|Principal]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.service-ticket|Service Ticket]]
- [[ad.service-account|Service Account]]
- [[ad.active-directory|Active Directory]]
- [[ad.forest|Active Directory Forest]]
- [[protocol.dns|DNS]]
- [[attack.kerberoasting|Kerberoasting]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[ad.computer-account|Computer Account]]

## References

- [Microsoft - Service principal names](https://learn.microsoft.com/en-us/windows/win32/ad/service-principal-names)
- [Microsoft - Name Formats for Unique SPNs](https://learn.microsoft.com/en-us/windows/win32/ad/name-formats-for-unique-spns)
- [Microsoft - How to configure SPN for Windows Server](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/how-to-configure-spn)
- [Microsoft - setspn](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/setspn)
