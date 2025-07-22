'use client';
import clsx from 'clsx';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { FC } from 'react';
import { Button } from '../ui/button';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'error' | 'warning';
    isLoading?: boolean;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Logout Confirmation',
    description = 'Are you sure you want to logout?',
    confirmText = 'Logout',
    cancelText = 'Cancel',
    type = 'warning',
    isLoading = false,
}) => {
    if (!isOpen) return null;

    const iconWrapperClass = clsx('mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full', {
        'bg-error-100 text-error-600 border-error-50 border-4': type === 'error',
        'bg-warning-100 border-warning-50 border-4 text-yellow-600': type === 'warning',
    });

    const iconClass = clsx('size-8', {
        'text-red-500': type === 'error',
        'text-darkPurple': type === 'warning',
    });

    const buttonVariant = type === 'error' ? 'danger' : type === 'warning' ? 'primary' : type === 'info' ? 'danger' : 'primary';

    const renderIcon = () => {
        switch (type) {
            case 'error':
                return <AlertCircle className={iconClass} />;
            case 'warning':
                return <AlertTriangle className={iconClass} />;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className={iconWrapperClass}>{renderIcon()}</div>

                <h2 className="text-center text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-center text-gray-600">{description}</p>
                <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose} disabled={isLoading}>
                        {cancelText}
                    </Button>
                    <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;