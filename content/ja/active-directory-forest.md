---
canonical_id: ad.forest
title: Active Directory Forest
lang: ja
slug: active-directory-forest
aliases:
  - Forest
  - AD Forest
categories:
  - Active Directory
status: published
summary: Active Directory Forestの構造、共有要素、Trust、security boundaryとしての意味を解説する。
---

## 概要

> **主な出典:** [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model) / [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)

Active Directory Forestは、[[ad.active-directory|Active Directory Domain Services]]における最上位の論理構造です。

1つのForestは1つ以上の[[ad.domain|Domain]]から構成されます。

同一Forest内のDomainは、共通の[[ad.schema|Active Directory Schema]]、configuration情報、[[ad.global-catalog|Global Catalog]]などを共有します。

## Domainとの関係

Forestは複数のDomainを包含できます。

Domainはdirectory dataやadministrative scopeを分割する単位ですが、Forestはそれらをまとめる上位構造です。

同一Forest内のDomain間には、自動的に双方向かつtransitiveな[[ad.trust|Trust]]が形成されます。

## Forest内で共有される情報

Forest全体で共有される代表的な情報には、次があります。

- Active Directory Schema
- Configuration information
- [[ad.site|Site]]およびreplication topology
- Global Catalog information

Schema PartitionとConfiguration PartitionはForest-wideな情報を保持します。

## Security Boundary

MicrosoftはForestをActive Directoryのsecurity boundaryとして扱っています。

同一Forestに含まれるDomain同士は、完全に独立したsecurity boundaryではありません。

Forest-levelのadministrative privilegeや重要な[[ad.domain-controller|Domain Controller]]が侵害された場合、影響が単一Domainに限定されない可能性があります。

## 設計上の意味

複数Forestを分離する理由には、強いadministrative isolationやsecurity isolationがあります。

一方、単一ForestではSchemaやGlobal Catalog、automatic trustなどを共有できるため、directory administrationを単純化できます。

Forest設計は単なるnamespace設計ではなく、security boundaryとadministrative boundaryの設計でもあります。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.schema|Active Directory Schema]]
- [[ad.global-catalog|Global Catalog]]
- [[ad.trust|Active Directory Trust]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.domain-controller|Domain Controller]]

## 参考文献

- [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)
- [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)
