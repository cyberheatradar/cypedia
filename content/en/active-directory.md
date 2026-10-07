---
canonical_id: ad.active-directory
title: Active Directory
lang: en
slug: active-directory
aliases:
  - AD
categories:
  - Active Directory
status: published
summary: Active Directory Domain Services architecture, data model, authentication, replication, DNS, Group Policy, and security considerations based primarily on Microsoft specifications and documentation.
---

## Overview

> **Primary sources:** [MS-ADTS](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/) / [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)

Active Directory is a Microsoft directory-service technology and a collection of related technologies used in Windows environments.

The Microsoft Active Directory Technical Specification (MS-ADTS) documents core Active Directory functionality and describes Microsoft-specific extensions and variations to [[protocol.ldap|LDAP]].

In common enterprise usage, the term Active Directory frequently refers to Active Directory Domain Services (AD DS). This article therefore focuses primarily on AD DS.

AD DS stores objects such as users, computers, groups, and services in a hierarchical directory and provides infrastructure for directory search, authentication, authorization-related information, replication, and centralized configuration management.

## Historical Background

> **Primary sources:** [Microsoft - Active Directory Domain Services](https://learn.microsoft.com/en-us/windows/win32/ad/active-directory-domain-services)

Microsoft documents Active Directory Domain Services as a foundation for distributed networks based on Windows Server and Domain Controllers.

Active Directory introduced a hierarchical directory model, LDAP-based directory access, Kerberos authentication, DNS integration, and distributed directory replication into Windows domain environments.

AD DS continues to be implemented and maintained as part of Windows Server, and Microsoft continues to publish protocol details through Open Specifications such as MS-ADTS.

## Active Directory and AD DS

> **Primary sources:** [MS-ADTS Introduction](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/bacff5f1-9127-457b-877c-db97b1e1802f)

MS-ADTS covers both Active Directory Domain Services (AD DS) and Active Directory Lightweight Directory Services (AD LDS).

AD DS provides Windows domain infrastructure including domains, forests, Domain Controllers, domain-joined clients, Kerberos authentication, and Group Policy.

AD LDS provides directory-service capabilities without creating the same Windows domain infrastructure.

CyPedia distinguishes AD DS from AD LDS whenever that distinction is technically relevant.

## Logical Structure

> **Primary sources:** [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)

The logical structure of AD DS is hierarchical.

Major elements include:

- [[ad.forest|Forest]]
- [[ad.domain|Domain]]
- [[ad.organizational-unit|Organizational Unit (OU)]]
- users
- computers
- groups
- service-related objects

### [[ad.forest|Forest]]

A Forest is the top-level logical structure in AD DS and contains one or more Active Directory Domains.

Domains in the same Forest share a common directory schema, configuration information, and Global Catalog infrastructure.

Microsoft documentation states that domains in the same Forest are automatically linked by two-way, transitive trust relationships.

A Forest defines an Active Directory security boundary. Consequently, administrative compromise that crosses Forest-level trust or control boundaries can have implications beyond a single Domain.

### [[ad.domain|Domain]]

A Domain is a partition within an Active Directory Forest.

It is a major scope for directory objects, authentication, policy administration, and replication.

A Domain can contain multiple [[ad.domain-controller|Domain Controllers]], which maintain replicated copies of directory data for that Domain.

### [[ad.organizational-unit|Organizational Unit]]

An Organizational Unit (OU) is a container object used to create hierarchy within a Domain.

Typical uses include:

- delegation of administration;
- logical organization of directory objects;
- defining scope for [[windows.group-policy|Group Policy]].

OU design is generally driven by administrative delegation and policy requirements rather than by a requirement to reproduce the organization's reporting structure exactly.

## Physical Structure and Sites

> **Primary sources:** [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)

[[ad.site|Active Directory Sites]] represent aspects of the physical network independently of the logical Domain and Forest hierarchy.

A Site represents one or more TCP/IP subnets connected by fast and reliable network connectivity.

Site information is used for purposes such as:

- helping clients locate appropriate Domain Controllers;
- optimizing replication topology;
- controlling inter-site replication cost and schedules.

A single Domain can span multiple Sites, and a Site can contain Domain Controllers from multiple Domains.

## Domain Controller

> **Primary sources:** [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview) / [Microsoft - Securing domain controllers against attack](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/securing-domain-controllers-against-attack)

A [[ad.domain-controller|Domain Controller (DC)]] is a Windows Server that hosts AD DS.

Domain Controllers store directory data and provide core Active Directory functions such as authentication, directory queries, and replication.

In an AD DS environment, Domain Controllers can also provide the KDC role for [[auth.kerberos|Kerberos]] authentication.

Because Domain Controllers hold and process security-critical directory and credential information, Microsoft recommends protecting them more strictly than ordinary member servers and workstations.

## Objects and Attributes

> **Primary sources:** [MS-ADTS - Active Directory Schema](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/5859bab0-f545-4db6-80c6-9798b484b3d8)

Active Directory stores directory entities such as users, computers, and groups as objects.

Each object contains attributes.

For example, a user object can contain naming information, identifiers, group memberships, and other directory data.

Rules governing which object classes exist and which attributes those classes can contain are defined by the [[ad.schema|Active Directory Schema]].

## Active Directory Schema

> **Primary sources:** [MS-ADTS - Active Directory Schema](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/5859bab0-f545-4db6-80c6-9798b484b3d8)

The [[ad.schema|Active Directory Schema]] defines the types and structure of objects that can be stored in the directory.

Important schema concepts include:

- classes;
- attributes;
- attribute syntax.

Classes define types of directory objects, while attributes define information that those objects can contain.

Because schema changes can affect the entire Forest, they require more caution than ordinary directory-object changes.

## Directory Partitions and Naming Contexts

> **Primary sources:** [Microsoft - Naming Contexts and Directory Partitions](https://learn.microsoft.com/en-us/windows/win32/ad/naming-contexts-and-partitions)

The Active Directory database is divided into [[ad.directory-partition|Directory Partitions]], also called Naming Contexts (NCs).

Each partition has its own replication scope.

Common partitions include:

- Schema Partition;
- Configuration Partition;
- Domain Partition;
- Application Directory Partition.

The Schema and Configuration partitions are shared throughout the Forest.

A Domain Partition contains objects associated with that Domain and is replicated among Domain Controllers for the Domain.

## LDAP

> **Primary sources:** [MS-ADTS](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/) / [RFC 4511](https://www.rfc-editor.org/rfc/rfc4511.html)

[[protocol.ldap|LDAP]] is a protocol used to access directory services.

RFC 4511 defines LDAP protocol elements, semantics, and encoding.

Active Directory uses LDAP for operations such as searching, reading, and modifying directory objects, but also includes Microsoft-specific behavior and extensions.

Detailed Active Directory protocol analysis therefore requires both the LDAP RFCs and Microsoft Open Specifications such as MS-ADTS.

## NTDS.dit

> **Primary sources:** [Microsoft - AD DS Configuration Wizard](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/ad-ds-installation-and-removal-wizard-page-descriptions) / [Microsoft - Passwords technical overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/passwords-technical-overview) / [MITRE ATT&CK T1003.003](https://attack.mitre.org/techniques/T1003/003/)

[[ad.ntds-dit|NTDS.dit]] is the Active Directory database file used by Domain Controllers.

It contains important directory data, including information related to Domain credentials and security principals.

Because of the sensitivity of this data, NTDS.dit and backups containing equivalent directory information are high-value assets.

MITRE ATT&CK documents attempts to obtain or copy the Active Directory Domain database as OS Credential Dumping: NTDS.

## SYSVOL

> **Primary sources:** [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)

[[ad.sysvol|SYSVOL]] is a system volume shared by Domain Controllers.

A Group Policy Object includes directory-side information and file-based Group Policy Template data stored in SYSVOL.

For this reason, protecting Group Policy integrity requires protecting both directory data and SYSVOL content and replication.

## Global Catalog

> **Primary sources:** [Microsoft - Global Catalog](https://learn.microsoft.com/en-us/windows/win32/ad/global-catalog) / [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)

The [[ad.global-catalog|Global Catalog (GC)]] provides Forest-wide directory search capabilities.

A writable Global Catalog server stores a full writable replica of its own Domain partition and partial read-only replicas of other Domains in the Forest. A [[ad.read-only-domain-controller|Read-Only Domain Controller (RODC)]] can also be configured as a Global Catalog server while remaining read-only.

These partial replicas contain all objects from those Domains but only a subset of their attributes.

This allows applications and users to search for objects across the Forest without first knowing which Domain contains the requested object.

## Replication

> **Primary sources:** [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)

[[ad.replication|Active Directory Replication]] synchronizes directory data among Domain Controllers.

Most directory updates follow a multi-master model, allowing multiple writable Domain Controllers to accept changes that are later replicated to other Domain Controllers.

The Knowledge Consistency Checker (KCC) generates and maintains replication topology.

Intra-site and inter-site replication differ in how network topology, cost, schedules, and available connectivity are considered.

## FSMO Roles

> **Primary sources:** [Microsoft - Flexible Single Master Operations roles](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-fsmo-roles)

Although most Active Directory operations use a multi-master model, some operations are assigned to a single Domain Controller through [[ad.fsmo-roles|Flexible Single Master Operations (FSMO) Roles]].

Five FSMO Roles exist.

Forest-wide roles:

- Schema Master;
- Domain Naming Master.

Domain-wide roles:

- RID Master;
- PDC Emulator;
- Infrastructure Master.

FSMO Roles can be transferred to other Domain Controllers when required.

## DNS Integration

> **Primary sources:** [Microsoft - DNS and AD DS](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/dns-and-ad-ds) / [Microsoft - Active Directory-Integrated DNS Zones](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/active-directory-integrated-dns-zones)

AD DS is closely integrated with [[protocol.dns|DNS]].

DNS is used so that clients can locate Domain Controllers and so that Domain Controllers can locate other directory-service endpoints.

Active Directory-integrated DNS zones can store DNS zone data in AD DS and distribute it using Active Directory replication.

Incorrect DNS configuration can therefore affect authentication, Domain Controller discovery, replication, and other AD DS functions.

## Authentication

> **Primary sources:** [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview) / [Microsoft - NTLM overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/ntlm-overview)

[[auth.kerberos|Kerberos V5]] is the preferred authentication protocol in Active Directory environments.

Domain Controllers provide the [[kerberos.kdc|KDC]] role used for Kerberos authentication.

[[auth.ntlm|NTLM]] remains available for compatibility in some scenarios, but Microsoft has removed [[auth.ntlm|NTLMv1]] from Windows Server and describes [[auth.ntlm|NTLMv2]] as deprecated and planned for removal in a future Windows Server release.

The coexistence of Kerberos and NTLM is operationally important because authentication behavior can differ depending on naming, network conditions, application support, and configuration.

## [[windows.security-principal|Security Principal]] and [[windows.security-identifier|SID]]

> **Primary sources:** [Microsoft - Security Principals](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-principals) / [Microsoft - Security Identifiers](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-identifiers) / [Microsoft - Flexible Single Master Operations roles](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-fsmo-roles)

Windows represents users, groups, computers, and other entities that can be authenticated or authorized as [[windows.security-principal|Security Principals]].

A [[windows.security-principal|Security Principal]] is identified by a [[windows.security-identifier|Security Identifier (SID)]].

For Domain-created [[windows.security-principal|Security Principals]], SID generation includes a Domain SID and a Relative ID (RID).

The RID Master FSMO Role participates in management of RID allocation used to maintain SID uniqueness within a Domain.

## Trust Relationships

> **Primary sources:** [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)

[[ad.trust|Active Directory Trusts]] create authentication relationships between Domains or Forests.

Domains inside the same Forest are automatically connected through two-way, transitive trusts.

Other trust types, such as Forest Trusts and External Trusts, can be configured according to environment requirements.

Trust configuration affects resource access, authentication paths, and administrative boundaries and is therefore important to both architecture and security.

## Group Policy

> **Primary sources:** [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview) / [MS-GPOD](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-gpod/b724bd91-e224-4524-b752-5f810a0cc071)

[[windows.group-policy|Group Policy]] provides centralized configuration management for Domain-joined computers and users.

Group Policy Objects (GPOs) can be linked to Sites, Domains, and OUs.

Application of Group Policy can also be affected by hierarchy, inheritance, security filtering, and other policy-processing rules.

A GPO uses both directory-service information and file-based data stored in SYSVOL.

## Security Importance

> **Primary sources:** [Microsoft - Best practices for securing Active Directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory) / [Microsoft - Securing domain controllers against attack](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/securing-domain-controllers-against-attack)

Active Directory is one of the most security-critical infrastructure components in many enterprise Windows environments because it centralizes identity, credentials, authorization-related information, and configuration.

Compromise of a Domain Controller can allow unauthorized access to directory data, credential material, authentication infrastructure, and policy configuration.

High-privilege Active Directory compromise can therefore have consequences across a Domain or Forest rather than remaining limited to a single host.

Domain Controllers, privileged accounts, and privileged administrative workstations require stronger protection than ordinary endpoints.

## Relationship to Attacks and Abuse

> **Primary sources:** [MITRE ATT&CK T1003.006 - DCSync](https://attack.mitre.org/techniques/T1003/006/) / [MITRE ATT&CK T1003.003 - NTDS](https://attack.mitre.org/techniques/T1003/003/) / [MITRE ATT&CK T1482 - Domain Trust Discovery](https://attack.mitre.org/techniques/T1482/)

Active Directory is a central identity infrastructure in many enterprise environments and is therefore a high-value target.

### [[attack.dcsync|DCSync]]

DCSync abuses Domain Controller replication functionality by simulating directory replication requests in order to obtain credential and other sensitive directory data.

MITRE ATT&CK classifies DCSync as OS Credential Dumping: DCSync.

Successful use requires replication-related privileges or another sufficiently privileged security context.

### [[attack.ntds-credential-dumping|NTDS Credential Dumping]]

Attackers may attempt to access or create a copy of [[ad.ntds-dit|NTDS.dit]] or equivalent backup data in order to obtain Domain credential information.

MITRE ATT&CK classifies this activity as OS Credential Dumping: NTDS.

### Kerberos-Related Attacks

Because Active Directory uses Kerberos extensively, attacks such as [[attack.kerberoasting|Kerberoasting]], [[attack.as-rep-roasting|AS-REP Roasting]], [[attack.golden-ticket|Golden Ticket]], and [[attack.silver-ticket|Silver Ticket]] are also important in Active Directory security.

These attacks are documented separately in CyPedia.

### [[attack.domain-trust-discovery|Domain Trust Discovery]]

Attackers can enumerate Domain and Forest trust relationships to understand authentication relationships and identify additional paths for lateral movement or privilege expansion.

MITRE ATT&CK documents this behavior as Domain Trust Discovery.

## Defense and Mitigation

> **Primary sources:** [Microsoft - Best practices for securing Active Directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory) / [Microsoft - Reducing the Active Directory Attack Surface](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/reducing-the-active-directory-attack-surface) / [Microsoft - Implementing Secure Administrative Hosts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/implementing-secure-administrative-hosts)

Protecting Active Directory requires protecting the identity infrastructure as a whole rather than relying on a single security control.

Important principles include:

- protecting Domain Controllers more strictly than ordinary servers;
- minimizing unnecessary software and services on Domain Controllers;
- using supported Windows Server versions;
- minimizing membership in highly privileged groups;
- applying least privilege;
- separating privileged administration from ordinary user activity;
- using secure administrative hosts or Privileged Access Workstations;
- using strong authentication for privileged administration;
- auditing Group Policy, Trust configuration, and replication permissions;
- protecting credential material and backups;
- reducing dependence on legacy authentication where practical.

## Constraints and Limitations

Active Directory provides identity and directory infrastructure, but it does not by itself solve all endpoint-security or application-authorization problems.

AD DS also depends on surrounding infrastructure such as DNS, time synchronization, network connectivity, and Domain Controller availability.

Poorly designed Forests, Domains, Trusts, delegation models, Group Policy, or legacy-protocol compatibility can significantly increase attack surface.

## Current Position

> **Primary sources:** [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/active-directory-domain-services)

AD DS remains an actively supported Windows Server identity infrastructure.

It continues to be relevant in on-premises Windows domains, hybrid identity environments, enterprise authentication, and legacy applications that depend on traditional Windows domain protocols.

Microsoft's current Windows Server documentation continues to cover AD DS concepts including replication, schema, trusts, Global Catalog, DNS integration, and Domain Controller roles.

Understanding Active Directory architecture, authentication, replication, Trust relationships, Group Policy, and security boundaries remains important for administration, defense, incident response, penetration testing, and identity security.

## Related Pages

- [[ad.forest|Forest]]
- [[ad.domain|Domain]]
- [[ad.organizational-unit|Organizational Unit]]
- [[ad.site|Active Directory Site]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.global-catalog|Global Catalog]]
- [[ad.schema|Active Directory Schema]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.replication|Active Directory Replication]]
- [[ad.fsmo-roles|FSMO Roles]]
- [[ad.trust|Active Directory Trust]]
- [[ad.ntds-dit|NTDS.dit]]
- [[ad.sysvol|SYSVOL]]
- [[windows.group-policy|Group Policy]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|SID]]
- [[protocol.ldap|LDAP]]
- [[protocol.dns|DNS]]
- [[auth.kerberos|Kerberos]]
- [[auth.ntlm|NTLM]]
- [[ad.service-principal-name|SPN]]
- [[ad.service-account|Service Account]]
- [[attack.dcsync|DCSync]]
- [[attack.ntds-credential-dumping|NTDS Credential Dumping]]
- [[attack.domain-trust-discovery|Domain Trust Discovery]]
- [[attack.kerberoasting|Kerberoasting]]
- [[attack.as-rep-roasting|AS-REP Roasting]]
- [[attack.golden-ticket|Golden Ticket]]
- [[attack.silver-ticket|Silver Ticket]]
- [[ad.knowledge-consistency-checker|Knowledge Consistency Checker]]

## References

- [Microsoft Open Specifications - MS-ADTS: Active Directory Technical Specification](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/)
- [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
- [Microsoft - Active Directory Domain Services](https://learn.microsoft.com/en-us/windows/win32/ad/active-directory-domain-services)
- [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)
- [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)
- [Microsoft - Active Directory Schema](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/5859bab0-f545-4db6-80c6-9798b484b3d8)
- [Microsoft - Naming Contexts and Directory Partitions](https://learn.microsoft.com/en-us/windows/win32/ad/naming-contexts-and-partitions)
- [RFC 4511 - Lightweight Directory Access Protocol (LDAP): The Protocol](https://www.rfc-editor.org/rfc/rfc4511.html)
- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [Microsoft - Flexible Single Master Operations roles](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-fsmo-roles)
- [Microsoft - DNS and AD DS](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/dns-and-ad-ds)
- [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)
- [Microsoft Open Specifications - MS-GPOD: Group Policy Objects](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-gpod/b724bd91-e224-4524-b752-5f810a0cc071)
- [Microsoft - NTLM overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/ntlm-overview)
- [Microsoft - Security Principals](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-principals)
- [Microsoft - Best practices for securing Active Directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory)
- [Microsoft - Securing domain controllers against attack](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/securing-domain-controllers-against-attack)
- [MITRE ATT&CK T1003.006 - DCSync](https://attack.mitre.org/techniques/T1003/006/)
- [MITRE ATT&CK T1003.003 - NTDS](https://attack.mitre.org/techniques/T1003/003/)
- [MITRE ATT&CK T1482 - Domain Trust Discovery](https://attack.mitre.org/techniques/T1482/)
- [Microsoft - Install Active Directory Domain Services on Windows Server](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-)
- [Microsoft - Features removed or no longer developed in Windows Server](https://learn.microsoft.com/en-us/windows-server/get-started/removed-deprecated-features-windows-server)
- [Microsoft - Security Identifiers](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-identifiers)
- [Microsoft - Passwords technical overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/passwords-technical-overview)
