// 会社情報は API（https://api.katatsumuri.work）を単一の情報源（SSoT）とし、
// Astro のビルド時（SSG）に fetch する。取得失敗時はフォールバック値でビルドを止めない。
//
// tagline はサイト固有のコピー（登記事実ではない）ため web 側で保持する。

const API_BASE = 'https://api.katatsumuri.work';

export type Company = {
  name: string;
  legalName: string;
  established: string; // 表示用（例: 2026年6月11日）
  representative: string;
  address: string;
  capital: string;
  fiscalYear: string;
  email: string;
  website: string;
};

export type Service = {
  title: string;
  description: string;
};

/** サイト固有のキャッチコピー（API 管理外）。 */
export const tagline = '小さく、確かに、長く。';

/** API 取得失敗時のフォールバック（ビルドを止めないため）。 */
const fallbackCompany: Company = {
  name: '合同会社カタツムリワークス',
  legalName: 'Katatsumuri Works LLC',
  established: '2026年6月11日',
  representative: '山﨑 亮',
  address: '東京都港区浜松町２丁目２番１５号　浜松町ダイヤビル２Ｆ',
  capital: '500,000円',
  fiscalYear: '6月1日 〜 翌年5月31日',
  email: 'info@katatsumuri.work',
  website: 'https://katatsumuri.work',
};

const fallbackServices: Service[] = [
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
];

/** ISO 日付（2026-06-11）を表示用（2026年6月11日）に整形する。 */
function formatFoundedDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  return `${Number(m[1])}年${Number(m[2])}月${Number(m[3])}日`;
}

/** API から会社情報を取得する（ビルド時）。失敗時はフォールバック。 */
export async function getCompany(): Promise<Company> {
  try {
    const res = await fetch(`${API_BASE}/company`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const d = await res.json();
    return {
      name: d.name,
      legalName: d.legal_name,
      established: formatFoundedDate(d.founded),
      representative: d.representative,
      address: d.address,
      capital: d.capital,
      fiscalYear: d.fiscal_year,
      email: d.email,
      website: d.website,
    };
  } catch (e) {
    console.warn('[company] API 取得に失敗。フォールバックを使用します:', e);
    return fallbackCompany;
  }
}

/** API から事業内容を取得する（ビルド時）。失敗時はフォールバック。 */
export async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const d = (await res.json()) as { title: string; description: string }[];
    return d.map((s) => ({ title: s.title, description: s.description }));
  } catch (e) {
    console.warn('[services] API 取得に失敗。フォールバックを使用します:', e);
    return fallbackServices;
  }
}
