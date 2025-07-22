import RootLayout from '@/layouts/app/root-layout';
import { Landmark } from 'lucide-react';

export default function PemerintahDesa() {
  return (
    <RootLayout>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: "url('/heroimg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="relative flex min-h-[85vh] items-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-800/70 to-green-900/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-24 right-24 h-28 w-28 animate-pulse rounded-full bg-white/5 blur-xl" />
        <div className="absolute bottom-24 left-16 h-20 w-20 animate-pulse rounded-full bg-green-400/10 blur-lg delay-1000" />

        <div className="relative z-10 container mx-auto px-6 text-white">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/15 px-4 py-2 backdrop-blur-sm">
              <Landmark className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">Pemerintahan Desa</span>
            </div>

            <h1 className="animate-fade-in mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-6xl leading-tight font-extrabold tracking-tight text-transparent">
              Struktur Pemerintah Desa Poncokusumo
            </h1>

            <p className="mb-10 max-w-2xl text-xl leading-relaxed font-medium text-green-50">
              Pemerintah Desa Poncokusumo berkomitmen untuk mewujudkan pelayanan publik yang transparan, partisipatif, dan berorientasi pada
              kesejahteraan masyarakat.
            </p>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-green-800">Struktur Organisasi</h2>
          <p className="mb-10 max-w-xl mx-auto text-gray-600">
            Berikut adalah susunan struktur pemerintahan desa Poncokusumo yang memegang peran penting dalam tata kelola desa dan pelayanan masyarakat.
          </p>

          <div className="relative mx-auto p-4 max-w-7xl overflow-hidden rounded-lg shadow-lg border">
            <img
              src="/bagan-struktur.png"
              alt="Struktur Pemerintahan Desa Poncokusumo"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
    </RootLayout>
  );
}
