---
canonical_id: kerberos.authentication-server
title: Authentication Server
lang: ja
slug: authentication-server
aliases:
  - AS
categories:
  - Kerberos
status: published
summary: Kerberos Authentication Server（AS）のinitial authentication、AS-REQ/AS-REP、TGT発行とPre-Authenticationを解説する。
---

## 概要

> **主な出典:** [RFC 4120 - Kerberos Authentication Service Exchange](https://www.rfc-editor.org/rfc/rfc4120.html)

Authentication Server（[[kerberos.authentication-server|AS]]）は[[kerberos.kdc|Key Distribution Center（KDC）]]を構成するserviceの1つです。

ASは[[auth.kerberos|Kerberos]] clientのinitial authenticationを処理し、成功すると[[kerberos.ticket-granting-ticket|Ticket-Granting Ticket（TGT）]]とclient/TGS間で利用する[[kerberos.session-key|Session Key]]に関する情報を含むAS-REPを返します。

## AS-REQ

clientはASへAS-REQを送信します。

requestにはclientの[[kerberos.principal|Principal]]や要求対象のticket-granting serviceなどのinformationが含まれます。

## Pre-Authentication

[[kerberos.pre-authentication|Pre-Authentication]]が必要な環境では、clientはAS-REQにauthentication evidenceを含めます。

KDCはそのinformationを検証してからTGTを発行します。

Pre-Authenticationを要求しないaccountは[[attack.as-rep-roasting|AS-REP Roasting]]に関連するsecurity riskを持つ場合があります。

## AS-REP

ASがrequestを受理するとAS-REPを返します。

AS-REPにはTGTとclient/TGS間で使用される[[kerberos.session-key|Session Key]]に関するinformationが含まれます。

clientは取得したTGTをcacheし、その後の[[kerberos.ticket-granting-server|Ticket-Granting Server（TGS）]] exchangeに利用します。

## PKINIT

password-derived keyだけでなく、[[kerberos.pkinit|PKINIT]]を使用してpublic-key cryptographyによるinitial authenticationを行うこともできます。

PKINITはRFC 4556で規定されています。

## Active Directory

[[ad.active-directory|Active Directory]]では[[ad.domain-controller|Domain Controller]]上のKDCがAS functionalityを提供します。

AD DS environmentではWindows固有のKerberos behaviorがMS-KILEなどで規定されています。

## Security上の意味

AS exchangeはKerberos authentication chainの入口です。

Pre-Authentication policy、supported encryption type、credential protection、KDC securityはinitial authenticationの安全性に直接影響します。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.pre-authentication|Pre-Authentication]]
- [[kerberos.pkinit|PKINIT]]
- [[kerberos.principal|Principal]]
- [[attack.as-rep-roasting|AS-REP Roasting]]
- [[kerberos.ticket|Kerberos Ticket]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Authentication Service Exchange](https://learn.microsoft.com/en-us/windows/win32/secauthn/authentication-service-exchange)
- [RFC 4556 - Public Key Cryptography for Initial Authentication in Kerberos](https://www.rfc-editor.org/rfc/rfc4556.html)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
