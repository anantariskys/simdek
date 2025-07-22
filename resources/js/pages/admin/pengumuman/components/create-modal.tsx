import Modal from '@/components/shared/modal';
import { FormEvent, ChangeEvent } from 'react';


type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
  form: {
    nama: string;
    tgl_pelaksanaan: string;
    lokasi: string;
    deskripsi: string;
  };
  errors: Record<string, string | undefined>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export function CreateModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  form,
  errors,
  onChange,
}: CreateModalProps) {
  return (
    <Modal
      title="Tambah Pengumuman"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    >
      <div>
        <label className="block text-sm font-medium">Nama</label>
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={onChange}
          className="w-full rounded border px-3 py-2"
        />
        {errors.nama && <p className="text-sm text-red-500">{errors.nama}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Tanggal Pelaksanaan</label>
        <input
          type="date"
          name="tgl_pelaksanaan"
          value={form.tgl_pelaksanaan}
          onChange={onChange}
          className="w-full rounded border px-3 py-2"
        />
        {errors.tgl_pelaksanaan && <p className="text-sm text-red-500">{errors.tgl_pelaksanaan}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Lokasi</label>
        <input
          type="text"
          name="lokasi"
          value={form.lokasi}
          onChange={onChange}
          className="w-full rounded border px-3 py-2"
        />
        {errors.lokasi && <p className="text-sm text-red-500">{errors.lokasi}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Deskripsi</label>
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={onChange}
          className="w-full rounded border px-3 py-2"
        />
        {errors.deskripsi && <p className="text-sm text-red-500">{errors.deskripsi}</p>}
      </div>
    </Modal>
  );
}
