---
canonical_id: ad.replication
title: Active Directory Replication
lang: en
slug: active-directory-replication
aliases:
  - AD Replication
categories:
  - Active Directory
status: published
summary: Active Directory Replication multi-master behavior, KCC topology, Sites, and Directory Partition replication scopes.
---

## Overview

> **Primary source:** [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)

Active Directory Replication synchronizes directory data between [[ad.domain-controller|Domain Controllers]] in [[ad.active-directory|Active Directory Domain Services]].

AD DS is a distributed directory. Multiple writable Domain Controllers in the same [[ad.domain|Domain]] can accept directory changes and replicate them to other replicas.

## Multi-Master Model

Most Active Directory directory updates use a multi-master model.

Writable Domain Controllers can accept originating updates rather than requiring all changes to pass through a single server.

Some operations are exceptions and are handled through [[ad.fsmo-roles|FSMO Roles]].

## Directory Partitions

Replication operates on [[ad.directory-partition|Directory Partitions]].

Important partitions include:

- Domain Partition;
- Configuration Partition;
- [[ad.schema|Schema]] Partition;
- Application Directory Partition.

Replication scope depends on which Domain Controllers hold replicas of each partition.

## Connection Objects

A replication connection is represented by a connection object in Active Directory.

The object represents an inbound replication connection from a source Domain Controller to a destination Domain Controller.

## KCC

The Knowledge Consistency Checker (KCC) is a built-in process that runs on Domain Controllers.

It generates replication topology for the [[ad.forest|Forest]] and adjusts that topology as Domain Controllers, availability, Sites, costs, and schedules change.

## Intra-Site and Inter-Site Replication

[[ad.site|Active Directory Sites]] influence replication topology.

Active Directory maintains separate concepts for replication inside a Site and replication between Sites.

Site Links, costs, and schedules can be used to model inter-site connectivity.

## Global Catalog

A [[ad.global-catalog|Global Catalog]] server maintains a full replica of its own Domain and partial replicas for other Domains in the Forest.

Replication keeps those replicas synchronized.

## Failure Impact

Persistent replication failures can cause inconsistent directory state between Domain Controllers.

This can affect authentication, authorization, Group Policy, and other directory-dependent services.

## Security Considerations

Replication handles security-sensitive directory data.

[[attack.dcsync|DCSync]] abuses replication-related permissions to request credential information through directory replication mechanisms.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.domain|Domain]]
- [[ad.forest|Forest]]
- [[ad.site|Active Directory Site]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.global-catalog|Global Catalog]]
- [[ad.fsmo-roles|FSMO Roles]]
- [[attack.dcsync|DCSync]]
- [[windows.group-policy|Group Policy]]
- [[ad.knowledge-consistency-checker|Knowledge Consistency Checker]]
- [[ad.site-link|Site Link]]
- [[ad.connection-object|Connection Object]]

## References

- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [Microsoft - Troubleshooting Active Directory Replication](https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/troubleshoot-adreplication-guidance)
