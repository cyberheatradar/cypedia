---
canonical_id: auth.ntlm
title: NTLM
lang: en
slug: ntlm
aliases: []
categories:
  - Authentication
  - Windows
status: published
summary: NTLM challenge-response authentication, local and Domain verification, Kerberos positioning, NTLMv1 removal, and NTLMv2 deprecation.
---

## Overview

> **Primary source:** [Microsoft - NTLM overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/ntlm-overview)

[[auth.ntlm|NTLM]] is a family of challenge-response authentication protocols used by Windows.

Microsoft's NTLM overview describes LAN Manager version 1 and 2 and NTLM version 1 and 2 as part of the NTLM authentication family.

In current [[ad.active-directory|Active Directory]] environments, [[auth.kerberos|Kerberos]] is the preferred authentication method.

## Challenge-Response

Instead of transmitting a password directly, NTLM uses a secret derived from the account credential together with a server challenge to construct a response.

The server or Domain authentication service validates that response to determine whether the client possesses the account secret.

## Local Accounts

For a local account, a resource server can validate authentication against its local account database.

NTLM therefore remains relevant to Windows authentication outside an Active Directory Domain.

## Domain Accounts

For a Domain account, a resource server can contact the authentication service for the account's Domain.

A [[ad.domain-controller|Domain Controller]] participates in this Domain authentication process.

## Difference from Kerberos

Kerberos is based on tickets issued by a [[kerberos.kdc|Key Distribution Center]].

NTLM is challenge-response based and does not use Kerberos Tickets.

Kerberos is preferred in AD DS, while NTLM can still appear where application, naming, or protocol conditions prevent Kerberos from being used.

## Negotiate

Windows applications can use the Negotiate security package to select an available authentication mechanism.

Where Kerberos can be used, Negotiate can select Kerberos; under other conditions it can fall back to NTLM.

## NTLMv1 Removal

> **Primary source:** [Microsoft - What's new in Windows 11 version 24H2](https://learn.microsoft.com/en-us/windows/whats-new/whats-new-windows-11-version-24h2)

NTLMv1 is removed starting with Windows 11 version 24H2 and Windows Server 2025.

New Windows deployments should therefore not depend on NTLMv1 compatibility.

## Future of NTLMv2

> **Primary source:** [Microsoft - Features removed or no longer developed in Windows Server](https://learn.microsoft.com/en-us/windows-server/get-started/removed-deprecated-features-windows-server)

Microsoft lists NTLMv2 as deprecated and no longer under active feature development and states that it will be removed from Windows Server in a future release.

Legacy application dependencies on NTLM should therefore be inventoried and migrated toward Kerberos or more modern authentication mechanisms.

## Security Considerations

Important NTLM security issues include:

- protection of credential hashes;
- NTLM relay;
- credential forwarding;
- legacy protocol dependencies;
- removal of weak or obsolete versions;
- auditing NTLM usage.

Microsoft provides policy and logging capabilities that help organizations discover and selectively restrict NTLM traffic.

## Current Position

NTLM has not disappeared from current Windows environments and remains necessary in some scenarios.

However, Microsoft's platform direction is toward reduced NTLM dependence.

New systems should avoid introducing unnecessary NTLM dependencies and prefer Kerberos or modern authentication where appropriate.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|SID]]
- [[kerberos.ticket|Kerberos Ticket]]

## References

- [Microsoft - NTLM overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/ntlm-overview)
- [MS-NLMP - NT LAN Manager Authentication Protocol](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-nlmp/)
- [Microsoft - What's new in Windows 11 version 24H2](https://learn.microsoft.com/en-us/windows/whats-new/whats-new-windows-11-version-24h2)
- [Microsoft - Features removed or no longer developed in Windows Server](https://learn.microsoft.com/en-us/windows-server/get-started/removed-deprecated-features-windows-server)
