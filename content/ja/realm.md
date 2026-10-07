---
canonical_id: kerberos.realm
title: Realm
lang: ja
slug: realm
aliases:
  - realm
categories:
  - Kerberos
status: published
summary: Kerberos Realmのauthentication domain、KDC、Principal naming、inter-realm authentication、Active Directoryとの関係を解説する。
---

## 概要

> **主な出典:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

[[kerberos.realm|Realm]]は[[auth.kerberos|Kerberos]]におけるauthentication administrative domainです。

Realmには[[kerberos.principal|Principal]]と、そのauthenticationを担当する[[kerberos.kdc|Key Distribution Center（KDC）]]が関連付けられます。

## Realm Name

Realm nameはPrincipalを一意に識別するためのnamespaceの一部として使用されます。

Realm nameはDNS-style nameを使用することが多いですが、Kerberos RealmとDNS namespaceは概念上同一ではありません。

## Principalとの関係

PrincipalはRealmと組み合わせて識別されます。

たとえばPrincipalの表示では `user@EXAMPLE.COM` のようにRealmを付加することがあります。

異なるRealmに同じlocal principal nameが存在しても、Realmが異なれば別のKerberos identityとして扱えます。

## KDC

各RealmにはそのRealmのPrincipalを扱うKDCがあります。

KDCは[[kerberos.authentication-server|Authentication Server]]と[[kerberos.ticket-granting-server|Ticket-Granting Server]] functionalityを提供します。

## Cross-Realm Authentication

複数Realm間でauthenticationを成立させる仕組みが[[kerberos.cross-realm-authentication|Cross-Realm Authentication]]です。

Realm間で共有されるinter-realm keyやtrust pathを使用して、別Realmのserviceへ到達するためのticketを取得します。

## Active Directory

[[ad.active-directory|Active Directory]]では、MicrosoftはKerberos RealmをWindows [[ad.domain|Domain]]に相当するauthentication administrative domainとして説明しています。

RFC 4120ではdomain-style Realm nameをInternet domain nameから設定する場合、慣例としてuppercaseへ変換することを推奨しています。

Kerberos Realm自体はActive Directory専用概念ではありません。

## Trustとの関係

AD DSで別DomainへのKerberos referralを成立させる際には[[ad.trust|Active Directory Trust]]が重要です。

KDCはtrusted domain informationを利用して別Domainへのreferral TGTを発行できます。

## Security上の意味

Realm間authenticationはauthentication boundaryをまたぐため、inter-realm keyやtrust configurationの保護が重要です。

不要なtrust pathや誤ったRealm mappingは意図しないauthentication pathにつながる可能性があります。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.principal|Principal]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.cross-realm-authentication|Cross-Realm Authentication]]
- [[ad.domain|Active Directory Domain]]
- [[ad.trust|Active Directory Trust]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[protocol.dns|DNS]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Key Distribution](https://learn.microsoft.com/en-us/windows/win32/secauthn/key-distribution)
- [MS-KILE - Cross-Domain Trust and Referrals](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/bac4dc69-352d-416c-a9f4-730b81ababb3)
