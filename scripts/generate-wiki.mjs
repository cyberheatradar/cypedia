import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();

const CONTENT_ROOT = path.join(ROOT, 'content');
const GENERATED_ROOT = path.join(ROOT, 'src', 'generated');
const GENERATED_PAGES = path.join(GENERATED_ROOT, 'pages');
const META_PATH = path.join(GENERATED_ROOT, 'wiki-meta.json');

const REPORT_ROOT = path.join(ROOT, 'build-reports');
const MISSING_TXT = path.join(REPORT_ROOT, 'missing-wiki-links.txt');
const MISSING_JSON = path.join(REPORT_ROOT, 'missing-wiki-links.json');

const LANGS = ['ja', 'en'];

function normalizeKey(value) {
  return String(value)
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en-US');
}

function assertString(value, name, file) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${file}: ${name} must be a non-empty string`);
  }
}

function validateSlug(slug, file) {
  if (
    slug.startsWith('/') ||
    slug.endsWith('/') ||
    slug.includes('..') ||
    !/^[a-z0-9][a-z0-9/_-]*$/.test(slug)
  ) {
    throw new Error(`${file}: invalid slug: ${slug}`);
  }
}

function escapeMarkdownLabel(value) {
  return String(value)
    .replaceAll('\\', '\\\\')
    .replaceAll(']', '\\]');
}

async function walk(dir) {
  const result = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const p = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result.push(...await walk(p));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      result.push(p);
    }
  }

  return result;
}

function relativeWikiHref(source, target) {
  const from = path.posix.join('/', source.lang, source.slug);
  const to = path.posix.join('/', target.lang, target.slug);

  let relative = path.posix.relative(from, to);

  if (!relative) {
    return './';
  }

  if (!relative.startsWith('.')) {
    relative = `./${relative}`;
  }

  return `${relative}/`;
}

await fs.rm(GENERATED_ROOT, { recursive: true, force: true });
await fs.mkdir(GENERATED_PAGES, { recursive: true });
await fs.mkdir(REPORT_ROOT, { recursive: true });

const pages = [];

for (const lang of LANGS) {
  const dir = path.join(CONTENT_ROOT, lang);

  try {
    await fs.access(dir);
  } catch {
    continue;
  }

  for (const file of await walk(dir)) {
    const raw = await fs.readFile(file, 'utf8');
    const parsed = matter(raw);
    const data = parsed.data ?? {};

    assertString(data.canonical_id, 'canonical_id', file);
    assertString(data.title, 'title', file);
    assertString(data.lang, 'lang', file);
    assertString(data.slug, 'slug', file);

    if (data.lang !== lang) {
      throw new Error(
        `${file}: lang=${data.lang} does not match directory lang=${lang}`
      );
    }

    validateSlug(data.slug, file);

    const aliases = Array.isArray(data.aliases)
      ? data.aliases.map(String).map(v => v.trim()).filter(Boolean)
      : [];

    const categories = Array.isArray(data.categories)
      ? data.categories.map(String).map(v => v.trim()).filter(Boolean)
      : [];

    const reading =
      typeof data.reading === 'string'
        ? data.reading.trim()
        : '';

    const stat = await fs.stat(file);

    pages.push({
      key: `${lang}:${data.canonical_id}`,
      canonical_id: data.canonical_id,
      title: data.title.trim(),
      lang,
      slug: data.slug.trim(),
      aliases,
      categories,
      status: typeof data.status === 'string' ? data.status : 'draft',
      summary: typeof data.summary === 'string' ? data.summary : '',
      reading,
      updated_at: stat.mtime.toISOString(),
      file,
      sourceBody: parsed.content
    });
  }
}

const keySet = new Set();
const slugSet = new Set();

for (const page of pages) {
  if (keySet.has(page.key)) {
    throw new Error(`Duplicate page key: ${page.key}`);
  }
  keySet.add(page.key);

  const slugKey = `${page.lang}:${page.slug}`;

  if (slugSet.has(slugKey)) {
    throw new Error(`Duplicate slug: ${slugKey}`);
  }
  slugSet.add(slugKey);
}

const lookup = new Map();

for (const page of pages) {
  for (const name of [page.title, ...page.aliases]) {
    const k = `${page.lang}:${normalizeKey(name)}`;

    if (lookup.has(k) && lookup.get(k).key !== page.key) {
      throw new Error(
        `Ambiguous title/alias "${name}" in ${page.lang}: ` +
        `${lookup.get(k).canonical_id} vs ${page.canonical_id}`
      );
    }

    lookup.set(k, page);
  }
}

const backlinks = new Map();
const missing = new Map();

for (const page of pages) {
  backlinks.set(page.key, new Map());
}

const WIKI_LINK =
  /\[\[([^\[\]\|]+?)(?:\|([^\[\]]+?))?\]\]/g;

for (const page of pages) {
  const resolvedTargets = new Map();

  const renderedBody = page.sourceBody.replace(
    WIKI_LINK,
    (full, targetRaw, labelRaw) => {
      const targetName = String(targetRaw).trim();
      const label = String(labelRaw ?? targetRaw).trim();

      const target =
        lookup.get(`${page.lang}:${normalizeKey(targetName)}`);

      if (!target) {
        const missingKey =
          `${page.lang}:${normalizeKey(targetName)}`;

        if (!missing.has(missingKey)) {
          missing.set(missingKey, {
            lang: page.lang,
            target: targetName,
            referencedBy: new Map()
          });
        }

        missing.get(missingKey).referencedBy.set(page.key, {
          canonical_id: page.canonical_id,
          title: page.title,
          slug: page.slug
        });

        return escapeMarkdownLabel(label);
      }

      if (target.key !== page.key) {
        resolvedTargets.set(target.key, target);
      }

      return `[${escapeMarkdownLabel(label)}](${relativeWikiHref(page, target)})`;
    }
  );

  for (const target of resolvedTargets.values()) {
    backlinks.get(target.key).set(page.key, {
      canonical_id: page.canonical_id,
      title: page.title,
      lang: page.lang,
      slug: page.slug
    });
  }

  const outFile = path.join(
    GENERATED_PAGES,
    page.lang,
    `${page.slug}.md`
  );

  await fs.mkdir(path.dirname(outFile), { recursive: true });

  const outputFrontmatter = {
    canonical_id: page.canonical_id,
    title: page.title,
    lang: page.lang,
    wiki_slug: page.slug,
    aliases: page.aliases,
    categories: page.categories,
    status: page.status,
    summary: page.summary,
    reading: page.reading,
    updated_at: page.updated_at
  };

  await fs.writeFile(
    outFile,
    matter.stringify(renderedBody.trimStart(), outputFrontmatter),
    'utf8'
  );
}

const metaPages = pages
  .map(page => ({
    canonical_id: page.canonical_id,
    title: page.title,
    lang: page.lang,
    slug: page.slug,
    aliases: page.aliases,
    categories: page.categories,
    status: page.status,
    summary: page.summary,
    reading: page.reading,
    updated_at: page.updated_at,
    backlinks: [...backlinks.get(page.key).values()]
      .sort((a, b) => a.title.localeCompare(b.title))
  }))
  .sort((a, b) =>
    `${a.lang}:${a.title}`.localeCompare(`${b.lang}:${b.title}`)
  );

const missingEntries = [...missing.values()]
  .map(item => ({
    lang: item.lang,
    target: item.target,
    referencedBy: [...item.referencedBy.values()]
      .sort((a, b) => a.title.localeCompare(b.title))
  }))
  .sort((a, b) =>
    `${a.lang}:${a.target}`.localeCompare(`${b.lang}:${b.target}`)
  );

const metadata = {
  generated_at_utc: new Date().toISOString(),
  page_count: metaPages.length,
  missing_link_count: missingEntries.length,
  pages: metaPages,
  missing_links: missingEntries
};

await fs.writeFile(
  META_PATH,
  `${JSON.stringify(metadata, null, 2)}\n`,
  'utf8'
);

await fs.writeFile(
  MISSING_JSON,
  `${JSON.stringify(missingEntries, null, 2)}\n`,
  'utf8'
);

const report = [];

report.push('# CyPedia Missing Wiki Links');
report.push('');
report.push(`Missing targets: ${missingEntries.length}`);
report.push('');

for (const item of missingEntries) {
  report.push(`## [${item.lang}] ${item.target}`);

  for (const source of item.referencedBy) {
    report.push(
      `- ${source.title} (${source.canonical_id})`
    );
  }

  report.push('');
}

await fs.writeFile(
  MISSING_TXT,
  `${report.join('\n')}\n`,
  'utf8'
);

console.log(`WIKI_PAGE_COUNT=${metaPages.length}`);
console.log(`MISSING_WIKI_LINK_COUNT=${missingEntries.length}`);
console.log(`META=${path.relative(ROOT, META_PATH)}`);
console.log(`REPORT=${path.relative(ROOT, MISSING_TXT)}`);
console.log('WIKI_GENERATE=PASS');
