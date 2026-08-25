// DealSprint CI checks. Runs via the pre-push hook before every push.
// Gate 1: copy gate (em/en dashes + banned stock words) must be zero.
// Gate 2: no merge conflict markers.
// Gate 3: required product markers exist in each file.
const fs = require("fs");
const path = require("path");

const BANNED = /—|–|\bleverage\b|\bseamless\b|\bempower\b|\bunlock\b|\brobust\b|\bactionable\b|\bdata-driven\b|\bsolutions\b/g;

const files = {
  "index.html": [/BUILD \d/, /DealSprint/i, /<\/html>/],
  "app.html": [/DealSprint/i, /STRIPE_PAYMENT_LINK_URL/, /handlePaymentReturn/, /<\/html>/]
};

let failures = 0;
for (const [file, required] of Object.entries(files)) {
  const full = path.join(__dirname, "..", file);
  if (!fs.existsSync(full)) { console.log("FAIL missing file:", file); failures++; continue; }
  const text = fs.readFileSync(full, "utf8");
  const hits = text.match(BANNED) || [];
  if (hits.length) { console.log(`FAIL ${file}: copy-gate violations ->`, [...new Set(hits)]); failures += hits.length; }
  if (/^<{7} /m.test(text)) { console.log("FAIL", file, "conflict markers"); failures++; }
  for (const re of required) {
    if (!re.test(text)) { console.log("FAIL", file, "missing marker", re); failures++; }
  }
  console.log("checked", file);
}

if (failures) { console.log("CHECKS FAILED with", failures, "issue(s)"); process.exit(1); }
console.log("CHECKS PASSED: copy gate clean, markers present.");
