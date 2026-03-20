# WACPAC 公式サイト

[Eleventy](https://www.11ty.dev/) で Markdown を HTML にし、[GitHub Actions](https://docs.github.com/ja/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) から [GitHub Pages](https://docs.github.com/ja/pages) に公開します。

## ローカル

```bash
npm ci
npm run build    # → dist/（本番用の一度きりのビルド）
npm run preview  # http://localhost:3456 — 監視＋自動再ビルド＋ブラウザの自動更新
```

`preview` は [Eleventy の `--serve`](https://www.11ty.dev/docs/usage/#serve-for-live-reload) を使います。`src/` 内の `.md` やテンプレートを保存すると `dist/` が書き換わり、開いているページが更新されます。ビルド済みの `dist/` だけを静的に確認したいときは `npx --yes serve dist -p 3456` を使ってください。

## 編集する場所

| パス | 内容 |
|------|------|
| `src/index.md` | トップページ（要約） |
| `src/posts/overview.md` | 概要説明の全文 |
| `src/posts/*.md` | その他の記事（フロントマター必須） |
| `src/assets/` | サイト共通画像（ファビコン・バナー・トップ用 `home/PICS/` など） |
| `src/_includes/` | 共通レイアウト（Nunjucks） |
| `src/css/styles.css` | スタイル |
| `src/_data/site.json` | サイト名・説明など |

### 記事の追加

`src/posts/` に `.md` を置きます。ディレクトリの `posts.11tydata.js` でレイアウトと URL がデフォルト設定されています。

```markdown
---
title: "記事のタイトル"
date: 2025-03-20
description: "一覧や meta 用の短い説明（任意）"
---

本文は普通の Markdown で書けます。
```

- URL は `/posts/<ファイル名のスラッグ>/` になります（例: `hello.md` → `/posts/hello/`）。
- トップページと記事一覧（`src/posts.njk` が生成）に自動で載ります（日付の新しい順）。

### 記事ごとの画像（`PICS`）

記事が `src/posts/my-article.md` のとき、画像は `src/posts/my-article/PICS/` に置き、本文では **`PICS/ファイル名`** と書きます（公開 URL は `/posts/my-article/` 基準の相対パスになります）。

例: `overview` 記事の `PICS/`。トップの写真は `src/assets/home/PICS/` と `assets/home/PICS/...` で参照。
