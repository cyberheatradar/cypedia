---
canonical_id: kerberos.ticket-granting-ticket
title: Ticket-Granting Ticket
lang: ja
slug: ticket-granting-ticket
aliases:
  - TGT
categories:
  - Kerberos
status: published
summary: Kerberos Ticket-Granting Ticket（TGT）の発行、構造、TGS exchange、Active DirectoryでのKRBTGTとの関係を解説する。
---

## 概要

> **主な出典:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html) / [Microsoft - Ticket-Granting Tickets](https://learn.microsoft.com/en-us/windows/win32/secauthn/ticket-granting-tickets)

Ticket-Granting Ticket（[[kerberos.ticket-granting-ticket|TGT]]）は、[[auth.kerberos|Kerberos]] clientが個別service向けの[[kerberos.service-ticket|Service Ticket]]を取得するために使用する[[kerberos.ticket|Kerberos Ticket]]です。

clientは初期authentication後にTGTを取得し、その後はuserのlong-term secretをservice accessごとに再利用せず、TGTを[[kerberos.ticket-granting-server|Ticket-Granting Server（TGS）]]へ提示できます。

## 発行

TGTは[[kerberos.kdc|Key Distribution Center（KDC）]]の[[kerberos.authentication-server|Authentication Server（AS）]]によって発行されます。

clientはAS-REQを送信し、KDCが要求を受理するとAS-REPが返されます。

AS-REPにはTGTと、clientがTGSとの通信で使用する[[kerberos.session-key|Session Key]]に関する情報が含まれます。

## Pre-Authentication

環境やpolicyによって、AS exchangeでは[[kerberos.pre-authentication|Pre-Authentication]]が要求されます。

Pre-Authenticationによって、KDCはTGTを発行する前にclientが認証に必要なcredentialを保持していることを確認できます。

## Ticket Cache

clientは取得したTGTをticket cacheに保存します。

有効期間中は同じTGTを再利用して複数のService Ticketを要求できるため、service accessのたびにuser passwordを利用する必要はありません。

## TGS Exchange

Service Ticketが必要になると、clientはTGTと[[kerberos.authenticator|Authenticator]]をTGSへ送信します。

TGSはTGTを検証し、要求が正当であれば対象service用のService Ticketを発行します。

## Realmとの関係

TGTは[[kerberos.realm|Realm]]のticket-granting serviceに対して使用されます。

別Realmへauthentication pathを構成する場合には[[kerberos.cross-realm-authentication|Cross-Realm Authentication]]で追加のTGTが利用されることがあります。

## Active Directory

> **主な出典:** [Microsoft - Kerberos authentication overview in Windows Server](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview) / [MS-KILE](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)

[[ad.active-directory|Active Directory]]では[[ad.domain-controller|Domain Controller]]がKDCとして動作します。

AD DSのTGTは[[ad.krbtgt|KRBTGT]] accountに関連するcryptographic keyによって保護されます。

Windows KerberosではTGTなどに[[windows.privilege-attribute-certificate|Privilege Attribute Certificate（PAC）]]によるauthorization informationが含まれる場合があります。

## Security上の重要性

TGTはclient identityを基にService Ticketを取得するためのcredentialです。

TGTが盗まれた場合、有効期間などの条件内でそのcredentialが不正利用される可能性があります。

さらにKRBTGTのkey materialが侵害された場合、攻撃者は[[attack.golden-ticket|Golden Ticket]]として知られる偽造TGTを作成できる可能性があります。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.authentication-server|Authentication Server]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.authenticator|Authenticator]]
- [[kerberos.pre-authentication|Pre-Authentication]]
- [[kerberos.realm|Realm]]
- [[ad.krbtgt|KRBTGT]]
- [[attack.golden-ticket|Golden Ticket]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Ticket-Granting Tickets](https://learn.microsoft.com/en-us/windows/win32/secauthn/ticket-granting-tickets)
- [Microsoft - Kerberos authentication overview in Windows Server](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
