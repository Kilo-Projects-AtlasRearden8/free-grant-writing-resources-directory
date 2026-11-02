# STATUS

## What was built

A freebies directory of free grant-writing resources, delivered as both a
Markdown directory (`resources.md`) and a static HTML site (`index.html`) with
client-side search.

**Contents**
- `index.html` — static site with client-side search, cause tabs, and type filters
- `assets/css/style.css` — responsive styles
- `assets/js/app.js` — loads `data/resources.json`, renders resource cards grouped
  by cause, filters by search term / cause / resource type entirely in the browser
- `data/resources.json` — 19 structured resources
- `resources.md` — Markdown version of the directory (table by cause)
- `README.md` — project overview, how to run, credits
- `LICENSE` — MIT License
- `STATUS.md` — this file

**Resources** (official links only, education only), grouped by cause:
General, Education, Arts & Culture, Environment & Conservation, Community &
Human Services, Health & Healthcare, Science & Research, Small Business.

**Types:** funder database, writing guide, proposal template, budget worksheet.

## How to run

No build step, no server required. Open `index.html` in any modern browser.

Optional local preview:
```
python3 -m http.server 8000
# visit http://localhost:8000
```

Client-side search filters by title, cause, and resource type and sends no data
anywhere.

## Verification results

- `data/resources.json`: valid JSON, 19 resources
- `index.html` / `assets/css/style.css` / `assets/js/app.js`: all serve HTTP 200 via local server
- HTML parses cleanly (no unbalanced tags)
- All external links are HTTPS to official domains (.gov / .org)
- `app.js` passes `node --check` syntax validation
- Functional render test (DOM stub + real fetch): 19 resource cards rendered,
  `results-count` shows 19, search for "nih" correctly narrows to 2 results
- `LICENSE` copyright line exactly: `Copyright (c) 2026 Asdale Dynamics, LLC`
- `README.md` credits Asdale Dynamics, LLC
- No secrets, API keys, or personal data in files
- No `.github/workflows` present
- Git initialized and committed as `eed2738` (plain message, no co-author trailers); nothing pushed, no remote created

## Known gaps

- No automated test suite included (verified manually via functional render test)
- Link freshness is not automatically validated (external funder URLs should be
  spot-checked periodically)
- No dark mode or print stylesheet
- `resources.md` and `data/resources.json` are maintained separately; keep them
  in sync when adding resources

## Credit

Built and maintained by Asdale Dynamics, LLC (Indiana, formed Oct 2026).
Education only. Not medical, legal, or financial advice.
