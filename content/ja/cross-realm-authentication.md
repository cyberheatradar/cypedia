---
canonical_id: kerberos.cross-realm-authentication
title: Cross-Realm Authentication
lang: ja
slug: cross-realm-authentication
aliases:
  - cross-realm authentication
categories:
  - Kerberos
status: published
summary: Kerberos Cross-Realm Authenticationのinter-realm trust、referral TGT、authentication path、Active Directory trustを解説する。
---

## 概要

> **主な出典:** [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)

[[kerberos.cross-realm-authentication|Cross-Realm Authentication]]は、ある[[kerberos.realm|Kerberos Realm]]のclientが別Realmに属するserviceへauthenticationする仕組みです。

Realm間のtrust relationshipとinter-realm keyを利用してauthentication pathを構成します。

## Inter-Realm Principal

Realm間trustではticket-granting serviceを表すinter-realm [[kerberos.principal|Principal]]と、Realm間で共有されるkey materialが利用されます。

これにより[[kerberos.kdc|KDC]]は別Realm向けの[[kerberos.ticket-granting-ticket|TGT]]を発行できます。

## Authentication Path

clientのhome Realmとtarget Realmが直接trustしていない場合、複数Realmを経由したauthentication pathが利用される場合があります。

clientはpath上のKDCから順にreferralまたはcross-realm TGTを取得し、最終的にtarget service用の[[kerberos.service-ticket|Service Ticket]]を取得します。

## Referrals

Kerberos implementationはtarget serviceのRealmを判断し、適切なKDCへclientをreferralできます。

この仕組みによってclientが最初からすべてのintermediate Realmを知る必要を減らせます。

## Active Directory

> **主な出典:** [MS-KILE - Cross-Domain Trust and Referrals](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/bac4dc69-352d-416c-a9f4-730b81ababb3)

[[ad.active-directory|Active Directory]]では別[[ad.domain|Domain]]へのKerberos authenticationに[[ad.trust|Trust]]が利用されます。

Windows KDCはTrusted Domain Objectなどからcross-domain trust informationを取得し、必要に応じてreferral TGTを発行します。

## Forest

同じ[[ad.forest|Forest]]内のDomainにはautomatic two-way transitive trustがあります。

Forest間に適切なForest Trustが存在する場合も、Kerberos referral pathが成立することがあります。

## Security上の論点

Cross-Realm Authenticationは、Realm間に設定されたtrust relationshipとinter-realm keyを利用してauthenticationを別Realmへ拡張します。

そのため次の保護が重要です。

- inter-realm key
- trust configuration
- trust direction
- SID filteringなどWindows trust security control
- target service identity

攻撃者にtrust pathを利用されると、侵害範囲が単一RealmやDomainを越える可能性があります。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.realm|Realm]]
- [[kerberos.principal|Principal]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[ad.domain|Active Directory Domain]]
- [[ad.forest|Active Directory Forest]]
- [[ad.trust|Active Directory Trust]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[windows.security-identifier|SID]]

## 参考文献

- [RFC 4120 - The Kerberos Network Authentication Service (V5)](https://www.rfc-editor.org/rfc/rfc4120.html)
- [MS-KILE - Cross-Domain Trust and Referrals](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/bac4dc69-352d-416c-a9f4-730b81ababb3)
- [MS-ADTS - Kerberos Usages of trustAuthInfo Attributes](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/cd20fbd1-eabe-4da2-bba3-31ab3036d019)
- [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)
