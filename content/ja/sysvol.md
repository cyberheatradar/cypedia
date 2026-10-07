---
canonical_id: ad.sysvol
title: SYSVOL
lang: ja
slug: sysvol
aliases: []
categories:
  - Active Directory
status: published
summary: SYSVOLのGroup Policy Template、sign-in script、Domain Controller間replicationを解説する。
---

## 概要

> **主な出典:** [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)

SYSVOLは[[ad.domain-controller|Domain Controller]]上に存在するshared folderで、[[ad.domain|Domain]]で利用されるfile-based dataを保持します。

代表的にはGroup Policy object fileやsign-in scriptなどがSYSVOLに格納されます。

## Group Policyとの関係

[[windows.group-policy|Group Policy]] Object（GPO）は大きく2つのcomponentを持ちます。

- Group Policy Container
- Group Policy Template

Group Policy ContainerはActive DirectoryのDomain Partitionに保存されます。

Group Policy TemplateはSYSVOLに保存されます。

したがってGPOはdirectory dataだけでもSYSVOLだけでも完結しません。

## Replication

SYSVOL内容はDomain Controller間でreplicateされます。

現在のWindows ServerではDistributed File System Replication（DFSR）がSYSVOL replicationに使用されます。

[[ad.replication|Active Directory Replication]]とSYSVOL replicationは別のmechanismです。

## 歴史

Windows 2000 ServerおよびWindows Server 2003ではFile Replication Service（FRS）がSYSVOL replicationに使われていました。

現在のWindows Server環境ではDFSRへの移行が前提となります。

## Security上の重要性

SYSVOLにはDomain-wideに配布されるpolicy dataやscriptが存在するため、integrityの保護が重要です。

不正な変更が複数Domain Controllerへreplicateされると、広範囲のcomputerやuserへ影響する可能性があります。

## NTDS.ditとの違い

[[ad.ntds-dit|NTDS.dit]]はActive Directory databaseです。

SYSVOLはfile-basedなDomain dataを保持するshared folderです。

Group PolicyではActive Directory database側とSYSVOL側の両方が利用されます。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.domain|Domain]]
- [[windows.group-policy|Group Policy]]
- [[ad.replication|Active Directory Replication]]
- [[ad.ntds-dit|NTDS.dit]]

## 参考文献

- [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)
- [Microsoft - Migrate SYSVOL replication from FRS to DFS Replication](https://learn.microsoft.com/en-us/windows-server/storage/dfs-replication/migrate-sysvol-to-dfsr)
