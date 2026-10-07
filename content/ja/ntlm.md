---
canonical_id: auth.ntlm
title: NTLM
lang: ja
slug: ntlm
aliases: []
categories:
  - Authentication
  - Windows
status: published
summary: NTLM authenticationのchallenge-response、local/domain verification、Kerberosとの位置づけ、NTLMv1削除とNTLMv2非推奨化を解説する。
---

## 概要

> **主な出典:** [Microsoft - NTLM overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/ntlm-overview)

[[auth.ntlm|NTLM]]はWindowsで使用されてきたchallenge-response型authentication protocol familyです。

MicrosoftのNTLM overviewではLAN Manager version 1/2、NTLM version 1/2をNTLM authentication familyとして説明しています。

現在の[[ad.active-directory|Active Directory]]環境では[[auth.kerberos|Kerberos]]がpreferred authentication methodです。

## Challenge-Response

NTLMではclientがpasswordそのものをnetworkへ送信する代わりに、passwordに由来するsecretとserver challengeを利用してresponseを生成します。

server側またはDomain authentication serviceはresponseを検証し、clientがaccount secretを知っていることを確認します。

## Local Account

local accountをauthenticationする場合、resource serverはlocal account databaseを利用してidentityを検証できます。

このためNTLMはDomain環境以外のWindows authenticationでも利用されます。

## Domain Account

Domain accountの場合、resource serverはaccount Domainのauthentication serviceへ検証を依頼できます。

[[ad.domain-controller|Domain Controller]]がDomain authenticationに関与します。

## Kerberosとの違い

Kerberosは[[kerberos.kdc|Key Distribution Center]]が発行するticketを中心としたauthentication protocolです。

NTLMはchallenge-responseを中心とし、Kerberos Ticketを使用しません。

AD DS environmentではKerberosがpreferredですが、applicationやprotocol条件によってNTLMが利用される場合があります。

## Negotiate

WindowsではNegotiate security packageを利用すると、利用可能なauthentication mechanismを選択できます。

Kerberosが利用可能な条件ではKerberosを選択し、条件によってNTLMへfallbackする場合があります。

## NTLMv1

> **主な出典:** [Microsoft - What's new in Windows 11 version 24H2](https://learn.microsoft.com/en-us/windows/whats-new/whats-new-windows-11-version-24h2)

NTLMv1はWindows 11 version 24H2およびWindows Server 2025から削除されています。

したがって新しいWindows設計でNTLMv1 compatibilityを前提にするべきではありません。

## NTLMv2の将来

> **主な出典:** [Microsoft - Features removed or no longer developed in Windows Server](https://learn.microsoft.com/en-us/windows-server/get-started/removed-deprecated-features-windows-server)

MicrosoftはNTLMv2をactive development対象外かつdeprecatedとし、将来のWindows Server releaseで削除する方針を示しています。

legacy applicationのNTLM dependencyは将来のcompatibility riskとしてinventoryし、Kerberosやmodern authenticationへ移行する必要があります。

## Security上の論点

NTLMでは次のsecurity issueが重要です。

- credential hashの保護
- NTLM relay
- credential forwarding
- legacy protocol dependency
- weakまたはobsolete versionの排除
- NTLM usageのaudit

MicrosoftはNTLM利用状況を把握し、選択的にrestrictionを導入するためのpolicyやloggingを提供しています。

## 現在の位置づけ

NTLMは完全に消滅したprotocolではなく、現行Windowsでも一部scenarioで利用されます。

一方で方向性は明確に縮小です。

新規system設計ではNTLM dependencyを増やすのではなく、Kerberosやよりmodernなauthentication mechanismを優先すべきです。

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Active Directory Domain]]
- [[ad.domain-controller|Domain Controller]]
- [[auth.kerberos|Kerberos]]
- [[kerberos.kdc|Key Distribution Center]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|SID]]
- [[kerberos.ticket|Kerberos Ticket]]

## 参考文献

- [Microsoft - NTLM overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/ntlm-overview)
- [MS-NLMP - NT LAN Manager Authentication Protocol](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-nlmp/)
- [Microsoft - What's new in Windows 11 version 24H2](https://learn.microsoft.com/en-us/windows/whats-new/whats-new-windows-11-version-24h2)
- [Microsoft - Features removed or no longer developed in Windows Server](https://learn.microsoft.com/en-us/windows-server/get-started/removed-deprecated-features-windows-server)
