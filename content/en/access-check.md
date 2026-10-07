---
canonical_id: windows.access-check
title: Access Check
lang: en
slug: access-check
aliases:
  - AccessCheck
categories:
  - Windows
status: published
summary: Windows access checking and the AccessCheck API, relating access tokens, security descriptors, DACLs, and requested rights.
---
> **Primary sources:** [Microsoft - How DACLs Control Access to an Object](https://learn.microsoft.com/en-us/windows/win32/secauthz/how-dacls-control-access-to-an-object) / [Microsoft - AccessCheck](https://learn.microsoft.com/en-us/windows/win32/api/securitybaseapi/nf-securitybaseapi-accesscheck)

An [[windows.access-check|Access Check]] is an authorization decision that determines whether a requesting security context can obtain requested [[windows.access-rights|Access Rights]] to a [[windows.securable-object|Securable Object]].

## Authorization Inputs

The Windows access-control model involves security information including:

- the requester's [[windows.access-token|Windows Access Token]];
- the target object's [[windows.security-descriptor|Security Descriptor]];
- the [[windows.discretionary-access-control-list|DACL]] in that descriptor;
- applicable [[windows.access-control-entry|ACEs]]; and
- the requested [[windows.access-mask|Access Mask]].

These inputs are evaluated to determine whether the requested access can be granted.

## DACL Evaluation

Allow and deny ACEs in a DACL participate in the access decision.

ACE ordering can affect the result, so the DACL needs to be evaluated as a sequence rather than by looking only for the existence of an allow entry.

NULL and empty DACLs also have different semantics. A NULL DACL permits requested access, while an empty DACL contains no ACE that grants access.

## Win32 AccessCheck API

Windows exposes an `AccessCheck()` API.

The function determines whether a specified Security Descriptor grants requested rights to a client represented by an Access Token and returns granted access through an Access Mask.

CyPedia does not equate this one Win32 API with every internal Windows authorization path. The API is used here as a documented interface illustrating the access-check model.

## Auditing

`AccessCheck()` itself does not generate an audit.

Windows provides separate access-check-and-audit APIs for applications that require auditing behavior.

## Related Pages

- [[windows.access-token|Windows Access Token]]
- [[windows.securable-object|Securable Object]]
- [[windows.security-descriptor|Security Descriptor]]
- [[windows.discretionary-access-control-list|Discretionary Access Control List]]
- [[windows.access-control-entry|Access Control Entry]]
- [[windows.access-rights|Access Rights]]
- [[windows.access-mask|Access Mask]]

## References

- [Microsoft - How DACLs Control Access to an Object](https://learn.microsoft.com/en-us/windows/win32/secauthz/how-dacls-control-access-to-an-object)
- [Microsoft - AccessCheck function](https://learn.microsoft.com/en-us/windows/win32/api/securitybaseapi/nf-securitybaseapi-accesscheck)
- [Microsoft - Access Control](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control)
