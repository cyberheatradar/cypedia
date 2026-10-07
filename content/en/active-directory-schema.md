---
canonical_id: ad.schema
title: Active Directory Schema
lang: en
slug: active-directory-schema
aliases:
  - Schema
  - AD Schema
categories:
  - Active Directory
status: published
summary: Active Directory Schema classes, attributes, syntaxes, Forest-wide scope, and schema extension.
---

## Overview

> **Primary source:** [MS-ADTS - Active Directory Schema](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/5859bab0-f545-4db6-80c6-9798b484b3d8)

The Active Directory Schema defines the types and structure of objects that can be stored in [[ad.active-directory|Active Directory]].

The Schema defines rules governing directory structure and content.

## Components

Important Schema concepts include:

- classes;
- attributes;
- syntaxes.

A class defines a type of directory object.

An attribute defines information that objects can contain.

A syntax describes the data representation used by an attribute.

## Mandatory and Optional Attributes

For each class, the Schema can define mandatory and optional attributes.

This determines what information an instance of that class is required or permitted to contain.

## Schema Objects

The Schema is itself represented through Active Directory objects.

Classes are represented by classSchema objects.

Attributes are represented by attributeSchema objects.

## Forest Scope

The Schema is shared across an [[ad.forest|Active Directory Forest]].

The Schema Partition is replicated to [[ad.domain-controller|Domain Controllers]] throughout the Forest.

Schema changes can therefore affect more than one [[ad.domain|Domain]].

## Schema Extension

Administrators and applications can extend the Schema with additional classes and attributes.

Because Schema modifications can have Forest-wide implications, they require careful design, testing, and change control.

## Related Pages

- [[ad.active-directory|Active Directory]]
- [[ad.forest|Forest]]
- [[ad.domain|Domain]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.replication|Active Directory Replication]]

## References

- [MS-ADTS - Active Directory Schema](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/5859bab0-f545-4db6-80c6-9798b484b3d8)
- [Microsoft - Active Directory Schema](https://learn.microsoft.com/en-us/windows/win32/adschema/active-directory-schema)
