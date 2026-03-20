---
title: サイトの記事の書き方（サンプル）
date: 2025-03-20
description: Markdown と PICS フォルダを使った記事の配置例です。
---

このファイルは **記事の置き場所の例** です。実際のお知らせに差し替えたり削除して構いません。

## 画像の置き方

`src/posts/<記事スラッグ>/PICS/` に画像を置き、本文では **公開ページからの相対パス**（`PICS/ファイル名`）で参照します。

```markdown
![説明文](PICS/sample-contest.jpg)
```

以下はダミー画像（トップページと同じ写真のコピー）の表示例です。

![対面でのコンテスト・解説のイメージ（サンプル）](PICS/sample-contest.jpg)

## ファイル構成の例

```text
src/posts/
  welcome-sample.md
  welcome-sample/
    PICS/
      sample-contest.jpg
```

公開 URL は `/posts/welcome-sample/` です（Eleventy が `welcome-sample.md` → `welcome-sample/index.html` にします）。
