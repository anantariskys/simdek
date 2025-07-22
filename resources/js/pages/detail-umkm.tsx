import RootLayout from '@/layouts/app/root-layout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';

interface UmkmDetail {
    id: number;
    slug: string;
    title: string;
    body: string;
    url_gambar: string | null;
    created_at: string;
}

interface RelatedUmkm {
    id: number;
    slug: string;
    title: string;
    url_gambar: string | null;
}

interface Props {
    umkm: UmkmDetail;
    relatedUmkm: RelatedUmkm[];
}

export default function DetailUMKM({ umkm, relatedUmkm }: Props) {
    return (
        <RootLayout>
            <div className="min-h-screen py-8 bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-[60vh] w-full">
                    {umkm.url_gambar ? (
                        <img
                            src={umkm.url_gambar}
                            alt={umkm.title}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200">
                            <span className="text-xl text-gray-500">No Image Available</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 -mt-32 max-w-4xl w-full mx-auto px-4">
                    <Link
                        href="/umkm"
                        className="mb-6 inline-flex items-center text-white hover:text-green-200 transition"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Daftar UMKM
                    </Link>

                    <div className="rounded-xl bg-white p-8 shadow-lg">
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">{umkm.title}</h1>

                        {/* Description */}
                        <div className="prose prose-green max-w-none">
                            <h2 className="text-2xl font-semibold text-gray-900">Deskripsi</h2>
                            <div className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{__html:umkm.body}}/>
                          
             
                        </div>

                        {/* Related UMKM */}
                        {relatedUmkm.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-2xl font-semibold text-gray-900">UMKM Terkait</h2>
                                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {relatedUmkm.map((related) => (
                                        <Link
                                            key={related.id}
                                            href={`/umkm/${related.slug}`}
                                            className="group block"
                                        >
                                            <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg">
                                                {related.url_gambar ? (
                                                    <img
                                                        src={related.url_gambar}
                                                        alt={related.title}
                                                        className="h-full w-full object-cover transition group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-gray-200">
                                                        <span className="text-gray-500">No Image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="mt-2 text-lg font-medium text-gray-900 group-hover:text-green-600">
                                                {related.title}
                                            </h3>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </RootLayout>
    );
}
