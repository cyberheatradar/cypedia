---
canonical_id: ad.sid-history
title: SIDHistory
lang: ja
slug: sidhistory
aliases:
  - SID History
categories:
  - Active Directory
  - Authorization
status: published
summary: Active DirectoryのsIDHistory attributeによる過去SID保持、domain migration、access continuity、security riskを解説する。
---

## 概要

[[ad.sid-history|SIDHistory]]は、[[ad.active-directory|Active Directory]]の[[windows.security-principal|Security Principal]] objectに以前使用されていた[[windows.security-identifier|Security Identifier（SID）]]を保持するためのattributeです。

LDAP display nameは `sIDHistory` で、multi-valued attributeです。

## Domain Migration

objectがある[[ad.domain|Active Directory Domain]]から別のDomainへ移動すると、新しいSIDがcurrent objectSIDとして割り当てられ、以前のSIDをsIDHistoryへ保持できます。

これによりmigration直後でも、旧SIDを参照しているresource permissionとの互換性を維持できます。

## Authorizationとの関係

Windows access controlではresourceの[[windows.access-control-list|Access Control List（ACL）]]などにSIDが記録されます。

migration後の[[windows.security-principal|Security Principal]]が以前のSIDをSIDHistoryとして持つことで、旧identityを参照するauthorizationとの互換性を維持できる場合があります。

[[ad.user-account|User Account]]などのmigrationで特に重要なmechanismです。

## Active Directory Forestとの関係

SIDHistoryはDomain間や[[ad.forest|Active Directory Forest]]間のmigration scenarioと関係します。

MicrosoftのDsAddSidHistory APIは、あるDomainの[[windows.security-principal|Security Principal]]のSIDを別Forestの[[windows.security-principal|Security Principal]]のsIDHistoryへ追加する機能を提供します。

## セキュリティ上の論点

SIDHistoryはauthorizationへ影響するため、security-sensitiveなattributeです。

MicrosoftはDsAddSidHistoryについて、source identityがaccessできるresourceへのaccessをdestination identityへ事実上付与し得るsecurity-sensitive operationとして説明しています。

MITRE ATT&CKでは不正にSIDHistoryへSIDを追加してprivilege escalationやaccess-control bypassを行う手法をSID-History Injection（T1134.005）として整理しています。

## TrustとSID Filtering

Windowsのtrustでは、追加SIDやSIDHistoryの受け入れをtrust typeに応じた設定で制御できます。

Microsoftのnetdom trustでは、external trustの /Quarantine:Yes はdirectly trusted Domain由来のSIDだけを受け入れる設定です。一方、outbound forest trustの /EnableSIDHistory はtrusted Forestのmigrated userがSIDHistoryをresource accessに利用できるかを制御します。

SIDHistoryを利用するmigrationでは、trust typeとSID filtering / SIDHistory設定を明示的に確認する必要があります。

## DetectionとReview

unexpectedなsIDHistory modification、privileged SIDの追加、migration window外での変更などは監視対象になります。

MITRE ATT&CKはunauthorized SID-History modificationと、その後のprivileged accessを関連付ける検知戦略を示しています。

## Domain Trust Discoveryとの関係

[[attack.domain-trust-discovery|Domain Trust Discovery]]で得られるtrust relationshipの情報は、SIDHistoryやcross-domain authorization pathを評価する文脈でも利用され得ます。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.forest|Active Directory Forest]]
- [[windows.security-identifier|Security Identifier]]
- [[windows.security-principal|Security Principal]]
- [[windows.access-control-list|Access Control List]]
- [[ad.user-account|User Account]]
- [[ad.security-group|Security Group]]
- [[attack.domain-trust-discovery|Domain Trust Discovery]]
- [[ad.trust|Active Directory Trust]]
- [[protocol.ldap|LDAP]]

## 参考文献

- [Microsoft Open Specifications - Attribute sIDHistory](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-ada3/1c47c6a0-e614-49e5-bef3-f42f71f5eeb2)
- [Microsoft - SID-History attribute](https://learn.microsoft.com/en-us/windows/win32/adschema/a-sidhistory)
- [Microsoft - DsAddSidHistoryW](https://learn.microsoft.com/en-us/windows/win32/api/ntdsapi/nf-ntdsapi-dsaddsidhistoryw)
- [MITRE ATT&CK - T1134.005 SID-History Injection](https://attack.mitre.org/techniques/T1134/005/)
- [Microsoft - netdom trust](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netdom-trust)
