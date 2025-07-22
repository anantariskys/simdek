import DataTable from '@/components/shared/datatable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { News } from '@/types/news';
import { InertiaPagination } from '@/types/pagination';
import { Head, usePage } from '@inertiajs/react';
import { CreateArtikelModal } from './components/create-modal';

import ConfirmModal from '@/components/shared/confirm-modal';
import { EditModal } from './components/edit-modal';
import useCreateArtikel from './hooks/useCreateArtikel';
import useDeleteArtikel from './hooks/useDeleteArtikel';
import useEditArtikel from './hooks/useEditArtikel';

export default function ArtikelPage() {
    const { artikels } = usePage<{
        artikels: InertiaPagination<News>;
    }>().props;

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Artikel', href: '/admin-desa/artikel' }];

    const {
        errors: createErrors,
        form: createForm,
        handleChange: handleCreateChange,
        handleFileChange: handleCreateFileChange,
        handleSubmit: handleCreateSubmit,
        isSubmitting: isCreateSubmitting,
        isCreateOpen,
        closeCreateModal,
        openCreateModal,
        preview: createPreview,
        handleCustomChange: handleCreateCustomChange,
    } = useCreateArtikel();

    const {
        closeEditModal,
        isEditOpen,
        openEditModal,
        errors: editErrors,
        form: editForm,
        handleChange: handleEditChange,
        handleCustomChange: handleEditCustomChange,
        handleFileChange: handleEditFileChange,
        handleSubmit: handleEditSubmit,
        isSubmitting: isEditSubmitting,
        preview: editPreview,
    } = useEditArtikel();

    const {
        closeConfirmModal: closeDeleteModal,
        handleConfirmDelete: handleDelete,
        isConfirmOpen: isDeleteOpen,
        isLoading: isDeleteLoading,
        openConfirmModal: openDeleteModal,
    } = useDeleteArtikel();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Desa | Artikel" />
            <div className="container mx-auto my-4 px-4">
                <Button onClick={openCreateModal} className="mb-4">
                    Tambah Artikel
                </Button>
                <DataTable<News>
                    title="Daftar Artikel"
                    data={artikels}
                    columns={[
                        {
                            key: 'image',
                            label: 'Gambar',
                            render: (item) => (
                                <img className="aspect-square w-52 object-contain" src={item.url_gambar || undefined} alt={item.title} />
                            ),
                        },
                        { key: 'title', label: 'Judul' },
                        { key: 'category', label: 'Kategori' },
                        {
                            key: 'created_at',
                            label: 'Tanggal Dibuat',
                            render: (item) => new Date(item.created_at).toLocaleDateString('id-ID'),
                        },
                        {
                            key: 'actions',
                            label: 'Aksi',
                            render: (item) => (
                                <div className="flex space-x-2">
                                    <Button variant={'outline'} onClick={() => window.open(`/artikel/${item.slug}`, '_blank')}>
                                        Preview
                                    </Button>
                                    <Button variant={'default'} onClick={() => openEditModal(item)}>
                                        Edit
                                    </Button>
                                    <Button variant={'destructive'} onClick={() => openDeleteModal(item)}>
                                        Hapus
                                    </Button>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>

            <CreateArtikelModal
                isOpen={isCreateOpen}
                onClose={closeCreateModal}
                onSubmit={handleCreateSubmit}
                isSubmitting={isCreateSubmitting}
                form={createForm}
                errors={createErrors}
                onChange={handleCreateChange}
                onCustomChange={handleCreateCustomChange}
                onFileChange={handleCreateFileChange}
                preview={createPreview}
            />

            <EditModal
                isOpen={isEditOpen}
                onClose={closeEditModal}
                onSubmit={handleEditSubmit}
                isSubmitting={isEditSubmitting}
                form={editForm}
                errors={editErrors}
                onChange={handleEditChange}
                onCustomChange={handleEditCustomChange}
                onFileChange={handleEditFileChange}
                preview={editPreview}
            />

            <ConfirmModal
                isOpen={isDeleteOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                isLoading={isDeleteLoading}
                title="Hapus Artikel"
                description="Apakah anda yakin ingin menghapus artikel ini?"
                confirmText="Hapus"
                cancelText="Batal"
            />
        </AppLayout>
    );
}
