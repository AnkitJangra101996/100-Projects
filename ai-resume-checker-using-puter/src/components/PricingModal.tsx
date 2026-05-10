import {
    X,
    Check,
    Sparkles,
    Coins,
} from "lucide-react";
import { plans } from "../data/pricing";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const PricingModal = ({
    isOpen,
    onClose,
}: Props) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
            <div className="relative w-full max-w-6xl rounded-4xl border border-white/10 bg-brand-dark p-8 shadow-2xl lg:p-10">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 rounded-xl p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/20 bg-brand-yellow/10 px-4 py-2 text-sm text-brand-yellow">
                        <Sparkles size={16} />
                        Upgrade Your Plan
                    </div>

                    <h2 className="mt-5 text-4xl font-black text-white">
                        Choose Your Credits Plan
                    </h2>

                    <p className="mt-4 text-gray-400">
                        Pick a plan and continue optimizing your resumes
                        with AI-powered analysis.
                    </p>
                </div>

                {/* Plans */}
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-3xl border p-6 transition ${plan.popular
                                ? "border-brand-yellow bg-brand-yellow/10 scale-[1.02]"
                                : "border-white/10 bg-white/5"
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-yellow px-4 py-2 text-xs font-bold text-black">
                                    Most Popular
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3 className="text-2xl font-bold text-white">
                                {plan.name}
                            </h3>

                            {/* Price */}
                            <div className="mt-4">
                                <span className="text-4xl font-black text-white">
                                    {plan.price}
                                </span>
                            </div>

                            {/* Credits */}
                            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-black/20 px-4 py-3">
                                <Coins
                                    size={18}
                                    className="text-brand-yellow"
                                />
                                <span className="font-medium text-white">
                                    {plan.credits} Credits
                                </span>
                            </div>

                            {/* Features */}
                            <div className="mt-6 space-y-4">
                                {plan.features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-start gap-3"
                                    >
                                        <Check
                                            size={18}
                                            className="mt-0.5 text-brand-yellow"
                                        />

                                        <p className="text-sm text-gray-300">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            {/* <button
                                onClick={() =>
                                    handlePlanSelection(plan.id)
                                }
                                // onClick={handlePlanSelection}
                                className={`mt-8 w-full rounded-2xl px-5 py-4 font-semibold transition ${plan.popular
                                    ? "bg-brand-yellow text-black hover:bg-white"
                                    : "border border-white/10 text-white hover:bg-white/5"
                                    }`}
                            >
                                Choose {plan.name}
                            </button> */}
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <p className="mt-8 text-center text-lg text-white  flex flex-col">
                    <span className="font-bold">Subscriptions Coming Soon 💳</span>

                    <span className="semibold">
                        Flexible plans and credits are on the way.
                        Unlock more analyses and premium AI features soon.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default PricingModal;