---
canonical_id: protocol.dns
title: DNS
lang: en
slug: dns
aliases:
  - Domain Name System
categories:
  - Network / Protocol
status: published
summary: DNS namespaces, zones, resource records, resolvers and authoritative servers, and Active Directory integration.
---

## Overview

> **Primary sources:** [RFC 1034 - Domain Names: Concepts and Facilities](https://www.rfc-editor.org/rfc/rfc1034.html) / [RFC 1035 - Domain Names: Implementation and Specification](https://www.rfc-editor.org/rfc/rfc1035.html)

[[protocol.dns|Domain Name System (DNS)]] is a distributed system for managing and resolving information in a hierarchical domain-name namespace.

DNS is used for more than hostname-to-address translation. It also carries information for mail routing, service discovery, delegation, and other functions.

## Namespace

The DNS namespace is a hierarchical tree rooted at the DNS root.

Names are built from labels arranged within that hierarchy.

A Fully Qualified Domain Name (FQDN) identifies a location in the DNS namespace.

## Zones

The namespace can be divided into zones according to administrative authority.

A zone is the portion of the namespace for which an authoritative DNS server maintains authoritative data.

A DNS zone boundary and a domain-name boundary do not necessarily represent the same administrative concept.

## Resource Records

DNS information is represented as Resource Records (RRs).

Common types include:

- A;
- AAAA;
- NS;
- SOA;
- CNAME;
- MX;
- PTR;
- SRV.

Different record types represent different kinds of resource information.

## Resolvers and Authoritative Servers

A resolver performs DNS queries on behalf of an application or host.

An authoritative DNS server provides authoritative answers for zones over which it has authority.

Recursive resolution can involve queries to multiple DNS servers.

## Active Directory

> **Primary source:** [Microsoft - DNS and AD DS](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/dns-and-ad-ds)

[[ad.active-directory|Active Directory Domain Services]] depends heavily on DNS infrastructure.

Clients use DNS information to locate [[ad.domain-controller|Domain Controllers]], and Domain Controllers depend on DNS name resolution for directory-service communication.

The namespace of an [[ad.domain|Active Directory Domain]] is also closely related to DNS naming.

## Domain Controller Location

AD DS publishes DNS locator information that allows clients to discover Domain Controllers and services such as Kerberos and LDAP.

This supports selection of Domain Controllers appropriate for a client's Domain and network topology.

## Active Directory-Integrated DNS

> **Primary source:** [Microsoft - Active Directory-Integrated DNS Zones](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/active-directory-integrated-dns-zones)

A DNS zone can be stored in AD DS.

When integrated with AD DS, DNS zone data can replicate through [[ad.replication|Active Directory Replication]] rather than requiring a separate topology based only on ordinary DNS zone transfers.

AD-integrated DNS also supports secure dynamic updates.

## Application Directory Partitions

Microsoft stores AD-integrated DNS data in DNS-specific [[ad.directory-partition|Application Directory Partitions]].

Common examples are the Forest-wide `ForestDnsZones` partition and Domain-wide `DomainDnsZones` partitions.

## Security Considerations

DNS integrity and availability directly affect authentication and service discovery in AD DS.

Important controls include:

- secure dynamic updates;
- appropriate permissions on zone data;
- prevention of unauthorized record changes;
- stale-record management;
- DNS-server availability;
- correct client DNS configuration.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.forest|Active Directory Forest]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.site|Active Directory Site]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.replication|Active Directory Replication]]
- [[protocol.ldap|LDAP]]
- [[auth.kerberos|Kerberos]]

## References

- [RFC 1034 - Domain Names: Concepts and Facilities](https://www.rfc-editor.org/rfc/rfc1034.html)
- [RFC 1035 - Domain Names: Implementation and Specification](https://www.rfc-editor.org/rfc/rfc1035.html)
- [Microsoft - DNS and AD DS](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/dns-and-ad-ds)
- [Microsoft - Active Directory-Integrated DNS Zones](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/active-directory-integrated-dns-zones)
