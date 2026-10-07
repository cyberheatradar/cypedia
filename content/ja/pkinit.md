---
canonical_id: kerberos.pkinit
title: PKINIT
lang: ja
slug: pkinit
aliases:
  - Public Key Cryptography for Initial Authentication in Kerberos
categories:
  - Kerberos
  - Authentication
status: published
summary: PKINITによるKerberos initial authenticationへのpublic-key cryptography統合、certificate、Windows smart card logonを解説する。
---

## 概要

> **主な出典:** [RFC 4556 - Public Key Cryptography for Initial Authentication in Kerberos](https://www.rfc-editor.org/rfc/rfc4556.html)

[[kerberos.pkinit|PKINIT]]は、[[auth.kerberos|Kerberos]]のinitial authenticationへpublic-key cryptographyを導入する[[kerberos.pre-authentication|Pre-Authentication]] mechanismです。

RFC 4556で標準化されています。

## AS Exchange

PKINITは[[kerberos.authentication-server|Authentication Server（AS）]] exchangeで使用されます。

clientはpublic/private key pairとcertificateに基づくinformationをAS-REQへ含めます。

[[kerberos.kdc|KDC]]はsignatureやcertificateなどを検証し、validなrequestに対してAS-REPを生成します。

## Key Establishment

PKINITではpublic-key cryptographyを使用してinitial Kerberos key materialを安全に確立します。

これによってtraditionalなpassword-derived keyだけに依存しないinitial authenticationが可能になります。

## Certificate

PKINITはX.509 certificateを利用します。

client certificateだけでなく、KDC側をauthenticationするためのcertificate trustも重要です。

PKI configurationやcertificate validationはPKINIT securityの一部です。

## Windows実装

> **主な出典:** [MS-PKCA - Public Key Cryptography for Initial Authentication in Kerberos Protocol](https://learn.microsoft.com/en-us/openspecs/windows_protocols/MS-PKCA/d0cf1763-3541-4008-a75f-a577fa5e8c5b)

WindowsはRFC 4556を基礎としてPKINITを実装し、Microsoft固有behaviorをMS-PKCAで定義しています。

[[ad.active-directory|Active Directory]]のsmart card logonは代表的な利用例です。

## TGT

PKINITによるAS exchangeが成功すると、通常のKerberos initial authenticationと同様に[[kerberos.ticket-granting-ticket|Ticket-Granting Ticket（TGT）]]が取得されます。

その後の[[kerberos.ticket-granting-server|TGS]] exchangeは通常のKerberos ticket flowへ続きます。

## Security上の論点

PKINITではpassword strengthだけでなく次の要素が重要になります。

- private key protection
- certificate issuance
- certificate mapping
- KDC certificate validation
- CA trust
- revocation handling

PKI側のmisconfigurationはKerberos authentication securityへ直接影響する可能性があります。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.pre-authentication|Pre-Authentication]]
- [[kerberos.authentication-server|Authentication Server]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[ad.active-directory|Active Directory]]
- [[kerberos.ticket|Kerberos Ticket]]

## 参考文献

- [RFC 4556 - Public Key Cryptography for Initial Authentication in Kerberos](https://www.rfc-editor.org/rfc/rfc4556.html)
- [MS-PKCA - Public Key Cryptography for Initial Authentication in Kerberos Protocol](https://learn.microsoft.com/en-us/openspecs/windows_protocols/MS-PKCA/d0cf1763-3541-4008-a75f-a577fa5e8c5b)
- [Microsoft - Smart Card Certificate Requirements and Enumeration](https://learn.microsoft.com/en-us/windows/security/identity-protection/smart-cards/smart-card-certificate-requirements-and-enumeration)
