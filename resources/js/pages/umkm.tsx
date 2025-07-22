import Pagination from '@/components/shared/pagination';
import RootLayout from '@/layouts/app/root-layout';
import { InertiaPagination } from '@/types/pagination';
import { Link } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';

interface UmkmItem {
    id: number;
    slug: string;
    title: string;
    body: string;
    url_gambar: string | null;
    created_at: string;
}

interface Props {
    umkms: InertiaPagination<UmkmItem>
}

export default function UMKM({ umkms }: Props) {
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
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-800/70 to-green-900/90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-20 right-20 h-32 w-32 animate-pulse rounded-full bg-white/5 blur-xl" />
                <div className="absolute bottom-32 left-16 h-24 w-24 animate-pulse rounded-full bg-green-400/10 blur-lg delay-1000" />

                <div className="relative z-10 container mx-auto px-6 text-white">
                    <div className="max-w-3xl">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/15 px-4 py-2 backdrop-blur-sm">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            <span className="text-sm font-medium">Produk Lokal</span>
                        </div>

                        <h1 className="animate-fade-in mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-7xl leading-tight font-extrabold tracking-tight text-transparent">
                            UMKM Desa Poncokusumo
                        </h1>
                        <p className="mb-12 max-w-2xl text-2xl leading-relaxed font-medium text-green-50">
                            Jelajahi beragam produk unggulan hasil karya warga desa. Dari makanan tradisional hingga kerajinan lokal, dukung ekonomi
                            desa dengan belanja dari UMKM kami.
                        </p>

                        {/* Stats */}
                        <div className="flex gap-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{umkms.total}</div>
                                <div className="text-sm text-green-200">UMKM Terdaftar</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">100%</div>
                                <div className="text-sm text-green-200">Produk Lokal</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* UMKM List */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-12 text-center text-3xl font-bold text-green-800">Daftar UMKM</h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {umkms.data.map((item) => (
                            <Link
                                key={item.id}
                                href={route('umkm.show', item.slug)}
                                className="group block overflow-hidden rounded border shadow transition hover:shadow-lg"
                            >
                                {item.url_gambar ? (
                                    <img
                                        src={item.url_gambar}
                                        alt={item.title}
                                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex aspect-video w-full items-center justify-center bg-gray-200 text-gray-500">No Image</div>
                                )}
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-green-900 group-hover:text-green-700">{item.title}</h3>
                                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">{item.body}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Pagination links={umkms.links} />
                </div>
            </section>
        </RootLayout>
    );
}
