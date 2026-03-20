# WACPAC 公式サイト

[Eleventy](https://www.11ty.dev/) で Markdown を HTML にし、[GitHub Actions](https://docs.github.com/ja/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) から [GitHub Pages](https://docs.github.com/ja/pages) に公開します。

### リポジトリと push

| 役割 | リモート名 | URL |
|------|------------|-----|
| **本番（`https://wacpac.github.io/`）** | `wacpac-github-io` | `git@github.com:WACPAC/wacpac.github.io.git` |
| 旧プロジェクトサイト用（任意） | `origin` | `git@github.com:WACPAC/wacpac-website.git` |

両方に同じ `main` を載せる例:

```bash
git push origin main && git push wacpac-github-io main
```

**`wacpac.github.io` リポジトリ**で **Settings → Pages → Source: GitHub Actions** が有効か確認してください（こちらがルートの公開元です）。

## ローカル

```bash
npm ci
npm run build    # → dist/
npm run preview  # http://localhost:3456
```

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
