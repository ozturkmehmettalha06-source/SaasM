# Videxa – Yapay Zeka Video SaaS

Videxa, metinden videoya yapay zeka üretimini Supabase, Stripe ve n8n ile birleştiren, ölçeklenebilir bir SaaS iskeletidir. React + Vite + Tailwind mimarisiyle hazırlanmıştır ve Netlify/Vercel üzerinde kolayca yayına alınabilir.

## Gereksinimler
- Node.js >= 18.17.0 (önerilen: `nvm install --lts && nvm use --lts`)
- Paket yöneticisi: pnpm 8+ (`brew install pnpm`)
- Opsiyonel: Stripe CLI, Supabase CLI, n8n (self-host veya bulut)

## Kurulum
```bash
pnpm install
cp .env.example .env
pnpm dev
```

### Alternatif npm ile
```bash
npm install
npm run dev
```

## Çevre Değişkenleri
`.env.example` dosyasındaki anahtarları kopyalayarak `.env` dosyanızı oluşturun.

| Değişken | Açıklama |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase projenizin URL değeri |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonim anahtarı (Auth + veritabanı erişimi) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe yayınlanabilir anahtarı |
| `STRIPE_SECRET_KEY` | Stripe gizli anahtarı (serverless API veya n8n için) |
| `WEBHOOK_SECRET` | Stripe webhook doğrulama anahtarı |
| `VITE_APP_URL` | Uygulamanın temel adresi |
| `VITE_VIDEO_API_URL` | AI video servisinizin API adresi |
| `VITE_STRIPE_PRICE_BASIC` | Stripe fiyat ID (Creator planı) |
| `VITE_STRIPE_PRICE_PRO` | Stripe fiyat ID (Studio planı) |

## Supabase Hızlı Başlangıç
1. Supabase projesi oluşturun, URL ve Anon Key değerlerini alın.
2. `profiles` tablosunu oluşturun:
   ```sql
   create table public.profiles (
     id uuid references auth.users on delete cascade,
     email text not null,
     plan text default 'free',
     created_at timestamptz default now(),
     primary key (id)
   );
   ```
3. Row Level Security (RLS) aktifleştirin ve aşağıdaki policy’leri ekleyin:
   ```sql
   create policy "Kullanıcı kendi profilini görür" on public.profiles
     for select using (auth.uid() = id);

   create policy "Kullanıcı kendi profilini yazar" on public.profiles
     for insert with check (auth.uid() = id);

   create policy "Stripe webhook güncellemesi" on public.profiles
     for update using (auth.role() = 'service_role');
   ```
4. Supabase Auth için e-posta OTP’yi etkinleştirin.

## Stripe Plan Akışı
1. Stripe Dashboard’da `Creator` (aylık) ve `Studio` (aylık) fiyatlarını oluşturun; fiyat ID’lerini `.env` dosyanıza ekleyin.
2. Checkout oturumunda `metadata.plan` olarak `basic` veya `pro` değerini gönderin.
3. Ödeme sonrası webhook (n8n veya Supabase Edge Function) ile `profiles.plan` alanını güncelleyin.
4. İade ve iptal senaryoları için `customer.subscription.deleted` olayını da dinleyin.

## n8n Otomasyon Örneği
1. **Trigger:** Stripe `checkout.session.completed` webhook node.
2. **Supabase Güncelleme:** `profiles` tablosunda `id = session.client_reference_id` kaydını bulun, `plan = session.metadata.plan` yapın.
3. **Bildirim:** Slack veya e-posta node’u ile kullanıcıya “Planınız yükseltildi” mesajı gönderin.
4. **Opsiyonel:** Google Drive’a video çıktısını kopyalayın, Notion’a log ekleyin.

## Proje Yapısı
```
SaasM/
├─ src/
│  ├─ components/
│  ├─ hooks/
│  ├─ lib/
│  ├─ pages/
│  ├─ styles/
│  └─ utils/
├─ public/
├─ index.html
├─ package.json
├─ tsconfig.json
├─ tailwind.config.ts
└─ vite.config.ts
```

## Scriptler
| Komut | Açıklama |
| --- | --- |
| `pnpm dev` | Vite geliştirme sunucusu (http://localhost:5173) |
| `pnpm build` | Üretim derlemesi |
| `pnpm preview` | Üretim derlemesini yerelde önizleme |
| `pnpm lint` | ESLint ile statik analiz |

## Geliştirme Notları
- Apple Silicon (M serisi) için `brew install pnpm` ve `arch -arm64 pnpm install` gerekebilir.
- Tailwind sınıfları `src/styles/globals.css` dosyasında tanımlıdır.
- `src/lib/video-api.ts` dosyasında AI video API entegrasyonu için placeholder çağrı bulunur.
- `/api/checkout` uç noktası Netlify/Vercel serverless fonksiyonları veya n8n üzerinden sağlanmalıdır.

## Test & Çalıştırma
```bash
pnpm lint
pnpm test # Jest/Turbo eklediğinizde
```

## Deploy Checklist
### Netlify
1. Build command: `pnpm build`
2. Publish directory: `dist`
3. Çevre değişkenlerini Site settings → Environment’da ekleyin.

### Vercel
1. Framework Preset: Vite
2. Build command: `pnpm build`
3. Output directory: `dist`
4. Environment Variables → `.env` değerlerini tanımlayın.

## Sık Karşılaşılan Hatalar
| Hata | Neden | Çözüm |
| --- | --- | --- |
| `Missing script: dev` | package.json scriptleri eksik | README’deki scripts alanının ekli olduğundan emin olun |
| `Supabase 401/403` | Yanlış URL veya ANON key | `.env` dosyanızı tekrar kontrol edin, RLS policy’lerini doğrulayın |
| `Stripe webhook doğrulanamadı` | WEBHOOK_SECRET eşleşmiyor | Stripe CLI ile yeni secret alın, `.env` dosyasına ekleyin |
| `Tailwind sınıfları çalışmıyor` | PostCSS/Tailwind yapılandırması eksik | `tailwind.config.ts` ve `postcss.config.cjs` dosyalarını kontrol edin |
| `Apple Silicon native modül hatası` | ARM64 derleme problemi | `rm -rf node_modules && pnpm install`, gerekirse `arch -arm64 pnpm install` |

## Lisans
MIT
