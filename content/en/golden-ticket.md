---
canonical_id: attack.golden-ticket
title: Golden Ticket
lang: en
slug: golden-ticket
aliases: []
categories:
  - Active Directory
  - Kerberos
status: published
summary: Golden Ticket TGT forgery using compromised KRBTGT key material, PAC authorization data, impact, detection, and KRBTGT recovery.
---

## Overview

> **Primary source:** [MITRE ATT&CK T1558.001 - Golden Ticket](https://attack.mitre.org/techniques/T1558/001/)

[[attack.golden-ticket|Golden Ticket]] is a Kerberos ticket-forgery technique in which an attacker with compromised [[ad.krbtgt|KRBTGT]] key material creates forged [[kerberos.ticket-granting-ticket|Ticket-Granting Tickets (TGTs)]].

Because KRBTGT is central to [[ad.domain|Active Directory Domain]] KDC trust, Golden Ticket compromise can have broader impact than compromise of one service identity.

## KRBTGT

The [[kerberos.kdc|Key Distribution Center (KDC)]] on [[ad.domain-controller|Domain Controllers]] uses KRBTGT-related key material when processing TGTs.

Compromise of that key material can allow forged TGTs to satisfy cryptographic checks even though they were not issued through the normal KDC flow.

## PAC

Windows [[kerberos.ticket|Kerberos Tickets]] can carry authorization information in a [[windows.privilege-attribute-certificate|Privilege Attribute Certificate (PAC)]].

Authorization information in a forged TGT can therefore also be manipulated.

[[windows.security-identifier|SIDs]] and group-related data are important inputs to Windows authorization decisions.

## Impact

A forged TGT can potentially be presented to the [[kerberos.ticket-granting-server|Ticket-Granting Server]] to obtain [[kerberos.service-ticket|Service Tickets]] for multiple services.

Golden Tickets are therefore associated with persistence, privilege escalation, and lateral movement.

## Obtaining KRBTGT Key Material

Golden Ticket creation presupposes prior compromise of KRBTGT key material.

Domain-level credential access such as [[attack.dcsync|DCSync]] or [[attack.ntds-credential-dumping|NTDS Credential Dumping]] can be relevant sources of such exposure.

## Detection

MITRE ATT&CK identifies useful correlations including:

- unusual ticket lifetimes;
- encryption types inconsistent with the environment;
- anomalous privileged activity;
- Service Ticket activity inconsistent with preceding TGT requests.

No single event reliably proves Golden Ticket use, so Kerberos telemetry and account behavior should be correlated.

## Recovery

> **Primary source:** [Microsoft - AD Forest Recovery - Reset the krbtgt password](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-reset-the-krbtgt-password)

For recovery from KRBTGT compromise, Microsoft's Active Directory Forest Recovery guidance specifies resetting the KRBTGT password twice.

With the default configuration, administrators must wait 10 hours between resets. If Kerberos ticket lifetimes have been changed, the waiting period must be longer than the configured maximum lifetime.

Microsoft documents a KRBTGT password-history value of 2, so two resets remove old passwords from that history.

## Difference from Silver Ticket

[[attack.silver-ticket|Silver Ticket]] uses key material associated with a target service to forge Service Tickets.

Golden Ticket uses KRBTGT key material to forge TGTs and therefore generally has broader Domain-level impact.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.kdc|Key Distribution Center]]
- [[ad.krbtgt|KRBTGT]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[windows.privilege-attribute-certificate|PAC]]
- [[windows.security-identifier|SID]]
- [[attack.silver-ticket|Silver Ticket]]
- [[attack.dcsync|DCSync]]
- [[attack.ntds-credential-dumping|NTDS Credential Dumping]]
- [[ad.active-directory|Active Directory]]
- [[ad.forest|Active Directory Forest]]
- [[ad.service-account|Service Account]]

## References

- [MITRE ATT&CK T1558.001 - Golden Ticket](https://attack.mitre.org/techniques/T1558/001/)
- [Microsoft - Active Directory Forest Recovery - Reset the krbtgt password](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-reset-the-krbtgt-password)
- [MS-PAC - Privilege Attribute Certificate Data Structure](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/)
- [MS-PAC - KDC Signature](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/3122bf00-ea87-4c3f-92a0-91c0a99f5eec)
