---
canonical_id: attack.silver-ticket
title: Silver Ticket
lang: ja
slug: silver-ticket
aliases: []
categories:
  - Active Directory
  - Kerberos
status: published
summary: Silver Ticketによるservice account key materialを利用したService Ticket forgery、scope、PAC、検知、Golden Ticketとの違いを解説する。
---

## 概要

> **主な出典:** [MITRE ATT&CK T1558.002 - Silver Ticket](https://attack.mitre.org/techniques/T1558/002/)

[[attack.silver-ticket|Silver Ticket]]は、target [[ad.service-account|Service Account]]などのkey materialを侵害した攻撃者が、特定service向けの[[kerberos.service-ticket|Service Ticket]]を偽造するKerberos ticket forgery techniqueです。

## Service Identity

[[ad.service-principal-name|Service Principal Name（SPN）]]はKerberos service instanceを識別します。

Service Ticketのencrypted portionはtarget service identityが利用できるkey materialによって保護されます。

そのkey materialが侵害されると、正規[[kerberos.ticket-granting-server|Ticket-Granting Server（TGS）]]を経由せずService Ticketを偽造できる可能性があります。

## KDCを経由しない特徴

MITRE ATT&CKは、Silver Ticketが[[kerberos.kdc|Key Distribution Center（KDC）]]へ接触せず作成・利用され得る点を特徴として挙げています。

この性質により、KDC側のticket issuance logだけでは観測できない場合があります。

## Scope

Silver Ticketのscopeは、侵害したservice keyが利用できる特定serviceやresourceに制約されます。

この点でDomain-wide TGT forgeryを行う[[attack.golden-ticket|Golden Ticket]]より範囲は限定的です。

## PAC

Windows Service Ticketでは[[windows.privilege-attribute-certificate|PAC]]がauthorization informationを運ぶ場合があります。

forged Service TicketではPAC informationの整合性やvalidation behaviorもsecurity上重要です。

## Kerberoastingとの関係

[[attack.kerberoasting|Kerberoasting]]はService Account passwordをoffline guessingしてcredentialを得ることを目的とします。

その結果としてservice key materialが侵害されれば、Silver Ticket forgeryへつながる可能性があります。

ただし両者は別techniqueです。

## 検知

重要な観測点には次があります。

- service host上の不自然なKerberos logon
- KDC ticket issuanceと整合しないservice authentication
- unusual PAC / authorization behavior
- service account credential compromise indicator

KDC-side logだけに依存せず、target service側telemetryとのcorrelationが重要です。

## 緩和

- Service Account credentialを強固に管理する
- gMSAなどmanaged identityを利用する
- least privilegeを適用する
- SPN ownershipを適切に管理する
- service host側のauthentication telemetryを監視する
- service account compromise時はcredential rotationを行う

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.kdc|Key Distribution Center]]
- [[ad.service-principal-name|Service Principal Name]]
- [[ad.service-account|Service Account]]
- [[windows.privilege-attribute-certificate|PAC]]
- [[attack.kerberoasting|Kerberoasting]]
- [[attack.golden-ticket|Golden Ticket]]
- [[ad.domain|Active Directory Domain]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[ad.group-managed-service-account|Group Managed Service Account]]

## 参考文献

- [MITRE ATT&CK T1558.002 - Silver Ticket](https://attack.mitre.org/techniques/T1558/002/)
- [MS-PAC - Privilege Attribute Certificate Data Structure](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/)
- [Microsoft - Service Accounts in Windows Server](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-service-accounts)
- [MS-PAC - Server Signature](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/a194aa34-81bd-46a0-a931-2e05b87d1098)
