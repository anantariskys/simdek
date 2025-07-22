import DataTable from '@/components/shared/datatable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { InertiaPagination } from '@/types/pagination';
import { Pengumuman } from '@/types/pengumuman';
import { Head, router, usePage } from '@inertiajs/react';
import { CreateModal } from './components/create-modal';

import useCreatePengumuman from './hooks/useCreatePengumuman';
import useEditPengumuman from './hooks/useEditPengumuman';
import { EditModal } from './components/edit-modal';
import useDeletePengumuman from './hooks/useDeletePengumuman';
import ConfirmModal from '@/components/shared/confirm-modal';

export default function PengumumanPage() {
  const { pengumumans } = usePage<{
    pengumumans: InertiaPagination<Pengumuman>;
  }>().props;

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pengumuman', href: '/admin-desa/pengumuman' },
  ];

  const {
    closeCreateModal,
    errors: createErrors,
    form: createForm,
    handleChange: handleCreateChange,
    handleSubmit: handleCreateSubmit,
    isCreateOpen,
    isSubmitting: isCreateSubmitting,
    openCreateModal,
  } = useCreatePengumuman();

  const {
    closeEditModal,
    errors: editErrors,
    form: editForm,
    handleChange: handleEditChange,
    handleSubmit: handleEditSubmit,
    isEditOpen,
    isSubmitting: isEditSubmitting,
    openEditModal,
  } = useEditPengumuman();

  const {
    closeConfirmModal,
    handleConfirmDelete,
    isConfirmOpen,
    isLoading,
    openConfirmModal,
    selectedPengumuman
  } = useDeletePengumuman();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Admin Desa | Pengumuman" />
      <div className="container mx-auto my-4">
        <Button onClick={openCreateModal} className="mb-4">
          Tambah Pengumuman
        </Button>
        <DataTable<Pengumuman>
          title="Daftar Pengumuman"
          data={pengumumans}
          columns={[
            { key: 'nama', label: 'Nama' },
            { key: 'tgl_pelaksanaan', label: 'Tanggal' },
            { key: 'lokasi', label: 'Lokasi' },
            { key: 'deskripsi', label: 'Deskripsi' },
            {
              key: 'actions',
              label: 'Aksi',
              render: (item) => (
                <div className="flex space-x-2">
                  <Button
                    variant={'default'}
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={'destructive'}
                    onClick={() => openConfirmModal(item)}
                  >
                    Hapus
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </div>

      <CreateModal
        isOpen={isCreateOpen}
        onClose={closeCreateModal}
        onSubmit={handleCreateSubmit}
        isSubmitting={isCreateSubmitting}
        form={createForm}
        errors={createErrors}
        onChange={handleCreateChange}
      />

      <EditModal
        isOpen={isEditOpen}
        onClose={closeEditModal}
        onSubmit={handleEditSubmit}
        isSubmitting={isEditSubmitting}
        form={editForm}
        errors={editErrors}
        onChange={handleEditChange}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmDelete}
        isLoading={isLoading}
        title="Hapus Pengumuman"
        description="Apakah anda yakin ingin menghapus pengumuman ini?"
        confirmText="Hapus"
        cancelText="Batal"
      />
    </AppLayout>
  );
}
