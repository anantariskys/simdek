
import { News } from '@/types/news';
import { useForm } from '@inertiajs/react';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { toast } from 'react-toastify';

type Category = 'berita' | 'wisata' | 'budaya' | 'umkm';

interface ArtikelForm {
  title: string;
  slug: string;
  body: string;
  category: Category;
  phone_number?: string;
  url_gambar: File | null;
}

export default function useEditArtikel() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    data: form,
    setData,
    post,
    processing: isSubmitting,
    errors,
    reset,
  } = useForm<{
    title: string;
    slug: string;
    body: string;
    category: Category;
    phone_number?: string;
    url_gambar: File | null;
  }>({
    title: '',
    slug: '',
    body: '',
    category: 'berita',
    phone_number: '',
    url_gambar: null,
  });

  function openEditModal(artikel: News) {
    setSelectedId(artikel.id);
    setIsEditOpen(true);

    setData({
      title: artikel.title,
      slug: artikel.slug,
      body: artikel.body ?? "",
      category: artikel.category as Category,
      phone_number: artikel.phone_number ?? "",
      url_gambar: null
    });

    if (artikel.url_gambar) {
      setPreview(artikel.url_gambar);
    }
  }

  function closeEditModal() {
    setIsEditOpen(false);
    reset();
    setSelectedId(null);
    setPreview(null);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setData(name as keyof ArtikelForm, value);
  }

  function handleCustomChange(name: string, value: string) {
    setData(name as keyof ArtikelForm, value);
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;

    if (file && !file.type.startsWith('image/')) {
      toast.error('Hanya file gambar yang diperbolehkan.');
      setData('url_gambar', null);
      setPreview(null);
      return;
    }

    setData('url_gambar', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    const slug = form.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    setData('slug', slug);
  }, [form.title]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selectedId) return;

    post(route('admin-desa.artikel.update', selectedId), {
      forceFormData: true,
      onSuccess: (res) => {
        closeEditModal();
        const flash = res.props.flash as { success?: string; error?: string } | undefined;
        if (flash?.success) {
          toast.success(flash.success);
        } else if (flash?.error) {
          toast.error(flash.error);
        } else {
          toast.error('Gagal memperbarui artikel.');
        }
      },
      onError: () => {
        toast.error('Terjadi kesalahan saat memperbarui data.');
      },
    });
  }

  return {
    isEditOpen,
    openEditModal,
    closeEditModal,
    form,
    handleChange,
    handleCustomChange,
    handleFileChange,
    handleSubmit,
    isSubmitting,
    errors,
    preview,
  };
}