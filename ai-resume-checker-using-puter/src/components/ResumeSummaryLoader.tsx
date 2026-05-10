import { Loader2, Sparkles } from "lucide-react";

const SkeletonBlock = ({
    className = "",
}: {
    className?: string;
}) => (
    <div
        className={`animate-pulse rounded-2xl bg-white/5 ${className}`}
    />
);

const ResumeSummaryLoader = () => {
    return (
        <section className="min-h-screen bg-brand-dark px-6 py-10 text-white lg:px-12">
            <div className="mx-auto max-w-7xl">
                {/* Top Loader Hero */}
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-yellow">
                        <Loader2 size={38} className="animate-spin" />
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-yellow/20 bg-brand-yellow/10 px-4 py-2 text-sm text-brand-yellow">
                        <Sparkles size={16} />
                        AI Resume Analysis in Progress
                    </div>

                    <h1 className="mt-5 text-4xl font-black">
                        Generating Your Resume Report
                    </h1>

                    <p className="mt-4 max-w-xl text-gray-400">
                        Scanning content, calculating ATS score, and
                        preparing personalized recommendations...
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
                    {/* LEFT COLUMN */}
                    <div>
                        <div className="sticky top-8 space-y-6">
                            {/* Resume Preview Skeleton */}
                            <SkeletonBlock className="h-135 w-full rounded-3xl" />

                            {/* Gauge Skeleton */}
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                <SkeletonBlock className="h-6 w-40" />
                                <SkeletonBlock className="mt-8 h-48 w-full rounded-full" />
                                <SkeletonBlock className="mx-auto mt-6 h-8 w-24" />
                            </div>

                            {/* Tags Skeleton */}
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                <SkeletonBlock className="h-6 w-32" />

                                <div className="mt-5 flex flex-wrap gap-3">
                                    {Array.from({ length: 6 }).map(
                                        (_, index) => (
                                            <SkeletonBlock
                                                key={index}
                                                className="h-10 w-24 rounded-full"
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div>
                        {/* Header Skeleton */}
                        <SkeletonBlock className="h-8 w-40" />
                        <SkeletonBlock className="mt-5 h-14 w-80" />
                        <SkeletonBlock className="mt-4 h-5 w-64" />

                        {/* Accordion Skeletons */}
                        <div className="mt-10 space-y-5">
                            {Array.from({ length: 5 }).map(
                                (_, index) => (
                                    <div
                                        key={index}
                                        className="rounded-3xl border border-white/10 bg-white/5 p-6"
                                    >
                                        <SkeletonBlock className="h-6 w-48" />
                                        <SkeletonBlock className="mt-3 h-4 w-24" />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResumeSummaryLoader;