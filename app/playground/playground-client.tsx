"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Code2, Eye } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const translations = {
  en: {
    title: "Code Playground",
    description: "Write HTML, CSS and JS to see live preview. Use templates to start quickly.",
    buttons: {
      todo: "Todo App",
      counter: "Counter",
      color: "Color Picker",
      markdown: "Markdown",
    },
    editors: { html: "HTML", css: "CSS", js: "JS" },
    livePreview: "Live Preview",
    guideTitle: "Suggested mini project: Todo App",
    guideSteps: [
      "Add a form and a list into HTML (you can use the template).",
      "On submit, append input value to the list and clear the field.",
      "Add complete and delete actions for each item.",
      "Use capsule buttons and smooth borders with CSS.",
      "Optional: persist list with localStorage.",
    ],
    templates: {
      todoTitle: "Todo App",
      addPlaceholder: "Add a task...",
      add: "Add",
      colorTitle: "Color Picker",
      code: "Code",
      counterTitle: "Counter",
      markdownTitle: "Markdown Previewer",
      markdownPlaceholder: "# Heading\n\n- item 1\n- item 2",
      welcomeMd:
        "# Welcome\n\n- try\n- edit\n\n**bold** and *italic* are supported.",
    },
  },
  tr: {
    title: "Kod Oyun Alanı",
    description:
      "HTML, CSS ve JS yazarak canlı önizleme alın. Hızlı başlamak için şablonları kullanın.",
    buttons: {
      todo: "Todo Uygulaması",
      counter: "Sayaç",
      color: "Renk Seçici",
      markdown: "Markdown",
    },
    editors: { html: "HTML", css: "CSS", js: "JS" },
    livePreview: "Canlı Önizleme",
    guideTitle: "Önerilen mini proje: Todo Uygulaması",
    guideSteps: [
      "HTML’e bir form ve liste ekleyin (hazır şablonu kullanabilirsiniz).",
      "Form gönderiminde girdiyi listeye ekleyin ve alanı temizleyin.",
      "Her öğeye “tamamlandı” ve “sil” eylemleri ekleyin.",
      "CSS ile kapsül butonlar ve yumuşak kenarlıklar kullanın.",
      "İsteğe bağlı: localStorage ile listeyi kalıcı hale getirin.",
    ],
    templates: {
      todoTitle: "Todo Uygulaması",
      addPlaceholder: "Bir görev ekleyin...",
      add: "Ekle",
      colorTitle: "Renk Seçici",
      code: "Kod",
      counterTitle: "Sayaç",
      markdownTitle: "Markdown Önizleyici",
      markdownPlaceholder: "# Başlık\n\n- madde 1\n- madde 2",
      welcomeMd:
        "# Hoş geldin\n\n- dene\n- düzenle\n\n**kalın** ve *italik* desteklenir.",
    },
  },
} as const;

export default function PlaygroundClient() {
  const { language } = useLanguage();
  const t = translations[language];
  const [html, setHtml] = useState<string>(`<div class="card">
  <h1>Hello, Playground!</h1>
  <p>Edit HTML/CSS/JS and see the live preview.</p>
</div>`);
  const [css, setCss] = useState<string>(`.card {
  padding: 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05));
  border: 1px solid rgba(59,130,246,0.25);
  color: inherit;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
}
h1 { margin: 0 0 8px 0; font-size: 20px; }
p { margin: 0; opacity: .85; }`);
  const [js, setJs] = useState<string>(`document.querySelector(".card")?.addEventListener("click", () => {
  alert("Clicked!");
});`);
  const [activeTemplate, setActiveTemplate] = useState<'custom' | 'todo' | 'counter' | 'color' | 'markdown'>('custom');

  const [srcDoc, setSrcDoc] = useState<string>("");
  const timerRef = useRef<number | null>(null);

  const doc = useMemo(() => {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      :root { color-scheme: light dark; }
      html, body { margin: 0; padding: 0; }
      body { padding: 16px; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; }
    </style>
    <style>${css}</style>
  </head>
  <body>
    ${html}
    <script>try { ${js} } catch (e) { console.error(e); }</script>
  </body>
</html>`;
  }, [html, css, js]);

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

  function loadTodoTemplate() {
    setActiveTemplate('todo');
    setHtml(`<main class="app">
  <h1>${t.templates.todoTitle}</h1>
  <form id="todo-form">
    <input id="todo-input" type="text" placeholder="${t.templates.addPlaceholder}" aria-label="${t.templates.addPlaceholder}" />
    <button type="submit">${t.templates.add}</button>
  </form>
  <ul id="todo-list" aria-live="polite"></ul>
</main>`);
    setCss(`:root { color-scheme: light dark; }
* { box-sizing: border-box; }
body { margin: 0; font-family: ui-sans-serif, system-ui; padding: 16px; }
.app { max-width: 560px; margin: 0 auto; padding: 16px; border: 1px solid rgba(125,125,125,.25); border-radius: 12px; background: rgba(125,125,125,.06); }
h1 { font-size: 22px; margin: 0 0 12px 0; }
form { display: flex; gap: 8px; }
input { flex: 1; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(125,125,125,.35); background: transparent; color: inherit; }
button { padding: 10px 14px; border-radius: 10px; border: 1px solid rgba(59,130,246,.5); background: rgba(59,130,246,.15); color: inherit; cursor: pointer; }
ul { list-style: none; padding: 0; margin: 16px 0 0; display: grid; gap: 8px; }
li { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border: 1px solid rgba(125,125,125,.25); border-radius: 10px; background: rgba(125,125,125,.05); }
li.completed .text { text-decoration: line-through; opacity: .6; }
.row { display: flex; align-items: center; gap: 10px; }
.actions { display: flex; gap: 6px; }
.icon-btn { border: 1px solid rgba(125,125,125,.35); background: transparent; padding: 6px 10px; border-radius: 8px; cursor: pointer; }`);
    setJs(`const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let items = [];

function render() {
  list.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    if (item.done) li.classList.add('completed');

    const left = document.createElement('div');
    left.className = 'row';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.done;
    checkbox.addEventListener('change', () => {
      items[index].done = !items[index].done;
      render();
    });

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = item.text;

    left.appendChild(checkbox);
    left.appendChild(span);

    const actions = document.createElement('div');
    actions.className = 'actions';
    const del = document.createElement('button');
    del.className = 'icon-btn';
    del.textContent = 'Delete';
    del.addEventListener('click', () => {
      items.splice(index, 1);
      render();
    });
    actions.appendChild(del);

    li.appendChild(left);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  items.push({ text: value, done: false });
  input.value = '';
  render();
});

render();`);
  }

  function loadCounterTemplate() {
    setActiveTemplate('counter');
    setHtml(`<div class="card">
  <h1>${t.templates.counterTitle}</h1>
  <div class="row">
    <button id="dec">-</button>
    <span id="count">0</span>
    <button id="inc">+</button>
  </div>
</div>`);
    setCss(`:root { color-scheme: light dark; }
body { margin: 0; font-family: ui-sans-serif, system-ui; padding: 16px; }
.card { max-width: 420px; margin: 0 auto; padding: 16px; border: 1px solid rgba(125,125,125,.25); border-radius: 12px; background: rgba(125,125,125,.06); }
.row { display: flex; align-items: center; justify-content: center; gap: 12px; }
button { padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(125,125,125,.35); background: transparent; color: inherit; cursor: pointer; }`);
    setJs(`let value = 0;
const count = document.getElementById('count');
document.getElementById('inc').addEventListener('click', () => {
  value += 1; count.textContent = value;
});
document.getElementById('dec').addEventListener('click', () => {
  value -= 1; count.textContent = value;
});`);
  }

  function loadColorPickerTemplate() {
    setActiveTemplate('color');
    setHtml(`<main class="app">
  <h1>${t.templates.colorTitle}</h1>
  <input id="picker" type="color" value="#3b82f6" />
  <div class="preview" id="preview"></div>
  <p>${t.templates.code}: <code id="code">#3b82f6</code></p>
</main>`);
    setCss(`:root { color-scheme: light dark; }
body { margin: 0; font-family: ui-sans-serif, system-ui; padding: 16px; }
.app { max-width: 480px; margin: 0 auto; padding: 16px; border: 1px solid rgba(125,125,125,.25); border-radius: 12px; background: rgba(125,125,125,.06); }
.preview { height: 120px; border-radius: 12px; border: 1px solid rgba(125,125,125,.25); margin: 12px 0; }
input[type="color"] { width: 100%; height: 42px; border: 1px solid rgba(125,125,125,.35); border-radius: 10px; background: transparent; }`);
    setJs(`const picker = document.getElementById('picker');
const preview = document.getElementById('preview');
const code = document.getElementById('code');
function update(v){ preview.style.background = v; code.textContent = v; }
picker.addEventListener('input', (e) => update(e.target.value));
update(picker.value);`);
  }

  function loadMarkdownTemplate() {
    setActiveTemplate('markdown');
    setHtml(`<main class="app">
  <h1>${t.templates.markdownTitle}</h1>
  <div class="grid">
    <textarea id="md" placeholder="${t.templates.markdownPlaceholder.replace(/\n/g, "\\n")}"></textarea>
    <div id="out" class="out"></div>
  </div>
</main>`);
    setCss(`:root { color-scheme: light dark; }
body { margin: 0; font-family: ui-sans-serif, system-ui; padding: 16px; }
.app { max-width: 900px; margin: 0 auto; padding: 16px; border: 1px solid rgba(125,125,125,.25); border-radius: 12px; background: rgba(125,125,125,.06); }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
textarea { min-height: 280px; width: 100%; border-radius: 10px; border: 1px solid rgba(125,125,125,.35); background: transparent; color: inherit; padding: 12px; }
.out { min-height: 280px; border-radius: 10px; border: 1px solid rgba(125,125,125,.35); padding: 12px; }`);
    setJs(`function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\\'':'&#39;' }[m]));}
function mdToHtml(src){
  let h = escapeHtml(src);
  h = h.replace(/^### (.*)$/gm,'<h3>$1</h3>');
  h = h.replace(/^## (.*)$/gm,'<h2>$1</h2>');
  h = h.replace(/^# (.*)$/gm,'<h1>$1</h1>');
  h = h.replace(/^\\- (.*)$/gm,'<li>$1</li>');
  h = h.replace(/(\\*\\*)(.*?)\\1/g,'<strong>$2</strong>');
  h = h.replace(/\\*(.*?)\\*/g,'<em>$1</em>');
  h = h.replace(/\\[(.*?)\\]\\((.*?)\\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
  h = h.replace(/(<li>.*<\\/li>)/gs,'<ul>$1</ul>');
  h = h.replace(/\\n\\n/g,'<br/>');
  return h;
}
const ta = document.getElementById('md');
const out = document.getElementById('out');
ta.addEventListener('input', ()=> out.innerHTML = mdToHtml(ta.value));
ta.value = ${JSON.stringify(t.templates.welcomeMd)};
out.innerHTML = mdToHtml(ta.value);`);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <Code2 className="h-4 w-4 text-primary" />
          </span>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{t.title}</h1>
            <p className="text-sm text-muted-foreground">{t.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadTodoTemplate}
            className="rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-sm hover:border-primary/40"
            aria-pressed={activeTemplate === 'todo'}
          >
            {t.buttons.todo}
          </button>
          <button
            onClick={loadCounterTemplate}
            className="rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-sm hover:border-primary/40"
            aria-pressed={activeTemplate === 'counter'}
          >
            {t.buttons.counter}
          </button>
          <button
            onClick={loadColorPickerTemplate}
            className="rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-sm hover:border-primary/40"
            aria-pressed={activeTemplate === 'color'}
          >
            {t.buttons.color}
          </button>
          <button
            onClick={loadMarkdownTemplate}
            className="rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-sm hover:border-primary/40"
            aria-pressed={activeTemplate === 'markdown'}
          >
            {t.buttons.markdown}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <EditorCard title={t.editors.html} value={html} onChange={setHtml} language="html" />
          <EditorCard title={t.editors.css} value={css} onChange={setCss} language="css" />
          <EditorCard title={t.editors.js} value={js} onChange={setJs} language="javascript" />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-background/70 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Eye className="h-4 w-4" />
                {t.livePreview}
              </div>
            </div>
            <iframe
              title="preview"
              className="h-[540px] w-full"
              sandbox="allow-scripts allow-same-origin"
              srcDoc={srcDoc}
            />
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/70 shadow-sm p-4">
            <h2 className="text-sm font-semibold mb-2">{t.guideTitle}</h2>
            <ol className="list-decimal pl-5 text-sm space-y-1 text-muted-foreground">
              {t.guideSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorCard({
  title,
  value,
  onChange,
  language,
}: {
  title: string;
  value: string;
  onChange: (v: string) => void;
  language: "html" | "css" | "javascript";
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/70 shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
        <div className="text-sm font-medium">{title}</div>
        <span className="text-xs text-muted-foreground uppercase">{language}</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="min-h-32 h-40 w-full resize-vertical bg-transparent px-4 py-3 text-sm outline-none"
        aria-label={`${title} editor`}
      />
    </div>
  );
}

