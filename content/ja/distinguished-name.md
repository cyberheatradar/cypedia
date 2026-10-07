---
canonical_id: ldap.distinguished-name
title: Distinguished Name
lang: ja
slug: distinguished-name
aliases:
  - DN
categories:
  - Network / Protocol
  - Active Directory
status: published
summary: LDAPおよびActive Directoryでdirectory entryを識別するDistinguished Name（DN）の構造、RDN、表記、escapingを解説する。
---

## 概要

[[ldap.distinguished-name|Distinguished Name（DN）]]は、X.500系directoryでentryを一意に参照するための名前です。

[[protocol.ldap|LDAP]]ではRFC 4514がDNのstring representationを規定しています。

[[ad.active-directory|Active Directory]]でもobjectのdirectory上の現在位置を表すidentityとしてDNが使用されます。

## 構造

DNはRelative Distinguished Name（RDN）のsequenceとして構成されます。

各RDNはattribute typeとattribute valueの組み合わせから成り、複数のRDNを連結することでdirectory tree上のobject位置を表します。

例として、あるobjectのDNは `CN=Alice,OU=Users,DC=example,DC=com` のように表現できます。

## Relative Distinguished Name

RDNはobjectをそのparent container内で識別する相対名です。

[[ad.organizational-unit|Organizational Unit（OU）]]やCNなどがRDNの構成要素として利用されます。

MicrosoftはActive Directory objectのDNについて、object自身のRDNからancestorをrootまで連結して形成すると説明しています。

## Active Directoryでの性質

Active DirectoryではDNはobjectの現在名であり、[[ad.forest|Active Directory Forest]]内でuniqueです。

objectを別containerへmoveした場合やrenameした場合、DNは変化します。

したがってDNはdirectory tree上のlocationを表す名前として重要ですが、renameやmoveを跨いだ恒久的identifierとは性質が異なります。

## String Representation

RFC 4514はDNをLDAPで交換するためのUTF-8 string representationを定義しています。

RDNはcommaで区切られ、1つのRDNに複数のattribute value assertionがある場合はplus signで表現されます。

## Escaping

DNのattribute valueにcomma、plus sign、double quote、backslashなどのspecial characterが含まれる場合、RFC 4514の規則に従ってescapingが必要です。

leading spaceやleading number sign、trailing spaceなども規則上の扱いに注意が必要です。

## セキュリティ上の論点

DNを文字列として組み立てるapplicationではescapingを正しく行う必要があります。

また、DNはrenameやmoveで変化するため、長期間のstable object identityが必要な設計ではDNの性質を理解して利用する必要があります。

## 関連項目

- [[protocol.ldap|LDAP]]
- [[ad.active-directory|Active Directory]]
- [[ad.organizational-unit|Organizational Unit]]
- [[ad.forest|Active Directory Forest]]
- [[ad.domain|Active Directory Domain]]

## 参考文献

- [RFC 4514 - Lightweight Directory Access Protocol (LDAP): String Representation of Distinguished Names](https://www.rfc-editor.org/rfc/rfc4514.html)
- [Microsoft - Object Names and Identities](https://learn.microsoft.com/en-us/windows/win32/ad/object-names-and-identities)
