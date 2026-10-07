---
canonical_id: windows.group-policy
title: Group Policy
lang: ja
slug: group-policy
aliases:
  - GPO
  - Group Policy Object
categories:
  - Windows
  - Active Directory
status: published
summary: Group PolicyとGPOの構造、Site/Domain/OU scope、SYSVOL、replication、security上の役割を解説する。
---

## 概要

> **主な出典:** [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)

Group PolicyはWindowsのoperating system、application、user settingを集中管理するための仕組みです。

[[ad.active-directory|Active Directory]]環境ではpolicy settingをGroup Policy Object（GPO）として管理できます。

## Group Policy Object

GPOはpolicy setting、security permission、scope of managementなどをまとめたlogical objectです。

各GPOには固有のGUIDがあります。

## 2つのComponent

GPOには主に2つのcomponentがあります。

### Group Policy Container

Group Policy ContainerはActive Directoryの[[ad.domain|Domain]] Partitionに格納されます。

### Group Policy Template

Group Policy Templateは[[ad.sysvol|SYSVOL]]に格納されます。

このためGPOの整合性にはdirectory-side dataとSYSVOL-side dataの両方が必要です。

## Scope

> **主な出典:** [Microsoft - Group Policy scope](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-scope)

GPOは主に次のActive Directory objectへlinkできます。

- [[ad.site|Site]]
- Domain
- [[ad.organizational-unit|Organizational Unit]]

objectのdirectory hierarchy、inheritance、linkなどが適用scopeに影響します。

## Computer / User Configuration

Group Policy settingは大きくcomputer configurationとuser configurationに分けられます。

computer configurationはcomputer全体へ適用されるsettingを管理します。

user configurationはuser contextへ適用されるsettingを管理します。

## Processing

clientはstartupやuser logonなどでGroup Policyをprocessします。

background refreshでもpolicy updateが確認されます。

複数GPOが適用対象になる場合、scopeやinheritanceなどのprocessing ruleに従って結果が決まります。

## Replication

GPOのActive Directory側componentは[[ad.replication|Active Directory Replication]]で同期されます。

SYSVOL側componentはDFSRによってreplicateされます。

この2つは独立したreplication mechanismです。

## Security上の重要性

Group Policyはfirewall、security option、user rights、script、application configurationなど、多数のsecurity-sensitive settingを広範囲へ配布できます。

そのためGPOを変更できるprivilegeは慎重に管理する必要があります。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.site|Active Directory Site]]
- [[ad.organizational-unit|Organizational Unit]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.sysvol|SYSVOL]]
- [[ad.replication|Active Directory Replication]]

## 参考文献

- [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)
- [Microsoft - Group Policy scope](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-scope)
- [Microsoft Open Specifications - MS-GPOD](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-gpod/b724bd91-e224-4524-b752-5f810a0cc071)
- [Microsoft - Migrate SYSVOL replication from FRS to DFS Replication](https://learn.microsoft.com/en-us/windows-server/storage/dfs-replication/migrate-sysvol-to-dfsr)
