# Emotion Journal

日々の気分を記録・管理するための感情ジャーナルアプリケーションです。
🌐 **公開 URL**: [https://emortion-journal-frontend.vercel.app/](https://emortion-journal-frontend.vercel.app/)

## 機能

- ユーザー認証（ログイン/ログアウト）
- 気分レベル（1〜10）の記録
- メモの追加（任意）
- エントリの一覧表示
- エントリの削除

## 技術スタック

- **フロントエンド**: Next.js 16.0.1 (App Router)
- **UI**: React 19.2.0
- **スタイリング**: Tailwind CSS 4
- **言語**: TypeScript 5
- **HTTP クライアント**: Axios
- **認証**: JWT Bearer Token

## 必要要件

- Node.js 20 以上
- npm または yarn
- バックエンド API（デフォルト: `http://localhost:8080`）

## セットアップ

1. リポジトリのクローン

```bash
git clone <repository-url>
cd emotion-journal-next
```

2. 依存パッケージのインストール

```bash
npm install
```

3. 環境変数の設定（任意）

`.env.local` ファイルを作成し、API のベース URL を設定できます：

```
NEXT_PUBLIC_API_BASE=http://localhost:8080
```

## 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## ビルド

```bash
npm run build
npm start
```

## プロジェクト構造

```
src/
├── app/              # Next.js App Router
│   ├── page.tsx      # メインページ（エントリ一覧・作成）
│   ├── login/        # ログインページ
│   ├── layout.tsx    # ルートレイアウト
│   └── globals.css   # グローバルスタイル
├── context/          # React Context
│   └── AuthContext.tsx  # 認証状態管理
├── lib/              # ユーティリティ
│   └── api.ts        # Axios設定とインターセプター
└── types.ts          # TypeScript型定義
```

## API エンドポイント

アプリケーションは以下のエンドポイントを使用します：

- `POST /api/login` - ログイン
- `GET /api/entries` - エントリ一覧取得
- `POST /api/entries` - 新規エントリ作成
- `DELETE /api/entries/:id` - エントリ削除

## ライセンス

Private
