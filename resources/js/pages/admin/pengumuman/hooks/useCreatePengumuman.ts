import { useForm } from '@inertiajs/react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';

export default function useCreatePengumuman() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const {
    data: form,
    setData,
    post,
    processing: isSubmitting,
    errors,
    reset,
  } = useForm<{
    nama: string;
    tgl_pelaksanaan: string;
    lokasi: string;
    deskripsi: string;
  }>({
    nama: '',
    tgl_pelaksanaan: '',
    lokasi: '',
    deskripsi: '',
  });

  function openCreateModal() {
    setIsCreateOpen(true);
  }

  function closeCreateModal() {
    setIsCreateOpen(false);
    reset();
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setData(name as keyof typeof form, value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    post(route('admin-desa.pengumuman.store'), {
      onSuccess: (res) => {
        closeCreateModal();
        const flash = res.props.flash as { success?: string; error?: string } | undefined;

        console.log(res) // debug flash message in console for development purpose only, remove this line in productio

        if (flash?.success) {
          toast.success(flash.success);
        } else if (flash?.error) {
          toast.error(flash.error);
        } else {
          toast.error('Gagal menambahkan pengumuman.');
        }
      },
      onError: () => {
        toast.error('Terjadi kesalahan saat menambahkan data.');
      },
    });
  }

  return {
    isCreateOpen,
    openCreateModal,
    closeCreateModal,
    form,
    handleChange,
    handleSubmit,
    isSubmitting,
    errors,
  };
}
