import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Home,
    ArrowLeft,
    AlertTriangle,
} from "lucide-react";

const REDIRECT_SECONDS = 5;

const NotFound = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] =
        useState(REDIRECT_SECONDS);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate("/");
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <section className="flex min-h-screen items-center justify-center bg-brand-dark px-6 text-white">
            <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
                {/* Icon */}
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-brand-yellow/10 text-brand-yellow">
                    <AlertTriangle size={42} />
                </div>

                {/* 404 */}
                <h1 className="mt-8 text-7xl font-black tracking-tight text-brand-yellow">
                    404
                </h1>

                {/* Heading */}
                <h2 className="mt-4 text-3xl font-bold text-white">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="mx-auto mt-4 max-w-lg leading-8 text-gray-400">
                    The page you’re looking for doesn’t exist,
                    has been moved, or the URL might be incorrect.
                </p>

                {/* Redirect Notice */}
                <div className="mt-8 rounded-2xl border border-brand-yellow/20 bg-brand-yellow/10 px-5 py-4">
                    <p className="text-sm text-brand-yellow">
                        Redirecting to homepage in{" "}
                        <span className="font-bold">
                            {countdown}s
                        </span>
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <button
                        onClick={() => navigate("/")}
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-yellow px-6 py-4 font-semibold text-black transition hover:bg-white"
                    >
                        <Home size={18} />
                        Go Home
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-4 font-semibold text-white transition hover:bg-white/5"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NotFound;