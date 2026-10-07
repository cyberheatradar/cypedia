---
canonical_id: kerberos.kdc
title: Key Distribution Center
lang: ja
slug: key-distribution-center
aliases:
  - KDC
categories:
  - Kerberos
status: published
summary: Kerberos Key Distribution Center（KDC）のAS/TGS、Realm、ticketとsession key発行、Active Directory実装を解説する。
---

## 概要

> **主な出典:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

Key Distribution Center（[[kerberos.kdc|KDC]]）は[[auth.kerberos|Kerberos]]の中心となるtrusted serviceです。

KDCは[[kerberos.ticket|ticket]]とtemporary [[kerberos.session-key|Session Key]]を供給し、[[kerberos.realm|Realm]]に登録された[[kerberos.principal|principal]]のauthenticationを支えます。

## ASとTGS

KDCは論理的に次の2つのserviceを提供します。

- [[kerberos.authentication-server|Authentication Server（AS）]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server（TGS）]]

ASはinitial authenticationを処理し、[[kerberos.ticket-granting-ticket|Ticket-Granting Ticket（TGT）]]を発行します。

TGSは有効なTGTを提示したclientへ、target service用の[[kerberos.service-ticket|Service Ticket]]を発行します。

## Account Database

KDCはRealmに属するprincipalと、そのauthenticationに必要なlong-term key informationへaccessできる必要があります。

KDCはRealm内で非常に高いtrustを置かれるcomponentです。

## Session Key

KDCはKerberos exchangeでtemporary Session Keyを生成・配布します。

clientとTGS、clientとapplication serviceなど、異なる通信段階で異なるSession Keyが利用されます。

## Active Directory

> **主な出典:** [Microsoft - Key Distribution Center](https://learn.microsoft.com/en-us/windows/win32/secauthn/key-distribution-center)

[[ad.active-directory|Active Directory]]ではKDCは[[ad.domain-controller|Domain Controller]]上のdomain serviceとして実装されます。

KDCはActive Directoryをaccount databaseとして利用します。

Microsoftは、他の[[ad.domain|Domain]]へのreferralを処理する際に[[ad.global-catalog|Global Catalog]]も利用すると説明しています。

## Availability

AD DSでは複数のDomain ControllerがKDC requestを処理できます。

これによりauthentication serviceとticket-granting serviceを単一serverへ依存させずに運用できます。

## Security上の重要性

KDCはprincipalのlong-term key informationやticket issuanceに関与します。

KDCまたはそのkey materialの侵害はRealm全体のauthentication trustへ重大な影響を与える可能性があります。

Active Directoryでは[[ad.krbtgt|KRBTGT]]のkey materialがTGTのsecurityに特に重要です。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.authentication-server|Authentication Server]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.realm|Realm]]
- [[kerberos.principal|Principal]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.krbtgt|KRBTGT]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Key Distribution Center](https://learn.microsoft.com/en-us/windows/win32/secauthn/key-distribution-center)
- [Microsoft - Kerberos authentication overview in Windows Server](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
