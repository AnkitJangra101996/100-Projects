import {
    AlertTriangle,
    RefreshCcw,
    ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
    title?: string;
    message?: string;
};

const ResumeSummaryError = ({
    title = "Something went wrong",
    message = "We couldn’t generate your resume analysis. Please try again.",
}: Props) => {

    const onRetry = () => {
        window.location.reload();
    }

    return (
        <section className="flex min-h-screen items-center justify-center bg-brand-dark px-6 text-white">
            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
                {/* Icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                    <AlertTriangle size={36} />
                </div>

                {/* Title */}
                <h1 className="mt-6 text-3xl font-black">
                    {title}
                </h1>

                {/* Message */}
                <p className="mt-4 leading-8 text-gray-400">
                    {message}
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={onRetry}
                        className="flex items-center gap-2 rounded-2xl bg-brand-yellow px-6 py-4 font-semibold text-black transition hover:bg-white"
                    >
                        <RefreshCcw size={18} />
                        Try Again
                    </button>

                    <Link to={'/'} className="flex items-center gap-2 rounded-2xl border border-white/10 px-6 py-4 font-semibold text-white transition hover:bg-white/5">
                        <ArrowLeft size={18} />
                        Go Back
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ResumeSummaryError;