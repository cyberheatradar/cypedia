---
canonical_id: kerberos.service-ticket
title: Service Ticket
lang: ja
slug: service-ticket
aliases: []
categories:
  - Kerberos
status: published
summary: Kerberos Service TicketのTGS発行、service key、Session Key、SPN、KerberoastingやSilver Ticketとの関係を解説する。
---

## 概要

> **主な出典:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

[[kerberos.service-ticket|Service Ticket]]は、[[auth.kerberos|Kerberos]] clientが特定のapplication serviceへauthenticationするために使用する[[kerberos.ticket|Kerberos Ticket]]です。

Service Ticketは[[kerberos.ticket-granting-server|Ticket-Granting Server（TGS）]]によって発行されます。

## 取得

clientは[[kerberos.ticket-granting-ticket|Ticket-Granting Ticket（TGT）]]と[[kerberos.authenticator|Authenticator]]をTGSへ提示し、target service用のticketを要求します。

requestが有効であればTGSはTGS-REPでService Ticketを返します。

## Service Session Key

TGSはclientとtarget serviceの間で使用される[[kerberos.session-key|Session Key]]を生成します。

Service Ticket内部にはservice側が利用するSession Keyのcopyなどが含まれます。

client側には同じSession Keyを利用するためのinformationがTGS-REPとして返されます。

## Service側のKey

通常のService Ticketでは、encrypted partはtarget serviceのsecret keyで保護されます。

RFC 4120のuser-to-user authenticationでは例外として、ENC-TKT-IN-SKEY optionによりserver側の[[kerberos.ticket-granting-ticket|TGT]]から得られるSession KeyでService Ticketを暗号化できます。

通常のAP exchangeでは、target serviceは自身が保持するkey materialを使ってticketを処理します。

## Active DirectoryとSPN

[[ad.active-directory|Active Directory]]ではservice instanceは[[ad.service-principal-name|Service Principal Name（SPN）]]によって識別されます。

SPNは通常computer accountまたは[[ad.service-account|Service Account]]などへ登録されます。

TGSは要求されたSPNに基づいて適切なservice identityへticketを発行します。

## PAC

Windows KerberosのService Ticketには[[windows.privilege-attribute-certificate|Privilege Attribute Certificate（PAC）]]によるauthorization dataが含まれる場合があります。

PACはWindows access decisionに必要なgroup membershipなどのinformationを運びます。

## AP Exchange

clientはService TicketとAuthenticatorをapplication serverへ提示します。

serverはticketとAuthenticatorを検証し、Kerberos authenticationを成立させます。

## Kerberoasting

[[attack.kerberoasting|Kerberoasting]]では、正規に取得可能なService Ticketのencrypted dataがoffline password guessingへ利用される場合があります。

特にService Accountのpassword strengthや使用されるencryption typeがsecurity上重要です。

## Silver Ticket

[[attack.silver-ticket|Silver Ticket]]は、service側のkey materialを利用してService Ticketを偽造するtechniqueです。

TGTを偽造する[[attack.golden-ticket|Golden Ticket]]とは対象となるticketとkeyが異なります。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.session-key|Session Key]]
- [[kerberos.authenticator|Authenticator]]
- [[ad.service-principal-name|Service Principal Name]]
- [[ad.service-account|Service Account]]
- [[windows.privilege-attribute-certificate|PAC]]
- [[attack.kerberoasting|Kerberoasting]]
- [[attack.silver-ticket|Silver Ticket]]
- [[ad.krbtgt|KRBTGT]]
- [[ad.computer-account|Computer Account]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [Microsoft - Kerberos authentication overview in Windows Server](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft - Key Distribution Center](https://learn.microsoft.com/en-us/windows/win32/secauthn/key-distribution-center)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
- [Microsoft - Service principal names](https://learn.microsoft.com/en-us/windows/win32/ad/service-principal-names)
- [MS-KILE - Authentication to Services](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/9bf9252a-0bc9-497e-8c25-c77d28d4767b)
- [MS-KILE - PAC Generation](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/c25d48df-67f0-4c5f-9e46-27a7d5710909)
- [MITRE ATT&CK T1558.003 - Kerberoasting](https://attack.mitre.org/techniques/T1558/003/)
- [MITRE ATT&CK T1558.002 - Silver Ticket](https://attack.mitre.org/techniques/T1558/002/)
