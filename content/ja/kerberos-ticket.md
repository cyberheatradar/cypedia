---
canonical_id: kerberos.ticket
title: Kerberos Ticket
lang: ja
slug: kerberos-ticket
aliases:
  - Ticket
  - ticket
categories:
  - Kerberos
status: published
summary: Kerberos Ticketの基本構造、暗号化部分、有効期間、TGTとService Ticketの違いを解説する。
---

## 概要

> **主な出典:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

[[kerberos.ticket|Kerberos Ticket]]は[[kerberos.kdc|Key Distribution Center（KDC）]]が発行し、clientがserviceへauthentication informationを提示するために使用するcredential componentです。

Kerberosではticketと対応する[[kerberos.session-key|Session Key]]を組み合わせてauthentication exchangeを行います。

## 基本構造

RFC 4120のTicket structureには、主に次のinformationがあります。

- protocol version
- [[kerberos.realm|Realm]]
- server [[kerberos.principal|Principal]]
- encrypted part

encrypted partにはticket flag、Session Key、client identity、time information、authorization dataなどが含まれます。

## 暗号化

ticketのencrypted partは、対象serviceが利用できるlong-term keyを使って保護されます。

そのためclientは通常、ticket内部のencrypted informationを直接復号する必要はありません。

clientはKDCから別途受け取ったSession Keyを使用してauthentication exchangeを進めます。

## Ticket-Granting Ticket

[[kerberos.ticket-granting-ticket|Ticket-Granting Ticket（TGT）]]はticket-granting service向けの特別なticketです。

clientはTGTを[[kerberos.ticket-granting-server|Ticket-Granting Server（TGS）]]へ提示して、個別service向けのticketを取得します。

## Service Ticket

[[kerberos.service-ticket|Service Ticket]]は特定のapplication serviceへauthenticationするためのticketです。

clientはService Ticketと[[kerberos.authenticator|Authenticator]]をtarget serviceへ提示します。

## Lifetime

ticketにはstart time、end time、renewalに関連するinformationやflagが含まれる場合があります。

ticketは無期限のcredentialではなく、設定されたlifetimeとpolicyに従います。

## Authorization Data

ticketのencrypted partにはauthorization dataを含めることができます。

[[ad.active-directory|Active Directory]]のWindows Kerberosでは[[windows.privilege-attribute-certificate|PAC]]がauthorization informationを運ぶために利用されます。

## Security上の意味

ticketはauthentication credentialの一部であり、不正取得や偽造は重要なsecurity issueです。

TGTの偽造は[[attack.golden-ticket|Golden Ticket]]、Service Ticketの偽造は[[attack.silver-ticket|Silver Ticket]]と関連します。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.authenticator|Authenticator]]
- [[kerberos.realm|Realm]]
- [[kerberos.principal|Principal]]
- [[windows.privilege-attribute-certificate|PAC]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Microsoft Kerberos](https://learn.microsoft.com/en-us/windows/win32/secauthn/microsoft-kerberos)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
