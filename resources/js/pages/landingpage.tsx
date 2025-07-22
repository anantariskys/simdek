import { Card } from '@/components/ui/card';
import RootLayout from '@/layouts/app/root-layout';
import { ArrowRight, Bell, Building2, FileText, Map, MessageSquare, Store } from 'lucide-react';

export default function LandingPage() {
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
                        <h1 className="animate-fade-in mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-6xl leading-tight font-extrabold tracking-tight text-transparent">
                            Selamat Datang ke Desa Poncokusumo
                        </h1>

                        <p className="mb-10 max-w-2xl text-xl leading-relaxed font-medium text-green-50">
                            Nikmati pesona kehidupan pedesaan di komunitas pedesaan kami yang indah
                        </p>
                        <button className="rounded-lg bg-[#8B4513] px-8 py-2">Jelajahi Desa Kami</button>
                    </div>
                </div>
            </section>

            {/* Sambutan Kepala Desa */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto">
                    <h2 className="mb-4 text-center text-3xl font-bold text-[#2D5016]">Sambutan Kepala Desa</h2>
                    <div className="flex items-center gap-8">
                        <div className="w-1/3 bg-[#F5F5DC] p-6">
                            <img src="https://i.pravatar.cc/800" alt="Kepala Desa" className="mx-auto mb-4 size-96 rounded-full shadow-lg" />
                            <div>
                                <h2 className="text-center text-3xl font-bold text-[#2D5016]">Samsul Mulio</h2>
                                <h2 className="text-center text-xl font-bold text-[#2D5016]">Kepala Desa</h2>
                            </div>
                        </div>
                        <div className="w-2/3 text-justify text-xl">
                            <p className="mb-4 text-gray-600">
                                Desa Poncokusumo, yang terletak di lereng barat Gunung Semeru di Kecamatan Poncokusumo, Kabupaten Malang, adalah desa
                                wisata yang terkenal dengan agrowisata, termasuk petik apel, kebun jeruk, dan berbagai sayuran hortikultura. Terletak
                                pada ketinggian 926 meter di atas permukaan laut dengan iklim sejuk, desa ini menawarkan atraksi alam seperti Air
                                Terjun Banyu Biru, Hutan Pinus Ledok Ombo, dan arung jeram di Sungai Sedaer.
                            </p>
                            <p className="mb-4 text-gray-600">
                                Desa Poncokusumo, yang terletak di lereng barat Gunung Semeru di Kecamatan Poncokusumo, Kabupaten Malang, adalah desa
                                wisata yang terkenal dengan agrowisata, termasuk petik apel, kebun jeruk, dan berbagai sayuran hortikultura. Terletak
                                pada ketinggian 926 meter di atas permukaan laut dengan iklim sejuk, desa ini menawarkan atraksi alam seperti Air
                                Terjun Banyu Biru, Hutan Pinus Ledok Ombo, dan arung jeram di Sungai Sedaer.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fitur-Fitur Desa Digital */}
            <section className="bg-slate-50 py-20">
                <div className="container mx-auto">
                    <div className="mb-8 text-center">
                        <h2 className="mb-4 text-5xl font-bold text-[#2D5016]">Desa Digital</h2>
                        <p className="mx-auto max-w-2xl text-xl text-green-700">
                            Nikmati kemudahan layanan digital yang memudahkan kehidupan sehari-hari warga desa
                        </p>
                        <div className="mx-auto mt-2 h-1 w-24 bg-yellow-500"></div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-green-600 to-green-700 p-8 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                            <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-white/10"></div>
                            <FileText className="h-14 w-14 text-blue-200 transition-transform group-hover:scale-110" />
                            <h3 className="mb-2 text-2xl font-bold">Layanan Mandiri</h3>
                            <p className="mb-4 leading-relaxed text-blue-100">
                                Pengurusan surat-menyurat dan dokumen kependudukan secara online tanpa antri
                            </p>
                            <div className="flex items-center font-medium text-blue-200 group-hover:text-white">
                                Akses Layanan <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                            </div>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-green-600 to-green-700 p-8 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                            <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-white/10"></div>
                            <Map className="h-14 w-14 text-green-200 transition-transform group-hover:scale-110" />
                            <h3 className="mb-2 text-2xl font-bold">Peta Desa</h3>
                            <p className="mb-4 leading-relaxed text-green-100">
                                Jelajahi peta interaktif dengan lokasi wisata, fasilitas umum, dan UMKM
                            </p>
                            <div className="flex items-center font-medium text-green-200 group-hover:text-white">
                                Lihat Peta <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                            </div>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-green-600 to-green-700 p-8 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                            <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-white/10"></div>
                            <MessageSquare className="h-14 w-14 text-purple-200 transition-transform group-hover:scale-110" />
                            <h3 className="mb-2 text-2xl font-bold">Pengaduan</h3>
                            <p className="mb-4 leading-relaxed text-purple-100">
                                Sampaikan aspirasi dan pengaduan Anda secara langsung ke pemerintah desa
                            </p>
                            <div className="flex items-center font-medium text-purple-200 group-hover:text-white">
                                Buat Pengaduan <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                            </div>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-green-600 to-green-700 p-8 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                            <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-white/10"></div>
                            <Building2 className="h-14 w-14 text-orange-200 transition-transform group-hover:scale-110" />
                            <h3 className="mb-2 text-2xl font-bold">Pemerintah Desa</h3>
                            <p className="mb-4 leading-relaxed text-orange-100">
                                Informasi lengkap tentang struktur organisasi dan program pemerintah desa
                            </p>
                            <div className="flex items-center font-medium text-orange-200 group-hover:text-white">
                                Lihat Info <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                            </div>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-green-600 to-green-700 p-8 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                            <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-white/10"></div>
                            <Store className="h-14 w-14 text-teal-200 transition-transform group-hover:scale-110" />
                            <h3 className="mb-2 text-2xl font-bold">UMKM Desa</h3>
                            <p className="mb-4 leading-relaxed text-teal-100">Jelajahi dan dukung produk serta layanan UMKM lokal desa kami</p>
                            <div className="flex items-center font-medium text-teal-200 group-hover:text-white">
                                Lihat UMKM <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                            </div>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-green-600 to-green-700 p-8 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                            <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-white/10"></div>
                            <Bell className="h-14 w-14 text-yellow-200 transition-transform group-hover:scale-110" />
                            <h3 className="mb-2 text-2xl font-bold">Pengumuman</h3>
                            <p className="mb-4 leading-relaxed text-yellow-100">
                                Dapatkan informasi terbaru dan pengumuman penting dari pemerintah desa
                            </p>
                            <div className="flex items-center font-medium text-yellow-200 group-hover:text-white">
                                Lihat Pengumuman <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </RootLayout>
    );
}
