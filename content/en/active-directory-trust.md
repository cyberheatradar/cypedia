---
canonical_id: ad.trust
title: Active Directory Trust
lang: en
slug: active-directory-trust
aliases:
  - Domain Trust
  - Forest Trust
categories:
  - Active Directory
status: published
summary: Active Directory Trust direction, transitivity, and authentication relationships between Domains and Forests.
---

## Overview

> **Primary source:** [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)

An Active Directory Trust establishes an authentication relationship between [[ad.domain|Domains]] or [[ad.forest|Forests]].

A trust can allow an identity authenticated in one Domain to be considered when access to resources in another Domain is evaluated.

## Same-Forest Trusts

Domains inside the same Forest are automatically connected through two-way, transitive trusts.

These trusts create authentication paths between Domains in the Forest.

Microsoft defines the Forest itself as an Active Directory security boundary. Automatic two-way, transitive trusts between Domains in the same Forest are authentication relationships inside that boundary.

## Forest Trust

A Forest Trust can establish an authentication relationship between separate Forests.

It provides a Forest-level mechanism for cross-Forest authentication.

## External Trust

An External Trust can be used to establish a trust relationship with a specific Domain without creating a Forest-wide trust relationship.

## Direction

Trust relationships have direction.

The direction determines which side accepts identities authenticated by the other side when resource access is evaluated.

A two-way trust establishes trust in both directions.

## Transitivity

A transitive trust can extend an authentication path through related trust relationships.

Same-Forest Domain trusts are transitive.

Not every trust type has identical transitivity behavior.

## Kerberos

[[auth.kerberos|Kerberos]] is important to cross-Domain authentication in Active Directory.

Domain and Forest trust relationships participate in establishing cross-domain authentication paths.

## Security Considerations

Trusts can create authentication paths within a Forest or between Forests.

Because Microsoft defines a Forest as a security boundary, cross-Forest trusts require particular care when authentication relationships are extended across that boundary.

Misconfiguration can create unintended resource-access paths.

Attackers can perform [[attack.domain-trust-discovery|Domain Trust Discovery]] to identify trust relationships that may support lateral movement or privilege expansion.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.forest|Forest]]
- [[ad.domain-controller|Domain Controller]]
- [[auth.kerberos|Kerberos]]
- [[attack.domain-trust-discovery|Domain Trust Discovery]]

## References

- [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)
- [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)
- [Microsoft Open Specifications - MS-ADTS trustAttributes](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/e9a2d23c-c31e-4a6f-88a0-6646fdb51a3c)
- [Microsoft Open Specifications - MS-ADTS trustDirection](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/5026a939-44ba-47b2-99cf-386a9e674b04)
- [MITRE ATT&CK T1482 - Domain Trust Discovery](https://attack.mitre.org/techniques/T1482/)
