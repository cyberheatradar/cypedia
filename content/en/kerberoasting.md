---
canonical_id: attack.kerberoasting
title: Kerberoasting
lang: en
slug: kerberoasting
aliases:
  - Kerberoast
categories:
  - Active Directory
  - Kerberos
status: published
summary: Kerberoasting Service Ticket acquisition, SPN and Service Account relationships, offline password guessing, detection, and mitigation.
---

## Overview

> **Primary source:** [MITRE ATT&CK T1558.003 - Kerberoasting](https://attack.mitre.org/techniques/T1558/003/)

[[attack.kerberoasting|Kerberoasting]] is a credential-access technique that uses normal [[auth.kerberos|Kerberos]] ticket issuance to obtain cryptographic material from a [[kerberos.service-ticket|Service Ticket]] associated with a [[ad.service-principal-name|Service Principal Name (SPN)]] and subject it to offline password guessing.

In [[ad.active-directory|Active Directory]], service identities are associated with computer accounts or [[ad.service-account|Service Accounts]].

## Prerequisites

In a common Kerberoasting scenario, an authenticated principal holding a valid [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket (TGT)]] requests a Service Ticket for a target SPN.

The [[kerberos.ticket-granting-server|Ticket-Granting Server (TGS)]] issues the ticket as part of normal Kerberos behavior.

Compromise of the Domain Controller or KDC is not itself required merely to make this ticket request.

## Service Accounts

The encrypted portion of a Service Ticket is protected with key material available to the target service.

For a traditional Service Account, password-derived key material can therefore make a guessable service password relevant to offline cracking risk.

Managed identities such as gMSAs use long, automatically managed credentials and substantially reduce this risk.

## Encryption Types

> **Primary source:** [Microsoft - Detect and Remediate RC4 Usage in Kerberos](https://learn.microsoft.com/en-us/windows-server/security/kerberos/detect-remediate-rc4-kerberos)

Legacy Kerberos encryption such as RC4-HMAC is an important Kerberoasting risk and monitoring consideration.

Microsoft provides current Windows Server guidance for auditing RC4 usage through Kerberos events including Event IDs 4768 and 4769.

The underlying issue, however, is not RC4 alone: Kerberoasting becomes useful where Service Ticket key material ultimately depends on a Service Account credential that can be guessed.

## Offline Guessing

Password guessing against collected ticket material occurs offline, away from the KDC.

Account lockout therefore does not by itself compensate for a weak Service Account password.

## Detection

MITRE ATT&CK identifies anomalous Kerberos Service Ticket requests as an important signal.

Useful observations include:

- unusual Event ID 4769 volume;
- requests for SPNs not normally used by the requester;
- legacy encryption types such as RC4;
- bursts of requests across many service identities;
- unusual requests targeting privileged Service Accounts.

Because legitimate Kerberos activity also produces 4769 events, detection should combine request volume, requester identity, target service, and encryption type.

## Mitigation

Important controls include:

- preferring managed Service Accounts such as [[ad.group-managed-service-account|gMSAs]];
- using long, random credentials for traditional Service Accounts;
- applying least privilege to service identities;
- removing unnecessary or stale SPNs;
- reducing RC4 dependencies and moving toward AES;
- monitoring Service Ticket requests.

## Differences from Other Kerberos Attacks

[[attack.as-rep-roasting|AS-REP Roasting]] targets accounts for which Pre-Authentication is not required.

[[attack.golden-ticket|Golden Ticket]] and [[attack.silver-ticket|Silver Ticket]] involve ticket forgery after key material has already been compromised rather than offline guessing of Service Ticket protection.

## Related Pages

- [[auth.kerberos|Kerberos]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.principal|Principal]]
- [[ad.service-principal-name|Service Principal Name]]
- [[ad.service-account|Service Account]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[attack.as-rep-roasting|AS-REP Roasting]]
- [[attack.golden-ticket|Golden Ticket]]
- [[attack.silver-ticket|Silver Ticket]]
- [[kerberos.authentication-server|Authentication Server]]
- [[kerberos.pre-authentication|Pre-Authentication]]
- [[ad.computer-account|Computer Account]]

## References

- [MITRE ATT&CK T1558.003 - Kerberoasting](https://attack.mitre.org/techniques/T1558/003/)
- [Microsoft - Detect and Remediate RC4 Usage in Kerberos](https://learn.microsoft.com/en-us/windows-server/security/kerberos/detect-remediate-rc4-kerberos)
- [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)
- [Microsoft - Service Principal Names](https://learn.microsoft.com/en-us/windows/win32/ad/service-principal-names)
- [Microsoft - Secure group managed service accounts](https://learn.microsoft.com/en-us/entra/architecture/service-accounts-group-managed)
