import { ReactNode } from 'react';
import { Button } from '../ui/button';

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  children: ReactNode;
  isSubmitting?: boolean;
  showFooter?: boolean;
};

export default function Modal({
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  isSubmitting = false,
  showFooter = true,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg max-h-[640px] overflow-auto shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">{children}</div>

          {showFooter && (
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
