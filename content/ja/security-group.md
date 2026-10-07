---
canonical_id: ad.security-group
title: Security Group
lang: ja
slug: security-group
aliases: []
categories:
  - Active Directory
  - Identity
  - Authorization
status: published
summary: Active Directory Security GroupによるSecurity Principalの集約、permission assignment、group scopeを解説する。
---

## 概要

[[ad.security-group|Security Group]]は、[[ad.user-account|User Account]]、[[ad.computer-account|Computer Account]]、他のgroupなどをまとめて管理する[[windows.security-principal|Security Principal]]です。

MicrosoftはSecurity Groupを、複数accountやgroupをmanageable unitへまとめ、resource accessのrightsやpermissionsを割り当てるために使用できる仕組みとして説明しています。

Security Group自身も[[windows.security-identifier|Security Identifier（SID）]]を持ちます。

## Security GroupとDistribution Group

Active Directory groupにはsecurity-enabled groupとdistribution用途のgroupがあります。

Security Groupはauthorizationに利用できますが、distribution groupはsecurity permission assignmentには利用できません。

## Group Scope

Active Directoryでは主に次の3つのgroup scopeがあります。

- Universal
- Global
- Domain Local

scopeはgroupへ含められるmemberの範囲や、そのgroupをpermission assignmentへ利用できる範囲に影響します。

## Global Group

Global groupは基本的に同一[[ad.domain|Active Directory Domain]]内のaccountやGlobal groupをmemberとして構成します。

同一forest内やtrust relationshipを持つenvironmentでresource permissionへ利用できます。

## Domain Local Group

Domain Local groupはresource側でpermissionを割り当てる用途に適しており、trusted Domainからのセキュリティ主体を含む広い種類のmemberを保持できます。

permission scopeは基本的にgroupが存在するDomainです。

## Universal Group

Universal groupは同一[[ad.forest|Active Directory Forest]]内の複数Domainにまたがるmembershipを扱えます。

複数Domainをまたぐauthorization designで利用されます。

## Authorization

Security Group membershipによって、複数の[[windows.security-principal|Security Principal]]に対するpermission assignmentを集約できます。

そのためgroup membershipはleast privilege、privileged access、resource authorizationを評価するうえで重要な情報です。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.forest|Active Directory Forest]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|Security Identifier]]
- [[ad.user-account|User Account]]
- [[ad.computer-account|Computer Account]]
- [[ad.organizational-unit|Organizational Unit]]

## 参考文献

- [Microsoft - Active Directory Security Groups](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-groups)
- [Microsoft - Active Directory Accounts](https://learn.microsoft.com/windows/security/identity-protection/access-control/active-directory-accounts)
- [Microsoft - Security Principals](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-principals)
