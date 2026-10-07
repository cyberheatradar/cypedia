---
canonical_id: ad.active-directory
title: Active Directory
lang: ja
slug: active-directory
aliases:
  - AD
categories:
  - Active Directory
status: published
summary: Active Directory Domain Servicesの構造、データモデル、認証、レプリケーション、DNS、Group Policy、セキュリティ上の論点を一次情報に基づいて解説する。
---

## 概要

> **主な出典:** [MS-ADTS](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/) / [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)

Active Directoryは、Microsoft Windows環境で利用されるディレクトリサービスおよび関連技術群です。

MicrosoftのActive Directory Technical Specification（MS-ADTS）はActive Directoryの中核機能を規定しており、Active Directoryが[[protocol.ldap|LDAP]]を拡張し、LDAPに対するMicrosoft固有のvariationを持つことを説明しています。

現在一般に「Active Directory」と呼ばれる場合、企業ネットワークのidentity・authentication・authorization・configuration管理基盤として利用されるActive Directory Domain Services（AD DS）を指すことが多いため、本項目では主としてAD DSを扱います。

AD DSはユーザー、コンピューター、グループ、サービスなどのobjectとattributeを階層構造で保持し、検索、認証、authorization情報の提供、レプリケーション、ポリシー管理などの基盤を提供します。

## 歴史的背景

> **主な出典:** [Microsoft - Active Directory Domain Services](https://learn.microsoft.com/en-us/windows/win32/ad/active-directory-domain-services)

Microsoftの公式資料では、Active Directory Domain ServicesはWindows 2000 Server以降のWindows Serverベース分散ネットワークを構成する基盤として説明されています。

従来のWindows NT domain modelから、階層化されたdirectory、複数のDomain Controller、LDAPベースのdirectory access、Kerberos認証、DNSとの統合などを持つ設計へ発展しました。

その後もAD DSはWindows Serverのidentity infrastructureとして継続的に実装・拡張されており、Microsoftは現在もMS-ADTSを含むOpen Specificationsを更新しています。

## Active DirectoryとAD DS

> **主な出典:** [MS-ADTS Introduction](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/bacff5f1-9127-457b-877c-db97b1e1802f)

MS-ADTSではActive Directoryの実装形態として、Active Directory Domain Services（AD DS）とActive Directory Lightweight Directory Services（AD LDS）が扱われています。

AD DSはdomain、forest、Domain Controller、domain-joined client、Kerberos、Group PolicyなどのWindows domain infrastructureを提供します。

一方、AD LDSはdomain infrastructureを構成せずにdirectory service機能を利用するための別形態です。

CyPediaでは、単にActive Directoryと記載する場合でも、文脈上必要に応じてAD DSとAD LDSを区別します。

## 論理構造

> **主な出典:** [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)

AD DSの論理構造は階層化されています。

代表的な構造は次のようになります。

- [[ad.forest|Forest]]
- [[ad.domain|Domain]]
- [[ad.organizational-unit|Organizational Unit（OU）]]
- user
- computer
- group
- service-related object

### [[ad.forest|Forest]]

Forestは1つ以上のActive Directory Domainから構成される最上位の論理構造です。

同一Forest内のDomainは共通のdirectory schema、configuration、Global Catalogなどを共有し、Domain間には自動的な双方向transitive trustが形成されます。

MicrosoftのAD DS用語資料では、Forestはsecurity boundaryとして扱われています。

そのため、Forest全体へ影響する権限やDomain Controllerの侵害は、単一Domainだけの問題として扱えない場合があります。

### [[ad.domain|Domain]]

DomainはActive Directory Forest内のdirectory partitionであり、ユーザー、コンピューター、グループなどのobjectを管理する主要な単位です。

Domainはauthentication、policy administration、replicationなどのscopeとしても機能します。

Domain内には複数の[[ad.domain-controller|Domain Controller]]を配置でき、directory dataがDomain Controller間でreplicateされます。

### [[ad.organizational-unit|Organizational Unit]]

Organizational Unit（OU）はDomain内に階層的なcontainer構造を作るためのobjectです。

OUは主として次の目的で使用されます。

- 管理権限のdelegation
- objectの論理的な整理
- [[windows.group-policy|Group Policy]]適用scopeの構成

OUは組織図そのものを再現する必要はなく、Microsoftはadministration delegationやGroup Policyなどの管理目的に基づいて設計することを推奨しています。

## 物理構造とSite

> **主な出典:** [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)

AD DSの論理構造とは別に、ネットワークの物理的・地理的構成を表現するため[[ad.site|Active Directory Site]]が使用されます。

Siteは高速で信頼性の高いnetwork connectionによって結ばれた1つ以上のTCP/IP subnetを表します。

Site情報は主に次の用途で利用されます。

- clientが適切なDomain Controllerを選択するための情報
- replication topologyの最適化
- site間network costやscheduleの制御

1つのDomainは複数Siteへまたがることができ、1つのSiteに複数DomainのDomain Controllerを配置できます。

## Domain Controller

> **主な出典:** [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview) / [Microsoft - Securing domain controllers against attack](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/securing-domain-controllers-against-attack)

[[ad.domain-controller|Domain Controller（DC）]]はAD DSをホストするWindows Serverです。

Domain Controllerはdirectory databaseを保持し、authentication、directory query、replicationなどActive Directoryの中核処理を提供します。

AD DS environmentではDomain Controllerが[[auth.kerberos|Kerberos]]のKDCとして機能し、Domain accountの認証に関与します。

Domain ControllerはAD environmentの信頼性とsecurityに直接影響するため、通常のmember serverやworkstationより高い保護優先度が必要です。

## ObjectとAttribute

> **主な出典:** [MS-ADTS - Active Directory Schema](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/5859bab0-f545-4db6-80c6-9798b484b3d8)

Active Directoryでは、user、computer、groupなどのdirectory entityをobjectとして保持します。

各objectは複数のattributeを持ちます。

例えばuser objectであれば、名前、識別情報、group membershipなどの情報がattributeとして保持されます。

objectにどのattributeを持たせられるか、どのattributeが必須かといった規則は[[ad.schema|Active Directory Schema]]で定義されます。

## Active Directory Schema

> **主な出典:** [MS-ADTS - Active Directory Schema](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/5859bab0-f545-4db6-80c6-9798b484b3d8)

[[ad.schema|Active Directory Schema]]はdirectoryへ保存可能なobjectの種類と構造を定義します。

Schemaは主に次の要素から構成されます。

- class
- attribute
- syntax

classは保存可能なobject typeを定義し、attributeはobjectが保持できる情報を定義します。

Schema変更はForest全体へ影響するため、通常のdirectory object変更より慎重な管理が必要です。

## Directory Partition / Naming Context

> **主な出典:** [Microsoft - Naming Contexts and Directory Partitions](https://learn.microsoft.com/en-us/windows/win32/ad/naming-contexts-and-partitions)

Active Directory databaseは複数の[[ad.directory-partition|Directory Partition]]に分割されます。

Directory PartitionはNaming Context（NC）とも呼ばれ、それぞれ独立したreplication scopeを持ちます。

代表的なpartitionには次があります。

- Schema Partition
- Configuration Partition
- Domain Partition
- Application Directory Partition

Schema PartitionとConfiguration PartitionはForest内のDomain Controllerへ共有されます。

Domain PartitionはそのDomainに属するuser、computerなどのobjectを保持し、そのDomainのDomain Controller間でreplicateされます。

## LDAP

> **主な出典:** [MS-ADTS](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/) / [RFC 4511](https://www.rfc-editor.org/rfc/rfc4511.html)

[[protocol.ldap|LDAP]]はdirectory serviceへaccessするためのprotocolです。

RFC 4511はLDAPのprotocol element、semantics、encodingを規定しています。

Active DirectoryはLDAPを利用してdirectory objectのsearch、read、modifyなどの操作を提供しますが、Microsoft固有のbehaviorやextensionも持つため、Active Directoryの詳細なprotocol behaviorを解析する場合はRFCだけでなくMS-ADTSなどのOpen Specificationsも必要です。

## NTDS.dit

> **主な出典:** [Microsoft - AD DS Configuration Wizard](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/ad-ds-installation-and-removal-wizard-page-descriptions) / [Microsoft - Passwords technical overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/passwords-technical-overview) / [MITRE ATT&CK T1003.003](https://attack.mitre.org/techniques/T1003/003/)

[[ad.ntds-dit|NTDS.dit]]はDomain Controllerが使用するActive Directory database fileです。

AD DSのobjectやcredentialに関連する重要な情報が保存されるため、Domain Controller上のNTDS.ditは特に高い保護が必要なassetです。

NTDS.ditまたはそのbackupが攻撃者に取得された場合、domain credential情報を含む大量の機密情報が露出する可能性があります。

## SYSVOL

> **主な出典:** [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)

[[ad.sysvol|SYSVOL]]はDomain Controller上で共有されるsystem volumeです。

Group Policy Objectはdirectory側のGroup Policy Containerと、SYSVOL側のGroup Policy Templateという2つの主要部分を持ちます。

そのため、Group Policyの完全性を考える場合はActive Directory databaseだけでなくSYSVOLの保護とreplicationも重要です。

## Global Catalog

> **主な出典:** [Microsoft - Global Catalog](https://learn.microsoft.com/en-us/windows/win32/ad/global-catalog) / [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)

[[ad.global-catalog|Global Catalog（GC）]]はForest全体のobjectを検索できるようにする機能です。

writable Global Catalog serverは、自身のDomainについてfull writable replicaを保持し、Forest内の他Domainについてpartial read-only replicaを保持します。[[ad.read-only-domain-controller|Read-Only Domain Controller（RODC）]]もGlobal Catalogとして構成できますが、そのDomain Controller自体はread-onlyのままです。

これにより、利用者やapplicationはobjectがどのDomainに存在するかを事前に把握していなくてもForest全体からobjectを検索できます。

## Replication

> **主な出典:** [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts) / [Microsoft - Active Directory FSMO roles](https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/fsmo-roles)

[[ad.replication|Active Directory Replication]]は複数のDomain Controller間でdirectory dataを同期する仕組みです。

Active Directoryは大部分のdirectory updateについてmulti-master modelを採用しており、複数のwritable Domain Controllerで変更を受け付け、その変更を他のDomain Controllerへreplicateします。

replication topologyはKnowledge Consistency Checker（KCC）によって生成・調整されます。

Site内replicationとSite間replicationではnetwork topology、cost、scheduleなどの扱いが異なります。

## FSMO Roles

> **主な出典:** [Microsoft - Flexible Single Master Operations roles](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-fsmo-roles)

Active Directoryは基本的にはmulti-masterですが、競合を避けるため一部処理は[[ad.fsmo-roles|Flexible Single Master Operations（FSMO）]]として単一のDomain Controllerが担当します。

5つのFSMO roleがあります。

Forest単位:

- Schema Master
- Domain Naming Master

Domain単位:

- RID Master
- PDC Emulator
- Infrastructure Master

FSMO roleは特定のDomain Controllerへ永久固定されるものではなく、必要に応じて別のDomain Controllerへtransferできます。

## DNSとの関係

> **主な出典:** [Microsoft - DNS and AD DS](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/dns-and-ad-ds) / [Microsoft - Active Directory-Integrated DNS Zones](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/active-directory-integrated-dns-zones)

AD DSは[[protocol.dns|DNS]]と密接に統合されています。

MicrosoftはAD DSがDNS name resolutionを使用して、clientがDomain Controllerを発見し、Domain Controller同士がdirectory service通信を行えるようにすると説明しています。

Active Directory-integrated DNS zoneではDNS zone dataをAD DS内に保存し、Active Directory replicationを利用して複数Domain Controllerへ同期できます。

AD環境ではDNS設定の誤りがauthentication、Domain Controller discovery、replicationなど広範囲へ影響する場合があります。

## Authentication

> **主な出典:** [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview) / [Microsoft - NTLM overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/ntlm-overview)

AD DS environmentでは[[auth.kerberos|Kerberos V5]]が主要なauthentication protocolとして使用されます。

KerberosではDomain Controllerが[[kerberos.kdc|KDC]]として動作します。

一方、[[auth.ntlm|NTLM]]は互換性のため現在も一部環境で利用可能ですが、Microsoftは[[auth.ntlm|NTLMv1]]をWindows Serverから削除し、[[auth.ntlm|NTLMv2]]をdeprecatedとして将来のreleaseで削除予定としています。

MicrosoftはActive Directory environmentではKerberos V5をpreferred authentication methodとして位置づけています。

## Security Identifier

> **主な出典:** [Microsoft - Security Identifiers](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-identifiers) / [Microsoft - Flexible Single Master Operations roles](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-fsmo-roles)

Windowsではuser、group、computerなどの[[windows.security-principal|security principal]]を識別するため[[windows.security-identifier|Security Identifier（SID）]]が使用されます。

Domainで作成される[[windows.security-principal|security principal]]のSIDはDomain SIDとRelative ID（RID）などから構成されます。

RIDの一意性管理にはFSMO roleの1つであるRID Masterが関与します。

## Trust

> **主な出典:** [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)

[[ad.trust|Active Directory Trust]]は異なるDomainやForest間でauthentication relationshipを形成する仕組みです。

同一Forest内のDomain間には自動的な双方向transitive trustがあります。

また、環境要件に応じてForest TrustやExternal Trustなどを構成できます。

Trustはresource accessを可能にする重要な仕組みである一方、信頼範囲やadministrative boundaryの設計に直接関係します。

## Group Policy

> **主な出典:** [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview) / [MS-GPOD](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-gpod/b724bd91-e224-4524-b752-5f810a0cc071)

[[windows.group-policy|Group Policy]]はDomain-joined computerとuserへ設定を集中適用するためのWindows管理機能です。

Group Policy Object（GPO）はSite、Domain、OUなどへlinkでき、それらの階層とsecurity filteringなどに基づいて適用対象が決定されます。

GPOはdirectory service側の情報とSYSVOL上のfile-based dataの両方を利用します。

## セキュリティ上の重要性

> **主な出典:** [Microsoft - Best practices for securing Active Directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory) / [Microsoft - Securing domain controllers against attack](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/securing-domain-controllers-against-attack)

Active Directoryはidentity、credential、authorization、configurationを集中管理するため、企業networkにおける最重要security infrastructureの1つです。

特にDomain Controllerが侵害された場合、directory databaseの変更、credential情報へのaccess、policy変更などを通じてDomainまたはForest全体へ重大な影響が生じる可能性があります。

MicrosoftはDomain Controllerへのprivileged accessが得られた場合、AD databaseだけでなくAD管理下のsystemとaccount全体が脅かされると説明しています。

そのため、Domain Controller、privileged account、administrative workstationなどは一般端末より厳格に保護する必要があります。

## 攻撃・悪用との関係

> **主な出典:** [MITRE ATT&CK T1003.006 - DCSync](https://attack.mitre.org/techniques/T1003/006/) / [MITRE ATT&CK T1003.003 - NTDS](https://attack.mitre.org/techniques/T1003/003/) / [MITRE ATT&CK T1482 - Domain Trust Discovery](https://attack.mitre.org/techniques/T1482/)

Active Directoryは多くのWindows enterprise環境でidentityの中心に位置するため、攻撃者にとって重要な標的です。

代表的な攻撃・悪用には次のようなものがあります。

### [[attack.dcsync|DCSync]]

DCSyncはDomain Controller replication APIを悪用し、攻撃者がDomain Controllerのreplication処理を模倣してcredential情報などを取得しようとする手法です。

成立にはdirectory replicationに関係する強い権限が必要です。

### [[attack.ntds-credential-dumping|NTDS Credential Dumping]]

攻撃者が[[ad.ntds-dit|NTDS.dit]]またはそのcopy・backupへaccessし、domain credential informationなどを取得しようとする攻撃です。

Domain Controllerまたはbackup infrastructureの侵害と密接に関係します。

### Kerberos関連攻撃

Active DirectoryではKerberosが主要なauthentication protocolであるため、[[attack.kerberoasting|Kerberoasting]]、[[attack.as-rep-roasting|AS-REP Roasting]]、[[attack.golden-ticket|Golden Ticket]]、[[attack.silver-ticket|Silver Ticket]]なども重要です。

これらの詳細は各独立項目で扱います。

### [[attack.domain-trust-discovery|Domain Trust Discovery]]

攻撃者はDomain間・Forest間のTrust relationshipを列挙し、lateral movementや追加のattack pathを特定するために利用する場合があります。

## 防御・緩和

> **主な出典:** [Microsoft - Best practices for securing Active Directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory) / [Microsoft - Reducing the Active Directory Attack Surface](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/reducing-the-active-directory-attack-surface) / [Microsoft - Implementing Secure Administrative Hosts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/implementing-secure-administrative-hosts)

Active Directory防御では、単一のsecurity productだけではなくidentity infrastructure全体を保護する必要があります。

重要な原則には次があります。

- Domain Controllerを一般serverより厳格に保護する
- Domain Controller上で不要なsoftwareやserviceを動かさない
- supportedなWindows Server versionを使用する
- Domain Admins、Enterprise Adminsなどの高権限group membershipを最小化する
- least privilegeを徹底する
- privileged accountを一般作業へ使用しない
- secure administrative hostまたはPrivileged Access Workstationを利用する
- privileged administrationへMFAを組み合わせる
- Group Policy、Trust、replication permissionなどの重要設定を監査する
- credential materialとbackupを保護する
- legacy authenticationへの依存を可能な範囲で削減する

## 制約・限界

Active Directoryはidentityとdirectory infrastructureを提供しますが、それ単独ですべてのendpoint securityやapplication authorization問題を解決するものではありません。

また、Active DirectoryはDNS、time synchronization、network connectivity、Domain Controller availabilityなど複数の周辺infrastructureへ依存します。

ForestやDomainの設計、Trust、delegation、Group Policy、legacy protocol compatibilityなどの設定が不適切な場合、Active Directory自体が大きなattack surfaceになる可能性があります。

## 現在の位置づけ

> **主な出典:** [Microsoft - Understanding AD DS Design](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-ad-ds-design)

AD DSは現在もWindows Server enterprise environmentで広く利用されるidentity infrastructureです。

cloud identityの普及後も、on-premises Windows domain、hybrid identity、legacy application、enterprise network authenticationなどでActive Directoryが継続して利用される環境は多く存在します。

そのためActive Directoryの構造、authentication、replication、Trust、Group Policy、security boundaryを理解することは、Windows administrationだけでなくdefense、incident response、penetration testing、identity securityでも重要です。

## 関連項目

- [[ad.forest|Forest]]
- [[ad.domain|Domain]]
- [[ad.organizational-unit|Organizational Unit]]
- [[ad.site|Active Directory Site]]
- [[ad.domain-controller|Domain Controller]]
- [[ad.global-catalog|Global Catalog]]
- [[ad.schema|Active Directory Schema]]
- [[ad.directory-partition|Directory Partition]]
- [[ad.replication|Active Directory Replication]]
- [[ad.fsmo-roles|FSMO Roles]]
- [[ad.trust|Active Directory Trust]]
- [[ad.ntds-dit|NTDS.dit]]
- [[ad.sysvol|SYSVOL]]
- [[windows.group-policy|Group Policy]]
- [[windows.security-principal|Security Principal]]
- [[windows.security-identifier|SID]]
- [[protocol.ldap|LDAP]]
- [[protocol.dns|DNS]]
- [[auth.kerberos|Kerberos]]
- [[auth.ntlm|NTLM]]
- [[ad.service-principal-name|SPN]]
- [[ad.service-account|Service Account]]
- [[attack.dcsync|DCSync]]
- [[attack.ntds-credential-dumping|NTDS Credential Dumping]]
- [[attack.domain-trust-discovery|Domain Trust Discovery]]
- [[attack.kerberoasting|Kerberoasting]]
- [[attack.as-rep-roasting|AS-REP Roasting]]
- [[attack.golden-ticket|Golden Ticket]]
- [[attack.silver-ticket|Silver Ticket]]
- [[ad.knowledge-consistency-checker|Knowledge Consistency Checker]]

## 参考文献

- [Microsoft Open Specifications - MS-ADTS: Active Directory Technical Specification](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/)
- [Microsoft - Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
- [Microsoft - Active Directory Domain Services](https://learn.microsoft.com/en-us/windows/win32/ad/active-directory-domain-services)
- [Microsoft - Understanding the Active Directory Logical Model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)
- [Microsoft - Active Directory Schema](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/5859bab0-f545-4db6-80c6-9798b484b3d8)
- [Microsoft - Naming Contexts and Directory Partitions](https://learn.microsoft.com/en-us/windows/win32/ad/naming-contexts-and-partitions)
- [RFC 4511 - Lightweight Directory Access Protocol (LDAP): The Protocol](https://www.rfc-editor.org/rfc/rfc4511.html)
- [Microsoft - Active Directory Replication Concepts](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [Microsoft - Flexible Single Master Operations roles](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-fsmo-roles)
- [Microsoft - DNS and AD DS](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/dns-and-ad-ds)
- [Microsoft - Group Policy overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)
- [Microsoft Open Specifications - MS-GPOD: Group Policy Objects](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-gpod/b724bd91-e224-4524-b752-5f810a0cc071)
- [Microsoft - NTLM overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/ntlm-overview)
- [Microsoft - Best practices for securing Active Directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory)
- [Microsoft - Securing domain controllers against attack](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/securing-domain-controllers-against-attack)
- [MITRE ATT&CK T1003.006 - DCSync](https://attack.mitre.org/techniques/T1003/006/)
- [MITRE ATT&CK T1003.003 - NTDS](https://attack.mitre.org/techniques/T1003/003/)
- [MITRE ATT&CK T1482 - Domain Trust Discovery](https://attack.mitre.org/techniques/T1482/)
- [Microsoft - Install Active Directory Domain Services on Windows Server](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-)
- [Microsoft - Features removed or no longer developed in Windows Server](https://learn.microsoft.com/en-us/windows-server/get-started/removed-deprecated-features-windows-server)
- [Microsoft - Security Identifiers](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-identifiers)
- [Microsoft - Passwords technical overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/passwords-technical-overview)
