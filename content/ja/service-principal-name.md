---
canonical_id: ad.service-principal-name
title: Service Principal Name
lang: ja
slug: service-principal-name
aliases:
  - SPN
categories:
  - Active Directory
  - Kerberos
status: published
summary: Service Principal Name（SPN）のKerberos service identity、形式、AD登録、一意性、Kerberoastingとの関係を解説する。
---

## 概要

> **主な出典:** [Microsoft - Service principal names](https://learn.microsoft.com/en-us/windows/win32/ad/service-principal-names) / [Microsoft - Name Formats for Unique SPNs](https://learn.microsoft.com/en-us/windows/win32/ad/name-formats-for-unique-spns)

[[ad.service-principal-name|Service Principal Name（SPN）]]は、[[ad.active-directory|Active Directory]]と[[auth.kerberos|Kerberos]]でservice instanceを識別するための名前です。

Kerberos clientは接続対象serviceをSPNで表現し、[[kerberos.kdc|Key Distribution Center（KDC）]]へそのservice向けの[[kerberos.service-ticket|Service Ticket]]を要求します。

SPNが示すservice identityはKerberosのserver [[kerberos.principal|Principal]]と関係します。

## Active Directoryへの登録

SPNは、serviceが使用するcomputer accountや[[ad.service-account|Service Account]]の `servicePrincipalName` attributeへ登録されます。

serviceのsign-in accountを変更した場合、必要に応じてSPNも新しいaccountへ正しく再登録する必要があります。

## 一意性

SPNは登録される[[ad.forest|Forest]]内で一意である必要があります。

同じSPNが複数accountへ登録されると、KDCが対象service accountを一意に決定できず、Kerberos authenticationが失敗する場合があります。

`setspn -S` はduplicate SPNを確認しながらSPNを登録するために利用できます。

## 形式

Microsoftが示す一般的なSPN形式は次です。

`serviceclass/host:port/servicename`

必須要素はservice classとhostです。

portとservice nameはserviceを一意に識別するために必要な場合に追加できます。

host-based serviceでは一般に次のような形式になります。

`serviceclass/host`

## DNSとの関係

SPNのhost componentにはFQDNなどが利用されます。

そのため[[protocol.dns|DNS]] name resolutionやclientがtarget hostnameをどのように構成するかは、Kerberos service authenticationへ影響します。

ただしDNS recordとSPNは同じものではありません。

## Service Ticket

clientがserviceへ接続する際、requested SPNをTGS-REQに使用します。

[[kerberos.ticket-granting-server|Ticket-Granting Server]]はSPNに対応するaccountを特定し、そのservice用のService Ticketを発行します。

## Kerberoasting

[[attack.kerberoasting|Kerberoasting]]では、SPNが登録されたservice identity向けに正規のService Ticketを要求できるKerberos機能が利用されます。

traditional Service Accountが弱いpasswordを使用している場合などには、取得したticket materialがoffline password guessingへ利用される可能性があります。

## Security上の注意

SPN管理では次が重要です。

- duplicate SPNを避ける
- service account変更時に古いSPNを残さない
- 不要なSPNを登録しない
- Service Accountを適切に保護する
- 強力なcredentialまたはmanaged service accountを利用する

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.principal|Principal]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.service-ticket|Service Ticket]]
- [[ad.service-account|Service Account]]
- [[ad.active-directory|Active Directory]]
- [[ad.forest|Active Directory Forest]]
- [[protocol.dns|DNS]]
- [[attack.kerberoasting|Kerberoasting]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[ad.computer-account|Computer Account]]

## 参考文献

- [Microsoft - Service principal names](https://learn.microsoft.com/en-us/windows/win32/ad/service-principal-names)
- [Microsoft - Name Formats for Unique SPNs](https://learn.microsoft.com/en-us/windows/win32/ad/name-formats-for-unique-spns)
- [Microsoft - How to configure SPN for Windows Server](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/how-to-configure-spn)
- [Microsoft - setspn](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/setspn)
