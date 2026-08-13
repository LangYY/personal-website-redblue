import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  assert.doesNotMatch(html, /YIYING/i);
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
  assert.match(html, /English Dictation/i);
  assert.doesNotMatch(html, /ComfyPilot/i);
  assert.match(html, /aria-pressed=/i);
});

test("groups moving-image work and uses one external link per work", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(source, /title: "传统影视制作"/);
  assert.match(source, /title: "AIGC 视频创作"/);
  assert.match(source, /className="videoArchiveCard"/);
  assert.doesNotMatch(source, /打开外部链接/);
});

test("ships site-specific metadata and an absolute social preview", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /<title>LY｜作品档案<\/title>/i);
  assert.match(html, /property="og:image" content="http:\/\/localhost\/og\.png"/i);
  assert.match(html, /name="twitter:card" content="summary_large_image"/i);
});
