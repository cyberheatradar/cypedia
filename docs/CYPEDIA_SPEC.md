# CyPedia — The Cyber Security Wiki

## Purpose

CyPedia is a cybersecurity dictionary and encyclopedia.

Its primary purpose is to allow users to look up cybersecurity terminology, concepts, technologies, protocols, attack techniques, tools, products, standards, actors, malware, defensive technologies, and related knowledge.

CyPedia is not primarily:

- a penetration testing procedure manual
- a vulnerability assessment checklist
- an attack atlas
- an automated scanner
- a learning curriculum

Examples of independent entries include:

- Kerberos
- TGT
- TGS
- SPN
- Kerberoasting
- OAuth
- Prompt Injection
- MCP
- YARA
- CAN
- Modbus

## Core UX

CyPedia uses a dense Wiki model.

Article text contains links to other CyPedia entries.

Example navigation:

Kerberoasting
-> Kerberos
-> TGT
-> KDC
-> Domain Controller
-> Active Directory
-> LDAP

Users should be able to continue following related terminology through internal links.

## Article Quality

An article must not stop at a short definition.

Depending on the subject, an article may include:

- Overview
- Definition
- Historical background
- Origin and motivation
- Current status
- Architecture
- Mechanism
- Components
- Use cases
- Advantages
- Disadvantages
- Limitations
- Security implications
- Abuse and attack techniques
- Detection
- Mitigation
- Operational considerations
- Version differences
- Deprecation status
- Standards
- Related technologies
- Related tools
- Real-world examples
- References

A single rigid article template is not required.

The structure must fit the subject naturally.

## Source Policy

CyPedia must not fill factual gaps through speculation.

Important factual claims must be based on traceable sources.

Preferred source order:

1. Standards, RFCs, IETF documents
2. Official specifications
3. Official vendor documentation
4. NIST and government standards
5. MITRE and OWASP official material
6. Official advisories and vulnerability records
7. Original academic papers
8. Original researcher publications

HackTricks, PentestLab, Pentest Everything, Hacking Articles, and similar sites may be used for topic discovery and supplemental research.

They should not replace primary sources when primary sources exist.

Unknown or unverified information must be identified as unknown or unverified.

## References

Every substantive article must contain References.

Important claims should be traceable to the relevant source.

Where useful, sources should be associated with individual sections or claims.

## Wiki Links

Internal authoring syntax:

[[Kerberos]]

[[Ticket-Granting Ticket|TGT]]

If the target exists, the term becomes an internal link.

If the target does not exist, the public article displays ordinary text and the build process records it in the Missing Wiki Link report.

## Canonical Pages

One concept normally has one canonical page.

Aliases do not duplicate article content.

Examples:

TGT -> Ticket-Granting Ticket

AD -> Active Directory

Kerberoast -> Kerberoasting

## Backlinks

The build system automatically records which pages link to each entry.

## Languages

Japanese content:

/ja/

English content:

/en/

Equivalent Japanese and English pages share the same canonical_id.

## Search

CyPedia uses static full-text search.

Search indexing is generated with Pagefind.

Aliases are searchable.

## Navigation

CyPedia provides:

- Search
- Index
- Categories
- Recent Changes
- Random Page
- Backlinks
- Alias redirects

## Editing

Public users cannot edit CyPedia.

Only the project owner edits source content.

There is no public Wiki editing interface.

## Development

Development environment:

Ubuntu Server VM

The Windows host is used only for browser-based Human Review.

## Build and Deployment

Normal workflow:

1. Create or edit content on the local VM
2. Build locally
3. Review the result from the Windows browser
4. Run the Release Gate
5. Push source to GitHub
6. Push static build output to gh-pages
7. GitHub Pages serves the static site

GitHub Actions are not used.

## Hosting

Primary hosting target:

GitHub Pages

CyPedia is published as static HTML, CSS, JavaScript, and search index data.

No server-side database is required.

## GitHub Pages Size Policy

CyPedia uses an internal deployment limit of 850 MiB.

A release is blocked when the generated static site reaches that limit.

## Images

CyPedia is fundamentally text-oriented.

Images are not required for normal articles.

## Content Automation

Content is not automatically harvested from the Internet.

New entries are intentionally selected and added.

AI may assist content creation, but published factual content must satisfy the source policy.

## Benchmark Coverage

Topic discovery benchmarks include:

- HackTricks
- PentestLab
- Pentest Everything
- Hacking Articles

CyPedia aims to extend beyond these into areas including:

- AI / LLM
- AI Agent / MCP
- DFIR
- CTI
- Detection / Defense
- Cryptography / PKI
- Vulnerability Research
- Hardware
- RF
- IoT
- OT / ICS
- Automotive
- Telecom
- Space / Satellite
- Medical Devices
- Maritime
- Web3

## Project Principle

CyPedia is a dictionary first.

When a user asks:

What is Kerberos?

What is TGT?

What is Kerberoasting?

CyPedia should provide an independent page that answers the question deeply, accurately, and with traceable sources.
