# ブログアプリケーション

Next.js で作成したブログアプリケーションです。

## 機能

- ブログ記事の一覧表示
- ブログ記事の投稿
- ブログ記事の編集
- ブログ記事の削除
- 作成日時と更新日時の表示（日本時間）

## 技術スタック

- Framework: Next.js 14 (App Router)
- データベース: PostgreSQL (Prisma ORM)
- スタイリング: Tailwind CSS
- デプロイ: Vercel

## プロジェクト構成

```
src/
  ├── app/
  │   ├── api/
  │   │   └── blog/
  │   │       ├── route.ts          # 記事一覧・投稿API
  │   │       └── [id]/
  │   │           └── route.ts      # 記事詳細・編集・削除API
  │   ├── blog/
  │   │   ├── add/
  │   │   │   └── page.tsx         # 記事投稿ページ
  │   │   └── edit/
  │   │       └── [id]/
  │   │           └── page.tsx      # 記事編集ページ
  │   └── page.tsx                  # トップページ（記事一覧）
  └── types.ts                      # 型定義ファイル
```

## 開発環境のセットアップ

```bash
# パッケージのインストール
npm install

# Prismaの初期設定
npx prisma init
npx prisma generate

# 開発サーバーの起動
npm run dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いて確認できます。

## API仕様

### GET /api/blog

- 全ブログ記事を取得
- 作成日時の降順でソート

### POST /api/blog

- 新規ブログ記事を作成
- 必要なデータ: title, description

### GET /api/blog/[id]

- 指定したIDのブログ記事を取得

### PUT /api/blog/[id]

- 指定したIDのブログ記事を更新
- 必要なデータ: title, description

### DELETE /api/blog/[id]

- 指定したIDのブログ記事を削除

---
