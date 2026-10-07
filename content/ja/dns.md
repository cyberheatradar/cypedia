---
canonical_id: protocol.dns
title: DNS
lang: ja
slug: dns
aliases:
  - Domain Name System
categories:
  - Network / Protocol
status: published
summary: DNSの名前空間、zone、resource record、resolverとauthoritative server、Active Directoryとの統合を解説する。
---

## 概要

> **主な出典:** [RFC 1034 - Domain Names: Concepts and Facilities](https://www.rfc-editor.org/rfc/rfc1034.html) / [RFC 1035 - Domain Names: Implementation and Specification](https://www.rfc-editor.org/rfc/rfc1035.html)

[[protocol.dns|Domain Name System（DNS）]]は、hierarchicalなdomain name namespaceと、そのnameに関連するresource informationを分散管理・検索する仕組みです。

DNSはhostnameからaddressへの変換だけでなく、mail routing、service discovery、authority informationなど多様なresource recordを扱います。

## Namespace

DNS namespaceはrootを頂点とするhierarchical treeです。

nameはlabelを階層的に連結して構成され、Fully Qualified Domain Name（FQDN）はDNS tree内の位置を表します。

## Zone

DNS namespaceはadministrative authorityごとにzoneへ分割できます。

zoneはauthoritative serverが管理するnamespaceの一部です。

zone boundaryとdomain boundaryは常に同じ意味ではありません。

## Resource Record

DNS informationはResource Record（RR）として保持されます。

代表例には次があります。

- A
- AAAA
- NS
- SOA
- CNAME
- MX
- PTR
- SRV

各record typeは異なる種類のresource informationを表します。

## ResolverとAuthoritative Server

resolverはclient applicationに代わってDNS queryを行います。

authoritative DNS serverは、自身がauthorityを持つzoneについてauthoritative answerを提供します。

recursive resolutionでは複数DNS serverへの問い合わせが行われる場合があります。

## Active Directoryとの関係

> **主な出典:** [Microsoft - DNS and AD DS](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/dns-and-ad-ds)

[[ad.active-directory|Active Directory Domain Services]]はDNSを重要なinfrastructure dependencyとして利用します。

clientはDNS informationを使用して[[ad.domain-controller|Domain Controller]]をlocateし、Domain Controller間のdirectory service communicationにもDNS name resolutionが必要です。

[[ad.domain|Active Directory Domain]]のnamespaceもDNS namingと密接に関係します。

## Domain Controller Location

AD DSはDNS locator recordを使用してDomain ControllerやKerberos、LDAPなどのserviceを発見できるようにします。

これによりclientは自身のDomainやSiteに適したDomain Controllerを探索できます。

## Active Directory-Integrated DNS

> **主な出典:** [Microsoft - Active Directory-Integrated DNS Zones](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/active-directory-integrated-dns-zones)

DNS zoneをAD DSへintegrateすると、zone dataをdirectory内へ保存できます。

その場合、通常のzone transferだけに依存せず、[[ad.replication|Active Directory Replication]]によってDNS dataをreplicateできます。

AD-integrated DNSではsecure dynamic updateも利用できます。

## Application Directory Partition

MicrosoftはAD-integrated DNS zone dataをDNS用[[ad.directory-partition|Application Directory Partition]]へ保存します。

代表的にForest-wideの `ForestDnsZones` とDomain-wideの `DomainDnsZones` が利用されます。

## Security上の注意

AD DS environmentではDNS integrityとavailabilityがauthenticationやservice discoveryに直接影響します。

重要な論点は次です。

- secure dynamic update
- zone dataへのpermission
- unauthorized record modification
- stale record管理
- DNS server availability
- client DNS configuration

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.forest|Active Directory Forest]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.site|Active Directory Site]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.replication|Active Directory Replication]]
- [[protocol.ldap|LDAP]]
- [[auth.kerberos|Kerberos]]

## 参考文献

- [RFC 1034 - Domain Names: Concepts and Facilities](https://www.rfc-editor.org/rfc/rfc1034.html)
- [RFC 1035 - Domain Names: Implementation and Specification](https://www.rfc-editor.org/rfc/rfc1035.html)
- [Microsoft - DNS and AD DS](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/dns-and-ad-ds)
- [Microsoft - Active Directory-Integrated DNS Zones](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/active-directory-integrated-dns-zones)
