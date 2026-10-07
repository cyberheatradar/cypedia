---
canonical_id: attack.golden-ticket
title: Golden Ticket
lang: ja
slug: golden-ticket
aliases: []
categories:
  - Active Directory
  - Kerberos
status: published
summary: Golden TicketによるKRBTGT key materialを利用したTGT forgery、PAC、影響、検知、KRBTGT recoveryとの関係を解説する。
---

## 概要

> **主な出典:** [MITRE ATT&CK T1558.001 - Golden Ticket](https://attack.mitre.org/techniques/T1558/001/)

[[attack.golden-ticket|Golden Ticket]]は、[[ad.krbtgt|KRBTGT]] accountのkey materialを侵害した攻撃者が、偽造[[kerberos.ticket-granting-ticket|Ticket-Granting Ticket（TGT）]]を作成するKerberos ticket forgery techniqueです。

KRBTGTは[[ad.domain|Active Directory Domain]]のKDC trustに関係するため、Golden Ticketは単一serviceの侵害より広いimpactを持ち得ます。

## KRBTGT

[[ad.domain-controller|Domain Controller]]上の[[kerberos.kdc|Key Distribution Center（KDC）]]はKRBTGT key materialを利用してTGTを処理します。

このkey materialが侵害されると、正規KDCから発行されたものではないTGTをcryptographically成立させられる可能性があります。

## PAC

Windows Kerberos Ticketでは[[windows.privilege-attribute-certificate|Privilege Attribute Certificate（PAC）]]がauthorization informationを運びます。

forged TGTではPAC内のauthorization dataも攻撃対象になり得ます。

[[windows.security-identifier|SID]]やgroup-related informationはWindows authorization判断に重要です。

## Impact

偽造TGTを利用すると、攻撃者はそのTGTを[[kerberos.ticket-granting-server|Ticket-Granting Server]]へ提示し、複数service向けの[[kerberos.service-ticket|Service Ticket]]を取得できる可能性があります。

そのためGolden Ticketはpersistence、privilege escalation、lateral movementと結び付くことがあります。

## KRBTGT Keyの取得経路

Golden Ticket成立には事前にKRBTGT key materialの侵害が必要です。

そのようなcredential exposureは[[attack.dcsync|DCSync]]や[[attack.ntds-credential-dumping|NTDS Credential Dumping]]など、Domain-level credential compromiseと関連する場合があります。

## 検知

MITRE ATT&CKは次のようなanomaly correlationをdetection strategyとして挙げています。

- unusual ticket lifetime
- environment baselineと異なるencryption type
- anomalous privileged activity
- preceding TGT requestと整合しないService Ticket activity

単一eventだけでGolden Ticketを確定することは難しく、Kerberos activityとaccount behaviorを組み合わせる必要があります。

## Recovery

> **主な出典:** [Microsoft - AD Forest Recovery - Reset the krbtgt password](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-reset-the-krbtgt-password)

KRBTGT compromiseへのrecoveryでは、MicrosoftのForest Recovery guidanceはKRBTGT passwordを2回resetする手順を示しています。

既定構成ではreset間に10時間待つ必要があり、Kerberos ticket lifetimeを変更している場合は、そのconfigured maximum lifetimeより長い待機時間が必要です。

MicrosoftはKRBTGT password history valueを2と説明しており、2回のresetによってold passwordをhistoryから排除します。

## Silver Ticketとの違い

[[attack.silver-ticket|Silver Ticket]]はtarget service account keyを利用してService Ticketを偽造します。

Golden TicketはKRBTGT key materialを利用してTGTを偽造するため、通常はより広いDomain-wide impactを持ちます。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.ticket-granting-server|Ticket-Granting Server]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.kdc|Key Distribution Center]]
- [[ad.krbtgt|KRBTGT]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[windows.privilege-attribute-certificate|PAC]]
- [[windows.security-identifier|SID]]
- [[attack.silver-ticket|Silver Ticket]]
- [[attack.dcsync|DCSync]]
- [[attack.ntds-credential-dumping|NTDS Credential Dumping]]
- [[ad.active-directory|Active Directory]]
- [[ad.forest|Active Directory Forest]]
- [[ad.service-account|Service Account]]

## 参考文献

- [MITRE ATT&CK T1558.001 - Golden Ticket](https://attack.mitre.org/techniques/T1558/001/)
- [Microsoft - Active Directory Forest Recovery - Reset the krbtgt password](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-reset-the-krbtgt-password)
- [MS-PAC - Privilege Attribute Certificate Data Structure](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/)
- [MS-PAC - KDC Signature](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/3122bf00-ea87-4c3f-92a0-91c0a99f5eec)
