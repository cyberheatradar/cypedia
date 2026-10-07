---
canonical_id: ad.organizational-unit
title: Organizational Unit
lang: en
slug: organizational-unit
aliases:
  - OU
categories:
  - Active Directory
status: published
summary: Active Directory Organizational Unit hierarchy, administrative delegation, and Group Policy scope.
---

## Overview

> **Primary source:** [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)

An Organizational Unit (OU) is a container used to organize directory objects hierarchically inside an [[ad.domain|Active Directory Domain]].

OUs can contain users, computers, groups, and other OUs.

## Main Uses

Important uses of OUs include:

- delegation of administration;
- scoping [[windows.group-policy|Group Policy]];
- logical organization of directory objects.

## Delegation

Administrative permissions can be delegated over selected OUs.

This allows administrators to assign limited management responsibilities without granting equivalent control over the entire Domain.

## Group Policy

Group Policy Objects can be linked to [[ad.site|Sites]], Domains, and OUs.

OU hierarchy therefore influences Group Policy scope and inheritance.

OU design is consequently relevant to centralized configuration management as well as directory organization.

## Organizational Structure

An OU hierarchy does not need to reproduce the organization's reporting structure exactly.

Administrative delegation and policy-management requirements are often more important design considerations.

## Security Considerations

An OU is not a security boundary comparable to an [[ad.forest|Active Directory Forest]].

However, excessive delegated permissions or incorrectly scoped Group Policy administration can create paths to high-impact configuration changes.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.domain|Domain]]
- [[ad.forest|Forest]]
- [[windows.group-policy|Group Policy]]

## References

- [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)
- [Microsoft - Appendix A: Reviewing Key AD DS Terms](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-a--reviewing-key-ad-ds-terms)
- [Microsoft - Group Policy scope](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-scope)
