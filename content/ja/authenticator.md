---
canonical_id: kerberos.authenticator
title: Authenticator
lang: ja
slug: authenticator
aliases: []
categories:
  - Kerberos
status: published
summary: Kerberos Authenticatorの構造、Session Keyによる保護、timestamp、replay protection、TGS/AP exchangeでの利用を解説する。
---

## 概要

> **主な出典:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

[[kerberos.authenticator|Authenticator]]は、[[auth.kerberos|Kerberos]]で[[kerberos.ticket|ticket]]を提示するclientが、そのticketに対応する[[kerberos.session-key|Session Key]]を保持していることを証明するために使用されるdata structureです。

Authenticatorはticketとは別にclientが生成します。

## 主なField

RFC 4120のAuthenticatorには、代表的に次のfieldがあります。

- client [[kerberos.realm|Realm]]
- client [[kerberos.principal|Principal]]
- current time
- microsecond component
- optional checksum
- optional subkey
- optional sequence number
- optional authorization data

## Encryption

Authenticatorは対応するSession Keyによって保護されます。

service側は[[kerberos.service-ticket|Service Ticket]]などから得たSession Keyを利用してAuthenticatorを処理します。

## TGS Exchange

clientが[[kerberos.ticket-granting-server|Ticket-Granting Server]]へService Ticketを要求する際にもAuthenticatorが使用されます。

TGSは[[kerberos.ticket-granting-ticket|TGT]]とAuthenticatorを組み合わせてrequestを検証します。

## Application Exchange

clientがapplication serviceへ接続するときはService TicketとAuthenticatorをAP-REQで提示します。

serviceはticketとAuthenticatorの双方を検証します。

## TimestampとReplay Protection

Authenticatorにはcurrent time informationが含まれます。

serviceは許容clock skewを考慮しながらtimestampを検証します。RFC 4120では、application側が別の適切なanti-replay mechanismを提供しない限り、serverは[[kerberos.replay-cache|Replay Cache]]を利用してAuthenticatorの再利用を検出する必要があります。

## Ticketとの違い

Kerberos TicketはKDCが生成します。

Authenticatorはclientが各authentication exchangeで生成します。

同じticketがlifetime内で再利用される場合でも、Authenticatorはexchangeごとに新しい値として生成されます。

## Security上の意味

Authenticatorのreplay検出はKerberos securityの重要な要素です。

clock synchronizationやReplay Cacheが正しく機能しない場合、replay protectionへ影響する可能性があります。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.replay-cache|Replay Cache]]
- [[kerberos.realm|Realm]]
- [[kerberos.principal|Principal]]
- [[kerberos.kdc|Key Distribution Center]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
