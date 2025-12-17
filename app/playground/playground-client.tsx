"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Code2, Eye, FileText } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const translations = {
  en: {
    title: "Blog Studio",
    description: "Draft a post in Markdown and preview it like a blog page.",
    fields: {
      postTitle: "Title",
      summary: "Summary",
      tags: "Tags",
      coverUrl: "Cover image URL (optional)",
      markdown: "Markdown",
    },
    placeholders: {
      postTitle: "e.g. Building a better developer experience",
      summary: "A short description shown on listings and social previews.",
      tags: "e.g. nextjs, react, ui (comma separated)",
      coverUrl: "https://...",
    },
    actions: {
      loadSample: "Load sample post",
    },
    preview: {
      title: "Live Preview",
      readTime: "min read",
    },
    sample: {
      title: "From Playground to Blog Studio",
      summary: "Turning a sandbox into a focused writing workflow for the blog.",
      tags: "writing, ux, nextjs",
      markdown:
        "# Why a Blog Studio?\n\nWriting is easier when the tool matches the job.\n\n## What you can try\n\n- Headings, lists\n- **Bold** and *italic*\n- Links like [Next.js](https://nextjs.org)\n\n```js\nconsole.log('code block');\n```\n",
    },
  },
  tr: {
    title: "Blog Stüdyosu",
    description: "Markdown ile taslak yaz ve blog sayfası gibi canlı önizleme al.",
    fields: {
      postTitle: "Başlık",
      summary: "Özet",
      tags: "Etiketler",
      coverUrl: "Kapak görseli URL (opsiyonel)",
      markdown: "Markdown",
    },
    placeholders: {
      postTitle: "örn. Daha iyi bir geliştirici deneyimi",
      summary: "Listeleme ve sosyal paylaşımda görünecek kısa açıklama.",
      tags: "örn. nextjs, react, ui (virgülle ayır)",
      coverUrl: "https://...",
    },
    actions: {
      loadSample: "Örnek yazı yükle",
    },
    preview: {
      title: "Canlı Önizleme",
      readTime: "dk okuma",
    },
    sample: {
      title: "Playground’dan Blog Stüdyosuna",
      summary: "Bir deneme alanını blog odaklı yazma akışına dönüştürmek.",
      tags: "yazı, ux, nextjs",
      markdown:
        "# Neden Blog Stüdyosu?\n\nYazmak, araç işin kendisiyle uyumlu olduğunda daha kolay.\n\n## Deneyebileceklerin\n\n- Başlıklar, listeler\n- **Kalın** ve *italik*\n- [Next.js](https://nextjs.org) gibi linkler\n\n```js\nconsole.log('kod bloğu');\n```\n",
    },
  },
} as const;

export default function PlaygroundClient() {
  const { language } = useLanguage();
  const t = translations[language];

  const [postTitle, setPostTitle] = useState<string>(t.sample.title);
  const [summary, setSummary] = useState<string>(t.sample.summary);
  const [tags, setTags] = useState<string>(t.sample.tags);
  const [coverUrl, setCoverUrl] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>(t.sample.markdown);

  // Dil değişince örnek içerikleri güncelle (kullanıcı yazıyorsa dokunmuyoruz)
  useEffect(() => {
    // sadece ilk örnek içerikle aynıysa otomatik güncelle
    setPostTitle((prev) => (prev === translations.en.sample.title || prev === translations.tr.sample.title ? t.sample.title : prev));
    setSummary((prev) => (prev === translations.en.sample.summary || prev === translations.tr.sample.summary ? t.sample.summary : prev));
    setTags((prev) => (prev === translations.en.sample.tags || prev === translations.tr.sample.tags ? t.sample.tags : prev));
    setMarkdown((prev) => (prev === translations.en.sample.markdown || prev === translations.tr.sample.markdown ? t.sample.markdown : prev));
  }, [t.sample.title, t.sample.summary, t.sample.tags, t.sample.markdown]);

  const [srcDoc, setSrcDoc] = useState<string>("");
  const timerRef = useRef<number | null>(null);

  const htmlPreview = useMemo(() => mdToHtml(markdown), [markdown]);

  const readTime = useMemo(() => {
    const words = markdown.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  }, [markdown]);

  const doc = useMemo(() => {
    const safeCover = coverUrl?.trim();
    const tagsArr = tags
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)
      .slice(0, 10);

    return `<!DOCTYPE html>
<html lang="${language}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      :root { color-scheme: light dark; }
      html, body { margin: 0; padding: 0; }
      body { padding: 20px; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; line-height: 1.65; }
      .wrap { max-width: 860px; margin: 0 auto; }
      .meta { display:flex; gap:8px; flex-wrap:wrap; color: rgba(255,255,255,.7); }
      @media (prefers-color-scheme: light) { .meta { color: rgba(0,0,0,.55); } }
      .pill { display:inline-flex; align-items:center; border: 1px solid rgba(125,125,125,.25); padding: 4px 10px; border-radius: 999px; font-size: 12px; }
      h1 { font-size: 34px; margin: 0 0 8px; letter-spacing: -0.02em; }
      .summary { margin: 0 0 14px; opacity: .85; }
      .cover { width:100%; aspect-ratio: 16/9; border-radius: 14px; overflow:hidden; border: 1px solid rgba(125,125,125,.25); background: rgba(125,125,125,.06); margin: 18px 0 22px; }
      .cover img { width:100%; height:100%; object-fit: cover; display:block; }
      article h2 { margin-top: 22px; }
      article pre { overflow:auto; padding: 12px; border-radius: 12px; border: 1px solid rgba(125,125,125,.25); background: rgba(125,125,125,.06); }
      article code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      article a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
      ul { padding-left: 18px; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <h1>${escapeHtml(postTitle || "")}</h1>
      <p class="summary">${escapeHtml(summary || "")}</p>
      <div class="meta">
        <span class="pill">${readTime} ${escapeHtml(t.preview.readTime)}</span>
        ${tagsArr.map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join("")}
      </div>
      ${safeCover ? `<div class="cover"><img src="${escapeAttr(safeCover)}" alt="cover" /></div>` : ""}
      <article>${htmlPreview}</article>
    </div>
  </body>
</html>`;
  }, [coverUrl, htmlPreview, language, postTitle, readTime, summary, tags, t.preview.readTime]);

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setSrcDoc(doc);
    }, 250);
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [doc]);

  function loadSamplePost() {
    setPostTitle(t.sample.title);
    setSummary(t.sample.summary);
    setTags(t.sample.tags);
    setCoverUrl("");
    setMarkdown(t.sample.markdown);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-4 w-4 text-primary" />
          </span>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{t.title}</h1>
            <p className="text-sm text-muted-foreground">{t.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadSamplePost}
            className="rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-sm hover:border-primary/40"
          >
            {t.actions.loadSample}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <FieldCard title={t.fields.postTitle}>
            <input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder={t.placeholders.postTitle}
              className="w-full bg-transparent text-sm outline-none"
              aria-label={t.fields.postTitle}
            />
          </FieldCard>

          <FieldCard title={t.fields.summary}>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder={t.placeholders.summary}
              className="min-h-20 w-full resize-vertical bg-transparent text-sm outline-none"
              aria-label={t.fields.summary}
            />
          </FieldCard>

          <FieldCard title={t.fields.tags} hint={t.placeholders.tags}>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder={t.placeholders.tags}
              className="w-full bg-transparent text-sm outline-none"
              aria-label={t.fields.tags}
            />
          </FieldCard>

          <FieldCard title={t.fields.coverUrl} hint={t.placeholders.coverUrl}>
            <input
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder={t.placeholders.coverUrl}
              className="w-full bg-transparent text-sm outline-none"
              aria-label={t.fields.coverUrl}
            />
          </FieldCard>

          <FieldCard title={t.fields.markdown}>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              spellCheck={false}
              className="min-h-80 w-full resize-vertical bg-transparent text-sm outline-none font-mono"
              aria-label={t.fields.markdown}
            />
          </FieldCard>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-background/70 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Eye className="h-4 w-4" />
                {t.preview.title}
              </div>
            </div>
            <iframe
              title="preview"
              className="h-[540px] w-full"
              sandbox="allow-scripts allow-same-origin"
              srcDoc={srcDoc}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldCard({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/70 shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
        <div className="text-sm font-medium">{title}</div>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m] as string));
}

function escapeAttr(s: string) {
  // very small attribute escape for src; prevents quotes and angle brackets
  return s.replace(/["<>]/g, "");
}

function mdToHtml(src: string) {
  // Minimal markdown: headings, lists, bold/italic, links, code fences
  let h = escapeHtml(src);

  // code fences
  h = h.replace(/```(\w+)?\n([\s\S]*?)```/g, (_m, _lang, code) => {
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  });

  // headings
  h = h.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  h = h.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  h = h.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  // lists (very simple)
  h = h.replace(/^\- (.*)$/gm, "<li>$1</li>");
  h = h.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");

  // bold / italic
  h = h.replace(/(\*\*)(.*?)\1/g, "<strong>$2</strong>");
  h = h.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // links
  h = h.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // paragraphs
  h = h
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (/^<h[1-3]>/.test(trimmed) || /^<ul>/.test(trimmed) || /^<pre>/.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");

  return h;
}

