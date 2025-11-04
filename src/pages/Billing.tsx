import { PricingTable } from '../components/PricingTable';

export function Billing() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Planlar & Faturalama</h1>
        <p className="text-sm text-slate-300">
          Stripe üzerinden güvenli ödeme. Planınızı yükselttiğinizde Supabase profilleriniz otomatik güncellenir.
        </p>
      </header>
      <PricingTable />
      <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">n8n otomasyonu önerisi</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6">
          <li>Stripe Webhook trigger ile <code>checkout.session.completed</code> etkinliğini dinleyin.</li>
          <li>Supabase node’u ile <code>profiles</code> tablosunda kullanıcının planını <code>session.metadata.plan</code> değeri ile güncelleyin.</li>
          <li>Slack veya e-posta node’u ile kullanıcıya hoş geldin mesajını iletin.</li>
        </ol>
      </section>
    </div>
  );
}
