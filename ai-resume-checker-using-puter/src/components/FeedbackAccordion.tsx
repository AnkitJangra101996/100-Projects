import { useState } from "react";
import {
    ChevronDown,
    CheckCircle2,
    AlertTriangle,
} from "lucide-react";

type Tip = {
    type: "good" | "improve";
    tip: string;
};

type Props = {
    title: string;
    score: number;
    tips: Tip[];
};

const FeedbackAccordion = ({
    title,
    score,
    tips,
}: Props) => {
    const [open, setOpen] = useState(false);

    const getScoreColor = () => {
        if (score >= 75) return "text-green-400";
        if (score >= 50) return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-white/5"
            >
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        {title}
                    </h3>

                    <p
                        className={`mt-1 text-sm font-medium ${getScoreColor()}`}
                    >
                        Score: {score}/100
                    </p>
                </div>

                <ChevronDown
                    className={`transition duration-300 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Content */}
            <div
                className={`grid transition-all duration-300 ${open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="space-y-4 border-t border-white/10 px-6 py-6">
                        {tips.map((tip, index) => {
                            const isGood = tip.type === "good";

                            return (
                                <div
                                    key={index}
                                    className={`rounded-2xl border p-4 ${isGood
                                            ? "border-green-500/20 bg-green-500/10"
                                            : "border-yellow-500/20 bg-yellow-500/10"
                                        }`}
                                >
                                    <div className="flex gap-3">
                                        {isGood ? (
                                            <CheckCircle2 className="text-green-400" />
                                        ) : (
                                            <AlertTriangle className="text-yellow-400" />
                                        )}

                                        <p className="leading-7 text-gray-300">
                                            {tip.tip}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackAccordion;