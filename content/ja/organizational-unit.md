---
canonical_id: ad.organizational-unit
title: Organizational Unit
lang: ja
slug: organizational-unit
aliases:
  - OU
categories:
  - Active Directory
status: published
summary: Active Directory Organizational Unitの階層構造、delegation、Group Policyとの関係を解説する。
---

## 概要

> **主な出典:** [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)

Organizational Unit（OU）は[[ad.domain|Active Directory Domain]]内でdirectory objectを階層的に整理するためのcontainerです。

OUにはuser、computer、group、さらに別のOUなどを配置できます。

## 主な用途

OUの主要な用途には次があります。

- administrationのdelegation
- [[windows.group-policy|Group Policy]]の適用scope
- directory objectの論理的な整理

## Delegation

OU単位でadministrative permissionをdelegationできます。

これによりDomain全体の高いprivilegeを付与せず、特定のobjectやoperationだけを管理担当者へ委任できます。

## Group Policyとの関係

Group Policy Objectは[[ad.site|Site]]、[[ad.domain|Domain]]、OUへlinkできます。

OU hierarchyはGroup Policyの適用scopeやinheritanceに影響します。

そのためOU設計はdirectory organizationだけでなくcentralized configuration managementにも関係します。

## 組織構造との違い

OUは会社のorganization chartをそのまま再現する必要はありません。

administrative delegationやGroup Policyなど、技術的な管理要件に合わせて設計することが重要です。

## Security上の論点

OUは[[ad.forest|Forest]]のようなsecurity boundaryではありません。

しかし、過剰なdelegated permissionや不適切なGroup Policy administrationは、広範囲なconfiguration変更やprivilege escalationにつながる可能性があります。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.forest|Forest]]
- [[windows.group-policy|Group Policy]]

## 参考文献

- [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)
- [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)
- [Microsoft - Group Policy scope](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-scope)
