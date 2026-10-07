---
canonical_id: protocol.ldap
title: LDAP
lang: ja
slug: ldap
aliases:
  - Lightweight Directory Access Protocol
categories:
  - Network / Protocol
  - Active Directory
status: published
summary: LDAPのdirectory model、Bind/Search/Modifyなどのoperation、DN、Active Directoryでの利用、signing・TLS・channel bindingを解説する。
---

## 概要

> **主な出典:** [RFC 4511 - Lightweight Directory Access Protocol (LDAP): The Protocol](https://www.rfc-editor.org/rfc/rfc4511.html)

[[protocol.ldap|Lightweight Directory Access Protocol（LDAP）]]は、directory serviceへaccessするためのapplication protocolです。

RFC 4511はLDAP protocol element、そのsemantics、encodingを規定しています。

LDAPは特定のdirectory製品専用ではなく、X.500 directory modelを基礎とする標準protocolです。

## Directory Model

LDAP directoryはentryの集合として扱われます。

各entryにはDistinguished Name（DN）があり、attributeとattribute valueを保持します。

entryの構造や利用可能なattributeはdirectory schemaによって制約されます。

[[ad.active-directory|Active Directory]]では[[ad.schema|Active Directory Schema]]がobject classやattribute definitionを管理します。

## Distinguished Name

DNはdirectory tree内でentryを識別する名前です。

DNはRelative Distinguished Name（RDN）を階層的に組み合わせて構成されます。

AD DSではuser、computer、OUなどのdirectory objectをLDAP DNで参照できます。

## 主なOperation

RFC 4511では代表的に次のoperationが定義されています。

- Bind
- Unbind
- Search
- Modify
- Add
- Delete
- Modify DN
- Compare
- Abandon
- Extended Operation

Searchではbase object、scope、filter、requested attributeなどを指定してdirectory entryを取得します。

## Bind

Bind operationはLDAP sessionへauthentication informationを設定するために使用されます。

LDAPはsimple authenticationやSASLを利用できます。

Bindとdirectory authorizationは別概念であり、authentication後にどのobjectやattributeへaccessできるかはserver側policyによって決まります。

## Active Directory

> **主な出典:** [Microsoft - Active Directory Domain Services](https://learn.microsoft.com/en-us/windows/win32/ad/active-directory-domain-services)

[[ad.domain-controller|Domain Controller]]はAD DS directory dataへLDAP interfaceを提供します。

LDAPによってuser、computer、group、OU、configuration objectなどを検索・参照・変更できます。

AD DS内部のdirectory dataは[[ad.directory-partition|Directory Partition]]へ分割され、replication scopeもpartition単位で管理されます。

[[ad.global-catalog|Global Catalog]]もdirectory searchに利用されますが、保持するattribute setやreplica scopeは通常のDomain partition replicaとは異なります。

## LDAP Signing

> **主な出典:** [Microsoft - LDAP signing for Active Directory Domain Services](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/ldap-signing)

LDAP signingはAD DSのLDAP communicationにcryptographic integrity protectionを提供します。

unsigned LDAP trafficを許容すると、network上の改ざんやman-in-the-middle attackに対するriskが高まります。

MicrosoftはLDAP signing requirementを構成し、対応clientを確認するためのevent monitoring方法を提供しています。

## TLSとChannel Binding

LDAP sessionではTLSを利用してconfidentialityとserver authenticationを提供できます。

RFC 4511にはStartTLS extended operationが定義されています。

AD DSではLDAP channel bindingも利用でき、TLS channelとapplication-layer authenticationを結び付けます。

## Security上の注意

重要な論点は次です。

- unsigned LDAPを不要に許可しない
- credentialを平文で保護されないchannelへ送信しない
- TLS certificate validationを正しく行う
- LDAP signingとchannel bindingのcompatibilityを監査する
- directory ACLをleast privilegeで設計する

## 関連項目

- [[ad.active-directory|Active Directory]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.schema|Active Directory Schema]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.global-catalog|Global Catalog]]
- [[ad.organizational-unit|Organizational Unit]]
- [[windows.security-principal|Security Principal]]
- [[ad.domain|Active Directory Domain]]
- [[ldap.distinguished-name|Distinguished Name]]
- [[windows.access-control-list|Access Control List]]

## 参考文献

- [RFC 4510 - LDAP: Technical Specification Road Map](https://www.rfc-editor.org/rfc/rfc4510.html)
- [RFC 4511 - LDAP: The Protocol](https://www.rfc-editor.org/rfc/rfc4511.html)
- [RFC 4512 - LDAP: Directory Information Models](https://www.rfc-editor.org/rfc/rfc4512.html)
- [RFC 4513 - LDAP: Authentication Methods and Security Mechanisms](https://www.rfc-editor.org/rfc/rfc4513.html)
- [Microsoft - LDAP signing for Active Directory Domain Services](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/ldap-signing)
- [Microsoft - LDAP channel binding overview for Active Directory Domain Services](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/ldap-channel-binding)
