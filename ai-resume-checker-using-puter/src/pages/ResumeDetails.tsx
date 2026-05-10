import puter from "@heyputer/puter.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { FeedbackCategory, ResumeResponseType } from "../types/resume";
import GaugeComponent from "react-gauge-component";
import FeedbackAccordion from "../components/FeedbackAccordion";
import ResumeSummaryLoader from "../components/ResumeSummaryLoader";
import ResumeSummaryError from "../components/ResumeSummaryError";
import { getRelativeDate } from "../utils/helpers";

const ResumeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<ResumeResponseType | null>(null);
    const [loading, setLoading] = useState(null);
    const [imageUrl, setImageUrl] = useState(null)
    const [error, setError] = useState<boolean>(false)
    const [sections, setSections] = useState([])

    useEffect(() => {
        const fetchResumeDetails = async (): Promise<void> => {
            try {
                setLoading(true);
                const response: ResumeResponseType = await puter.kv.get(`resume-${id}`);
                if (!response) {
                    setError(true)
                    return
                }
                const imageFile = await puter.fs.read(response.imagePath)
                if (!imageFile) return;
                const imageBlob = new Blob([imageFile]);
                if (!imageBlob) return;
                const imageUrl = URL.createObjectURL(imageBlob);
                setImageUrl(imageUrl);
                setData(response);
                setSections(Object.entries(response?.feedback).filter(([key]) => !["overallScore", "tags"].includes(key)));
                console.log(response)
            } catch (error) {
                console.log(error)
                setError(true);
            } finally {
                setLoading(null);
            }
        }

        if (!id) {
            navigate('/');
        } else {
            fetchResumeDetails();
        }
    }, [id, navigate])

    if (loading) return <ResumeSummaryLoader />;

    if (error || !data) return <ResumeSummaryError />;

    return (
        <section className="min-h-screen bg-brand-dark px-6 py-10 text-white lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
                    {/* LEFT */}
                    <div className="sticky top-8 space-y-6">
                        {/* Resume Preview */}
                        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                            <img
                                src={imageUrl}
                                alt="Resume Preview"
                                className="w-full object-cover"
                            />
                        </div>

                        {/* Gauge */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <h3 className="text-lg font-semibold">
                                Overall Score
                            </h3>

                            <div className="mt-6">
                                <GaugeComponent
                                    value={data.feedback.overallScore}
                                />
                            </div>

                            <div className="mt-4 text-center text-4xl font-bold">
                                {data.feedback.overallScore}/100
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div>
                        {/* Header */}
                        <div>
                            <div className="inline-flex rounded-full bg-brand-yellow/10 px-4 py-2 text-sm text-brand-yellow">
                                AI Resume Analysis
                            </div>

                            <h1 className="mt-5 text-4xl font-black">
                                Resume Optimization Report
                            </h1>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {data.feedback.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Tags */}
                            <p className="mt-4 text-gray-400 capitalize">
                                Role Targeted:
                                <span className="ml-2 text-white">
                                    {data.jobTitle}
                                </span>
                            </p>

                            {/* Create AT */}
                            <p className="mt-1 text-gray-400">
                                Report Generated:
                                <span className="ml-2 text-white">
                                    {getRelativeDate(data.createdAt)}
                                </span>
                            </p>
                        </div>

                        {/* Accordions */}
                        <div className="mt-10 space-y-5">
                            {sections.map(([key, value]: [key: string, value: FeedbackCategory]) => (
                                <FeedbackAccordion
                                    key={key}
                                    title={value.title}
                                    score={value.score}
                                    tips={value.tips}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ResumeDetails;