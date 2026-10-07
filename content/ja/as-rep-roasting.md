---
canonical_id: attack.as-rep-roasting
title: AS-REP Roasting
lang: ja
slug: as-rep-roasting
aliases: []
categories:
  - Active Directory
  - Kerberos
status: published
summary: AS-REP RoastingとKerberos Pre-Authentication無効account、AS-REQ/AS-REP、offline password guessing、検知と緩和を解説する。
---

## 概要

> **主な出典:** [MITRE ATT&CK T1558.004 - AS-REP Roasting](https://attack.mitre.org/techniques/T1558/004/)

[[attack.as-rep-roasting|AS-REP Roasting]]は、[[kerberos.pre-authentication|Kerberos Pre-Authentication]]を要求しないaccountに対して[[kerberos.authentication-server|Authentication Server（AS）]] exchangeのresponseを取得し、そのcryptographic materialをoffline password guessingへ利用するcredential access techniqueです。

## 通常のPre-Authentication

通常のpassword-based [[auth.kerberos|Kerberos]] initial authenticationでは、[[kerberos.kdc|Key Distribution Center（KDC）]]がcredentialを発行する前にclientへPre-Authenticationを要求できます。

このmechanismによって、clientがaccount secretに基づくproofを示す前にpassword-derived encrypted dataが返されることを防ぎます。

## Pre-Authenticationを要求しないAccount

Active Directory accountでKerberos Pre-Authenticationを要求しないconfigurationが設定されていると、ASは有効な[[kerberos.principal|Principal]]に対してPre-Authentication proofなしでAS-REPを返す場合があります。

そのAS-REPの一部はaccountのpassword-derived keyで保護されます。

passwordが弱い場合、そのdataがoffline guessingへ利用される可能性があります。

## TGTとの関係

successful AS responseには[[kerberos.ticket-granting-ticket|Ticket-Granting Ticket（TGT）]]が含まれます。

AS-REP Roastingの目的はTGTを通常利用することではなく、AS-REP内のpassword-derived cryptographic materialをcredential guessingへ利用する点にあります。

## Kerberoastingとの違い

[[attack.kerberoasting|Kerberoasting]]はauthenticated principalがSPN向けService Ticketを取得してService Account credentialを狙います。

AS-REP RoastingはPre-Authenticationを要求しないaccountのinitial AS exchangeを対象とします。

## 検知

MITRE ATT&CKの現行detection guidanceでは、Domain Controller上のEvent ID 4768でPre-Authentication Type 0となるrequestが主要なsignalです。

環境内でPre-Authentication無効accountが本当に必要かをbaseline化し、通常と異なるrequest sourceや大量requestを監視することが重要です。

## 緩和

基本対策は明確です。

- Kerberos Pre-Authenticationを不要に無効化しない
- exception accountをinventoryする
- account passwordを長くrandomにする
- obsolete encryption dependencyを減らす
- Event ID 4768を監視する

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.authentication-server|Authentication Server]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.pre-authentication|Pre-Authentication]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.principal|Principal]]
- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[attack.kerberoasting|Kerberoasting]]
- [[ad.service-account|Service Account]]
- [[ad.service-principal-name|Service Principal Name]]
- [[kerberos.service-ticket|Service Ticket]]

## 参考文献

- [MITRE ATT&CK T1558.004 - AS-REP Roasting](https://attack.mitre.org/techniques/T1558/004/)
- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [RFC 6113 - A Generalized Framework for Kerberos Pre-Authentication](https://www.rfc-editor.org/rfc/rfc6113.html)
- [Microsoft - Event 4768: A Kerberos authentication ticket was requested](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4768)
