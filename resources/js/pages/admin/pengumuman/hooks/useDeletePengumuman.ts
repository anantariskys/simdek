import { Pengumuman } from '@/types/pengumuman';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface UseDeletePengumuman {
  isConfirmOpen: boolean;
  selectedPengumuman: Pengumuman | null;
  isLoading: boolean;
  openConfirmModal: (pengumuman: Pengumuman) => void;
  closeConfirmModal: () => void;
  handleConfirmDelete: () => void;
}

export default function useDeletePengumuman(): UseDeletePengumuman {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedPengumuman, setSelectedPengumuman] = useState<Pengumuman | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openConfirmModal = (pengumuman: Pengumuman) => {
    setSelectedPengumuman(pengumuman);
    setIsConfirmOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
    setSelectedPengumuman(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedPengumuman) return;

    setIsLoading(true);

    router.delete(route('admin-desa.pengumuman.destroy', selectedPengumuman.id), {
      onSuccess: (res) => {
        setIsLoading(false);
        closeConfirmModal();

        const flash = res.props.flash as { success?: string; error?: string } | undefined;

        const successMessage = flash?.success;
        const errorMessage = flash?.error;

        if (successMessage) {
          toast.success(successMessage);
        } else if (errorMessage) {
          toast.error(errorMessage);
        } else {
          toast.error('Gagal menghapus data.');
        }
      },
      onError: () => {
        setIsLoading(false);
        toast.error('Gagal menghapus data.');
      },
      preserveState: true,
    });
  };

  return {
    isConfirmOpen,
    selectedPengumuman,
    isLoading,
    openConfirmModal,
    closeConfirmModal,
    handleConfirmDelete,
  };
}