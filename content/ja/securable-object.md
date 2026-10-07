---
canonical_id: windows.securable-object
title: Securable Object
lang: ja
slug: securable-object
aliases:
  - Securable Objects
categories:
  - Windows
status: published
summary: Security Descriptorを持つことができるWindows Securable Objectと代表例を解説する。
---
> **主な出典:** [Microsoft - Securable Objects](https://learn.microsoft.com/en-us/windows/win32/secauthz/securable-objects) / [Microsoft - Security Descriptors](https://learn.microsoft.com/en-us/windows/win32/secauthz/security-descriptors)

[[windows.securable-object|Securable Object]]は、[[windows.security-descriptor|Security Descriptor]]を持つことができるWindows objectです。

Security Descriptorによって、ownerやACLなどのsecurity informationをobjectへ関連付けられます。

## Representative Objects

Microsoft documentationでは、代表的なSecurable Objectとして次のようなobject typeが示されています。

- NTFS file / directory
- registry key
- process
- thread
- file-mapping object
- access token
- window station / desktop
- Windows service
- printer
- network share
- synchronization object
- job object

directory service objectもWindows access-control modelの対象になります。

## Security Descriptor

Securable Objectには、objectのsecurity informationを表すSecurity Descriptorを関連付けることができます。

Security Descriptorにはowner、primary group、[[windows.discretionary-access-control-list|DACL]]、[[windows.system-access-control-list|SACL]]などが含まれ得ます。

## Object-Specific Rights

Securable Objectのtypeごとに、利用可能な[[windows.access-rights|Access Rights]]は異なります。

そのため同じAccess Maskのconceptを利用していても、specific rightの意味はobject typeによって変わります。

## Access Control

object accessを要求するとき、requesterの[[windows.access-token|Windows Access Token]]とobjectのSecurity Descriptorが[[windows.access-check|Access Check]]で重要になります。

## Security Considerations

「Windows object」であることと「Securable Object」であることは完全に同義ではありません。

本記事ではWindows Object Manager全体のobject taxonomyは扱わず、Security Descriptorによってaccess controlされるobjectという観点に限定します。

## 関連項目

- [[windows.security-descriptor|Security Descriptor]]
- [[windows.access-control-list|Access Control List]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]
- [[windows.system-access-control-list|System Access Control List]]
- [[windows.access-rights|Access Rights]]
- [[windows.access-token|Windows Access Token]]
- [[windows.access-check|Access Check]]
- [[windows.access-mask|Access Mask]]

## 参考文献

- [Microsoft - Securable Objects](https://learn.microsoft.com/en-us/windows/win32/secauthz/securable-objects)
- [Microsoft - Security Descriptors](https://learn.microsoft.com/en-us/windows/win32/secauthz/security-descriptors)
- [Microsoft - Access Control](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control)
