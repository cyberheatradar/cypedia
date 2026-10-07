---
canonical_id: windows.group-policy
title: Group Policy
lang: en
slug: group-policy
aliases:
  - GPO
  - Group Policy Object
categories:
  - Windows
  - Active Directory
status: published
summary: Group Policy and GPO structure, Site/Domain/OU scope, SYSVOL storage, replication, and security significance.
---

## Overview

> **Primary source:** [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)

Group Policy provides centralized management of Windows operating-system, application, and user settings.

In an [[ad.active-directory|Active Directory]] environment, policy settings can be managed through Group Policy Objects (GPOs).

## Group Policy Object

A GPO is a logical collection of policy settings, security permissions, and scope information.

Each GPO has a unique GUID.

## Two Components

A GPO consists primarily of two components.

### Group Policy Container

The Group Policy Container is stored in the [[ad.domain|Domain]] Partition of Active Directory.

### Group Policy Template

The Group Policy Template is stored in [[ad.sysvol|SYSVOL]].

A complete GPO therefore depends on both directory-side and file-based data.

## Scope

> **Primary source:** [Microsoft - Group Policy scope](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-scope)

GPOs can be linked to:

- [[ad.site|Sites]];
- Domains;
- [[ad.organizational-unit|Organizational Units]].

Directory hierarchy, links, inheritance, and other processing rules influence which policies apply.

## Computer and User Configuration

Group Policy settings are divided broadly into computer and user configuration.

Computer settings apply to the computer context.

User settings apply to the user context.

## Processing

Clients process Group Policy at events such as startup and user logon and also perform background refresh.

When multiple GPOs apply, scope and processing rules determine the resulting configuration.

## Replication

The Active Directory component of a GPO is synchronized using [[ad.replication|Active Directory Replication]].

The SYSVOL component is replicated through DFSR.

These are separate replication mechanisms.

## Security Importance

Group Policy can distribute security-sensitive settings including firewall configuration, security options, user rights, scripts, and application configuration.

Permissions that allow GPO modification therefore require careful control.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.site|Active Directory Site]]
- [[ad.organizational-unit|Organizational Unit]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.sysvol|SYSVOL]]
- [[ad.replication|Active Directory Replication]]

## References

- [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)
- [Microsoft - Group Policy scope](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-scope)
- [Microsoft Open Specifications - MS-GPOD](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-gpod/b724bd91-e224-4524-b752-5f810a0cc071)
- [Microsoft - Migrate SYSVOL replication from FRS to DFS Replication](https://learn.microsoft.com/en-us/windows-server/storage/dfs-replication/migrate-sysvol-to-dfsr)
