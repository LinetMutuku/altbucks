import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Loader2, AlertCircle } from 'lucide-react';

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
}

const DeleteConfirmDialog = ({ isOpen, onClose, onConfirm }: DeleteConfirmDialogProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen) return null;

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onConfirm();
        } finally {
            setIsDeleting(false);
            onClose();
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-[1px] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-[400px] bg-white shadow-xl rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 space-y-4">
                    <div className="flex items-start space-x-4">
                        <div className="shrink-0 mt-0.5">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                                Delete Task
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Are you sure you want to delete this task? This action cannot be undone.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="inline-flex items-center justify-center text-sm font-medium
                                 text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200
                                 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300
                                 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="inline-flex items-center justify-center text-sm font-medium
                                 text-white bg-red-600 px-4 py-2 rounded-lg border border-transparent
                                 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
                                 focus:ring-offset-2 transition-colors disabled:opacity-50
                                 disabled:cursor-not-allowed min-w-[80px]"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                <span>Deleting</span>
                            </>
                        ) : (
                            'Delete'
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default DeleteConfirmDialog;