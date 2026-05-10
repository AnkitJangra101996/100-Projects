
import {
    Coins,
    Sparkles,
    Zap,
    RefreshCcw,
} from "lucide-react";
import { usePricingModal } from "../context/pricingModal";
type Props = {
    credits?: number;
    onRefresh?: () => void;
};

const OutOfCredits = ({
    credits = 0,
    onRefresh,
}: Props) => {

    const { setModalOpen } = usePricingModal();

    return (
        <>
            <section className="flex min-h-screen items-center justify-center bg-brand-dark px-6 py-10 text-white">
                <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl lg:p-12">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/20 bg-brand-yellow/10 px-4 py-2 text-sm text-brand-yellow">
                        <Sparkles size={16} />
                        Credit Limit Reached
                    </div>

                    {/* Hero */}
                    <div className="mt-8 flex flex-col items-center text-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-brand-yellow/10 text-brand-yellow">
                            <Coins size={42} />
                        </div>

                        <h1 className="mt-6 text-4xl font-black">
                            You’re Out of Credits
                        </h1>

                        <p className="mt-4 max-w-xl leading-8 text-gray-400">
                            Resume analysis requires credits. Purchase more
                            credits to continue generating ATS reports,
                            optimization insights, and AI-powered
                            recommendations.
                        </p>
                    </div>

                    {/* Credit Status */}
                    <div className="mt-10 rounded-3xl border border-white/10 bg-black/20 p-6">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400">
                                Available Credits
                            </span>

                            <span className="text-2xl font-bold text-white">
                                {credits}
                            </span>
                        </div>

                        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/5">
                            <div
                                className="h-full rounded-full bg-brand-yellow"
                                style={{ width: `${credits}%` }}
                            />
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="mt-10 grid gap-4 md:grid-cols-3">
                        {[
                            "AI Resume Analysis",
                            "ATS Optimization",
                            "Skill Gap Detection",
                        ].map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl border border-white/10 bg-white/5 p-5"
                            >
                                <Zap
                                    size={18}
                                    className="text-brand-yellow"
                                />

                                <p className="mt-3 text-sm text-gray-300">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <button
                            onClick={() => setModalOpen()}
                            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-yellow px-6 py-4 font-semibold text-black transition hover:bg-white"
                        >
                            <Coins size={18} />
                            Buy More Credits
                        </button>

                        <button
                            onClick={onRefresh}
                            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-4 font-semibold text-white transition hover:bg-white/5"
                        >
                            <RefreshCcw size={18} />
                            Refresh Status
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Credits are used per resume analysis.
                    </p>
                </div>
            </section>
        </>

    );
};

export default OutOfCredits;