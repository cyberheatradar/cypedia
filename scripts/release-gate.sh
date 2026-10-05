#!/usr/bin/env bash
set -Eeuo pipefail
umask 022

ROOT="$(
  cd "$(dirname "${BASH_SOURCE[0]}")/.."
  pwd
)"

cd "$ROOT"

MAX_BYTES=$((850 * 1024 * 1024))

echo '===== CYPEDIA RELEASE GATE ====='

npm run build

echo
echo '===== REQUIRED ARTIFACTS ====='

for p in \
  dist/.nojekyll \
  dist/404.html \
  dist/pagefind/pagefind.js \
  build-reports/missing-wiki-links.json \
  build-reports/unlinked-known-terms.json \
  build-reports/alias-redirects.json \
  src/generated/wiki-meta.json \
  src/generated/term-registry.json
do
  echo "CHECK=$p"
  test -e "$p"
done

echo
echo '===== CORE ROUTES ====='

for p in \
  dist/ja/index.html \
  dist/en/index.html \
  dist/ja/kerberos/index.html \
  dist/en/kerberos/index.html \
  dist/ja/search/index.html \
  dist/en/search/index.html
do
  echo "CHECK=$p"
  test -f "$p"
done

echo
echo '===== ALIAS ROUTES ====='

for p in \
  dist/ja/tgt/index.html \
  dist/en/tgt/index.html \
  dist/ja/ad/index.html \
  dist/en/ad/index.html \
  dist/ja/kerberoast/index.html \
  dist/en/kerberoast/index.html
do
  echo "CHECK=$p"
  test -f "$p"
done

echo
echo '===== TERM REGISTRY ROUTES ====='

for p in \
  dist/ja/key-distribution-center/index.html \
  dist/ja/service-ticket/index.html \
  dist/ja/service-account/index.html \
  dist/ja/service-principal-name/index.html \
  dist/ja/as-rep-roasting/index.html \
  dist/ja/golden-ticket/index.html \
  dist/ja/silver-ticket/index.html \
  dist/ja/krbtgt/index.html \
  dist/ja/pkinit/index.html \
  dist/ja/privilege-attribute-certificate/index.html
do
  echo "CHECK=$p"
  test -f "$p"
done

echo
echo '===== SIZE GATE ====='

DIST_BYTES="$(
  du -sb dist |
  awk '{print $1}'
)"

DIST_HUMAN="$(
  du -sh dist |
  awk '{print $1}'
)"

echo "DIST_BYTES=$DIST_BYTES"
echo "DIST_SIZE=$DIST_HUMAN"
echo "LIMIT_BYTES=$MAX_BYTES"

if [ "$DIST_BYTES" -ge "$MAX_BYTES" ]; then
  echo 'DIST_SIZE_GATE=FAIL'
  exit 1
fi

echo 'DIST_SIZE_GATE=PASS'

echo
echo '===== CONTENT STATUS ====='

SOURCE_STUB_COUNT="$(
  (
    grep \
      -R \
      -h \
      '^status:[[:space:]]*stub' \
      content/ja \
      content/en \
      2>/dev/null || true
  ) |
  wc -l
)"

REGISTRY_TERM_COUNT="$(
  node -e "
    const x=require(
      './src/generated/wiki-meta.json'
    );
    console.log(x.registry_term_count);
  "
)"

SOURCE_PAGE_COUNT="$(
  node -e "
    const x=require(
      './src/generated/wiki-meta.json'
    );
    console.log(x.source_page_count);
  "
)"

PLANNED_STUB_COUNT="$(
  node -e "
    const x=require(
      './src/generated/wiki-meta.json'
    );
    console.log(x.planned_stub_count);
  "
)"

MISSING_COUNT="$(
  node -e "
    const x=require(
      './build-reports/missing-wiki-links.json'
    );
    console.log(x.length);
  "
)"

UNLINKED_COUNT="$(
  node -e "
    const x=require(
      './build-reports/unlinked-known-terms.json'
    );
    console.log(x.length);
  "
)"

ALIAS_COUNT="$(
  node -e "
    const x=require(
      './build-reports/alias-redirects.json'
    );
    console.log(x.generated_count);
  "
)"

echo "TERM_REGISTRY_COUNT=$REGISTRY_TERM_COUNT"
echo "SOURCE_PAGE_COUNT=$SOURCE_PAGE_COUNT"
echo "SOURCE_STUB_PAGE_COUNT=$SOURCE_STUB_COUNT"
echo "PLANNED_STUB_PAGE_COUNT=$PLANNED_STUB_COUNT"
echo "MISSING_WIKI_LINK_COUNT=$MISSING_COUNT"
echo "UNLINKED_KNOWN_TERM_COUNT=$UNLINKED_COUNT"
echo "ALIAS_REDIRECT_COUNT=$ALIAS_COUNT"

if [ "$MISSING_COUNT" -ne 0 ]; then
  echo
  cat build-reports/missing-wiki-links.txt
  echo 'MISSING_WIKI_LINK_GATE=FAIL'
  exit 1
fi

echo 'MISSING_WIKI_LINK_GATE=PASS'

if [ "$UNLINKED_COUNT" -ne 0 ]; then
  echo
  cat build-reports/unlinked-known-terms.txt
  echo 'UNLINKED_KNOWN_TERM_GATE=FAIL'
  exit 1
fi

echo 'UNLINKED_KNOWN_TERM_GATE=PASS'

echo
echo 'NOTE: source/planned stubs are permitted during dictionary expansion.'

echo
echo '===== OUTPUT ====='

echo "HTML_PAGE_COUNT=$(
  find dist \
    -type f \
    -name '*.html' |
  wc -l
)"

echo 'CYPEDIA_RELEASE_GATE=PASS'
