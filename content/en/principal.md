---
canonical_id: kerberos.principal
title: Principal
lang: en
slug: principal
aliases:
  - principal
categories:
  - Kerberos
status: published
summary: Kerberos Principal identity, naming, Realms, client/server principals, and Active Directory relationships.
---

## Overview

> **Primary source:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

A [[kerberos.principal|Principal]] is an entity identified and authenticated by [[auth.kerberos|Kerberos]].

Users, hosts, and application services can all be Kerberos Principals.

Both clients and servers are represented by Principal identities.

## Principal Names

RFC 4120 represents a Principal Name using name components and a name type.

The [[kerberos.realm|Realm]] is also important when identifying a Principal.

A common display form combines a Principal and Realm as `name@REALM`.

## Client Principal

A client Principal represents the entity requesting authentication.

A user is a common example, but hosts and services can also initiate Kerberos exchanges as clients.

## Server Principal

A server Principal identifies the service a client wants to access.

In [[ad.active-directory|Active Directory]], a service instance is commonly identified through a [[ad.service-principal-name|Service Principal Name (SPN)]].

## KDC Relationship

The [[kerberos.kdc|Key Distribution Center (KDC)]] handles information about Principals in its Realm and the key material required by the protocol.

A client obtains initial credentials from the [[kerberos.authentication-server|Authentication Server]] before requesting further tickets.

## Tickets

A [[kerberos.ticket|Kerberos Ticket]] is associated with client and server Principal information.

A [[kerberos.service-ticket|Service Ticket]] is issued for a particular server Principal.

## Active Directory

Windows Server maps user, computer, and service identities in AD DS into Kerberos authentication.

A Windows [[windows.security-principal|Security Principal]] is not identical to a Kerberos Principal.

A Security Principal is an entity in the Windows authorization model, while a Kerberos Principal is an identity in the Kerberos protocol.

## Security Considerations

Incorrect Principal naming can lead to authentication failures or incorrect service identity selection.

Service identities should use correctly registered and appropriately scoped SPNs.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.realm|Realm]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[ad.service-principal-name|Service Principal Name]]
- [[windows.security-principal|Security Principal]]

## References

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Service Principal Names](https://learn.microsoft.com/en-us/windows/win32/ad/service-principal-names)
- [Microsoft - Kerberos authentication overview in Windows Server](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
