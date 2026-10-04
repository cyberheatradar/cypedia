import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const META = path.join(ROOT, 'src', 'generated', 'wiki-meta.json');
const DIST = path.join(ROOT, 'dist');
const REPORT = path.join(ROOT, 'build-reports', 'alias-redirects.json');

const metadata = JSON.parse(
  await fs.readFile(META, 'utf8')
);

function slugifyAlias(value) {
  return String(value)
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const canonicalRoutes = new Set(
  metadata.pages.map(
    page => `${page.lang}:${page.slug}`
  )
);

const aliasRoutes = new Map();
const generated = [];
const skipped = [];

for (const page of metadata.pages) {
  for (const alias of page.aliases ?? []) {
    const aliasSlug = slugifyAlias(alias);

    if (!aliasSlug) {
      skipped.push({
        lang: page.lang,
        alias,
        reason: 'alias cannot be converted to an ASCII URL slug'
      });
      continue;
    }

    const routeKey = `${page.lang}:${aliasSlug}`;
    const canonicalKey = `${page.lang}:${page.slug}`;

    if (routeKey === canonicalKey) {
      continue;
    }

    if (canonicalRoutes.has(routeKey)) {
      throw new Error(
        `Alias conflicts with canonical route: ${routeKey}`
      );
    }

    const existing = aliasRoutes.get(routeKey);

    if (
      existing &&
      existing.canonical_id !== page.canonical_id
    ) {
      throw new Error(
        `Alias route collision: ${routeKey} -> ` +
        `${existing.canonical_id} / ${page.canonical_id}`
      );
    }

    aliasRoutes.set(routeKey, page);
  }
}

for (const [routeKey, page] of aliasRoutes) {
  const [lang, aliasSlug] = routeKey.split(':');

  const from = path.posix.join(lang, aliasSlug);
  const to = path.posix.join(lang, page.slug);

  let relative = path.posix.relative(from, to);

  if (!relative.startsWith('.')) {
    relative = `./${relative}`;
  }

  relative = `${relative}/`;

  const outDir = path.join(
    DIST,
    lang,
    aliasSlug
  );

  await fs.mkdir(outDir, { recursive: true });

  const title = escapeHtml(page.title);
  const target = escapeHtml(relative);

  const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta http-equiv="refresh" content="0; url=${target}">
<meta name="robots" content="noindex">
<title>${title} - CyPedia</title>
<script>
location.replace(${JSON.stringify(relative)});
</script>
</head>
<body>
<p>
Redirecting to
<a href="${target}">${title}</a>
</p>
</body>
</html>
`;

  await fs.writeFile(
    path.join(outDir, 'index.html'),
    html,
    'utf8'
  );

  generated.push({
    lang,
    alias: aliasSlug,
    source_alias:
      Object.keys(page).length ? undefined : undefined,
    canonical_id: page.canonical_id,
    target_slug: page.slug
  });
}

await fs.mkdir(
  path.dirname(REPORT),
  { recursive: true }
);

await fs.writeFile(
  REPORT,
  JSON.stringify(
    {
      generated_count: generated.length,
      skipped_count: skipped.length,
      generated,
      skipped
    },
    null,
    2
  ) + '\n',
  'utf8'
);

console.log(
  `ALIAS_REDIRECT_COUNT=${generated.length}`
);
console.log(
  `ALIAS_REDIRECT_SKIPPED=${skipped.length}`
);
console.log('ALIAS_REDIRECT_GENERATE=PASS');
