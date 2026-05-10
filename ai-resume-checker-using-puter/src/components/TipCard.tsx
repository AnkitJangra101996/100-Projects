import {
    CheckCircle2,
    AlertTriangle,
} from "lucide-react";

type Props = {
    type: "good" | "improve";
    tip: string;
    explanation?: string;
};

const TipCard = ({
    type,
    tip,
    explanation,
}: Props) => {
    const isGood = type === "good";

    return (
        <div
            className={`rounded-2xl border p-5 ${isGood
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

                <div>
                    <h4 className="font-semibold text-white">
                        {tip}
                    </h4>

                    {explanation && (
                        <p className="mt-2 text-sm text-gray-400">
                            {explanation}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TipCard;