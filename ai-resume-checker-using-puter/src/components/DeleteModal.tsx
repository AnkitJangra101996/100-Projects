import { Trash2, X, Loader2 } from "lucide-react";
import { useEffect } from "react";

type Props = {
    isOpen: boolean;
    title?: string;
    message?: string;
    loading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const DeleteModal = ({
    isOpen,
    title = "Delete Item",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    loading = false,
    onClose,
    onConfirm,
}: Props) => {

    useEffect(() => {
        document.documentElement.classList.toggle('overflow-hidden', loading || isOpen);

        return () => document.documentElement.classList.remove('overflow-hidden');
    }, [loading, isOpen])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-brand-dark p-8 shadow-2xl">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 rounded-xl p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-400">
                    <Trash2 size={34} />
                </div>

                {/* Title */}
                <h2 className="mt-6 text-2xl font-bold text-white">
                    {title}
                </h2>

                {/* Message */}
                <p className="mt-4 leading-7 text-gray-400">
                    {message}
                </p>

                {/* Actions */}
                <div className="mt-8 flex gap-4">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 rounded-2xl border border-white/10 px-5 py-4 font-semibold text-white transition hover:bg-white/5 disabled:pointer-events-none"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 py-4 font-semibold text-white transition hover:opacity-90"
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 size={18} />
                                Delete
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;