import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();

const CONTENT_ROOT = path.join(ROOT, 'content');
const TERM_REGISTRY = path.join(CONTENT_ROOT, 'terms.json');

const GENERATED_ROOT = path.join(ROOT, 'src', 'generated');
const GENERATED_PAGES = path.join(GENERATED_ROOT, 'pages');
const META_PATH = path.join(GENERATED_ROOT, 'wiki-meta.json');
const TERM_META_PATH = path.join(
  GENERATED_ROOT,
  'term-registry.json'
);

const REPORT_ROOT = path.join(ROOT, 'build-reports');

const MISSING_TXT = path.join(
  REPORT_ROOT,
  'missing-wiki-links.txt'
);

const MISSING_JSON = path.join(
  REPORT_ROOT,
  'missing-wiki-links.json'
);

const UNLINKED_TXT = path.join(
  REPORT_ROOT,
  'unlinked-known-terms.txt'
);

const UNLINKED_JSON = path.join(
  REPORT_ROOT,
  'unlinked-known-terms.json'
);

const LANGS = ['ja', 'en'];

function normalizeKey(value) {
  return String(value)
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en-US');
}

function assertString(value, name, file) {
  if (
    typeof value !== 'string' ||
    value.trim() === ''
  ) {
    throw new Error(
      `${file}: ${name} must be a non-empty string`
    );
  }
}

function validateSlug(slug, file) {
  if (
    slug.startsWith('/') ||
    slug.endsWith('/') ||
    slug.includes('..') ||
    !/^[a-z0-9][a-z0-9/_-]*$/.test(slug)
  ) {
    throw new Error(
      `${file}: invalid slug: ${slug}`
    );
  }
}

function escapeMarkdownLabel(value) {
  return String(value)
    .replaceAll('\\', '\\\\')
    .replaceAll(']', '\\]');
}

function escapeRegExp(value) {
  return String(value).replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );
}

async function walk(dir) {
  const result = [];

  const entries = await fs.readdir(
    dir,
    { withFileTypes: true }
  );

  for (const entry of entries) {
    const p = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result.push(...await walk(p));
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.md')
    ) {
      result.push(p);
    }
  }

  return result;
}

function relativeWikiHref(source, target) {
  const from = path.posix.join(
    '/',
    source.lang,
    source.slug
  );

  const to = path.posix.join(
    '/',
    target.lang,
    target.slug
  );

  let relative = path.posix.relative(from, to);

  if (!relative) {
    return './';
  }

  if (!relative.startsWith('.')) {
    relative = `./${relative}`;
  }

  return `${relative}/`;
}

function stripForTermLint(text) {
  let s = String(text);

  s = s.replace(
    /```[\s\S]*?```/g,
    ' '
  );

  s = s.replace(
    /~~~[\s\S]*?~~~/g,
    ' '
  );

  s = s.replace(
    /`[^`\n]*`/g,
    ' '
  );

  s = s.replace(
    /\[\[[^\]]+\]\]/g,
    ' '
  );

  s = s.replace(
    /\[[^\]]+\]\([^)]+\)/g,
    ' '
  );

  s = s.replace(
    /^> \*\*主な出典:\*\*.*$/gm,
    ' '
  );

  s = s.replace(
    /^> \*\*Primary sources?:\*\*.*$/gim,
    ' '
  );

  return s;
}

function containsKnownName(text, name) {
  const escaped = escapeRegExp(name);

  if (
    /^[A-Za-z0-9][A-Za-z0-9 ._+/-]*$/.test(name)
  ) {
    const acronym =
      /^[A-Z0-9][A-Z0-9-]{1,7}$/.test(name);

    const re = new RegExp(
      `(^|[^A-Za-z0-9])${escaped}([^A-Za-z0-9]|$)`,
      acronym ? '' : 'i'
    );

    return re.test(text);
  }

  return normalizeKey(text)
    .includes(normalizeKey(name));
}

await fs.rm(
  GENERATED_ROOT,
  { recursive: true, force: true }
);

await fs.mkdir(
  GENERATED_PAGES,
  { recursive: true }
);

await fs.mkdir(
  REPORT_ROOT,
  { recursive: true }
);

const registryRaw = JSON.parse(
  await fs.readFile(
    TERM_REGISTRY,
    'utf8'
  )
);

if (
  !registryRaw ||
  registryRaw.version !== 1 ||
  !Array.isArray(registryRaw.terms)
) {
  throw new Error(
    'content/terms.json: unsupported registry format'
  );
}

const registry = [];
const canonicalIds = new Set();
const registrySlugs = new Set();

for (const raw of registryRaw.terms) {
  assertString(
    raw.canonical_id,
    'canonical_id',
    TERM_REGISTRY
  );

  assertString(
    raw.slug,
    'slug',
    TERM_REGISTRY
  );

  validateSlug(
    raw.slug,
    TERM_REGISTRY
  );

  if (canonicalIds.has(raw.canonical_id)) {
    throw new Error(
      `Duplicate registry canonical_id: ` +
      raw.canonical_id
    );
  }

  canonicalIds.add(raw.canonical_id);

  const categories =
    Array.isArray(raw.categories)
      ? raw.categories
          .map(String)
          .map(v => v.trim())
          .filter(Boolean)
      : [];

  const term = {
    canonical_id: raw.canonical_id.trim(),
    slug: raw.slug.trim(),
    status:
      raw.status === 'article'
        ? 'article'
        : 'planned',
    categories,
    locales: {}
  };

  for (const lang of LANGS) {
    const locale = raw[lang];

    if (!locale) {
      throw new Error(
        `${raw.canonical_id}: missing locale ${lang}`
      );
    }

    assertString(
      locale.title,
      `${lang}.title`,
      TERM_REGISTRY
    );

    const aliases =
      Array.isArray(locale.aliases)
        ? locale.aliases
            .map(String)
            .map(v => v.trim())
            .filter(Boolean)
        : [];

    term.locales[lang] = {
      title: locale.title.trim(),
      aliases,
      summary:
        typeof locale.summary === 'string'
          ? locale.summary.trim()
          : ''
    };

    const slugKey =
      `${lang}:${term.slug}`;

    if (registrySlugs.has(slugKey)) {
      throw new Error(
        `Duplicate registry slug: ${slugKey}`
      );
    }

    registrySlugs.add(slugKey);
  }

  registry.push(term);
}

const registryByCanonical = new Map(
  registry.map(
    term => [
      term.canonical_id,
      term
    ]
  )
);

const actualPages = [];

for (const lang of LANGS) {
  const dir = path.join(
    CONTENT_ROOT,
    lang
  );

  try {
    await fs.access(dir);
  } catch {
    continue;
  }

  for (const file of await walk(dir)) {
    const raw = await fs.readFile(
      file,
      'utf8'
    );

    const parsed = matter(raw);
    const data = parsed.data ?? {};

    assertString(
      data.canonical_id,
      'canonical_id',
      file
    );

    assertString(
      data.title,
      'title',
      file
    );

    assertString(
      data.lang,
      'lang',
      file
    );

    assertString(
      data.slug,
      'slug',
      file
    );

    if (data.lang !== lang) {
      throw new Error(
        `${file}: lang=${data.lang} ` +
        `does not match directory lang=${lang}`
      );
    }

    validateSlug(
      data.slug,
      file
    );

    const registered =
      registryByCanonical.get(
        data.canonical_id
      );

    if (!registered) {
      throw new Error(
        `${file}: canonical_id is not registered: ` +
        data.canonical_id
      );
    }

    const locale =
      registered.locales[lang];

    if (data.slug !== registered.slug) {
      throw new Error(
        `${file}: slug does not match registry ` +
        `(${data.slug} != ${registered.slug})`
      );
    }

    if (
      normalizeKey(data.title) !==
      normalizeKey(locale.title)
    ) {
      throw new Error(
        `${file}: title does not match registry ` +
        `(${data.title} != ${locale.title})`
      );
    }

    const aliases =
      Array.isArray(data.aliases)
        ? data.aliases
            .map(String)
            .map(v => v.trim())
            .filter(Boolean)
        : [];

    const categories =
      Array.isArray(data.categories)
        ? data.categories
            .map(String)
            .map(v => v.trim())
            .filter(Boolean)
        : [];

    const reading =
      typeof data.reading === 'string'
        ? data.reading.trim()
        : '';

    const stat = await fs.stat(file);

    actualPages.push({
      key:
        `${lang}:${data.canonical_id}`,
      canonical_id:
        data.canonical_id,
      title:
        data.title.trim(),
      lang,
      slug:
        data.slug.trim(),
      aliases,
      categories,
      status:
        typeof data.status === 'string'
          ? data.status
          : 'draft',
      summary:
        typeof data.summary === 'string'
          ? data.summary
          : locale.summary,
      reading,
      updated_at:
        stat.mtime.toISOString(),
      file,
      source_exists: true,
      sourceBody:
        parsed.content
    });
  }
}

const pages = [];
const actualByKey = new Map();

for (const page of actualPages) {
  if (actualByKey.has(page.key)) {
    throw new Error(
      `Duplicate page key: ${page.key}`
    );
  }

  actualByKey.set(
    page.key,
    page
  );
}

for (const term of registry) {
  for (const lang of LANGS) {
    const key =
      `${lang}:${term.canonical_id}`;

    const actual =
      actualByKey.get(key);

    if (actual) {
      pages.push(actual);
      continue;
    }

    const locale =
      term.locales[lang];

    const sourceBody =
      lang === 'ja'
        ? (
          '> **執筆準備中**\n' +
          '> この項目はCyPediaの登録済み用語です。' +
          '本文は一次情報を収集・確認した後に作成します。\n'
        )
        : (
          '> **Article preparation in progress**\n' +
          '> This is a registered CyPedia term. ' +
          'The article will be written after ' +
          'primary-source verification.\n'
        );

    pages.push({
      key,
      canonical_id:
        term.canonical_id,
      title:
        locale.title,
      lang,
      slug:
        term.slug,
      aliases:
        locale.aliases,
      categories:
        term.categories,
      status:
        'planned',
      summary:
        locale.summary,
      reading:
        '',
      updated_at:
        '1970-01-01T00:00:00.000Z',
      file:
        null,
      source_exists:
        false,
      sourceBody
    });
  }
}

const pageKeySet = new Set();
const pageSlugSet = new Set();

for (const page of pages) {
  if (pageKeySet.has(page.key)) {
    throw new Error(
      `Duplicate page key: ${page.key}`
    );
  }

  pageKeySet.add(page.key);

  const slugKey =
    `${page.lang}:${page.slug}`;

  if (pageSlugSet.has(slugKey)) {
    throw new Error(
      `Duplicate slug: ${slugKey}`
    );
  }

  pageSlugSet.add(slugKey);
}

const lookup = new Map();

for (const page of pages) {
  const names = [
    page.canonical_id,
    page.title,
    ...page.aliases
  ];

  for (const name of names) {
    const k =
      `${page.lang}:${normalizeKey(name)}`;

    if (
      lookup.has(k) &&
      lookup.get(k).key !== page.key
    ) {
      throw new Error(
        `Ambiguous term "${name}" in ` +
        `${page.lang}: ` +
        `${lookup.get(k).canonical_id} vs ` +
        `${page.canonical_id}`
      );
    }

    lookup.set(
      k,
      page
    );
  }
}

const backlinks = new Map();
const missing = new Map();
const resolvedBySource = new Map();

for (const page of pages) {
  backlinks.set(
    page.key,
    new Map()
  );

  resolvedBySource.set(
    page.key,
    new Set()
  );
}

const WIKI_LINK =
  /\[\[([^\[\]\|]+?)(?:\|([^\[\]]+?))?\]\]/g;

for (const page of pages) {
  const resolvedTargets =
    new Map();

  const renderedBody =
    page.sourceBody.replace(
      WIKI_LINK,
      (
        full,
        targetRaw,
        labelRaw
      ) => {
        const targetName =
          String(targetRaw).trim();

        const label =
          String(
            labelRaw ?? targetRaw
          ).trim();

        const target =
          lookup.get(
            `${page.lang}:` +
            normalizeKey(targetName)
          );

        if (!target) {
          const missingKey =
            `${page.lang}:` +
            normalizeKey(targetName);

          if (!missing.has(missingKey)) {
            missing.set(
              missingKey,
              {
                lang:
                  page.lang,
                target:
                  targetName,
                referencedBy:
                  new Map()
              }
            );
          }

          missing
            .get(missingKey)
            .referencedBy
            .set(
              page.key,
              {
                canonical_id:
                  page.canonical_id,
                title:
                  page.title,
                slug:
                  page.slug
              }
            );

          return escapeMarkdownLabel(
            label
          );
        }

        resolvedBySource
          .get(page.key)
          .add(
            target.canonical_id
          );

        if (
          target.key !==
          page.key
        ) {
          resolvedTargets.set(
            target.key,
            target
          );
        }

        return (
          `[${escapeMarkdownLabel(label)}]` +
          `(${relativeWikiHref(page, target)})`
        );
      }
    );

  for (
    const target
    of resolvedTargets.values()
  ) {
    backlinks
      .get(target.key)
      .set(
        page.key,
        {
          canonical_id:
            page.canonical_id,
          title:
            page.title,
          lang:
            page.lang,
          slug:
            page.slug
        }
      );
  }

  const outFile =
    path.join(
      GENERATED_PAGES,
      page.lang,
      `${page.slug}.md`
    );

  await fs.mkdir(
    path.dirname(outFile),
    { recursive: true }
  );

  const outputFrontmatter = {
    canonical_id:
      page.canonical_id,
    title:
      page.title,
    lang:
      page.lang,
    wiki_slug:
      page.slug,
    aliases:
      page.aliases,
    categories:
      page.categories,
    status:
      page.status,
    summary:
      page.summary,
    reading:
      page.reading,
    updated_at:
      page.updated_at,
    source_exists:
      page.source_exists
  };

  await fs.writeFile(
    outFile,
    matter.stringify(
      renderedBody.trimStart(),
      outputFrontmatter
    ),
    'utf8'
  );
}

const unlinked = [];

for (const page of pages) {
  if (!page.source_exists) {
    continue;
  }

  const lintText =
    stripForTermLint(
      page.sourceBody
    );

  const linkedCanonicalIds =
    resolvedBySource.get(page.key);

  for (const target of pages) {
    if (
      target.lang !== page.lang ||
      target.canonical_id ===
        page.canonical_id ||
      linkedCanonicalIds.has(
        target.canonical_id
      )
    ) {
      continue;
    }

    const names = [
      target.title,
      ...target.aliases
    ]
      .filter(Boolean)
      .sort(
        (a, b) =>
          b.length - a.length
      );

    const matched =
      names.find(
        name =>
          containsKnownName(
            lintText,
            name
          )
      );

    if (!matched) {
      continue;
    }

    unlinked.push({
      lang:
        page.lang,
      source_canonical_id:
        page.canonical_id,
      source_title:
        page.title,
      source_slug:
        page.slug,
      target_canonical_id:
        target.canonical_id,
      target_title:
        target.title,
      target_slug:
        target.slug,
      matched_text:
        matched
    });
  }
}

unlinked.sort(
  (a, b) =>
    (
      `${a.lang}:` +
      `${a.source_canonical_id}:` +
      `${a.target_canonical_id}`
    ).localeCompare(
      `${b.lang}:` +
      `${b.source_canonical_id}:` +
      `${b.target_canonical_id}`
    )
);

const metaPages =
  pages
    .map(
      page => ({
        canonical_id:
          page.canonical_id,
        title:
          page.title,
        lang:
          page.lang,
        slug:
          page.slug,
        aliases:
          page.aliases,
        categories:
          page.categories,
        status:
          page.status,
        summary:
          page.summary,
        reading:
          page.reading,
        updated_at:
          page.updated_at,
        source_exists:
          page.source_exists,
        backlinks:
          [
            ...backlinks
              .get(page.key)
              .values()
          ]
            .sort(
              (a, b) =>
                a.title.localeCompare(
                  b.title
                )
            )
      })
    )
    .sort(
      (a, b) =>
        `${a.lang}:${a.title}`
          .localeCompare(
            `${b.lang}:${b.title}`
          )
    );

const missingEntries =
  [...missing.values()]
    .map(
      item => ({
        lang:
          item.lang,
        target:
          item.target,
        referencedBy:
          [
            ...item
              .referencedBy
              .values()
          ].sort(
            (a, b) =>
              a.title.localeCompare(
                b.title
              )
          )
      })
    )
    .sort(
      (a, b) =>
        `${a.lang}:${a.target}`
          .localeCompare(
            `${b.lang}:${b.target}`
          )
    );

const metadata = {
  generated_at_utc:
    new Date().toISOString(),
  registry_term_count:
    registry.length,
  page_count:
    metaPages.length,
  source_page_count:
    metaPages.filter(
      page =>
        page.source_exists
    ).length,
  planned_stub_count:
    metaPages.filter(
      page =>
        !page.source_exists
    ).length,
  missing_link_count:
    missingEntries.length,
  unlinked_known_term_count:
    unlinked.length,
  pages:
    metaPages,
  missing_links:
    missingEntries
};

await fs.writeFile(
  META_PATH,
  `${JSON.stringify(metadata, null, 2)}\n`,
  'utf8'
);

await fs.writeFile(
  TERM_META_PATH,
  `${JSON.stringify(
    {
      version:
        registryRaw.version,
      term_count:
        registry.length,
      terms:
        registry
    },
    null,
    2
  )}\n`,
  'utf8'
);

await fs.writeFile(
  MISSING_JSON,
  `${JSON.stringify(
    missingEntries,
    null,
    2
  )}\n`,
  'utf8'
);

await fs.writeFile(
  UNLINKED_JSON,
  `${JSON.stringify(
    unlinked,
    null,
    2
  )}\n`,
  'utf8'
);

const missingReport = [];

missingReport.push(
  '# CyPedia Missing Wiki Links',
  '',
  `Missing targets: ${missingEntries.length}`,
  ''
);

for (const item of missingEntries) {
  missingReport.push(
    `## [${item.lang}] ${item.target}`
  );

  for (
    const source
    of item.referencedBy
  ) {
    missingReport.push(
      `- ${source.title} ` +
      `(${source.canonical_id})`
    );
  }

  missingReport.push('');
}

await fs.writeFile(
  MISSING_TXT,
  `${missingReport.join('\n')}\n`,
  'utf8'
);

const unlinkedReport = [];

unlinkedReport.push(
  '# CyPedia Unlinked Known Terms',
  '',
  `Unlinked known terms: ${unlinked.length}`,
  ''
);

for (const item of unlinked) {
  unlinkedReport.push(
    `## [${item.lang}] ` +
    `${item.source_title} -> ` +
    `${item.target_title}`
  );

  unlinkedReport.push(
    `- source: ${item.source_canonical_id}`
  );

  unlinkedReport.push(
    `- target: ${item.target_canonical_id}`
  );

  unlinkedReport.push(
    `- matched: ${item.matched_text}`
  );

  unlinkedReport.push('');
}

await fs.writeFile(
  UNLINKED_TXT,
  `${unlinkedReport.join('\n')}\n`,
  'utf8'
);

console.log(
  `TERM_REGISTRY_COUNT=${registry.length}`
);

console.log(
  `WIKI_PAGE_COUNT=${metaPages.length}`
);

console.log(
  `SOURCE_PAGE_COUNT=` +
  metaPages.filter(
    page => page.source_exists
  ).length
);

console.log(
  `PLANNED_STUB_COUNT=` +
  metaPages.filter(
    page => !page.source_exists
  ).length
);

console.log(
  `MISSING_WIKI_LINK_COUNT=` +
  missingEntries.length
);

console.log(
  `UNLINKED_KNOWN_TERM_COUNT=` +
  unlinked.length
);

console.log(
  `META=${path.relative(ROOT, META_PATH)}`
);

console.log(
  `REPORT=${path.relative(ROOT, MISSING_TXT)}`
);

console.log(
  `UNLINKED_REPORT=` +
  path.relative(ROOT, UNLINKED_TXT)
);

console.log(
  'WIKI_GENERATE=PASS'
);
