---
canonical_id: attack.domain-trust-discovery
title: Domain Trust Discovery
lang: ja
slug: domain-trust-discovery
aliases: []
categories:
  - Active Directory
  - Discovery
status: published
summary: Domain Trust DiscoveryによるAD Domain/Forest trust relationshipの列挙、lateral movement path評価、検知と防御を解説する。
---

## 概要

> **主な出典:** [MITRE ATT&CK T1482 - Domain Trust Discovery](https://attack.mitre.org/techniques/T1482/)

[[attack.domain-trust-discovery|Domain Trust Discovery]]は、[[ad.active-directory|Active Directory]]環境の[[ad.trust|Trust]] relationshipを調査し、別[[ad.domain|Domain]]や[[ad.forest|Forest]]へ到達可能なauthentication・authorization pathを把握するDiscovery techniqueです。

## Trust

AD Trustは、あるDomainでauthenticationされたidentityを別Domain側resource access判断へ利用できるrelationshipを提供します。

trust direction、transitivity、trust typeによって利用可能なpathが異なります。

## Discovery対象

攻撃者は一般に次のようなinformationを把握しようとします。

- trusted / trusting Domain
- Forest間relationship
- trust direction
- transitivity
- target Domain名
- potential lateral movement path

この情報自体がcredentialではありませんが、次に狙うidentityやresourceを決めるために利用されます。

## LDAPとAPI

MITRE ATT&CKはDomain trust relationshipを[[protocol.ldap|LDAP]]、Windows API、.NETなどから取得できることを示しています。

これらは正規administrationやapplicationでも利用されるため、単純なquery existenceだけでmalicious activityと判断することはできません。

## Kerberosとの関係

AD Trustはcross-domain [[auth.kerberos|Kerberos]] authenticationにも重要です。

[[kerberos.cross-realm-authentication|Cross-Realm Authentication]]やreferral TGTによってtrusted Domainへのauthentication pathが構成されます。

## Attack Path

Trust discoveryによって得た情報は、credential theft後のlateral movement、Kerberos ticket abuse、SIDHistory関連のabuseなどを評価する材料になり得ます。

ただしTrustが存在するだけで自動的にprivilege escalationが成立するわけではありません。

resource permissionとcredential/identity privilegeも必要です。

## 検知

重要なのはnormal administration activityとの比較です。

- unusual processによるtrust enumeration
- non-admin workstationからの大量trust query
- LDAP query pattern
- trust discovery後のcross-domain authentication
- normally unused trust pathへのaccess

## 緩和

Trust Discovery自体を完全に禁止するのではなく、trust topologyを単純化し、不要なTrustを削除し、Trust経由で与えられるresource permissionをleast privilegeにすることが重要です。

privileged administration workstationとmonitoringによってtrust enumerationのcontextも把握しやすくなります。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.forest|Active Directory Forest]]
- [[ad.trust|Active Directory Trust]]
- [[protocol.ldap|LDAP]]
- [[auth.kerberos|Kerberos]]
- [[kerberos.cross-realm-authentication|Cross-Realm Authentication]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[windows.security-identifier|SID]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[ad.sid-history|SIDHistory]]

## 参考文献

- [MITRE ATT&CK T1482 - Domain Trust Discovery](https://attack.mitre.org/techniques/T1482/)
- [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)
- [Microsoft - Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)
- [MS-KILE - Cross-Domain Trust and Referrals](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/bac4dc69-352d-416c-a9f4-730b81ababb3)
