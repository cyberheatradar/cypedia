---
canonical_id: ad.krbtgt
title: KRBTGT
lang: ja
slug: krbtgt
aliases:
  - KRBTGT Account
  - KRBTGT account
categories:
  - Active Directory
  - Kerberos
status: published
summary: Active Directory KRBTGT accountのKDC/TGT key、Domain単位の役割、RODC、Golden Ticket、reset時の注意を解説する。
---

## 概要

> **主な出典:** [Microsoft - Active Directory Accounts](https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/active-directory-accounts)

[[ad.krbtgt|KRBTGT]] accountは、[[ad.active-directory|Active Directory]] [[ad.domain|Domain]]で[[kerberos.kdc|Key Distribution Center（KDC）]] serviceが使用するdefault accountです。

新しいDomainの作成時に自動的に作成され、通常のuser accountとしてsign-inへ使用するaccountではありません。

Microsoftによれば、accountは削除できず、名前を変更できず、有効化もできません。

## TGTとの関係

[[kerberos.ticket-granting-ticket|Ticket-Granting Ticket（TGT）]]はKRBTGT accountに関連するsymmetric key materialによってcryptographically protectedされます。

そのためDomain内のKDCはTGTを発行・検証できます。

KRBTGT credentialはDomain-wide Kerberos trustに極めて重要です。

## KDC

[[ad.domain-controller|Domain Controller]]はKerberos KDCとして動作します。

Domain Controller上のKDCはKRBTGTに関連するkeyを利用してticket-granting credentialを処理します。

## Password History

MicrosoftのForest Recovery guidanceでは、KRBTGT accountのpassword history valueは2で、直近2つのpasswordがhistoryに含まれると説明されています。

このpassword historyの仕様は、compromise recoveryでKRBTGT passwordを2回resetしてold passwordをhistoryから排除する手順と直接関係します。

## Forest Recovery

> **主な出典:** [Microsoft - AD Forest Recovery - Reset the krbtgt password](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-reset-the-krbtgt-password)

MicrosoftのForest Recovery guidanceではKRBTGT passwordを2回resetし、reset間にはticket lifetimeを考慮したwait periodを置く手順が示されています。

これはold key materialをpassword historyから排除するためです。

通常運用中に無計画に実施するoperationではなく、authenticationへの影響を考慮して計画する必要があります。

## RODC

Read-Only Domain Controller（RODC）はwritable Domain Controllerとは異なるKRBTGT accountを使用します。

RODC用accountは `krbtgt_<number>` のような形で存在し、RODC固有のKerberos behaviorを支えます。

## Golden Ticket

[[attack.golden-ticket|Golden Ticket]]は、KRBTGT key materialを取得した攻撃者が偽造TGTを生成するattack techniqueです。

KRBTGT compromiseは単一service account compromiseより広範囲なDomain-wide impactを持ち得ます。

## Service Ticketとの違い

KRBTGT keyはTGTに関係します。

個別serviceの[[kerberos.service-ticket|Service Ticket]]は、そのtarget serviceに対応するaccount key materialによって保護されます。

そのため[[attack.silver-ticket|Silver Ticket]]はGolden Ticketとは異なるkey materialを利用します。

## Security上の重要性

KRBTGT accountのcredential materialはDomainで最も高い保護が必要なauthentication secretの1つです。

Domain Controller compromiseやcredential database compromiseではKRBTGT exposureを考慮する必要があります。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[attack.golden-ticket|Golden Ticket]]
- [[attack.silver-ticket|Silver Ticket]]
- [[ad.ntds-dit|NTDS.dit]]
- [[ad.forest|Active Directory Forest]]
- [[ad.service-account|Service Account]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[ad.read-only-domain-controller|Read-Only Domain Controller]]
- [[ad.user-account|User Account]]

## 参考文献

- [Microsoft - Active Directory Accounts](https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/active-directory-accounts)
- [Microsoft - AD Forest Recovery - Reset the krbtgt password](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-reset-the-krbtgt-password)
- [MITRE ATT&CK T1558.001 - Golden Ticket](https://attack.mitre.org/techniques/T1558/001/)
