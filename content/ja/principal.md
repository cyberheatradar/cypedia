---
canonical_id: kerberos.principal
title: Principal
lang: ja
slug: principal
aliases:
  - principal
categories:
  - Kerberos
status: published
summary: Kerberos Principalのidentity、name、Realm、client/server principal、Active Directoryとの関係を解説する。
---

## 概要

> **主な出典:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

[[kerberos.principal|Principal]]は、[[auth.kerberos|Kerberos]]によって識別・authenticationされるentityです。

user、host、application serviceなどがPrincipalになり得ます。

Kerberosではclient側とserver側の双方がPrincipalとして表現されます。

## Principal Name

RFC 4120ではPrincipal Nameは複数のname componentとname typeから構成されます。

Principalを一意に扱う際には[[kerberos.realm|Realm]]も重要です。

一般的な表示では、PrincipalとRealmを組み合わせて `name@REALM` のように表現します。

## Client Principal

client Principalはauthenticationを要求する主体を識別します。

userだけでなくhostやserviceがclientとしてKerberos exchangeを開始することもできます。

## Server Principal

server Principalはclientがaccessしようとするservice側identityです。

[[ad.active-directory|Active Directory]]ではservice instanceを識別するために[[ad.service-principal-name|Service Principal Name（SPN）]]が使用されます。

## KDCとの関係

[[kerberos.kdc|Key Distribution Center（KDC）]]はRealm内のPrincipalとauthenticationに必要なkey informationを扱います。

clientは[[kerberos.authentication-server|Authentication Server]]からinitial credentialを取得し、後続のticket requestに利用します。

## Ticketとの関係

[[kerberos.ticket|Kerberos Ticket]]にはclientやserverのPrincipal informationが関係します。

[[kerberos.service-ticket|Service Ticket]]は特定のserver Principal向けに発行されます。

## Active Directory

Windows Serverではuser、computer、serviceなどのidentityがAD DS上のaccountと関連付けられ、Kerberos authenticationに使用されます。

一方、Windowsの[[windows.security-principal|Security Principal]]とKerberos Principalは同一概念ではありません。

Security PrincipalはWindows authorization model上のentity、Kerberos PrincipalはKerberos protocol上のidentityです。

## Security上の意味

Principal nameの誤設定はservice identityの誤認やauthentication failureの原因になります。

service identityではSPNを正しく登録し、意図したaccountへ一意に関連付けることが重要です。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.realm|Realm]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[ad.service-principal-name|Service Principal Name]]
- [[windows.security-principal|Security Principal]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Service Principal Names](https://learn.microsoft.com/en-us/windows/win32/ad/service-principal-names)
- [Microsoft - Kerberos authentication overview in Windows Server](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
