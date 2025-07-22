import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Category = 'berita' | 'wisata' | 'budaya' | 'umkm';

interface CreateArtikelForm {
  title: string;
  slug: string;
  body: string;
  category: Category;
  phone_number?: string;
  url_gambar: File | null;
}

export default function useCreateArtikel() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

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

  function openCreateModal() {
    setIsCreateOpen(true);
  }

  function closeCreateModal() {
    setIsCreateOpen(false);
    reset();
    setPreview(null);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setData(name as keyof CreateArtikelForm, value);
  }

  function handleCustomChange(name: string, value: string) {
    setData(name as keyof CreateArtikelForm, value);
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
    } else {
      setPreview(null);
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

    post(route('admin-desa.artikel.store'), {
      forceFormData: true,

      onSuccess: (res) => {
        closeCreateModal();
        const flash = res.props.flash as { success?: string; error?: string } | undefined;

        if (flash?.success) {
          toast.success(flash.success);
        } else if (flash?.error) {
          toast.error(flash.error);
        } else {
          toast.error('Gagal menambahkan artikel.');
        }
      },
      onError: () => {
        toast.error('Terjadi kesalahan saat menambahkan artikel.');
      },
    });
  }

  return {
    isCreateOpen,
    openCreateModal,
    closeCreateModal,
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
