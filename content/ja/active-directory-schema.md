---
canonical_id: ad.schema
title: Active Directory Schema
lang: ja
slug: active-directory-schema
aliases:
  - Schema
  - AD Schema
categories:
  - Active Directory
status: published
summary: Active Directory Schemaのclass、attribute、syntax、Forest-wideな役割とSchema extensionを解説する。
---

## 概要

> **主な出典:** [MS-ADTS - Active Directory Schema](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/5859bab0-f545-4db6-80c6-9798b484b3d8)

Active Directory Schemaは[[ad.active-directory|Active Directory]]に保存できるobjectの種類と構造を定義します。

Schemaはdirectoryのstructureとcontentに関するruleを定義します。

## 構成要素

Schemaの主要な構成要素には次があります。

- class
- attribute
- syntax

classはdirectoryへ保存できるobject typeを定義します。

attributeはobjectが保持できるinformationを定義します。

syntaxはattribute valueのdata typeやrepresentationに関係します。

## Mandatory / Optional Attribute

各classにはmandatory attributeとoptional attributeを定義できます。

これにより、そのclassのobjectがどのようなattributeを持つ必要があるか、または持つことができるかが決まります。

## Schema Object

Schema自体もActive Directory内のobjectとして表現されます。

classはclassSchema object、attributeはattributeSchema objectによって定義されます。

## Forestとの関係

Schemaは[[ad.forest|Forest]]全体で共有されます。

Schema PartitionはForest内の[[ad.domain-controller|Domain Controller]]へreplicateされます。

そのためSchema changeは単一[[ad.domain|Domain]]だけでなくForest全体へ影響する可能性があります。

## Schema Extension

applicationやadministratorは、新しいclassやattributeを追加してSchemaを拡張できます。

Schema extensionはForest-wideな影響を持つため、通常のdirectory object変更より慎重なdesign、testing、change managementが必要です。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.forest|Forest]]
- [[ad.domain|Domain]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]

## 参考文献

- [MS-ADTS - Active Directory Schema](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/5859bab0-f545-4db6-80c6-9798b484b3d8)
- [Microsoft - Active Directory Schema](https://learn.microsoft.com/en-us/windows/win32/adschema/active-directory-schema)
