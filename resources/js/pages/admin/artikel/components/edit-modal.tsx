'use client';

import Modal from '@/components/shared/modal';
import { ChangeEvent, FormEvent, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type Category = 'berita' | 'wisata' | 'budaya' | 'umkm';

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
  form: {
    title: string;
    slug: string;
    body: string;
    category: Category;
    phone_number?: string;
    url_gambar: File | null;
  };
  errors: Record<string, string | undefined>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCustomChange: (name: string, value: string) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
};

export function EditModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  form,
  errors,
  onChange,
  onCustomChange,
  onFileChange,
  preview,
}: EditModalProps) {
  const editorRef = useRef(null);

  const handleSubmit = (e: FormEvent) => {
    onSubmit(e);
  };

  return (
    <Modal title="Edit Artikel" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isSubmitting={isSubmitting}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Judul</label>
          <input type="text" name="title" value={form.title} onChange={onChange} className="w-full rounded border px-3 py-2" />
          {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input type="text" name="slug" value={form.slug} readOnly className="w-full rounded border bg-gray-100 px-3 py-2 text-gray-500" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Isi Artikel</label>
          <ReactQuill theme="snow" value={form.body} onChange={(val) => onCustomChange('body', val)} />
          {errors.body && <p className="text-sm text-red-500">{errors.body}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Kategori</label>
          <select name="category" value={form.category} onChange={onChange} className="w-full rounded border px-3 py-2">
            <option value="berita">Berita</option>
            <option value="wisata">Wisata</option>
            <option value="budaya">Budaya</option>
            <option value="umkm">UMKM</option>
          </select>
          {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
        </div>

        {form.category === 'umkm' && (
          <div>
            <label className="block text-sm font-medium">Nomor HP</label>
            <input
              type="text"
              name="phone_number"
              value={form.phone_number || ''}
              onChange={onChange}
              className="w-full rounded border px-3 py-2"
            />
            {errors.phone_number && <p className="text-sm text-red-500">{errors.phone_number}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">Gambar</label>
          <input type="file" accept="image/*" name="url_gambar" onChange={onFileChange} className="w-full" />
          {errors.url_gambar && <p className="text-sm text-red-500">{errors.url_gambar}</p>}
        </div>

        {preview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Preview:</p>
            <img src={preview} alt="Preview" className="max-h-64 w-full rounded border object-contain" />
          </div>
        )}
      </div>
    </Modal>
  );
}
