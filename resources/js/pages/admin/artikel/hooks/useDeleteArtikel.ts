
import { News } from '@/types/news';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface UseDeleteArtikel {
  isConfirmOpen: boolean;
  selectedArtikel: News | null;
  isLoading: boolean;
  openConfirmModal: (artikel: News) => void;
  closeConfirmModal: () => void;
  handleConfirmDelete: () => void;
}

export default function useDeleteArtikel(): UseDeleteArtikel {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedArtikel, setSelectedArtikel] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openConfirmModal = (artikel: News) => {
    setSelectedArtikel(artikel);
    setIsConfirmOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
    setSelectedArtikel(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedArtikel) return;

    setIsLoading(true);

    router.delete(route('admin-desa.artikel.destroy', selectedArtikel.id), {
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
    selectedArtikel,
    isLoading,
    openConfirmModal,
    closeConfirmModal,
    handleConfirmDelete,
  };
}