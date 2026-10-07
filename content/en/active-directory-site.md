---
canonical_id: ad.site
title: Active Directory Site
lang: en
slug: active-directory-site
aliases:
  - Site
  - AD Site
categories:
  - Active Directory
status: published
summary: Active Directory Site network topology, subnet association, Domain Controller location, and replication behavior.
---

## Overview

> **Primary source:** [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)

An Active Directory Site represents aspects of the physical network topology used by [[ad.active-directory|Active Directory]].

A Site groups network locations represented through TCP/IP subnets.

## Logical and Physical Structure

[[ad.forest|Forests]], [[ad.domain|Domains]], and [[ad.organizational-unit|OUs]] form logical directory structure.

Sites represent physical network topology.

A Domain can span multiple Sites, while a Site can contain [[ad.domain-controller|Domain Controllers]] from multiple Domains.

## Domain Controller Location

Site information helps clients locate Domain Controllers appropriate for their network location.

This can reduce unnecessary authentication and directory traffic across slower network links.

## Replication

Sites are important to [[ad.replication|Active Directory Replication]].

Active Directory distinguishes replication within a Site from replication between Sites.

Site Links, costs, and schedules can influence inter-site replication topology.

## KCC

The Knowledge Consistency Checker (KCC) runs on Domain Controllers and automatically generates replication topology.

It adjusts topology as the Active Directory and network configuration changes.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.forest|Forest]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]
- [[ad.knowledge-consistency-checker|Knowledge Consistency Checker]]
- [[ad.site-link|Site Link]]

## References

- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
