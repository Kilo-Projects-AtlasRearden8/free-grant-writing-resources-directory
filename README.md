# Free Grant-Writing Resources Directory

A free, beginner-friendly directory of grant-writing resources: funder databases,
proposal templates, budget worksheets, and writing guides.

**Credit:** Asdale Dynamics, LLC  
**Scope:** Official links only. Education only.  
**License:** MIT (see LICENSE)  
**Copyright:** Copyright (c) 2026 Asdale Dynamics, LLC

---

## What this is

This is a free directory of grant-writing resources. It collects the kinds of
things anyone writing a grant proposal needs: places to find funders, templates
for proposals, worksheets for budgets, and guides on how to write well.

Everything is grouped by cause (for example, Education, Arts & Culture, Health &
Healthcare) and by resource type. Every link points to an official, public
website — no third-party aggregators, no paywalled directories, no guesswork.

There are two versions of the same directory:

- A static HTML website with client-side search (`index.html`)
- A Markdown file you can read or print (`resources.md`)

No account, no signup, and nothing is sent anywhere when you use the search.

---

## Who it's for

This directory is for people who are new to grant writing and want a trusted
place to start. That might include:

- Educators and school staff
- Nonprofit staff and volunteers
- Small business owners
- Researchers
- Anyone learning how to write a grant proposal

It is maintained by **Asdale Dynamics, LLC** (Indiana, formed October 2026),
which publishes beginner-friendly education, books, guides, and practical tools.

---

## What's inside

### Resource types

| Type | What it is |
|---|---|
| Funder database | A searchable list of grantmakers and funding opportunities |
| Writing guide | Step-by-step guidance on writing and submitting grant proposals |
| Proposal template | A fill-in-the-blank outline for a grant or project proposal |
| Budget worksheet | A worksheet for planning a project budget |

### Causes

Resources are grouped by cause:

- General / All causes
- Education
- Arts & Culture
- Environment & Conservation
- Community & Human Services
- Health & Healthcare
- Science & Research
- Small Business

---

## How to use it

### Option 1: Use the website (recommended)

1. Open `index.html` in any modern web browser.
2. Use the search box to type a keyword (a title, a cause, or a resource type).
3. Click a cause tab or a type chip to narrow the results further.
4. Click any resource title to visit its official website.

The search runs entirely in your browser. Nothing is saved, stored, or sent to a
server.

### Option 2: Read the Markdown file

Open `resources.md` in any text editor or Markdown reader. It contains the same
resources as plain-text tables, grouped by cause.

---

## How to run it locally

No build step and no server are required. Just open `index.html` in your browser.

If you'd like to preview it through a local web server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

---

## How it works

- `index.html` — the page you open
- `assets/css/style.css` — the visual design
- `assets/js/app.js` — loads `data/resources.json`, renders the cards, and runs
  the search and filters entirely in your browser
- `data/resources.json` — the structured list of resources
- `resources.md` — the Markdown version of the same directory

---

## Disclaimer

Provided by Asdale Dynamics, LLC for educational purposes only. This is not
medical, legal, or financial advice. Always confirm program details, deadlines,
and eligibility directly with each funder before applying.

---

## License

MIT License. Copyright (c) 2026 Asdale Dynamics, LLC. See LICENSE.
