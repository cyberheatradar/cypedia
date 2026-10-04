#!/usr/bin/env bash
set -Eeuo pipefail
umask 022

ROOT="$(
  cd "$(dirname "${BASH_SOURCE[0]}")/.."
  pwd
)"

cd "$ROOT"

test -d .git

CURRENT_BRANCH="$(git branch --show-current)"

if [ "$CURRENT_BRANCH" != 'main' ]; then
  echo "ERROR: current branch is not main: $CURRENT_BRANCH"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo 'ERROR: working tree is not clean.'
  git status --short
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo 'ERROR: git remote origin is not configured.'
  exit 1
fi

REMOTE="$(git remote get-url origin)"

echo '===== CYPEDIA DEPLOY ====='
echo "SOURCE_BRANCH=$CURRENT_BRANCH"
echo "REMOTE=$REMOTE"

echo
echo '===== RELEASE GATE ====='

CYPEDIA_BASE='/cypedia/' \
  ./scripts/release-gate.sh

TMP="$(mktemp -d /tmp/cypedia-gh-pages.XXXXXXXX)"

cleanup() {
  rm -rf "$TMP"
}

trap cleanup EXIT

cp -a dist/. "$TMP/"

cd "$TMP"

git init -q
git checkout -q -b gh-pages

git add -A

git \
  -c user.name='CyPedia Deploy' \
  -c user.email='deploy@cypedia.local' \
  commit \
  -q \
  -m "Deploy CyPedia $(date -u '+%Y-%m-%dT%H:%M:%SZ')"

git remote add origin "$REMOTE"

git push \
  --force \
  origin \
  gh-pages:gh-pages

echo
echo 'CYPEDIA_GITHUB_PAGES_DEPLOY=PASS'
