---
canonical_id: ad.read-only-domain-controller
title: Read-Only Domain Controller
lang: ja
slug: read-only-domain-controller
aliases:
  - RODC
categories:
  - Active Directory
  - Domain Controller
status: published
summary: read-only AD DS replica、Password Replication Policy、credential caching、RODC固有KRBTGTを持つRead-Only Domain Controllerを解説する。
---

## 概要

[[ad.read-only-domain-controller|Read-Only Domain Controller（RODC）]]は、read-onlyな[[ad.active-directory|Active Directory]] database partitionを保持する[[ad.domain-controller|Domain Controller]]です。

RODCは主にbranch officeなど、writable Domain Controllerを配置するにはphysical securityやnetwork条件に制約がある環境を想定して設計されています。

## Read-Only Replica

RODCはoriginating updateを受け付けず、outbound replicationも行いません。

directory changeはwritable Domain Controllerでoriginatedし、[[ad.replication|Active Directory Replication]]によるinbound replicationでRODCへ到達します。

## Password Replication Policy

RODCではPassword Replication Policy（PRP）によって、どのaccount credentialをRODCへreplicateおよびcacheできるかを制御できます。

現在のWindows Server configuration wizardでも、RODC Optionsとしてcredential cachingのallow/deny policyが提供されています。

[[ad.user-account|User Account]]や[[ad.computer-account|Computer Account]]のcredential cachingを必要範囲へ限定することは、RODC security modelの重要な要素です。

## Delegated Administration

RODCにはlocal administrationを特定accountへdelegationする仕組みがあります。

このdelegationによって、Domain-wide administrative membershipを与えずにRODCのlocal administrationを委任できます。

## KRBTGT

RODCは[[kerberos.ticket-granting-ticket|TGT]] requestをsignまたはencryptする際、writable Domain ControllerのKDCとは異なる[[ad.krbtgt|KRBTGT]] accountとpasswordを使用します。

Microsoft documentationでは、RODC-specific KRBTGT accountで署名されたTGTをRODCが認識し、別のDomain Controllerが署名したTGTの場合はrequestをwritable Domain Controllerへforwardすると説明されています。

## ReplicationとSite

RODCも[[ad.site|Active Directory Site]]へ配置され、writable Domain Controllerからdirectory informationをreplicateします。

RODCの設計ではphysical security、WAN connectivity、credential caching requirementを合わせて検討する必要があります。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.site|Active Directory Site]]
- [[ad.krbtgt|KRBTGT]]
- [[ad.user-account|User Account]]
- [[ad.computer-account|Computer Account]]
- [[auth.kerberos|Kerberos]]
- [[ad.domain|Active Directory Domain]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket|Kerberos Ticket]]

## 参考文献

- [Microsoft - Planning Domain Controller Placement](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/planning-domain-controller-placement)
- [Microsoft - AD DS Configuration Wizard Page Descriptions](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/ad-ds-installation-and-removal-wizard-page-descriptions)
- [Microsoft - Default Active Directory accounts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-default-user-accounts)
- [Microsoft - Add-ADDSReadOnlyDomainControllerAccount](https://learn.microsoft.com/en-us/powershell/module/addsdeployment/add-addsreadonlydomaincontrolleraccount?view=windowsserver2025-ps)
- [Microsoft Open Specifications - MS-ADOD Glossary](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adod/afa7460b-713c-476d-9af1-5f9a5fe6ab27)
- [Microsoft - Active Directory Forest Recovery: reset the krbtgt password](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-reset-the-krbtgt-password)
