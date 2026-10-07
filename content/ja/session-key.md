---
canonical_id: kerberos.session-key
title: Session Key
lang: ja
slug: session-key
aliases:
  - session key
categories:
  - Kerberos
status: published
summary: Kerberos Session Keyの生成・配布、client/TGS・client/service間での利用、long-term keyとの違いを解説する。
---

## 概要

> **主な出典:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

[[kerberos.session-key|Session Key]]は、[[auth.kerberos|Kerberos]] exchangeの中で一定のauthentication sessionに利用されるtemporary cryptographic keyです。

[[kerberos.kdc|Key Distribution Center（KDC）]]が生成・配布し、clientとKerberos serviceの双方が同じkeyを利用できるようにします。

## Long-Term Keyとの違い

Principalのlong-term keyはpasswordやservice account keyなどに由来し、identityに長期的に関連します。

Session Keyは特定のauthentication exchangeやticketに関連する一時的なkeyです。

この分離によってlong-term secretを各application serviceへ直接渡す必要を減らします。

## AS Exchange

[[kerberos.authentication-server|Authentication Server]]から[[kerberos.ticket-granting-ticket|Ticket-Granting Ticket（TGT）]]を取得するとき、clientとTGSの間で利用するSession Keyが確立されます。

clientはそのkeyを後続のTGS requestで使用します。

## TGS Exchange

clientが[[kerberos.ticket-granting-server|Ticket-Granting Server]]へ[[kerberos.service-ticket|Service Ticket]]を要求すると、clientとtarget service向けの新しいSession Keyが生成されます。

そのkeyはclient側とservice側がそれぞれ利用できる形で配布されます。

## Authenticator

clientはSession Keyを使って[[kerberos.authenticator|Authenticator]]を保護します。

これによりticketを提示しているclientが対応するSession Keyを保持していることをservice側が確認できます。

## Ticketとの関係

[[kerberos.ticket|Kerberos Ticket]]のencrypted partには、ticketを受け取るserviceが使用するSession Key informationが含まれます。

client側にも同じSession Keyを利用するために必要なinformationがKDC responseで提供されます。

## Lifetime

Session Keyは通常、関連するticketやauthentication contextのlifetimeに制約されます。

長期保存を前提としたsecretではありません。

## Security上の意味

Session Keyが第三者に取得されると、そのkeyが有効な範囲でauthentication trafficのsecurityへ影響する可能性があります。

client memory、ticket cache、service processなど、Session Keyを扱う場所の保護が重要です。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.authenticator|Authenticator]]
- [[kerberos.principal|Principal]]
- [[ad.service-account|Service Account]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
