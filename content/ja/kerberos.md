---
canonical_id: auth.kerberos
title: Kerberos
lang: ja
slug: kerberos
aliases:
  - Kerberos V5
categories:
  - Authentication
  - Active Directory
status: published
summary: Kerberos V5の仕組み、構成要素、認証フロー、暗号方式、Active Directory実装、攻撃・防御上の論点を一次情報に基づいて解説する。
---
## 概要

> **主な出典:** [RFC 4120 §1](https://www.rfc-editor.org/rfc/rfc4120.html#section-1)

Kerberosは、信頼された第三者である[[kerberos.kdc|Key Distribution Center（KDC）]]を介して、ネットワーク上の[[kerberos.principal|principal]]同士を認証し、通信に利用するセッション鍵を確立するための認証プロトコルです。

現在の標準的な基礎仕様はKerberos Version 5（Kerberos V5）であり、RFC 4120で規定されています。RFC 4120は、それ以前のKerberos V5仕様であるRFC 1510を置き換えています。

Kerberosでは、利用者がサービスへ接続するたびに長期秘密情報を直接提示するのではなく、KDCが発行するticketとセッション鍵を用いて認証を進めます。この構造により、一度取得した[[kerberos.ticket-granting-ticket|Ticket-Granting Ticket（TGT）]]を利用して複数のサービス向けticketを取得できます。

## 歴史的背景・成立経緯

> **主な出典:** [J. H. Saltzer - On the Origin of Kerberos](https://web.mit.edu/saltzer/www/publications/Kerberosorigin.pdf) / [Project Athena Technical Plan E.2.1](https://web.mit.edu/Saltzer/www/publications/athenaplan/e.2.1.pdf) / [RFC 4120](https://www.rfc-editor.org/info/rfc4120/)

KerberosはMIT Project Athenaで開発されました。Jerome H. Saltzerによる開発史では、1985年の研究を経て、Cliff NeumanとSteve MillerがProject AthenaでKerberos認証システムを設計・実装し、初期実装は1986年秋に完成、1987年1月にProject Athenaで本番利用が始まったとされています。

初期に実運用されたKerberos Version 4の後継としてVersion 5が設計され、1993年にRFC 1510として公開されました。その後、仕様の明確化や修正を反映したRFC 4120が2005年に公開され、RFC 1510を置き換えました。

Kerberosは特定ベンダーだけの認証方式ではなく、IETFで標準化されたプロトコルです。一方で、Microsoft Windows / Active DirectoryはKerberos V5を基礎として独自の拡張を加えており、その差分はMS-KILEなどのMicrosoft Open Specificationsで公開されています。

## 現在の位置づけ

> **主な出典:** [MS-KILE](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/) / [MS-AUTHSOD: Kerberos Protocols](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-authsod/857b7719-bd1b-4cdd-ade0-84506b30b8df)

Kerberos V5は、現在も企業ネットワークやActive Directoryを含む多くの認証基盤で使用されています。

Windowsの[[ad.active-directory|Active Directory]]環境では、[[ad.domain-controller|Domain Controller]]がKDCの役割を担います。MicrosoftのKerberos実装はRFC 4120を基礎としつつ、authorization data、interactive logon、delegation、Active Directoryとの統合などに関する拡張を持ちます。

そのため、Kerberosを理解する際には、IETF標準としてのKerberos V5と、Windows / Active DirectoryにおけるKerberos拡張を分けて考える必要があります。

## 基本構成

> **主な出典:** [RFC 4120](https://www.rfc-editor.org/rfc/rfc4120.html)

### Principal

principalは、Kerberosによって識別・認証される主体です。

利用者、ホスト、ネットワークサービスなどがprincipalになり得ます。Kerberosのticketや認証要求では、principal名を用いて主体を識別します。

### [[kerberos.realm|Realm]]

realmは、Kerberosにおける管理・認証上の名前空間です。

KDCはrealmに属するprincipalと、その認証に必要な鍵情報を管理します。複数realm間で認証を成立させる[[kerberos.cross-realm-authentication|cross-realm authentication]]もKerberos V5で定義されています。

### Key Distribution Center

Key Distribution Center（KDC）はKerberosの中心となる信頼主体です。

概念上、KDCは主に次の2つの機能を提供します。

- [[kerberos.authentication-server|Authentication Server（AS）]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server（TGS）]]

ASは初期認証を処理してTGTを発行し、TGSはTGTを基に個別サービス向けの[[kerberos.service-ticket|Service Ticket]]を発行します。

### Ticket

ticketは、KDCによって発行される認証情報です。

ticketには、client principal、service principal、セッション鍵、ticketの有効期間など、認証に必要な情報が含まれます。ticketの機密部分は対象サービス側が保持する鍵で保護されるため、client自身が任意に内容を書き換えることを前提としていません。

代表的なticketには次の2種類があります。

- Ticket-Granting Ticket（TGT）
- Service Ticket

### [[kerberos.session-key|Session Key]]

Kerberosでは、長期鍵だけではなく、一時的なsession keyを使用します。

KDCは認証処理の中でclientとTGS、またはclientとapplication serviceの間で利用するsession keyを提供します。

### [[kerberos.authenticator|Authenticator]]

Authenticatorは、ticketを提示する主体が、そのticketに対応するsession keyを保持していることを示すために使用されるデータです。

Authenticatorには時刻情報などが含まれ、ticketと組み合わせて利用されます。application serverはAuthenticatorの検証と[[kerberos.replay-cache|replay cache]]などを利用してreplay attackへの対策を行います。

## 認証の流れ

> **主な出典:** [RFC 4120 §3](https://www.rfc-editor.org/rfc/rfc4120.html#section-3)

Kerberos V5の基本的な認証は、AS exchange、TGS exchange、Client/Server exchangeという段階で進みます。

### 1. AS-REQ / AS-REP

> **主な出典:** [RFC 4120 §3.1](https://www.rfc-editor.org/rfc/rfc4120.html#section-3.1)

clientはKDCのAuthentication ServerへAS-REQを送信します。

環境やポリシーによってはpre-authenticationが要求されます。KDCがclientを認証すると、AS-REPによってTGTとclient/TGS間で利用するsession keyに関する情報が返されます。

TGTは、その後のService Ticket取得に使用されます。

### 2. TGS-REQ / TGS-REP

> **主な出典:** [RFC 4120 §3.3](https://www.rfc-editor.org/rfc/rfc4120.html#section-3.3)

clientが特定のサービスを利用したい場合、TGTを利用してTicket-Granting ServerへTGS-REQを送信します。

TGSはTGTとAuthenticatorなどを検証し、要求が有効であれば対象サービス向けのService TicketをTGS-REPとして返します。

この処理により、clientは長期秘密情報をサービスごとに再提示することなく、複数サービス向けのticketを取得できます。

### 3. AP-REQ / AP-REP

> **主な出典:** [RFC 4120 §3.2](https://www.rfc-editor.org/rfc/rfc4120.html#section-3.2)

clientは取得したService TicketとAuthenticatorを対象application serverへAP-REQとして提示します。

serverはService Ticketを自身の鍵で処理し、Authenticatorを検証します。

mutual authenticationを行う場合、serverはAP-REPを返し、client側からもserverの正当性を確認できます。

## Ticket-Granting Ticket

> **主な出典:** [RFC 4120 §3.3](https://www.rfc-editor.org/rfc/rfc4120.html#section-3.3)

TGTは、KerberosにおけるSingle Sign-On的な動作を支える重要なticketです。

初期認証後、clientはTGTを一定期間ticket cacheに保持し、そのTGTを利用して複数のService Ticketを要求できます。

これにより、個々のサービスへ接続するたびに利用者の長期秘密情報を入力し直す必要を減らせます。

## [[kerberos.pre-authentication|Pre-Authentication]]

> **主な出典:** [RFC 4120 §3.1](https://www.rfc-editor.org/rfc/rfc4120.html#section-3.1) / [RFC 6113](https://www.rfc-editor.org/rfc/rfc6113.html)

Kerberos V5はpre-authenticationの仕組みを備えています。

RFC 4120ではpre-authentication dataを扱う仕組みが定義され、RFC 6113ではKerberos pre-authenticationの一般化されたframeworkが定義されています。

pre-authenticationは、KDCがAS-REPを発行する前にclient側へ追加の認証証明を要求できる仕組みです。

Windows / Active Directory環境ではpre-authenticationを無効化したaccountが[[attack.as-rep-roasting|AS-REP Roasting]]の対象となり得るため、セキュリティ上も重要です。

## 時刻同期とReplay Protection

> **主な出典:** [RFC 4120 §3.2.3](https://www.rfc-editor.org/rfc/rfc4120.html#section-3.2.3)

Kerberosでは時刻が重要な役割を持ちます。

RFC 4120では、参加するhostのclockがある程度同期していることを前提としており、典型的な許容clock skewとして約5分が示されています。

application serverはAuthenticatorに含まれる時刻情報を検証し、必要に応じてreplay cacheを保持します。同一Authenticatorの再利用が検出された場合、replayとして拒否できます。

そのため、Kerberos環境では正確かつ安全な時刻同期が重要です。

## 暗号方式

> **主な出典:** [RFC 3961](https://www.rfc-editor.org/rfc/rfc3961.html) / [RFC 3962](https://www.rfc-editor.org/rfc/rfc3962.html) / [RFC 8009](https://www.rfc-editor.org/rfc/rfc8009.html) / [RFC 8429](https://www.rfc-editor.org/rfc/rfc8429.html)

Kerberos V5は単一の暗号アルゴリズムだけに固定された設計ではありません。

RFC 3961はKerberosで利用するencryption typeとchecksum mechanismを定義するためのframeworkを規定しています。

AESを利用するKerberos encryption typeはRFC 3962で定義され、その後RFC 8009ではAESとHMAC-SHA2を組み合わせた新しいencryption typeが定義されました。

一方、3DESおよびRC4についてはRFC 8429でKerberosにおける利用がdeprecatedとされています。

したがって、新しい実装や安全性を重視する運用では、legacy encryption typeを前提とせず、現在推奨される強い暗号方式を利用することが重要です。

## [[kerberos.pkinit|PKINIT]]

> **主な出典:** [RFC 4556](https://www.rfc-editor.org/rfc/rfc4556.html)

Public Key Cryptography for Initial Authentication in Kerberos（PKINIT）は、Kerberosのinitial authenticationへ公開鍵暗号を統合する拡張です。

RFC 4556で定義されており、pre-authentication dataを利用して公開鍵による署名や鍵交換をKerberosの初期認証へ組み込みます。

Windows環境における証明書・smart cardを利用したKerberos認証とも関連する重要な仕様です。

## Active Directoryとの関係

> **主な出典:** [MS-KILE](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/) / [MS-AUTHSOD: Kerberos Protocols](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-authsod/857b7719-bd1b-4cdd-ade0-84506b30b8df)

Active DirectoryではKerberos V5が主要な認証プロトコルの1つとして利用されています。

WindowsのKDCはActive Directoryをaccount databaseとして利用し、[[kerberos.ticket|Kerberos ticket]]にはWindows固有のauthorization情報が含まれる場合があります。

MicrosoftのMS-KILEは、RFC 4120に対するWindows固有の動作や拡張を定義しています。また、[[windows.privilege-attribute-certificate|Privilege Attribute Certificate（PAC）]]はWindows環境でauthorization情報を運ぶために利用されます。

このため、Active DirectoryのKerberosを解析するときはRFC 4120だけでなく、MS-KILE、MS-PAC、MS-SFU、MS-PKCAなどのWindows Protocols仕様も必要になります。

## セキュリティ上の論点

> **主な出典:** [RFC 4120 §10](https://www.rfc-editor.org/rfc/rfc4120.html#section-10)

Kerberosの安全性は、KDC、principalの長期鍵、session key、ticket、時刻同期、暗号方式など複数の要素に依存します。

特に次の点が重要です。

- KDCとその鍵データを保護すること
- clientやserverの長期鍵を保護すること
- replay cacheを適切に利用すること
- 安全な時刻同期を維持すること
- legacyな暗号方式を避けること
- pre-authenticationを適切に利用すること
- ticket cacheやcredential materialを保護すること

RFC 4120は、password由来鍵に対するdictionary attack、clock synchronization、replay protectionなどについてSecurity Considerationsで明示的に扱っています。

## 攻撃・悪用との関係

> **主な出典:** [MITRE ATT&CK T1558](https://attack.mitre.org/techniques/T1558/)

Kerberosは認証基盤として広く利用されているため、攻撃者にとっても重要な対象です。

MITRE ATT&CKでは「Steal or Forge Kerberos Tickets」がT1558として整理されており、代表的なsub-techniqueとして[[attack.golden-ticket|Golden Ticket]]、[[attack.silver-ticket|Silver Ticket]]、[[attack.kerberoasting|Kerberoasting]]、[[attack.as-rep-roasting|AS-REP Roasting]]、Ccache Filesが定義されています。

### Kerberoasting

> **主な出典:** [MITRE ATT&CK T1558.003](https://attack.mitre.org/techniques/T1558/003/)

[[attack.kerberoasting|Kerberoasting]]では、正規のTGTを持つ主体がservice principalに対するService Ticketを要求できるKerberosの通常機能を悪用します。

取得したticketの一部を対象としてoffline password crackingを試み、service accountのcredentialを回復することが目的となります。

### AS-REP Roasting

> **主な出典:** [MITRE ATT&CK T1558.004](https://attack.mitre.org/techniques/T1558/004/)

AS-REP Roastingは、Kerberos pre-authenticationを要求しないaccountを対象とする攻撃です。

pre-authenticationが無効な場合、攻撃者がAS-REQを送信して得たAS-REP中のpassword由来鍵で保護されたデータを利用し、offline crackingを試みられる場合があります。

### Golden Ticket

> **主な出典:** [MITRE ATT&CK T1558.001](https://attack.mitre.org/techniques/T1558/001/)

Active Directory環境では、[[ad.krbtgt|KRBTGT account]]のkey materialを取得した攻撃者が偽造TGTを生成する攻撃がGolden Ticketとして知られています。

これはKDCがTGTを保護するために使用する重要な秘密情報そのものが侵害された場合の攻撃です。

### Silver Ticket

> **主な出典:** [MITRE ATT&CK T1558.002](https://attack.mitre.org/techniques/T1558/002/)

[[ad.service-account|service account]]のkey materialを取得した攻撃者が、そのservice向けのService Ticketを偽造する攻撃はSilver Ticketとして整理されています。

Golden Ticketと異なり、対象serviceの範囲に限定される一方、ticket生成時にKDCへ問い合わせる必要がない場合があります。

## 防御・緩和

> **主な出典:** [RFC 8429](https://www.rfc-editor.org/rfc/rfc8429.html) / [Microsoft: Group Managed Service Accounts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview)

Kerberosに対する防御では、プロトコルそのものだけでなく、その周囲のidentity infrastructureを含めて保護する必要があります。

Active Directory環境では、強いKerberos encryption typeを利用し、RC4などのlegacy方式への依存を減らすことが重要です。

service accountには推測困難な十分に強い秘密情報を使用し、可能な環境ではmanaged service accountなど、人手による固定password管理への依存を減らす方式を検討します。

また、Kerberos pre-authenticationを不必要に無効化しないこと、KDC / Domain Controllerとcredential databaseを高い優先度で保護すること、ticketやcredential cacheへのアクセスを監視することも重要です。

## 制約・限界

> **主な出典:** [RFC 4120 §10](https://www.rfc-editor.org/rfc/rfc4120.html#section-10)

Kerberosは認証のための基盤であり、それだけですべてのauthorization問題やendpoint compromiseを解決するものではありません。

clientやserver、KDC自体が侵害され、鍵やticketが窃取された場合、そのauthentication materialが悪用される可能性があります。

また、Kerberosのreplay protectionは時刻同期などの前提条件にも依存するため、関連インフラの安全性もKerberos全体の安全性に影響します。

## 関連する標準・仕様

> **主な出典:** [RFC 4120](https://www.rfc-editor.org/info/rfc4120/)

Kerberos V5を理解する上で重要な標準・仕様には、RFC 4120のほか、Kerberos cryptosystem framework、AES encryption、pre-authentication、PKINIT、GSS-API、Windows固有拡張などがあります。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.kdc|KDC]]
- [[kerberos.service-ticket|Service Ticket]]
- [[ad.service-principal-name|SPN]]
- [[ad.service-account|Service Account]]
- [[attack.kerberoasting|Kerberoasting]]
- [[attack.as-rep-roasting|AS-REP Roasting]]
- [[attack.golden-ticket|Golden Ticket]]
- [[attack.silver-ticket|Silver Ticket]]
- [[kerberos.pkinit|PKINIT]]
- [[windows.privilege-attribute-certificate|PAC]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [RFC 3961 - Encryption and Checksum Specifications for Kerberos 5](https://www.rfc-editor.org/rfc/rfc3961.html)
- [RFC 3962 - Advanced Encryption Standard (AES) Encryption for Kerberos 5](https://www.rfc-editor.org/rfc/rfc3962.html)
- [RFC 4556 - Public Key Cryptography for Initial Authentication in Kerberos (PKINIT)](https://www.rfc-editor.org/rfc/rfc4556.html)
- [RFC 6113 - A Generalized Framework for Kerberos Pre-Authentication](https://www.rfc-editor.org/rfc/rfc6113.html)
- [RFC 8009 - AES Encryption with HMAC-SHA2 for Kerberos 5](https://www.rfc-editor.org/rfc/rfc8009.html)
- [RFC 8429 - Deprecate Triple-DES (3DES) and RC4 in Kerberos](https://www.rfc-editor.org/rfc/rfc8429.html)
- [J. H. Saltzer - On the Origin of Kerberos](https://web.mit.edu/saltzer/www/publications/Kerberosorigin.pdf)
- [MIT Project Athena Technical Plan E.2.1 - Kerberos Authentication and Authorization System](https://web.mit.edu/Saltzer/www/publications/athenaplan/e.2.1.pdf)
- [Microsoft Open Specifications - MS-KILE: Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
- [Microsoft Open Specifications - MS-AUTHSOD: Kerberos Protocols](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-authsod/857b7719-bd1b-4cdd-ade0-84506b30b8df)
- [Microsoft - Group Managed Service Accounts overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview)
- [MITRE ATT&CK T1558 - Steal or Forge Kerberos Tickets](https://attack.mitre.org/techniques/T1558/)
- [MITRE ATT&CK T1558.001 - Golden Ticket](https://attack.mitre.org/techniques/T1558/001/)
- [MITRE ATT&CK T1558.002 - Silver Ticket](https://attack.mitre.org/techniques/T1558/002/)
- [MITRE ATT&CK T1558.003 - Kerberoasting](https://attack.mitre.org/techniques/T1558/003/)
- [MITRE ATT&CK T1558.004 - AS-REP Roasting](https://attack.mitre.org/techniques/T1558/004/)
