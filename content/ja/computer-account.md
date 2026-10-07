---
canonical_id: ad.computer-account
title: Computer Account
lang: ja
slug: computer-account
aliases: []
categories:
  - Active Directory
  - Identity
status: published
summary: Active Directory Computer Accountによるmachine identity、domain join、Security Principal、SID、service authenticationとの関係を解説する。
---

## 概要

[[ad.computer-account|Computer Account]]は、[[ad.domain|Active Directory Domain]]へ参加したcomputerを表す[[ad.active-directory|Active Directory]] objectです。

User Accountと同様に[[windows.security-principal|Security Principal]]であり、固有の[[windows.security-identifier|Security Identifier（SID）]]を持ちます。

## Machine Identity

Computer Accountはhuman userではなくmachine identityを表します。

Domain参加computerはこのidentityを利用してDomainとのtrust relationshipを維持し、domain resourceやserviceとのauthenticationに参加します。

## Domain Join

Microsoftのdomain join documentationでは、computerをDomainへ参加させる際、対応するComputer Accountを新規作成する場合と、事前作成済みaccountを再利用する場合が説明されています。

Computer Accountの作成・再利用には適切なActive Directory permissionが必要です。

## Credential

Computer Accountにもcredentialが存在し、machineとDomain間で管理されます。

このcredentialは通常のinteractive user passwordとは運用方法が異なり、Windowsによってmachine account secretが管理されます。

## SPNとの関係

Computer Accountにはhost-based serviceなどの[[ad.service-principal-name|Service Principal Name（SPN）]]が関連付けられる場合があります。

そのためComputer Accountは[[kerberos.service-ticket|Service Ticket]]やservice authenticationを理解するうえでも重要です。

## Group Policy

[[windows.group-policy|Group Policy]]はSite、Domain、[[ad.organizational-unit|OU]]へlinkできます。computer向けに適用可能なGPOは、computerが属するSite、Domain membership、およびComputer Accountのparent OU hierarchyなどに基づいて決定されます。

## Security Group

Computer Accountは[[ad.security-group|Security Group]]のmemberになることができ、group membershipを通じてauthorizationを管理できます。

## セキュリティ上の論点

不要なComputer Account、古いmachine identity、過剰なgroup membership、domain join permission、Computer Accountを作成・再利用できる権限は監査対象です。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|Security Identifier]]
- [[ad.user-account|User Account]]
- [[ad.security-group|Security Group]]
- [[ad.service-account|Service Account]]
- [[ad.service-principal-name|Service Principal Name]]
- [[kerberos.service-ticket|Service Ticket]]
- [[ad.organizational-unit|Organizational Unit]]
- [[windows.group-policy|Group Policy]]
- [[ad.site|Active Directory Site]]

## 参考文献

- [Microsoft - Active Directory Accounts](https://learn.microsoft.com/windows/security/identity-protection/access-control/active-directory-accounts)
- [Microsoft - Active Directory Domain Join Permissions](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/active-directory-domain-join-permissions)
- [Microsoft - Security Principals](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-principals)
- [Microsoft - Group Policy scope](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-scope)
- [Microsoft - Domain member: Maximum machine account password age](https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/domain-member-maximum-machine-account-password-age)
