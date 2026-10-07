---
canonical_id: ad.connection-object
title: Connection Object
lang: en
slug: connection-object
aliases: []
categories:
  - Active Directory
  - Replication
status: published
summary: Active Directory Connection Objects representing replication connections from source Domain Controllers to destination Domain Controllers.
---

## Overview

A [[ad.connection-object|Connection Object]] is an Active Directory object representing a [[ad.replication|replication]] connection from a source [[ad.domain-controller|Domain Controller]] to a destination Domain Controller.

## Location

The Connection Object is stored as a child of the NTDS Settings object beneath the server object representing the destination Domain Controller.

This structure represents inbound replication toward that Domain Controller.

## Information Represented

Microsoft documentation states that a Connection Object identifies the replication source server and contains replication-schedule and replication-transport information.

## KCC Relationship

The [[ad.knowledge-consistency-checker|Knowledge Consistency Checker (KCC)]] can create Connection Objects automatically.

Administrators can also create manual Connection Objects.

Microsoft distinguishes automatically generated connections from manual or administratively modified connections and notes that the KCC does not modify manual or modified Connection Objects in the same way as automatic ones.

## Site Link Relationship

For inter-site replication, the KCC uses [[ad.site-link|Site Link]] properties when calculating topology and then creates specific Connection Objects between Domain Controllers.

A Site Link models logical connectivity between Sites, while a Connection Object represents a specific Domain Controller replication relationship.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.replication|Active Directory Replication]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.site|Active Directory Site]]
- [[ad.site-link|Site Link]]
- [[ad.knowledge-consistency-checker|Knowledge Consistency Checker]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.domain|Active Directory Domain]]

## References

- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
