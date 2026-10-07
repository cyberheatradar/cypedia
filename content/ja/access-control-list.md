---
canonical_id: windows.access-control-list
title: Access Control List
lang: ja
slug: access-control-list
aliases:
  - ACL
categories:
  - Windows
  - Access Control
  - Active Directory
status: published
summary: WindowsのAccess Control List（ACL）、ACE、DACL、SACL、SIDとの関係とActive Directoryでの位置づけを解説する。
---

## 概要

[[windows.access-control-list|Access Control List（ACL）]]は、Windows access control modelでsecurable objectへのaccessやaudit ruleを表すAccess Control Entry（ACE）のlistです。

ACLは[[windows.security-descriptor|Security Descriptor]]の構成要素として保持されます。

## Access Control Entry

ACLは0個以上のACEから構成されます。

ACEは対象となるtrusteeを[[windows.security-identifier|Security Identifier（SID）]]で識別し、そのtrusteeに対してallow、deny、auditなどのaccess ruleを関連付けます。

trusteeは[[windows.security-principal|Security Principal]]に対応します。

## DACL

Discretionary Access Control List（DACL）は、securable objectへのaccessを許可または拒否するACEを保持します。

processがobjectへのaccessを要求すると、WindowsはDACLのACEを評価してaccess decisionを行います。

DACLが存在しない状態と、存在するがACEを1つも持たないempty DACLは意味が異なります。

Microsoft documentationでは、NULL DACLはfull accessを許可し、empty DACLはaccessを許可するACEがないためaccessを拒否すると説明されています。

## SACL

System Access Control List（SACL）は、objectへのaccess attemptをどのようにauditするかを指定するACEを保持します。

SACLはDACLのような通常のallow/deny access decisionではなく、security auditingに使用されます。

## Security Descriptorとの関係

ACLは単独でobjectへ関連付けられるのではなく、通常はSecurity Descriptorの一部として扱われます。

Security DescriptorにはDACLとSACLのほか、ownerやprimary groupなどのsecurity informationも含まれます。

## Active Directoryとの関係

[[ad.active-directory|Active Directory]] objectもWindows access control modelによって保護されます。

directory objectに対するread、write、control accessなどのpermission評価でもACLとACEが重要になります。

## セキュリティ上の論点

ACLを評価する際は、単純なpermission表示だけでなく、allow/deny ACE、inheritance、object-specific rightsなどを含めて確認する必要があります。

特にNULL DACLとempty DACLを混同するとaccess-control behaviorを逆に解釈する可能性があります。

## 関連項目

- [[windows.security-descriptor|Security Descriptor]]
- [[windows.security-identifier|Security Identifier]]
- [[windows.security-principal|Security Principal]]
- [[ad.active-directory|Active Directory]]
- [[ad.user-account|User Account]]
- [[ad.computer-account|Computer Account]]
- [[ad.security-group|Security Group]]

- [[windows.access-control-entry|Access Control Entry]]

- [[windows.discretionary-access-control-list|Discretionary Access Control List]]

- [[windows.system-access-control-list|System Access Control List]]

- [[windows.access-rights|Access Rights]]

- [[windows.access-mask|Access Mask]]

- [[windows.access-check|Access Check]]

- [[windows.securable-object|Securable Object]]

## 参考文献

- [Microsoft - Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists)
- [Microsoft - Parts of the Access Control Model](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-components)
- [Microsoft Open Specifications - ACL](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-dtyp/20233ed8-a6c6-4097-aafa-dd545ed24428)
- [Microsoft Open Specifications - MS-ADTS Null vs. Empty DACLs](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/ee18efbf-e8d4-4eb0-8b27-79773e96d61f)
