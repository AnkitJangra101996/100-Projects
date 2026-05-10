import React, { useState } from "react";
import { Upload, Briefcase, Sparkles, FileText, Trash } from "lucide-react";
import ResumeProcessingLoader from "../components/ResumeProcessingLoader";
import { cleanJson, formatFileSize } from "../utils/helpers";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import puter from "@heyputer/puter.js";
import type { MessageType, ResumeFeedback, ResumeResponseType } from "../types/resume";
import { pdfToImageBlob } from "../utils/pdfToImage";
import { prepareInstructions } from "../constants/resume";
import { useAuth } from "../hooks/useAuth";
import OutOfCredits from "../components/OutOfCredits";

const ResumeUpload = () => {
  const [activeTab, setActiveTab] = useState("job");
  const [analysisMessage, setAnalysisMessage] = useState<MessageType | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { deducteCredit, user } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-title") as string;

    if (!jobTitle || !jobDescription || !file) {
      setError("All Field Are Required");
      return;
    }

    try {
      setAnalysisMessage('Uploading Resume....');
      const resumeUpload = await puter.fs.upload([file]);
      const resumeUploadPath = Array.isArray(resumeUpload) ? resumeUpload[0]?.path : resumeUpload?.path;
      if (!resumeUpload || !resumeUploadPath) {
        setAnalysisMessage('Failure');
        return;
      }

      setAnalysisMessage('Generating Image....')

      const imageBlob = await pdfToImageBlob(file);

      const imageFile = new File(
        [imageBlob],
        `${file.name}-preview.png`,
        {
          type: "image/png",
        }
      );

      const imageUpload = await puter.fs.upload([imageFile]);
      const imageUploadPath = Array.isArray(imageUpload) ? imageUpload[0]?.path : imageUpload?.path;
      if (!imageUpload || !imageUploadPath) {
        setAnalysisMessage('Failure');
        return;
      }

      setAnalysisMessage('Calculating ATS score and recommendations....')
      const uniqueId = crypto.randomUUID();

      const feedbackInstructions = prepareInstructions({ jobTitle, jobDescription });

      const feedback = puter.ai.chat([{
        role: 'user',
        content: [
          {
            type: 'file', puter_path: resumeUploadPath,
          },
          { type: 'text', text: feedbackInstructions }
        ],
      }])

      const feedbackResString = (await feedback).message.content?.[0]?.text as string;
      const paresedFeedback = cleanJson(feedbackResString) as unknown as ResumeFeedback;

      if (!feedbackResString || !paresedFeedback) {
        setAnalysisMessage('Failure');
        return;
      }
      const data: ResumeResponseType = {
        id: uniqueId,
        resumePath: resumeUploadPath,
        imagePath: imageUploadPath,
        jobTitle,
        jobDescription,
        feedback: {
          overallScore: paresedFeedback?.overallScore,
          ATS: paresedFeedback?.ATS,
          toneAndStyle: paresedFeedback?.toneAndStyle,
          content: paresedFeedback?.content,
          structure: paresedFeedback?.structure,
          skills: paresedFeedback?.skills,
          tags: paresedFeedback?.tags,
        },
        createdAt: Date.now(),
      }

      await puter.kv.set(`resume-${uniqueId}`, data);
      await deducteCredit(`resume-${uniqueId}`);
      setAnalysisMessage('Complete');

      setTimeout(() => navigate(`/resume/${uniqueId}`), 2000);
    } catch (error) {
      setAnalysisMessage(error?.message);
    }
  };

  if (!user) return;

  if (user?.credits === 0) return <OutOfCredits />

  if (analysisMessage) return <ResumeProcessingLoader message={analysisMessage} />;

  return (
    <section className="min-h-screen bg-brand-dark px-6 py-14 text-white lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-yellow/20 bg-brand-yellow/10 px-4 py-2 text-sm text-brand-yellow">
            <Sparkles size={16} />
            AI Resume Optimization
          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Optimize Your Resume with AI
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            Improve ATS compatibility, recruiter impact, keyword optimization,
            and tailor your resume for specific job roles.
          </p>
        </div>

        {/* Tabs */}
        {/* <div className="mt-14 flex w-full rounded-2xl border border-white/10 bg-white/5 p-2">
          <button
            onClick={() => setActiveTab("job")}
            className={`flex-1 rounded-xl px-5 py-4 text-sm font-semibold transition ${activeTab === "job"
              ? "bg-brand-yellow text-black"
              : "text-gray-300 hover:bg-white/5"
              }`}
          >
            Job Specific Optimizer
          </button>

          <button
            onClick={() => setActiveTab("general")}
            className={`flex-1 rounded-xl px-5 py-4 text-sm font-semibold transition ${activeTab === "general"
              ? "bg-brand-yellow text-black"
              : "text-gray-300 hover:bg-white/5"
              }`}
          >
            Overall Resume Optimizer
          </button>
        </div> */}

        {/* Content */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          {/* Job Specific Optimizer */}
          {activeTab === "job" && (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Job Title */}
              <div>
                <label
                  className="mb-3 block text-sm font-medium text-gray-300"
                  htmlFor="job-title"
                >
                  Job Title
                </label>

                <div className="relative">
                  <Briefcase
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type="text"
                    name="job-title"
                    id="job-title"
                    placeholder="e.g. Frontend Developer"
                    className="w-full rounded-2xl border border-white/10 bg-brand-gray px-12 py-4 text-white outline-none placeholder:text-gray-500 focus:border-brand-yellow"
                  />
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label
                  className="mb-3 block text-sm font-medium text-gray-300"
                  htmlFor="job-desc"
                >
                  Job Description
                </label>

                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Paste the complete job description here..."
                  id="job-desc"
                  className="w-full rounded-2xl border border-white/10 bg-brand-gray px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-brand-yellow"
                />
              </div>

              {/* Upload Resume */}
              <div>
                {!file ? (
                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-brand-gray px-8 py-14 text-center transition hover:border-brand-yellow/40 hover:bg-white/3">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-yellow transition group-hover:scale-110">
                      <Upload size={34} />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-white">
                      Drag & Drop Resume
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                      Upload your PDF resume and let AI optimize it.
                    </p>

                    <div className="mt-6 rounded-xl bg-brand-yellow px-5 py-3 font-medium text-black transition hover:bg-white">
                      Choose File
                    </div>

                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                          setFile(selectedFile);
                        }
                      }}
                    />
                  </label>
                ) : (
                  <div className="rounded-3xl border border-white/10 bg-brand-gray p-6">
                    <div className="flex items-center justify-between gap-4">
                      {/* File Info */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-yellow/10 text-brand-yellow">
                          <FileText size={28} />
                        </div>

                        <div>
                          <h3 className="max-w-[240px] truncate text-base font-semibold text-white">
                            {file.name}
                          </h3>

                          <p className="mt-1 text-sm text-gray-400">
                            <span>{formatFileSize(file.size)}</span> &nbsp; |
                            &nbsp;
                            <span>
                              {new Date(file.lastModified)
                                .toLocaleDateString()
                                .replaceAll("/", "-")}{" "}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
                      >
                        <Trash size={18} />
                      </button>
                    </div>

                    {/* Status */}
                    <div className="mt-5 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                      Resume uploaded successfully. Delete to upload a new one.
                    </div>
                  </div>
                )}
              </div>
              {/* Error Alert */}
              {error && <Alert variant="error" message={error} />}

              {/* CTA */}
              <button
                type="submit"
                className="w-full rounded-2xl bg-brand-yellow px-6 py-4 text-lg font-semibold text-black transition hover:bg-white"
              >
                Analyze & Optimize Resume
              </button>
            </form>
          )}

          {/* General Optimizer */}
          {activeTab === "general" && (
            <div className="space-y-8">
              {/* Upload Area */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-300">
                  Upload Resume
                </label>

                <label className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-brand-gray px-8 py-16 text-center transition hover:border-brand-yellow/40 hover:bg-white/[0.03]">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-yellow transition group-hover:scale-110">
                    <FileText size={34} />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-white">
                    Upload Your Resume
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                    Get complete AI-powered feedback including ATS score,
                    keyword optimization, readability analysis, and recruiter
                    insights.
                  </p>

                  <div className="mt-6 rounded-xl bg-brand-yellow px-5 py-3 font-medium text-black transition hover:bg-white">
                    Select Resume
                  </div>

                  <input type="file" className="hidden" />
                </label>
              </div>

              {/* CTA */}
              <button className="w-full rounded-2xl bg-brand-yellow px-6 py-4 text-lg font-semibold text-black transition hover:bg-white">
                Start Resume Analysis
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResumeUpload;
