import { Link } from "react-router-dom"
import { Trash } from "lucide-react"
import { useState } from "react"
import type { ResumeResponseType } from "../types/resume";
import { getRelativeDate } from "../utils/helpers";
import DeleteModal from "./DeleteModal";
import puter from "@heyputer/puter.js";
import { useAuth } from "../hooks/useAuth";

const ResumeCard = ({ resume }: { resume: ResumeResponseType }) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [loading, setLoading] = useState(false)

    const { deleteResume } = useAuth();

    const handleDelete = async () => {
        setLoading(true)
        try {
            await Promise.allSettled([
                puter.fs.delete(resume.resumePath),
                puter.fs.delete(resume.imagePath),
            ]);

            await deleteResume(`resume-${resume.id}`);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
            setOpenDelete(false);
        }
    }

    if (!resume) return;

    return (
        <div
            key={resume.id}
            className="resume-card relative group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-brand-yellow/40 hover:bg-white/[0.07]"
        >
            {/* Top */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="line-clamp-1 text-lg font-semibold text-white capitalize">
                        {resume.jobTitle}
                    </h3>

                    <p className="mt-0 text-sm text-gray-400">
                        {getRelativeDate(resume.createdAt)}
                    </p>
                </div>

                <div className={`rounded-full text-black px-4 py-2 text-sm font-semibold ${resume.feedback.overallScore > 80 ? 'bg-green-400' : resume.feedback.overallScore > 50 ? 'bg-brand-yellow' : 'bg-red-400'} `}>
                    {resume.feedback.overallScore}%
                </div>
            </div>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
                {resume.feedback.tags.splice(0, 3).map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-between">
                <Link to={`/resume/${resume.id}`} className="text-sm font-medium text-brand-yellow transition hover:text-white">
                    View Report →
                </Link>

                {/* Delete Button */}
                {<button className="flex items-center gap-2 text-sm font-medium text-red-600 transition hover:text-red-800 hover:cursor-pointer" onClick={() => setOpenDelete(true)}>
                    Delete <Trash className="text-sm" width={15} />
                </button>}
            </div>
            <DeleteModal
                isOpen={openDelete}
                title="Delete Resume"
                message="This will permanently remove your resume and all analysis reports."
                onClose={() => setOpenDelete(false)}
                onConfirm={() => handleDelete()}
                loading={loading}
            />
        </div>
    )
}

export default ResumeCard