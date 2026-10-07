---
canonical_id: ad.trust
title: Active Directory Trust
lang: ja
slug: active-directory-trust
aliases:
  - Domain Trust
  - Forest Trust
categories:
  - Active Directory
status: published
summary: Active Directory Trustの方向、transitivity、Domain間・Forest間authentication relationshipを解説する。
---

## 概要

> **主な出典:** [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)

Active Directory Trustは、異なる[[ad.domain|Domain]]や[[ad.forest|Forest]]間でauthentication relationshipを成立させる仕組みです。

Trustによって、一方のDomainで認証されたidentityを別のDomain側のresource access判断に利用できるようになります。

## Same-Forest Trust

同一Forest内のDomainはautomatic two-way transitive trustによって接続されます。

そのため、同一Forestに存在する複数Domainの間にはauthentication pathが形成されます。

MicrosoftはForestそのものをActive Directoryのsecurity boundaryとして定義しています。同一Forest内のautomatic two-way transitive trustは、そのsecurity boundary内部のauthentication relationshipです。

## Forest Trust

異なるForest間にはForest Trustを構成できます。

Forest Trustは複数Forest間のauthentication relationshipを構成するために使用されます。

## External Trust

External Trustは、Forest-wide trust relationshipを構成せずに特定Domainとのtrustを構成する場合などに利用されます。

## Direction

Trustにはdirectionがあります。

trusting sideとtrusted sideのどちらのidentityをどちら側のresource accessで受け入れるかによってauthentication directionが決まります。

two-way trustは両方向のtrust relationshipを構成します。

## Transitivity

transitive trustではtrust relationshipを通じてauthentication pathが拡張されます。

同一ForestのDomain間trustはtransitiveです。

一方、すべてのtrust typeが同じtransitivityを持つわけではありません。

## Kerberosとの関係

[[auth.kerberos|Kerberos]]はActive DirectoryのDomain間authenticationでも重要です。

DomainやForestのtrust relationshipはcross-domain authentication pathと関係します。

## Security上の論点

Trustは同一Forest内またはForest間にauthentication pathを形成します。MicrosoftがForestをsecurity boundaryとして定義しているため、cross-Forest trustではそのboundaryを越えてauthentication relationshipを拡張する設定を慎重に管理する必要があります。設定を誤ると意図しないresource access pathを作る可能性があります。

攻撃者は[[attack.domain-trust-discovery|Domain Trust Discovery]]によってtrust relationshipを列挙し、lateral movementやprivilege expansionの候補を調査することがあります。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.forest|Forest]]
- [[ad.domain-controller|Domain Controller]]
- [[auth.kerberos|Kerberos]]
- [[attack.domain-trust-discovery|Domain Trust Discovery]]

## 参考文献

- [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)
- [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)
- [Microsoft Open Specifications - MS-ADTS trustAttributes](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/e9a2d23c-c31e-4a6f-88a0-6646fdb51a3c)
- [Microsoft Open Specifications - MS-ADTS trustDirection](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/5026a939-44ba-47b2-99cf-386a9e674b04)
- [MITRE ATT&CK T1482 - Domain Trust Discovery](https://attack.mitre.org/techniques/T1482/)
