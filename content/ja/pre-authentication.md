---
canonical_id: kerberos.pre-authentication
title: Pre-Authentication
lang: ja
slug: pre-authentication
aliases:
  - pre-authentication
categories:
  - Kerberos
  - Authentication
status: published
summary: Kerberos Pre-AuthenticationのPA-DATA、AS exchange、RFC 6113 framework、PKINIT、AS-REP Roastingとの関係を解説する。
---

## 概要

> **主な出典:** [RFC 4120](https://www.rfc-editor.org/rfc/rfc4120.html) / [RFC 6113 - A Generalized Framework for Kerberos Pre-Authentication](https://www.rfc-editor.org/rfc/rfc6113.html)

[[kerberos.pre-authentication|Pre-Authentication]]は、[[kerberos.authentication-server|Authentication Server（AS）]]がinitial [[auth.kerberos|Kerberos]] authenticationでcredentialを発行する前に、clientへ追加のauthentication evidenceを要求する仕組みです。

Pre-Authenticationは単一の固定mechanismではなく、複数のmechanismを運ぶframeworkです。

## PA-DATA

Kerberos messageではpre-authentication informationをPA-DATAとして運べます。

AS-REQに必要なpre-authentication dataが存在しない場合、KDCはclientへ必要なmethod informationを返し、clientが再度AS-REQを構築する場合があります。

## 目的

Pre-Authentication mechanismは、たとえば次の目的に利用できます。

- client identityの追加証明
- initial exchangeのkey establishment
- public-key authentication
- password-based credentialの保護強化

具体的なsecurity propertyは使用するmechanismによって異なります。

## Password-Based Pre-Authentication

password-based Kerberos implementationでは、password-derived keyを利用したtimestamp-based pre-authenticationが使われる場合があります。

[[kerberos.kdc|KDC]]は受信したdataを検証し、成功した場合に[[kerberos.ticket-granting-ticket|TGT]]を発行します。

## PKINIT

[[kerberos.pkinit|PKINIT]]はpublic-key cryptographyを使用するPre-Authentication mechanismです。

RFC 4556で定義され、certificateやpublic/private key pairをinitial AS exchangeへ統合します。

## RFC 6113

RFC 6113はKerberos Pre-Authentication mechanismのgeneralized frameworkを定義します。

複数mechanismの組み合わせや共通processing modelを整理しています。

## Active Directory

[[ad.active-directory|Active Directory]] KerberosでもPre-Authenticationは重要です。

Windows固有のbehaviorやextensionはMS-KILE、PKINIT関連はMS-PKCAで定義されています。

## AS-REP Roasting

[[attack.as-rep-roasting|AS-REP Roasting]]は、password-based accountでPre-Authenticationを要求しない構成が存在する場合に問題になります。

攻撃者がAS-REPを取得できると、暗号化部分がoffline password guessingの対象になる場合があります。

したがって、不要にPre-Authenticationを無効化しないことが重要です。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.authentication-server|Authentication Server]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.pkinit|PKINIT]]
- [[attack.as-rep-roasting|AS-REP Roasting]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [RFC 6113 - A Generalized Framework for Kerberos Pre-Authentication](https://www.rfc-editor.org/rfc/rfc6113.html)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
