---
canonical_id: ad.domain-controller
title: Domain Controller
lang: en
slug: domain-controller
aliases:
  - DC
categories:
  - Active Directory
status: published
summary: Domain Controller directory storage, authentication, replication, and security importance.
---

## Overview

> **Primary source:** [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)

A Domain Controller (DC) is a Windows Server that hosts [[ad.active-directory|Active Directory Domain Services]].

Domain Controllers store directory data and provide core services including authentication, directory queries, and [[ad.replication|replication]].

## Directory Data

A writable Domain Controller stores a full writable replica of the Domain Partition for its own [[ad.domain|Domain]].

A [[ad.read-only-domain-controller|Read-Only Domain Controller (RODC)]] hosts a read-only replica and does not accept originating updates.

Domain Controllers also store Forest-wide [[ad.schema|Schema]] and Configuration partitions.

The primary Active Directory database file is [[ad.ntds-dit|NTDS.dit]].

## Authentication

In an AD DS environment, Domain Controllers provide the [[kerberos.kdc|KDC]] role used by [[auth.kerberos|Kerberos]].

They can also participate in [[auth.ntlm|NTLM]] authentication where compatibility requires it.

## LDAP

Domain Controllers expose [[protocol.ldap|LDAP]] directory operations.

Active Directory extends standard LDAP with Microsoft-specific protocol behavior documented in Microsoft Open Specifications.

## Replication

Deploying multiple writable Domain Controllers provides distributed directory availability.

Directory changes are propagated to other Domain Controllers through Active Directory Replication.

A Domain Controller can also provide the [[ad.global-catalog|Global Catalog]] role.

## SYSVOL

Domain Controllers provide [[ad.sysvol|SYSVOL]], which contains file-based information used by technologies such as [[windows.group-policy|Group Policy]].

## Security Importance

> **Primary source:** [Microsoft - Securing Domain Controllers Against Attack](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/securing-domain-controllers-against-attack)

Domain Controllers are among the most security-critical systems in an Active Directory environment.

Privileged compromise of a Domain Controller can undermine directory data, credentials, authentication infrastructure, and systems managed through Active Directory.

Domain Controllers therefore require stricter hardening and administration than ordinary member servers and workstations.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.forest|Forest]]
- [[ad.replication|Active Directory Replication]]
- [[ad.global-catalog|Global Catalog]]
- [[ad.ntds-dit|NTDS.dit]]
- [[ad.sysvol|SYSVOL]]
- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|KDC]]
- [[auth.ntlm|NTLM]]
- [[protocol.ldap|LDAP]]

## References

- [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
- [Microsoft - Securing Domain Controllers Against Attack](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/securing-domain-controllers-against-attack)
- [Microsoft - Planning Domain Controller Placement](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/planning-domain-controller-placement)
