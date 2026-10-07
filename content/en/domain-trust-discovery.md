---
canonical_id: attack.domain-trust-discovery
title: Domain Trust Discovery
lang: en
slug: domain-trust-discovery
aliases: []
categories:
  - Active Directory
  - Discovery
status: published
summary: Domain Trust Discovery of AD Domain and Forest trust relationships, lateral-movement path analysis, detection, and defense.
---

## Overview

> **Primary source:** [MITRE ATT&CK T1482 - Domain Trust Discovery](https://attack.mitre.org/techniques/T1482/)

[[attack.domain-trust-discovery|Domain Trust Discovery]] is a Discovery technique used to identify [[ad.trust|Trust]] relationships between [[ad.domain|Active Directory Domains]] and [[ad.forest|Forests]] and understand possible authentication and authorization paths across an [[ad.active-directory|Active Directory]] environment.

## Trusts

An AD Trust allows authentication established in one Domain to participate in access decisions for resources in another Domain.

Available paths depend on trust direction, transitivity, and trust type.

## Information of Interest

An adversary may seek information such as:

- trusted and trusting Domains;
- Forest relationships;
- trust direction;
- transitivity;
- target Domain names;
- potential lateral-movement paths.

This information is not itself a credential, but it can guide subsequent targeting.

## LDAP and APIs

MITRE ATT&CK documents that trust relationships can be discovered through [[protocol.ldap|LDAP]], Windows APIs, .NET interfaces, and related administrative mechanisms.

These mechanisms also have legitimate uses, so the presence of a trust query alone does not establish malicious intent.

## Kerberos

AD Trust relationships are important to cross-domain [[auth.kerberos|Kerberos]] authentication.

[[kerberos.cross-realm-authentication|Cross-Realm Authentication]] and referral TGTs can establish authentication paths toward trusted Domains.

## Attack Paths

Trust information can help an attacker evaluate lateral movement, Kerberos ticket abuse, or SIDHistory-related paths after other credentials have already been compromised.

A Trust does not itself automatically grant privilege: resource permissions and useful credentials or privileges are still required.

## Detection

Useful signals include:

- trust enumeration by unusual processes;
- high-volume trust queries from non-administrative endpoints;
- unusual LDAP query patterns;
- cross-domain authentication soon after trust discovery;
- access through trust paths that are rarely used.

## Mitigation

The goal is not to eliminate all legitimate Trust Discovery.

More effective controls include simplifying trust topology, removing unnecessary Trusts, applying least privilege to cross-domain resource permissions, and monitoring administrative discovery activity.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.forest|Active Directory Forest]]
- [[ad.trust|Active Directory Trust]]
- [[protocol.ldap|LDAP]]
- [[auth.kerberos|Kerberos]]
- [[kerberos.cross-realm-authentication|Cross-Realm Authentication]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[windows.security-identifier|SID]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[ad.sid-history|SIDHistory]]

## References

- [MITRE ATT&CK T1482 - Domain Trust Discovery](https://attack.mitre.org/techniques/T1482/)
- [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)
- [Microsoft - Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)
- [MS-KILE - Cross-Domain Trust and Referrals](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/bac4dc69-352d-416c-a9f4-730b81ababb3)
