# web

合同会社カタツムリワークスのコーポレートサイト（Astro 静的サイト）。

- 本番: https://katatsumuri.work（Firebase Hosting）
- 会社概要・事業内容・お問い合わせを 1 ページにまとめた MVP

## 開発

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # dist/ に静的出力
pnpm preview    # ビルド結果をプレビュー
```

> 会社情報は `src/data/company.ts` に集約。**銀行の法人口座審査では登記と照合される**ため、
> 設立年月日・代表者氏名・所在地などは登記と一致した実在値を入れること。

## デプロイ（Firebase Hosting）

ホスティングは GCP プロジェクト `katatsumuri-work`（Cloud Run と同一）に Firebase を有効化して使う。

初回のみ:

```sh
npx firebase-tools login                                   # 対話ログイン（katatsumuri アカウント）
npx firebase-tools projects:addfirebase katatsumuri-work   # 既存 GCP に Firebase 有効化
```

デプロイ:

```sh
pnpm deploy     # build → firebase deploy --only hosting
```

### カスタムドメイン（apex / 外部 DNS）

`katatsumuri.work` の DNS はムームー管理。Firebase コンソールの Hosting → カスタムドメインで
`katatsumuri.work` を追加すると、登録すべき **A レコード（と確認用 TXT）** が提示される。
それをムームー DNS に追加する（**MX は触らない＝メール無傷**）。SSL は Firebase が自動発行。

> apex は CNAME 不可のため A レコードを使う。`www` を使う場合は CNAME も可。
