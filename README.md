# CyPedia

The Cyber Security Wiki

CyPedia is a static cybersecurity dictionary and encyclopedia.

Development and builds are performed on a local Ubuntu Server VM.

The generated static site is intended for GitHub Pages.

Important files:

- docs/CYPEDIA_SPEC.md
- scripts/release-gate.sh
- scripts/deploy-gh-pages.sh

Local build command:

npm ci && npm run build

Release Gate command:

./scripts/release-gate.sh

Static preview command:

npm run serve:static

Japanese content:

content/ja/

English content:

content/en/
