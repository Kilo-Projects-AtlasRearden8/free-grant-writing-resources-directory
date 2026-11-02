# Free Grant-Writing Resources Directory

A free, beginner-friendly directory of grant-writing resources: funder databases,
proposal templates, budget worksheets, and writing guides.

**Credit:** Asdale Dynamics, LLC
**Scope:** Official links only. Education only.
**License:** MIT (see LICENSE)

## What this is

A static HTML site with client-side search plus a Markdown directory of free
grant-writing resources. Resources are grouped by cause (Education, Arts &
Culture, Environment, Community & Human Services, Health & Healthcare, Science &
Research, Small Business, General) and by type (funder database, writing guide,
proposal template, budget worksheet). Every link points to an official, public
website.

## Who it's for

Educators, nonprofits, small businesses, researchers, and anyone learning how to
write grant proposals. Maintained by Asdale Dynamics, LLC (Indiana, formed Oct
2026) — beginner-friendly AI education, books, guides, and practical tools.

## How to run

Open `index.html` in any modern browser. No build step, no server required.

To run a local preview:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Client-side search filters by title, cause, and resource type without sending
data anywhere.

## Contents

- `index.html` — static site with client-side search
- `assets/css/style.css` — styles
- `assets/js/app.js` — search and rendering logic
- `data/resources.json` — structured resource data
- `resources.md` — Markdown version of the directory
- `LICENSE` — MIT License
- `STATUS.md` — build and verification notes

## Disclaimer

Provided by Asdale Dynamics, LLC for educational purposes only. Not medical,
legal, or financial advice. Verify details directly with each funder before
applying.

## License

MIT License. Copyright (c) 2026 Asdale Dynamics, LLC.
