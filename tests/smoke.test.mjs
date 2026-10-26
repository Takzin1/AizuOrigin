import assert from "node:assert/strict";
import { createHash, webcrypto } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const source = readFileSync(fileURLToPath(new URL("../app.js", import.meta.url)), "utf8");
const html = readFileSync(fileURLToPath(new URL("../index.html", import.meta.url)), "utf8");
const css = readFileSync(fileURLToPath(new URL("../styles.css", import.meta.url)), "utf8");

function harness(initialHash = "#/") {
  const nodes = new Map();
  const documentListeners = {};
  const windowListeners = {};
  const storage = new Map();
  function element(id) {
    if (!nodes.has(id)) {
      const listeners = {};
      nodes.set(id, {
        innerHTML: "", textContent: "", value: "", listeners,
        classList: { add() {}, remove() {}, toggle() {} },
        setAttribute() {}, removeAttribute() {},
        addEventListener(name, callback) { listeners[name] = callback; },
        focus() {}, select() {}
      });
    }
    return nodes.get(id);
  }
  const document = {
    documentElement: { lang: "ja" },
    getElementById: element,
    querySelectorAll() { return []; },
    addEventListener(name, callback) { documentListeners[name] = callback; }
  };
  const location = { hash: initialHash };
  const localStorage = {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, value); }
  };
  const window = {
    crypto: webcrypto, TextEncoder, isSecureContext: true,
    addEventListener(name, callback) { windowListeners[name] = callback; },
    scrollTo() {}
  };
  vm.runInNewContext(source, {
    document, location, localStorage, window, navigator: {},
    TextEncoder, setTimeout() { return 1; }, clearTimeout() {},
    console
  }, { filename: "app.js", timeout: 5000 });
  function go(hash) { location.hash = hash; windowListeners.hashchange(); }
  return { nodes, document, documentListeners, windowListeners, storage, go, location, element };
}

test("static shell has local CSS/JS and accessible navigation", () => {
  assert.match(html, /lang="ja"/);
  assert.match(html, /id="app"/);
  assert.match(html, /id="lang-toggle"/);
  assert.match(html, /href="\.\/styles\.css"/);
  assert.match(html, /src="\.\/app\.js"/);
  assert.match(css, /@media\(max-width:760px\)/);
});

test("main routes render in Japanese and English", () => {
  const h = harness();
  assert.match(h.element("app").innerHTML, /AO-DEMO-001/);
  h.go("#/catalog");
  assert.match(h.element("app").innerHTML, /catalog-search/);
  h.go("#/product/lacquer-bowl");
  assert.match(h.element("app").innerHTML, /data-add="lacquer-bowl"/);
  h.go("#/story");
  assert.match(h.element("app").innerHTML, /story-principles/);
  h.go("#/inquiry");
  assert.match(h.element("app").innerHTML, /inquiry-summary/);
  h.element("lang-toggle").listeners.click();
  assert.equal(h.document.documentElement.lang, "en");
  assert.match(h.element("app").innerHTML, /Your Shortlist/);
  h.go("#/unknown-route");
  assert.match(h.element("app").innerHTML, /Page not found/);
  h.go("#/%E0%A4%A");
  assert.match(h.element("app").innerHTML, /Page not found/);
});

test("shortlist persists only to browser-local storage", () => {
  const h = harness("#/product/akabeko");
  h.documentListeners.click({
    target: { closest(selector) {
      return selector === "[data-add]" ? { getAttribute() { return "akabeko"; } } : null;
    } }
  });
  assert.equal(h.element("bag-count").textContent, 1);
  h.go("#/inquiry");
  assert.match(h.element("app").innerHTML, /AO-DEMO-003/);
  assert.deepEqual(JSON.parse(h.storage.get("aizuorigin-inquiry-v05")), ["akabeko"]);
});

test("sample fingerprints correctly match their canonical records", () => {
  const samples = [
    ["AO-DEMO-001", "Demo Workshop A", "Lacquerware", "506bff1f69ec7f8093966ead24cb220adb41db67f1266aa20e8cf689851fc510"],
    ["AO-DEMO-002", "Demo Studio B", "Aizu cotton", "6ce24be21a6b163e85086f8cbc303dd2cded392e788b94107a040253e36d9910"],
    ["AO-DEMO-003", "Demo Maker C", "Papier-mache", "6d1579a0a01eb7cbbeb44bd20b9422b226c082194fbfa8aed63234df59250294"]
  ];
  for (const [id, maker, material, expected] of samples) {
    assert.ok(source.includes(id) && source.includes(expected));
    const value = [id, maker, "Aizuwakamatsu, Fukushima", "2026", material, "v1"].join("|");
    assert.equal(createHash("sha256").update(value).digest("hex"), expected);
  }
});

test("passport computes demo integrity check (not physical authentication)", async () => {
  const h = harness("#/passport/AO-DEMO-001");
  await new Promise(resolve => setImmediate(resolve));
  const output = h.element("passport-result").innerHTML;
  assert.match(output, /506bff1f69ec7f8093966ead24cb220adb41db67f1266aa20e8cf689851fc510/);
  assert.match(output, /good/);
  assert.match(output, /現物の真贋/);
  h.go("#/passport/UNKNOWN");
  assert.match(h.element("app").innerHTML, /該当するデモ記録はありません/);
});
