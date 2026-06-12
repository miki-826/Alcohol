# 🏮 酔いどれ注文ミスゲーム

AI客のムチャぶり注文に、最高の酒と肴と一言で応える接客ミニゲーム。

AIが毎回ランダムに生成する「クセの強い客」の曖昧な注文を読み、プレイヤーが **酒・肴・一言トーク** を選ぶと、AIが満足度を0〜100点で採点します。3人接客した平均点でランクと称号が決まります。

## 遊び方

1. AI客の注文を読む
2. 酒を選ぶ
3. 肴を選ぶ
4. 一言トークを選ぶ（自由入力も可）
5. AIが満足度を採点
6. 3人接客して最終ランクと称号を獲得

## ランク

| 平均点 | ランク | 称号 |
| ---: | --- | --- |
| 90〜100 | S | 伝説の居酒屋マスター |
| 80〜89 | A | 常連を生む名店主 |
| 70〜79 | B | いい感じの店員 |
| 60〜69 | C | まだ新人バイト |
| 0〜59 | D | 注文ミス常習犯 |

## 技術構成

| 項目 | 技術 |
| --- | --- |
| フロント | Next.js (App Router) / React |
| スタイリング | Tailwind CSS |
| AI API | OpenAI API |
| DB | Supabase |
| デプロイ | Vercel |
| テスト | Vitest |

## セットアップ

```bash
npm install
cp .env.example .env.local
# .env.local に OPENAI_API_KEY などを設定
npm run dev
```

http://localhost:3000 で遊べます。

- `OPENAI_API_KEY` 未設定でも固定の客データ・採点データで動作します（フォールバック）
- Supabaseを使う場合は `supabase/schema.sql` をSQL Editorで実行し、`NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を設定してください

## テスト

```bash
npx vitest run
```

## Vercelデプロイ

1. このリポジトリをVercelにインポート
2. 環境変数（`OPENAI_API_KEY`、Supabase用キー）を設定
3. デプロイ

## API

| エンドポイント | 役割 |
| --- | --- |
| `POST /api/generate-customer` | AI客を1人生成 |
| `POST /api/evaluate-order` | プレイヤーの選択をAIが採点 |
