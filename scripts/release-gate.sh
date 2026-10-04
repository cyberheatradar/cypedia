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
  build-reports/alias-redirects.json
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

STUB_COUNT="$(
  grep \
    -R \
    -h \
    '^status:[[:space:]]*stub' \
    content/ja \
    content/en \
    2>/dev/null |
  wc -l
)"

MISSING_COUNT="$(
  node -e "
    const x=require(
      './build-reports/missing-wiki-links.json'
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

echo "STUB_PAGE_COUNT=$STUB_COUNT"
echo "MISSING_WIKI_LINK_COUNT=$MISSING_COUNT"
echo "ALIAS_REDIRECT_COUNT=$ALIAS_COUNT"

echo
echo 'NOTE: STUB and MISSING links are advisory during development.'

echo
echo '===== OUTPUT ====='

echo "HTML_PAGE_COUNT=$(
  find dist \
    -type f \
    -name '*.html' |
  wc -l
)"

echo 'CYPEDIA_RELEASE_GATE=PASS'
