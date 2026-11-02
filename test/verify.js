const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
let failures = 0;
let passes = 0;

function assert(condition, message) {
  if (condition) {
    passes += 1;
    console.log(`  PASS: ${message}`);
  } else {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function read(relative) {
  return fs.readFileSync(path.join(ROOT, relative), "utf8");
}

// ---------------------------------------------------------------
// 1. resources.json
// ---------------------------------------------------------------
console.log("\n== resources.json ==");
const jsonText = read("data/resources.json");
let resources;
assert(
  (() => {
    try {
      resources = JSON.parse(jsonText);
      return true;
    } catch (e) {
      return false;
    }
  })(),
  "resources.json is valid JSON"
);

if (resources) {
  assert(Array.isArray(resources), "resources.json is an array");
  assert(resources.length > 0, "resources.json is not empty");

  const REQUIRED_FIELDS = [
    "id",
    "title",
    "description",
    "url",
    "cause",
    "category",
    "type",
    "cost",
    "source_type",
  ];

  const ids = new Set();
  const validTypes = new Set([
    "funder_database",
    "writing_guide",
    "proposal_template",
    "budget_worksheet",
  ]);

  resources.forEach((resource, i) => {
    const prefix = `resource[${i}] (${resource.id || "<no id>"})`;

    REQUIRED_FIELDS.forEach((field) => {
      assert(
        Object.prototype.hasOwnProperty.call(resource, field) &&
          resource[field] !== "" &&
          resource[field] !== null,
        `${prefix} has non-empty "${field}"`
      );
    });

    if (resource.id) {
      assert(!ids.has(resource.id), `${prefix} id "${resource.id}" is unique`);
      ids.add(resource.id);
    }

    if (resource.url) {
      assert(
        resource.url.startsWith("https://"),
        `${prefix} url "${resource.url}" is HTTPS`
      );
    }

    if (resource.cost) {
      assert(
        resource.cost.toLowerCase() === "free",
        `${prefix} cost is "Free"`
      );
    }

    if (resource.source_type) {
      assert(
        resource.source_type === "Official",
        `${prefix} source_type is "Official"`
      );
    }

    if (resource.type) {
      assert(
        validTypes.has(resource.type),
        `${prefix} type "${resource.type}" is a recognized type`
      );
    }
  });

  console.log(`  Total resources: ${resources.length}`);
}

// ---------------------------------------------------------------
// 2. LICENSE copyright line
// ---------------------------------------------------------------
console.log("\n== LICENSE ==");
const license = read("LICENSE");
assert(
  license.includes("Copyright (c) 2026 Asdale Dynamics, LLC"),
  "LICENSE contains exact copyright line: Copyright (c) 2026 Asdale Dynamics, LLC"
);
assert(
  license.includes("MIT License"),
  "LICENSE is an MIT License"
);

// ---------------------------------------------------------------
// 3. README credit
// ---------------------------------------------------------------
console.log("\n== README.md ==");
const readme = read("README.md");
assert(
  readme.includes("Asdale Dynamics, LLC"),
  "README credits Asdale Dynamics, LLC"
);
assert(
  readme.includes("Copyright (c) 2026 Asdale Dynamics, LLC"),
  "README includes copyright line"
);

// ---------------------------------------------------------------
// 4. app.js syntax
// ---------------------------------------------------------------
console.log("\n== assets/js/app.js ==");
const { execSync } = require("child_process");
let appJsOk = true;
try {
  execSync("node --check assets/js/app.js", {
    cwd: ROOT,
    stdio: "pipe",
  });
} catch (e) {
  appJsOk = false;
}
assert(appJsOk, "assets/js/app.js passes Node syntax check");

// ---------------------------------------------------------------
// 5. index.html structure
// ---------------------------------------------------------------
console.log("\n== index.html ==");
const html = read("index.html");
assert(html.includes('<link rel="stylesheet" href="assets/css/style.css"'), "index.html links style.css");
assert(html.includes('<script src="assets/js/app.js"></script>'), "index.html loads app.js");
assert(html.includes('id="search-input"'), "index.html has search input");
assert(html.includes('id="results-container"'), "index.html has results container");
assert(html.includes("Asdale Dynamics, LLC"), "index.html credits Asdale Dynamics, LLC");

// ---------------------------------------------------------------
// 6. resources.md mirrors JSON
// ---------------------------------------------------------------
console.log("\n== resources.md ==");
const md = read("resources.md");
assert(md.includes("# Free Grant-Writing Resources Directory"), "resources.md has title");
assert(md.includes("Asdale Dynamics, LLC"), "resources.md credits Asdale Dynamics, LLC");

// ---------------------------------------------------------------
// 7. No .github/workflows
// ---------------------------------------------------------------
console.log("\n== Safety checks ==");
assert(
  !fs.existsSync(path.join(ROOT, ".github", "workflows")),
  "No .github/workflows directory present"
);

// ---------------------------------------------------------------
// Summary
// ---------------------------------------------------------------
console.log(`\n== Summary: ${passes} passed, ${failures} failed ==`);
process.exit(failures === 0 ? 0 : 1);
