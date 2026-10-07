---
canonical_id: kerberos.replay-cache
title: Replay Cache
lang: ja
slug: replay-cache
aliases:
  - replay cache
categories:
  - Kerberos
status: published
summary: Kerberos Replay CacheによるAuthenticator再利用検出、timestamp、clock skew、ticket cacheとの違いを解説する。
---

## 概要

> **主な出典:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

[[kerberos.replay-cache|Replay Cache]]は、[[auth.kerberos|Kerberos]] serviceが過去に受理したauthentication dataを記録し、replay attackを検出するために利用する仕組みです。

特に[[kerberos.authenticator|Authenticator]]の再利用検出と関係します。

## Replay Attack

攻撃者がnetwork上で有効なauthentication messageを取得し、そのまま再送することがreplay attackの基本形です。

KerberosではtimestampとReplay Cacheを組み合わせて、この種の再利用を検出します。

## Authenticator

Authenticatorにはclient identityやtime informationが含まれます。

serviceはAuthenticatorを検証し、既に受理したものと同じauthentication dataが再度提示されていないか確認します。

## Clock Skew

Kerberosはtime-based validationを利用するため、client、[[kerberos.kdc|KDC]]、service間のclockが十分に同期している必要があります。

許容範囲を超えるclock differenceは正当なauthenticationのfailureを引き起こす可能性があります。

## Ticket Cacheとの違い

Replay Cacheとticket cacheは別の目的を持ちます。

ticket cacheはclientが[[kerberos.ticket|Kerberos Ticket]]を保存し再利用するためのcacheです。

Replay Cacheはservice側が過去のauthentication attemptのreplayを検出するために利用します。

## Service側Responsibility

Replay protectionはticket自体だけでは完結しません。

service implementationがAuthenticatorのfreshnessやReplay Cacheを適切に扱うことが必要です。

## Security上の意味

Replay Cacheが無効化されていたり、cache stateが適切に維持されなかったりすると、replay detectionが弱くなる可能性があります。

同時にcacheのavailabilityやclock synchronizationも運用上重要です。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.authenticator|Authenticator]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.kdc|Key Distribution Center]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
