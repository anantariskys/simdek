export type News = {
    id: number;
    user_id: number;
    slug: string;
    title: string;
    body: string;
    url_gambar: string | null;
    category: 'berita' | 'wisata' | 'budaya' | 'umkm';
    phone_number: string | null;
    created_at: string;
    updated_at: string;
}