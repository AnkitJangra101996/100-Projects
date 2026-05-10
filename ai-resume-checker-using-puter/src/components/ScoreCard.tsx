import GaugeComponent from "react-gauge-component";

type Props = {
    title: string;
    score: number;
};

const ScoreCard = ({ title, score }: Props) => {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-6 text-lg font-semibold text-white">
                {title}
            </h3>

            <GaugeComponent
                value={score}
                minValue={0}
                maxValue={100}
            />

            <div className="mt-4 text-center text-2xl font-bold text-white">
                {score}/100
            </div>
        </div>
    );
};

export default ScoreCard;