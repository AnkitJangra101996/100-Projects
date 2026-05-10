import {
    AlertCircle,
    CheckCircle2,
    Info,
    TriangleAlert,
    X,
} from "lucide-react";

type AlertVariant =
    | "error"
    | "success"
    | "warning"
    | "info";

type AlertProps = {
    variant: AlertVariant;
    title?: string;
    message: string;
    onClose?: () => void;
};

const alertConfig = {
    error: {
        icon: AlertCircle,
        wrapper: "border-red-500/20 bg-red-500/10",
        title: "text-red-400",
        message: "text-red-300",
        iconColor: "text-red-400",
    },

    success: {
        icon: CheckCircle2,
        wrapper: "border-green-500/20 bg-green-500/10",
        title: "text-green-400",
        message: "text-green-300",
        iconColor: "text-green-400",
    },

    warning: {
        icon: TriangleAlert,
        wrapper: "border-yellow-500/20 bg-yellow-500/10",
        title: "text-yellow-400",
        message: "text-yellow-300",
        iconColor: "text-yellow-400",
    },

    info: {
        icon: Info,
        wrapper: "border-blue-500/20 bg-blue-500/10",
        title: "text-blue-400",
        message: "text-blue-300",
        iconColor: "text-blue-400",
    },
};

const Alert = ({
    variant,
    title,
    message,
    onClose,
}: AlertProps) => {
    const config = alertConfig[variant];
    const Icon = config.icon;

    return (
        <div
            className={`rounded-2xl border p-4 ${config.wrapper}`}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${config.iconColor}`}>
                        <Icon size={18} />
                    </div>

                    <div>
                        {title && (
                            <h3
                                className={`text-sm font-semibold ${config.title}`}
                            >
                                {title}
                            </h3>
                        )}

                        <p className={`text-sm ${config.message}`}>
                            {message}
                        </p>
                    </div>
                </div>

                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="opacity-70 transition hover:opacity-100"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Alert;