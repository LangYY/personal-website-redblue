import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the Chinese portfolio archive shell", async () => {
  const response = await render();
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /郎懿莹/);
  assert.match(html, /作品档案/);
  assert.match(html, /社交链接/);
  assert.match(html, /影像/);
  assert.match(html, /网页/);
  assert.match(html, /移动端/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("renders project archive content and interactive view controls", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /Frame Sonata/i);
  assert.match(html, /Focus Tree/i);
  assert.match(html, /ComfyPilot/i);
  assert.match(html, /aria-pressed=/i);
});

test("includes the confirmed social links", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /社交链接/);
  assert.match(html, /LangYi31007/);
  assert.match(html, /xhslink/);
  assert.match(html, /github\.com\\?\/LangYY/);
});

test("ships site-specific metadata and an absolute social preview", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /<title>郎懿莹｜作品档案<\/title>/i);
  assert.match(html, /property="og:image" content="http:\/\/localhost\/og\.png"/i);
  assert.match(html, /name="twitter:card" content="summary_large_image"/i);
});
