---
canonical_id: windows.privilege-attribute-certificate
title: Privilege Attribute Certificate
lang: ja
slug: privilege-attribute-certificate
aliases:
  - PAC
categories:
  - Windows
  - Kerberos
status: published
summary: Windows Kerberos Privilege Attribute Certificate（PAC）のauthorization data、group membership、signature、TGT/Service Ticketとの関係を解説する。
---

## 概要

> **主な出典:** [MS-PAC - Privilege Attribute Certificate Data Structure](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/166d8064-c863-41e1-9c23-edaaa5f36962)

[[windows.privilege-attribute-certificate|Privilege Attribute Certificate（PAC）]]は、Microsoft Kerberosでauthorization informationをencodeするdata structureです。

名称にCertificateとありますが、PKIで使用するX.509 certificateそのものではありません。

PACにはuserやgroupに関連するauthorization information、additional credential information、profile・policy information、security metadataなどを含めることができます。

## Kerberos Ticketとの関係

PACは[[kerberos.ticket|Kerberos Ticket]]のauthorization dataとして運ばれます。

[[ad.active-directory|Active Directory]] environmentでは[[kerberos.ticket-granting-ticket|TGT]]や[[kerberos.service-ticket|Service Ticket]]へPACが含まれることがあります。

## Authorization Information

PACはWindows resource access判断に利用できるinformationをserviceへ提供します。

代表的にはgroup membershipなど、[[windows.security-principal|Security Principal]]に関係するauthorization informationが含まれます。

[[windows.security-identifier|SID]]もWindows authorization情報を表現する重要なidentifierです。

## KDCとの関係

[[kerberos.kdc|Key Distribution Center（KDC）]]はticket issuance時にPACを生成・処理します。

Microsoft Kerberos protocol extensionではPACの作成・validation・signature behaviorがMS-KILEとMS-PACで定義されています。

## Signature

PACにはintegrityを検証するためのchecksumやsignature informationがあります。

service側やKDC側のvalidationに利用され、authorization dataの改ざん検出に関係します。

具体的なsignature fieldやvalidation requirementはprotocol version・scenarioによって異なるため、MS-PACとMS-KILEの現行仕様を参照する必要があります。

## Service Ticket

application serviceはService Ticketを処理するとき、含まれているPAC authorization informationをWindows security contextの構築に利用できます。

serviceとKDCのvalidation behaviorはprotocolとconfigurationに依存します。

## Golden Ticket / Silver Ticket

[[attack.golden-ticket|Golden Ticket]]や[[attack.silver-ticket|Silver Ticket]]では、偽造ticket内のauthorization dataとしてPACを操作することがあります。

そのためticket signature、service key、KRBTGT keyなどの保護が重要です。

## Security上の意味

PACはauthenticationそのものだけでなくauthorizationへ直結するdataです。

PACやticketのvalidationに問題があると、誤ったgroup membershipやprivilege informationがtrustされる可能性があります。

## 関連項目

- [[auth.kerberos|Kerberos]]
- [[kerberos.ticket|Kerberos Ticket]]
- [[kerberos.ticket-granting-ticket|Ticket-Granting Ticket]]
- [[kerberos.service-ticket|Service Ticket]]
- [[kerberos.kdc|Key Distribution Center]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|SID]]
- [[ad.krbtgt|KRBTGT]]
- [[attack.golden-ticket|Golden Ticket]]
- [[attack.silver-ticket|Silver Ticket]]

## 参考文献

- [MS-PAC - Privilege Attribute Certificate Data Structure](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/166d8064-c863-41e1-9c23-edaaa5f36962)
- [MS-KILE - Kerberos Protocol Extensions](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/)
- [MS-KILE - PAC Generation](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/c25d48df-67f0-4c5f-9e46-27a7d5710909)
- [MS-KILE - Processing Authorization Data](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/4ad7ed1f-0bfa-4b5f-bda3-fedbc549a6c0)
- [MS-PAC - Signatures](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/4174c356-68c7-4c60-91e1-50a02d1383be)
