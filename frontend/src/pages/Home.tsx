import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="pt-[80px]">
      {/* Hero Section */}
      <section className="relative bg-surface py-3xl px-margin-mobile md:px-lg max-w-container-max mx-auto border-b border-border-subtle overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-trust-navy via-surface to-surface"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center text-center max-w-[768px] mx-auto space-y-xl">
          <h1 className="font-display-lg text-display-lg text-trust-navy md:text-display-lg text-headline-lg-mobile">Temukan Ruko Strategis untuk Bisnis Anda</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-[576px] mx-auto">Platform tepercaya untuk mencari dan menyewakan ruang komersial dengan data teknis yang terverifikasi.</p>
          {/* Search Bar */}
          <div className="w-full max-w-[672px] bg-surface-container-lowest rounded-xl p-sm shadow-[0px_10px_15px_-3px_rgba(15,76,129,0.1)] border border-border-subtle flex flex-col md:flex-row gap-sm">
            <div className="flex-1 flex items-center bg-surface-gray rounded-lg px-md py-sm border border-transparent focus-within:border-trust-navy transition-colors">
              <span className="material-symbols-outlined text-outline mr-sm">location_on</span>
              <input className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface placeholder:text-outline p-0" placeholder="Lokasi (mis. Sudirman)" type="text" />
            </div>
            <div className="flex-1 flex items-center bg-surface-gray rounded-lg px-md py-sm border border-transparent focus-within:border-trust-navy transition-colors">
              <span className="material-symbols-outlined text-outline mr-sm">storefront</span>
              <input className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface placeholder:text-outline p-0" placeholder="Tipe Bisnis (mis. F&B)" type="text" />
            </div>
            <Link to="/search" className="bg-action-amber text-trust-navy font-bold rounded-lg px-lg py-sm hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center">
              Cari Ruko
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Bento Grid */}
      <section className="py-3xl px-margin-mobile md:px-lg max-w-container-max mx-auto space-y-xl">
        <div className="text-center">
          <h2 className="font-headline-lg text-headline-lg text-trust-navy md:text-headline-lg text-headline-lg-mobile">Keunggulan RukoSpace</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-sm">Data akurat, survei mudah, keputusan cepat.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {/* Feature 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-lg border border-border-subtle shadow-sm hover:shadow-[0px_10px_15px_-3px_rgba(15,76,129,0.1)] transition-shadow">
            <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-trust-navy mb-md">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>qr_code_scanner</span>
            </div>
            <h3 className="font-title-md text-title-md text-trust-navy mb-sm">QR Scan On-Site</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Pindai kode QR di lokasi ruko untuk langsung melihat detail teknis, harga, dan ketersediaan tanpa harus bertanya.</p>
          </div>
          {/* Feature 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-lg border border-border-subtle shadow-sm hover:shadow-[0px_10px_15px_-3px_rgba(15,76,129,0.1)] transition-shadow">
            <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-trust-navy mb-md">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>360</span>
            </div>
            <h3 className="font-title-md text-title-md text-trust-navy mb-sm">360 Virtual Tours</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Jelajahi setiap sudut ruko secara virtual dari perangkat Anda sebelum menjadwalkan kunjungan fisik.</p>
          </div>
          {/* Feature 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-lg border border-border-subtle shadow-sm hover:shadow-[0px_10px_15px_-3px_rgba(15,76,129,0.1)] transition-shadow">
            <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-success-teal mb-md">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <h3 className="font-title-md text-title-md text-trust-navy mb-sm">Spesifikasi Terverifikasi</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Data kapasitas listrik (VA), sumber air, dan zonasi telah divalidasi untuk memastikan kesesuaian operasional bisnis Anda.</p>
          </div>
        </div>
      </section>
      
      {/* Featured Listings */}
      <section className="bg-surface py-3xl px-margin-mobile md:px-lg border-y border-border-subtle">
        <div className="max-w-container-max mx-auto space-y-xl">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-trust-navy md:text-headline-lg text-headline-lg-mobile">Ruko Pilihan</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-sm">Lokasi premium dengan data teknis lengkap.</p>
            </div>
            <Link to="/search" className="hidden md:flex items-center text-trust-navy font-body-sm font-semibold hover:underline">
              Lihat Semua <span className="material-symbols-outlined ml-xs text-[18px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {/* Property Card 1 */}
            <div className="bg-surface-container-lowest rounded-xl border border-border-subtle overflow-hidden hover:shadow-[0px_10px_15px_-3px_rgba(15,76,129,0.1)] transition-shadow group relative">
              <div className="relative h-48 w-full bg-surface-gray">
                <img className="w-full h-full object-cover" data-alt="A high-quality, bright photograph of a modern commercial shopfront in a bustling urban street. The building features clean lines, large glass windows, and a professional aesthetic, reflecting a premium real estate marketplace style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCASFedTDuQQL0iMLrS6nwneikLrskAwd-Esntet17P2IlBkI20xt4qppceCs56IovrGjP59Ny6Cv02TERR4ZlsCLISvV_MyZcXYlEbnz8YlsCWO7DuzGqOHK7WhLT3ZNoueTTyWhzxhl2wE7KzpOn2QyNbpoz7WODhsxf0hpEPNMlF3uuZRqelKLU29OPr0IQU2FmeF-g6WrHePw9BjphxwqZocC--_j1B57sRgceu8iAr6onv5aakYrAYrqka0IddIOwCMVAnRORT" />
                <div className="absolute top-sm right-sm bg-success-teal text-on-primary px-sm py-xs rounded-full flex items-center gap-xs text-[10px] font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified
                </div>
              </div>
              <div className="p-md space-y-md">
                <div>
                  <h4 className="font-title-md text-title-md text-trust-navy line-clamp-1">Ruko Sudirman Boulevard Blok A1</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs mt-xs">
                    <span className="material-symbols-outlined text-[16px]">location_on</span> Jakarta Selatan
                  </p>
                </div>
                {/* Technical Strip */}
                <div className="flex gap-sm border-y border-border-subtle py-sm">
                  <div className="bg-surface-gray px-sm py-xs rounded border border-border-subtle flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[14px] text-outline">straighten</span>
                    <span className="font-technical-data text-technical-data text-trust-navy">120 sqm</span>
                  </div>
                  <div className="bg-surface-gray px-sm py-xs rounded border border-border-subtle flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[14px] text-outline">bolt</span>
                    <span className="font-technical-data text-technical-data text-trust-navy">16,500 VA</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-xs">
                  <div className="font-title-md text-title-md text-trust-navy">Rp 250Jt <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/thn</span></div>
                  <button className="border border-trust-navy text-trust-navy px-sm py-xs rounded font-body-sm font-semibold hover:bg-surface-container-low transition-colors">View Details</button>
                </div>
              </div>
            </div>
            {/* Property Card 2 */}
            <div className="bg-surface-container-lowest rounded-xl border border-border-subtle overflow-hidden hover:shadow-[0px_10px_15px_-3px_rgba(15,76,129,0.1)] transition-shadow group relative">
              <div className="relative h-48 w-full bg-surface-gray">
                <img className="w-full h-full object-cover" data-alt="A clean, wide-angle shot of a multi-story commercial building exterior, situated in a modern commercial park. The lighting is sunny and optimistic, fitting a trustworthy B2B platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Wel5hcqhjmCUmLmLRTH5K8JjlsdsdbTXMLIpsbgQJzUEpN-X6_7T3Z0iXgHBbUrfp-vCJWN9o5XC1oe0w00_KZR-3l3epQMk5eNdjavSv0knjb_t3yHLFzCARfuxwPPy2qIdoGBbwJU39DCZ4ztjARQLDc1qncQe7lkGSku5Msv0nMlXe1zFfyvhbP1dfOLGDi588QiB87RGrKxsRryaJQAXWKb_LzVjxPCn0Jic-EBhR_R7JSwu7pZZWKj9jZqPO_9R-eZ9wO2r" />
                <div className="absolute top-sm right-sm bg-success-teal text-on-primary px-sm py-xs rounded-full flex items-center gap-xs text-[10px] font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified
                </div>
              </div>
              <div className="p-md space-y-md">
                <div>
                  <h4 className="font-title-md text-title-md text-trust-navy line-clamp-1">Grand Kemang Commercial Hub</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs mt-xs">
                    <span className="material-symbols-outlined text-[16px]">location_on</span> Jakarta Selatan
                  </p>
                </div>
                {/* Technical Strip */}
                <div className="flex gap-sm border-y border-border-subtle py-sm">
                  <div className="bg-surface-gray px-sm py-xs rounded border border-border-subtle flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[14px] text-outline">straighten</span>
                    <span className="font-technical-data text-technical-data text-trust-navy">200 sqm</span>
                  </div>
                  <div className="bg-surface-gray px-sm py-xs rounded border border-border-subtle flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[14px] text-outline">bolt</span>
                    <span className="font-technical-data text-technical-data text-trust-navy">33,000 VA</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-xs">
                  <div className="font-title-md text-title-md text-trust-navy">Rp 450Jt <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/thn</span></div>
                  <button className="border border-trust-navy text-trust-navy px-sm py-xs rounded font-body-sm font-semibold hover:bg-surface-container-low transition-colors">View Details</button>
                </div>
              </div>
            </div>
            {/* Property Card 3 */}
            <div className="bg-surface-container-lowest rounded-xl border border-border-subtle overflow-hidden hover:shadow-[0px_10px_15px_-3px_rgba(15,76,129,0.1)] transition-shadow group relative hidden lg:block">
              <div className="relative h-48 w-full bg-surface-gray">
                <img className="w-full h-full object-cover" data-alt="An inviting, well-lit storefront of a newly renovated commercial space. The facade features premium materials like stone and glass. The overall mood conveys corporate reliability and real estate investment potential." src="https://lh3.googleusercontent.com/aida-public/AB6AXuABjCUl7GP2y2E9mpZlJ3Sv-xZmYLHZ9QSRq5Anhdki3UkdJH_W_hBPE6k3V6I6xvocXciJXzKeYqSg7FDe5NNDExJRDZOozW_Y0Gk2Y1KcCAu0BU5t7L_eH5NPgbFezqM8c4LLMB8ciyY_MQ85eGrICoM87dzzlcpD-qR3xGREr5-j2-m9ZwL-DUyz1eiQ9E_GxgrB6WXrAEF3Va6cFiszg4Gft4m2FaK8TcOE5xpatBdMBvNYcpMyH2EhuV2ZdJk7ZTdMX-Zdboz8" />
                <div className="absolute top-sm right-sm bg-action-amber text-trust-navy px-sm py-xs rounded-full flex items-center gap-xs text-[10px] font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[14px]">pending_actions</span> In-Review
                </div>
              </div>
              <div className="p-md space-y-md">
                <div>
                  <h4 className="font-title-md text-title-md text-trust-navy line-clamp-1">Ruko Sentra Bisnis PIK</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs mt-xs">
                    <span className="material-symbols-outlined text-[16px]">location_on</span> Jakarta Utara
                  </p>
                </div>
                {/* Technical Strip */}
                <div className="flex gap-sm border-y border-border-subtle py-sm">
                  <div className="bg-surface-gray px-sm py-xs rounded border border-border-subtle flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[14px] text-outline">straighten</span>
                    <span className="font-technical-data text-technical-data text-trust-navy">150 sqm</span>
                  </div>
                  <div className="bg-surface-gray px-sm py-xs rounded border border-border-subtle flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[14px] text-outline">bolt</span>
                    <span className="font-technical-data text-technical-data text-trust-navy">22,000 VA</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-xs">
                  <div className="font-title-md text-title-md text-trust-navy">Rp 300Jt <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/thn</span></div>
                  <button className="border border-trust-navy text-trust-navy px-sm py-xs rounded font-body-sm font-semibold hover:bg-surface-container-low transition-colors">View Details</button>
                </div>
              </div>
            </div>
          </div>
          <Link to="/search" className="md:hidden flex justify-center items-center text-trust-navy font-body-sm font-semibold hover:underline mt-md">
            Lihat Semua Ruko
          </Link>
        </div>
      </section>
      
      {/* CTA Section for Landlords */}
      <section className="py-3xl px-margin-mobile md:px-lg max-w-container-max mx-auto">
        <div className="bg-trust-navy rounded-2xl p-xl md:p-3xl flex flex-col md:flex-row items-center justify-between gap-xl relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full opacity-50 translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-fixed-dim rounded-full opacity-20 -translate-x-1/2 translate-y-1/2 blur-xl"></div>
          
          <div className="relative z-10 max-w-[672px] text-center md:text-left space-y-md">
            <h2 className="font-headline-lg text-headline-lg text-on-primary md:text-headline-lg text-headline-lg-mobile">Punya Ruko Kosong?</h2>
            <p className="font-body-md text-body-md text-inverse-on-surface opacity-90">Pasarkan properti komersial Anda ke ribuan calon penyewa terverifikasi. Proses listing cepat, aman, dan profesional.</p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link to="/login" className="bg-action-amber text-trust-navy font-bold rounded-lg px-xl py-md text-[16px] hover:opacity-90 transition-opacity shadow-lg inline-flex items-center gap-sm cursor-pointer">
              Mulai Listing Sekarang
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Floating Action Button for Scanner (Visible only on mobile) */}
      <button className="md:hidden fixed bottom-md right-md bg-action-amber text-trust-navy w-14 h-14 rounded-full shadow-[0px_10px_15px_-3px_rgba(15,76,129,0.3)] flex items-center justify-center z-50">
        <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>qr_code_scanner</span>
      </button>
    </main>
  )
}

