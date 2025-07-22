import { Link } from "@inertiajs/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Header/Navigation */}
            <header>
                <nav className="bg-slate-50 shadow-lg">
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            {/* Logo & Title */}
                            <div className="flex items-center space-x-3">
                                <img className="size-16" src="/logodesa.png" alt="Logo Desa" />
                                <h1 className="text-lg font-bold text-slate-900">Desa Poncokusumo</h1>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden space-x-6 text-slate-900 md:flex">
                                <Link href="/" className="transition-colors hover:text-green-700">
                                    Beranda
                                </Link>

                                <Link href="/pemerintah-desa" className="transition-colors hover:text-green-700">
                                    Pemerintah Desa
                                </Link>
                                <Link href="/umkm" className="transition-colors hover:text-green-700">
                                    UMKM
                                </Link>
                                <Link href="/pengumuman" className="transition-colors hover:text-green-700">
                                    Pengumuman
                                </Link>
                             
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden">
                                <button className="hover:text-green-700" aria-label="Menu">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className=" flex-grow">{children}</main>

            {/* Footer */}
            <footer className="bg-[#F5F5DC] text-slate-900">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        {/* Brand Section */}
                        <section>
                            <div className="mb-4 flex items-center space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
                                    <span className="font-bold text-white">🏘️</span>
                                </div>
                                <h2 className="text-lg font-semibold">Desa Poncokusumo</h2>
                            </div>
                            <p className="text-sm text-green-700">
                                Sebuah komunitas pedesaan yang menawan di mana tradisi bertemu dengan ketenangan.
                            </p>
                        </section>

                        {/* Main Menu Section */}
                        <section>
                            <h2 className="mb-3 text-lg font-semibold">Menu Utama</h2>
                            <nav>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a href="/profil" className="text-green-700 transition-colors hover:text-green-900">
                                            Profil Desa
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/pemerintahan" className="text-green-700 transition-colors hover:text-green-900">
                                            Struktur Pemerintahan
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/potensi" className="text-green-700 transition-colors hover:text-green-900">
                                            Potensi Desa
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </section>

                        {/* Services Section */}
                        <section>
                            <h2 className="mb-3 text-lg font-semibold">Layanan</h2>
                            <nav>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a href="/surat-online" className="text-green-700 transition-colors hover:text-green-900">
                                            Jadesta
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/surat-online" className="text-green-700 transition-colors hover:text-green-900">
                                            Surat Online
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/pengaduan" className="text-green-700 transition-colors hover:text-green-900">
                                            Pengaduan Masyarakat
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/informasi-publik" className="text-green-700 transition-colors hover:text-green-900">
                                            Informasi Publik
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/jadwal-kegiatan" className="text-green-700 transition-colors hover:text-green-900">
                                            Jadwal Kegiatan
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </section>

                        {/* Contact Section */}
                        <section>
                            <h2 className="mb-3 text-lg font-semibold">Kontak Kami</h2>
                            <address className="space-y-2 text-sm not-italic">
                                <p className="flex items-center text-green-700">
                                    Desa Poncokusumo, Kecamatan Poncokusumo, Kabupaten Malang, Provinsi Jawa Timur
                                </p>
                                <p className="flex items-center text-green-700">
                                    <span className="mr-2">📞</span>
                                    +1 (555) 123-4567
                                </p>
                                <p className="flex items-center text-green-700">
                                    <span className="mr-2">✉️</span>
                                    info@willowbrookvillage.com
                                </p>
                                <nav className="mt-3 flex space-x-3">
                                    <a href="#" className="text-green-700 hover:text-green-900" aria-label="Facebook">
                                        📘
                                    </a>
                                    <a href="#" className="text-green-700 hover:text-green-900" aria-label="Instagram">
                                        📷
                                    </a>
                                    <a href="#" className="text-green-700 hover:text-green-900" aria-label="Twitter">
                                        🐦
                                    </a>
                                </nav>
                            </address>
                        </section>
                    </div>

                    {/* Footer Bottom */}
                    <div className="mt-8 border-t border-gray-700 pt-6">
                        <div className="flex flex-col items-center justify-center text-sm md:flex-row">
                            <p className="text-green-700">&copy; {new Date().getFullYear()} Desa Poncokusumo. Semua hak dilindungi.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
