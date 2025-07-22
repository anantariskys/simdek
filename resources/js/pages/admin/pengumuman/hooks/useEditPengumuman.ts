
import { Pengumuman } from '@/types/pengumuman';
import { useForm } from '@inertiajs/react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';

interface PengumumanForm {
  nama: string;
  tgl_pelaksanaan: string;
  lokasi: string;
  deskripsi: string;
}

export default function useEditPengumuman() {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    data: form,
    setData,
    put,
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

  const [selectedId, setSelectedId] = useState<number | null>(null);

  function openEditModal(pengumuman: Pengumuman) {
    setSelectedId(pengumuman.id);
    setIsEditOpen(true);

    setData({
        nama:pengumuman.nama,
        deskripsi:pengumuman.deskripsi??"",
        tgl_pelaksanaan:pengumuman.tgl_pelaksanaan,
        lokasi:pengumuman.lokasi
    });
  }

  function closeEditModal() {
    setIsEditOpen(false);
    reset();
    setSelectedId(null);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setData(name as keyof PengumumanForm, value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selectedId) return;

    put(route('admin-desa.pengumuman.update', selectedId), {
      onSuccess: (res) => {
        closeEditModal();
        const flash = res.props.flash as { success?: string; error?: string } | undefined;
        if (flash?.success) {
          toast.success(flash.success);
        } else if (flash?.error) {
          toast.error(flash.error);
        } else {
          toast.error('Gagal memperbarui pengumuman.');
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
    handleSubmit,
    isSubmitting,
    errors,
  };
}