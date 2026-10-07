---
canonical_id: ad.krbtgt
title: KRBTGT
lang: en
slug: krbtgt
aliases:
  - KRBTGT Account
  - KRBTGT account
categories:
  - Active Directory
  - Kerberos
status: published
summary: Active Directory KRBTGT account, KDC/TGT keys, Domain scope, RODCs, Golden Tickets, and reset considerations.
---

## Overview

> **Primary source:** [Microsoft - Active Directory Accounts](https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/active-directory-accounts)

The [[ad.krbtgt|KRBTGT]] account is the default account used by the [[kerberos.kdc|Key Distribution Center (KDC)]] service in an [[ad.active-directory|Active Directory]] [[ad.domain|Domain]].

It is created automatically when a Domain is created and is not an ordinary account intended for interactive sign-in.

Microsoft documents that the account cannot be deleted, renamed, or enabled.

## TGT Relationship

A [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket (TGT)]] is cryptographically protected using symmetric key material associated with KRBTGT.

This allows KDCs in the Domain to issue and validate ticket-granting credentials.

KRBTGT key material is therefore central to Domain-wide Kerberos trust.

## KDC

[[ad.domain-controller|Domain Controllers]] provide the Kerberos KDC service.

Their KDC functionality uses KRBTGT-related key material when processing TGTs.

## Password History

Microsoft's Forest Recovery guidance documents a KRBTGT password history value of 2, meaning that the two most recent passwords are retained in password history.

This password-history behavior directly explains why compromise-recovery procedures reset the KRBTGT password twice to remove old passwords from history.

## Forest Recovery

> **Primary source:** [Microsoft - AD Forest Recovery - Reset the krbtgt password](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-reset-the-krbtgt-password)

Microsoft's Forest Recovery guidance performs two KRBTGT password resets with a waiting period based on ticket lifetime between them.

The purpose is to remove old password-derived key material from password history.

This is an operationally significant recovery procedure and should not be performed without considering authentication impact.

## RODCs

A Read-Only Domain Controller (RODC) uses a separate KRBTGT account rather than the same account used by writable Domain Controllers.

RODC-specific accounts use names such as `krbtgt_<number>`.

## Golden Ticket

[[attack.golden-ticket|Golden Ticket]] is an attack technique in which compromised KRBTGT key material is used to forge TGTs.

KRBTGT compromise can therefore have broader Domain-wide consequences than compromise of one ordinary service account.

## Difference from Service Tickets

KRBTGT key material protects TGTs.

A [[kerberos.service-ticket|Service Ticket]] is protected with key material associated with its target service identity.

[[attack.silver-ticket|Silver Ticket]] consequently uses different key material from Golden Ticket.

## Security Significance

KRBTGT credential material is among the most sensitive authentication secrets in a Domain.

Domain Controller or directory-database compromise should therefore include consideration of possible KRBTGT exposure.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[attack.golden-ticket|Golden Ticket]]
- [[attack.silver-ticket|Silver Ticket]]
- [[ad.ntds-dit|NTDS.dit]]
- [[ad.forest|Active Directory Forest]]
- [[ad.service-account|Service Account]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[ad.read-only-domain-controller|Read-Only Domain Controller]]
- [[ad.user-account|User Account]]

## References

- [Microsoft - Active Directory Accounts](https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/active-directory-accounts)
- [Microsoft - AD Forest Recovery - Reset the krbtgt password](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-reset-the-krbtgt-password)
- [MITRE ATT&CK T1558.001 - Golden Ticket](https://attack.mitre.org/techniques/T1558/001/)
