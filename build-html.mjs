import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { marked } from 'marked';
import { join, basename } from 'path';

const OUT_DIR = 'docs';
const CHAPTERS_DIR = 'Chapitres';

// Chapter metadata
const chapters = [
  { file: '01_Introduction_Problematique.md', slug: '01-introduction', title: 'Chapitre I — Introduction et Probl\u00e9matique', roman: 'I', domain: 'neutral' },
  { file: '02_Fondements_Theoriques.md', slug: '02-fondements', title: 'Chapitre II — Fondements Th\u00e9oriques', roman: 'II', domain: 'neutral' },
  { file: '03_Integration_Applications.md', slug: '03-applications', title: 'Chapitre III — Int\u00e9gration des Applications', roman: 'III', domain: 'verb' },
  { file: '04_Integration_Donnees.md', slug: '04-donnees', title: 'Chapitre IV — Int\u00e9gration des Donn\u00e9es', roman: 'IV', domain: 'noun' },
  { file: '05_Integration_Evenements.md', slug: '05-evenements', title: 'Chapitre V — Int\u00e9gration des \u00c9v\u00e9nements', roman: 'V', domain: 'signal' },
  { file: '06_Standards_Contrats.md', slug: '06-standards', title: 'Chapitre VI — Standards et Contrats d\u2019Interface', roman: 'VI', domain: 'neutral' },
  { file: '07_Resilience_Observabilite.md', slug: '07-resilience', title: 'Chapitre VII — R\u00e9silience et Observabilit\u00e9', roman: 'VII', domain: 'neutral' },
  { file: '08_Collaboration_Automatisation.md', slug: '08-collaboration', title: 'Chapitre VIII — Collaboration et Automatisation', roman: 'VIII', domain: 'neutral' },
  { file: '09_Architecture_Reference.md', slug: '09-architecture', title: 'Chapitre IX — Architecture de R\u00e9f\u00e9rence', roman: 'IX', domain: 'neutral' },
  { file: '10_Order_to_Cash.md', slug: '10-order-to-cash', title: 'Chapitre X — \u00c9tude de Cas : Order-to-Cash', roman: 'X', domain: 'neutral' },
  { file: '11_Entreprise_Agentique.md', slug: '11-entreprise-agentique', title: 'Chapitre XI — L\u2019Entreprise Agentique', roman: 'XI', domain: 'neutral' },
  { file: 'Annexes.md', slug: 'annexes', title: 'Annexes', roman: '', domain: 'neutral' },
];

const domainColors = {
  verb: '#2563eb',
  noun: '#059669',
  signal: '#d97706',
  neutral: '#6b7280',
};

const domainLabels = {
  verb: 'Applications',
  noun: 'Donn\u00e9es',
  signal: '\u00c9v\u00e9nements',
  neutral: '',
};

function htmlTemplate(title, bodyHtml, prevChapter, nextChapter, allChapters) {
  const nav = allChapters.map(c =>
    `<li><a href="${c.slug}.html">${c.roman ? c.roman + '. ' : ''}${c.roman ? c.title.split(' — ')[1] || c.title : c.title}</a></li>`
  ).join('\n          ');

  const prevLink = prevChapter
    ? `<a href="${prevChapter.slug}.html" class="nav-link">&larr; ${prevChapter.roman ? 'Ch. ' + prevChapter.roman : 'Pr\u00e9c\u00e9dent'}</a>`
    : `<span></span>`;
  const nextLink = nextChapter
    ? `<a href="${nextChapter.slug}.html" class="nav-link">${nextChapter.roman ? 'Ch. ' + nextChapter.roman : 'Suivant'} &rarr;</a>`
    : `<span></span>`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Interop\u00e9rabilit\u00e9 en \u00c9cosyst\u00e8me d\u2019Entreprise</title>
  <style>
    :root {
      --color-bg: #0f0f0f;
      --color-surface: #1a1a1a;
      --color-surface-alt: #222222;
      --color-text: #e0e0e0;
      --color-text-muted: #9ca3af;
      --color-heading: #f5f5f5;
      --color-link: #60a5fa;
      --color-link-hover: #93c5fd;
      --color-border: #2e2e2e;
      --color-code-bg: #1e1e2e;
      --color-blockquote-bg: #1c1a0e;
      --color-blockquote-border: #d97706;
      --color-blockquote-text: #fbbf24;
      --color-table-header: #252525;
      --color-table-stripe: #1e1e1e;
      --max-width: 52rem;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: var(--color-bg);
      color: var(--color-text);
      line-height: 1.75;
      font-size: 1.05rem;
    }

    header {
      background: #111111;
      color: #f5f5f5;
      padding: 1rem 2rem;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 12px rgba(0,0,0,0.5);
      border-bottom: 1px solid var(--color-border);
    }

    header .header-inner {
      max-width: var(--max-width);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    header a {
      color: #f5f5f5;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
    }

    header a:hover { color: var(--color-link); }

    .sidebar-toggle {
      display: none;
      background: none;
      border: 1px solid rgba(255,255,255,0.2);
      color: #f5f5f5;
      padding: 0.4rem 0.8rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .layout {
      display: flex;
      max-width: 72rem;
      margin: 0 auto;
      min-height: calc(100vh - 60px);
    }

    aside {
      width: 18rem;
      flex-shrink: 0;
      padding: 1.5rem 1rem;
      border-right: 1px solid var(--color-border);
      background: var(--color-surface);
      position: sticky;
      top: 60px;
      height: calc(100vh - 60px);
      overflow-y: auto;
    }

    aside h3 {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-muted);
      margin-bottom: 0.75rem;
    }

    aside ul { list-style: none; }

    aside li {
      margin-bottom: 0.35rem;
    }

    aside a {
      color: var(--color-text);
      text-decoration: none;
      font-size: 0.88rem;
      display: block;
      padding: 0.3rem 0.5rem;
      border-radius: 4px;
      transition: background 0.15s, color 0.15s;
    }

    aside a:hover { background: var(--color-surface-alt); color: var(--color-link); }

    main {
      flex: 1;
      min-width: 0;
      padding: 2.5rem 3rem;
    }

    .chapter-content {
      max-width: var(--max-width);
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      color: var(--color-heading);
      border-bottom: 3px solid var(--color-link);
      padding-bottom: 0.5rem;
    }

    h2 {
      font-size: 1.5rem;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      color: var(--color-heading);
      border-bottom: 1px solid var(--color-border);
      padding-bottom: 0.3rem;
    }

    h3 {
      font-size: 1.2rem;
      margin-top: 2rem;
      margin-bottom: 0.75rem;
      color: var(--color-heading);
    }

    h4 {
      font-size: 1.05rem;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      color: var(--color-heading);
    }

    p { margin-bottom: 1rem; }

    a { color: var(--color-link); }
    a:hover { color: var(--color-link-hover); }

    blockquote {
      background: var(--color-blockquote-bg);
      border-left: 4px solid var(--color-blockquote-border);
      padding: 1rem 1.25rem;
      margin: 1.5rem 0;
      border-radius: 0 6px 6px 0;
    }

    blockquote p:last-child { margin-bottom: 0; }

    blockquote strong:first-child {
      display: block;
      margin-bottom: 0.3rem;
      color: var(--color-blockquote-text);
    }

    pre {
      background: #11111b;
      color: #cdd6f4;
      padding: 1.25rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1.5rem 0;
      font-size: 0.88rem;
      line-height: 1.5;
      border: 1px solid var(--color-border);
    }

    code {
      background: var(--color-code-bg);
      padding: 0.15rem 0.4rem;
      border-radius: 3px;
      font-size: 0.9em;
      font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
      color: #a6e3a1;
    }

    pre code {
      background: none;
      padding: 0;
      font-size: inherit;
      color: inherit;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      font-size: 0.92rem;
    }

    th {
      background: var(--color-table-header);
      color: #f5f5f5;
      text-align: left;
      padding: 0.6rem 0.8rem;
      font-weight: 600;
      border-bottom: 2px solid var(--color-link);
    }

    td {
      padding: 0.55rem 0.8rem;
      border-bottom: 1px solid var(--color-border);
    }

    tr:nth-child(even) { background: var(--color-table-stripe); }

    ul, ol {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
    }

    li { margin-bottom: 0.3rem; }

    hr {
      border: none;
      border-top: 1px solid var(--color-border);
      margin: 2.5rem 0;
    }

    em { font-style: italic; }
    strong { font-weight: 600; color: #f5f5f5; }

    .chapter-nav {
      display: flex;
      justify-content: space-between;
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--color-border);
    }

    .nav-link {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: var(--color-link);
      color: #0f0f0f;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.92rem;
      transition: background 0.15s;
    }

    .nav-link:hover { background: var(--color-link-hover); color: #0f0f0f; }

    footer {
      text-align: center;
      padding: 1.5rem;
      color: var(--color-text-muted);
      font-size: 0.85rem;
      border-top: 1px solid var(--color-border);
    }

    /* Scrollbar styling */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--color-bg); }
    ::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #555; }

    @media (max-width: 768px) {
      .sidebar-toggle { display: block; }

      aside {
        position: fixed;
        left: -100%;
        top: 60px;
        height: calc(100vh - 60px);
        z-index: 50;
        transition: left 0.3s;
        box-shadow: 4px 0 16px rgba(0,0,0,0.4);
      }

      aside.open { left: 0; }

      main {
        padding: 1.5rem 1.25rem;
      }

      h1 { font-size: 1.5rem; }
      h2 { font-size: 1.25rem; }
    }
  </style>
</head>
<body>
  <header>
    <div class="header-inner">
      <a href="index.html">Interop\u00e9rabilit\u00e9 en \u00c9cosyst\u00e8me d\u2019Entreprise</a>
      <button class="sidebar-toggle" onclick="document.querySelector('aside').classList.toggle('open')">
        &#9776; Chapitres
      </button>
    </div>
  </header>

  <div class="layout">
    <aside>
      <h3>Table des mati\u00e8res</h3>
      <ul>
        ${nav}
      </ul>
    </aside>

    <main>
      <div class="chapter-content">
        ${bodyHtml}
      </div>

      <div class="chapter-nav">
        ${prevLink}
        ${nextLink}
      </div>
    </main>
  </div>

  <footer>
    &copy; 2026 \u2014 Interop\u00e9rabilit\u00e9 en \u00c9cosyst\u00e8me d\u2019Entreprise : Convergence des Architectures d\u2019Int\u00e9gration
  </footer>
</body>
</html>`;
}

function indexTemplate(allChapters) {
  const cards = allChapters.map(c => {
    const color = domainColors[c.domain];
    const label = domainLabels[c.domain];
    const badge = label ? `<span style="background:${color};color:white;padding:0.2rem 0.6rem;border-radius:12px;font-size:0.75rem;font-weight:600;">${label}</span>` : '';
    return `
      <a href="${c.slug}.html" class="card" style="border-left: 4px solid ${color};">
        <div class="card-header">
          <span class="roman">${c.roman}</span>
          ${badge}
        </div>
        <h3>${c.title}</h3>
      </a>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interop\u00e9rabilit\u00e9 en \u00c9cosyst\u00e8me d\u2019Entreprise</title>
  <style>
    :root {
      --color-bg: #0f0f0f;
      --color-surface: #1a1a1a;
      --color-text: #e0e0e0;
      --color-text-muted: #9ca3af;
      --color-heading: #f5f5f5;
      --color-border: #2e2e2e;
      --color-link: #60a5fa;
      --max-width: 64rem;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: var(--color-bg);
      color: var(--color-text);
      line-height: 1.7;
    }

    .hero {
      background: linear-gradient(135deg, #0a0a0a 0%, #141420 50%, #1a1a2e 100%);
      color: #f5f5f5;
      text-align: center;
      padding: 3rem 2rem 2rem;
      border-bottom: 1px solid var(--color-border);
    }

    .hero h1 {
      font-size: 2.2rem;
      margin-bottom: 0.75rem;
      letter-spacing: -0.02em;
    }

    .hero p {
      font-size: 1.1rem;
      opacity: 0.8;
      max-width: 42rem;
      margin: 0 auto;
    }

    .poster-section {
      text-align: center;
      padding: 2rem 1rem;
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
    }

    .poster-section img {
      max-width: 100%;
      max-height: 600px;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.4);
    }

    .poster-section p {
      margin-top: 0.75rem;
      font-size: 0.9rem;
      color: var(--color-text-muted);
    }

    .container {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }

    .container > h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      color: var(--color-heading);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
    }

    .card {
      display: block;
      background: var(--color-surface);
      padding: 1.25rem;
      border-radius: 8px;
      text-decoration: none;
      color: var(--color-text);
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
      background: #222222;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .roman {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--color-text-muted);
    }

    .card h3 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-heading);
    }

    .legend {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }

    .legend-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    footer {
      text-align: center;
      padding: 2rem;
      color: var(--color-text-muted);
      font-size: 0.85rem;
      border-top: 1px solid var(--color-border);
    }

    /* Scrollbar styling */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--color-bg); }
    ::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #555; }

    @media (max-width: 600px) {
      .hero h1 { font-size: 1.5rem; }
      .hero p { font-size: 0.95rem; }
    }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Interop\u00e9rabilit\u00e9 en \u00c9cosyst\u00e8me d\u2019Entreprise</h1>
    <p>Convergence des Architectures d\u2019Int\u00e9gration &mdash; Du Couplage Fort au D\u00e9couplage Maximal</p>
  </div>

  <div class="poster-section">
    <img src="Poster.png" alt="Poster \u2014 Interop\u00e9rabilit\u00e9 en \u00c9cosyst\u00e8me d\u2019Entreprise">
    <p>Vue synth\u00e8se de l\u2019essai</p>
  </div>

  <div class="container">
    <h2>Chapitres</h2>

    <div class="legend">
      <div class="legend-item"><span class="legend-dot" style="background:#2563eb;"></span> Applications (Le Verbe)</div>
      <div class="legend-item"><span class="legend-dot" style="background:#059669;"></span> Donn\u00e9es (Le Nom)</div>
      <div class="legend-item"><span class="legend-dot" style="background:#d97706;"></span> \u00c9v\u00e9nements (Le Signal)</div>
      <div class="legend-item"><span class="legend-dot" style="background:#6b7280;"></span> Transversal</div>
    </div>

    <div class="grid">
      ${cards}
    </div>
  </div>

  <footer>
    &copy; 2026 \u2014 Interop\u00e9rabilit\u00e9 en \u00c9cosyst\u00e8me d\u2019Entreprise : Convergence des Architectures d\u2019Int\u00e9gration
  </footer>
</body>
</html>`;
}

// Build
mkdirSync(OUT_DIR, { recursive: true });

// Copy Poster.png
const posterSrc = join('public', 'Poster.png');
const posterDst = join(OUT_DIR, 'Poster.png');
if (existsSync(posterSrc)) {
  copyFileSync(posterSrc, posterDst);
  console.log('Copied Poster.png');
}

// Generate chapter pages
for (let i = 0; i < chapters.length; i++) {
  const ch = chapters[i];
  const mdPath = join(CHAPTERS_DIR, ch.file);
  const md = readFileSync(mdPath, 'utf-8');
  const html = marked.parse(md);
  const prev = i > 0 ? chapters[i - 1] : null;
  const next = i < chapters.length - 1 ? chapters[i + 1] : null;
  const page = htmlTemplate(ch.title, html, prev, next, chapters);
  const outPath = join(OUT_DIR, `${ch.slug}.html`);
  writeFileSync(outPath, page, 'utf-8');
  console.log(`Generated: ${outPath}`);
}

// Generate index
const indexHtml = indexTemplate(chapters);
writeFileSync(join(OUT_DIR, 'index.html'), indexHtml, 'utf-8');
console.log('Generated: docs/index.html');

console.log('\nDone! Open docs/index.html to browse.');
