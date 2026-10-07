---
canonical_id: kerberos.ticket-granting-server
title: Ticket-Granting Server
lang: ja
slug: ticket-granting-server
aliases:
  - TGS
categories:
  - Kerberos
status: published
summary: Kerberos Ticket-Granting Server（TGS）のTGS-REQ/TGS-REP、TGT検証、Service Ticket発行を解説する。
---

## 概要

> **主な出典:** [RFC 4120 - Client/Server Authentication Exchange](https://www.rfc-editor.org/rfc/rfc4120.html)

Ticket-Granting Server（[[kerberos.ticket-granting-server|TGS]]）は[[kerberos.kdc|Key Distribution Center（KDC）]]を構成するserviceの1つです。

TGSは有効な[[kerberos.ticket-granting-ticket|Ticket-Granting Ticket（TGT）]]を持つ[[auth.kerberos|Kerberos]] clientからrequestを受け、target service用の[[kerberos.service-ticket|Service Ticket]]を発行します。

## TGS-REQ

clientはTGSへTGS-REQを送信します。

requestにはTGT、[[kerberos.authenticator|Authenticator]]、target serviceを識別するinformationなどが含まれます。

[[ad.active-directory|Active Directory]]ではtarget serviceの識別に[[ad.service-principal-name|Service Principal Name（SPN）]]が重要です。

## TGTの検証

TGSはTGTを処理し、client/TGS間の[[kerberos.session-key|Session Key]]を利用してAuthenticatorなどを検証します。

requestが有効であればtarget service向けのcredentialを生成します。

## TGS-REP

TGS-REPにはtarget service用のService Ticketとclientが利用するservice session keyに関するinformationが含まれます。

Service Ticketはtarget service側が利用できるlong-term keyで保護されます。

## Active Directory

AD DSではserviceのSPNは通常、computer accountや[[ad.service-account|Service Account]]などのaccountへ登録されます。

そのaccountに関連するkey materialがService Ticketの保護に関係します。

Windows KerberosではService Ticketへ[[windows.privilege-attribute-certificate|PAC]]が含まれる場合があります。

## Kerberoasting

[[attack.kerberoasting|Kerberoasting]]では、正当なTGTを持つ主体がTGSへService Ticketを要求できるKerberosの通常機能が利用されます。

弱いService Account passwordやlegacy encryptionなどが存在する場合、取得したticket dataがoffline password guessingの対象になることがあります。

## Silver Ticket

[[attack.silver-ticket|Silver Ticket]]はservice側のkey materialを利用してService Ticketを偽造するattack techniqueです。

これは[[attack.golden-ticket|Golden Ticket]]がTGTを対象とする点とは異なります。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.authenticator|Authenticator]]
- [[kerberos.session-key|Session Key]]
- [[ad.service-principal-name|Service Principal Name]]
- [[ad.service-account|Service Account]]
- [[windows.privilege-attribute-certificate|PAC]]
- [[attack.kerberoasting|Kerberoasting]]
- [[attack.silver-ticket|Silver Ticket]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.principal|Principal]]
- [[ad.computer-account|Computer Account]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Key Distribution Center](https://learn.microsoft.com/en-us/windows/win32/secauthn/key-distribution-center)
- [Microsoft - Kerberos authentication overview in Windows Server](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
