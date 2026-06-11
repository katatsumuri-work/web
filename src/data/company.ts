// 会社情報の単一の情報源（Single Source of Truth）。
// ⚠️ 銀行の法人口座審査では登記内容と照合されるため、
//    【要確認】の項目は公開前に必ず実在値へ差し替えること。

export type Service = {
  title: string;
  description: string;
};

export const company = {
  name: '合同会社カタツムリワークス',
  legalName: 'Katatsumuri Works LLC',
  tagline: '小さく、確かに、長く。',

  // --- 会社概要（登記と一致させる）---
  established: '2026年6月11日', // 仮置き。確定したら差し替える。
  representative: '山﨑 亮',
  address: '東京都港区浜松町２丁目２番１５号　浜松町ダイヤビル２Ｆ',
  capital: '500,000円',
  fiscalYear: '4月1日 〜 翌年3月31日', // 仮置き。確定したら差し替える。

  // --- 連絡先 ---
  email: 'info@katatsumuri.work', // 【要確認：このアドレスで公開してよいか】
  website: 'https://katatsumuri.work',

  // --- 事業内容（定款の目的に基づく抜粋）---
  services: [
    {
      title: 'ソフトウェア・AI 開発',
      description:
        '人工知能（AI）等を活用したソフトウェア・システムの企画、研究、開発、運用、コンサルティング。',
    },
    {
      title: 'デザイン',
      description:
        'グラフィック・ウェブ・ロゴ等の各種デザインの企画、制作、コンサルティング。',
    },
    {
      title: 'コンテンツ企画・制作',
      description:
        '各種コンテンツの企画、制作、配信、およびサブスクリプションサービスの提供。',
    },
  ] satisfies Service[],
} as const;
