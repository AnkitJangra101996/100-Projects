import { useEffect, useState } from "react";
import { FileSearch } from "lucide-react";
import puter from "@heyputer/puter.js";
import ResumeCard from "../components/ResumeCard";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { usePricingModal } from "../context/pricingModal";

const Home = () => {
  const [resumeHistory, setResumenHistory] = useState([]);
  const { user } = useAuth();
  const { setModalOpen } = usePricingModal();

  useEffect(() => {
    const fetchResumeHistory = async () => {
      if (!user?.resumeIds?.length) {
        setResumenHistory([]);
        return;
      }

      try {
        const results = await Promise.allSettled(
          user.resumeIds.map((resumeId) =>
            puter.kv.get(resumeId)
          )
        );

        const resumeValues = results
          .filter(
            (
              result
            ): result is PromiseFulfilledResult<unknown> =>
              result.status === "fulfilled"
          )
          .map((result) => result.value);
        console.log(resumeValues)
        setResumenHistory(resumeValues);
      } catch (error) {
        console.error(
          "Failed to fetch resume history:",
          error
        );
      }
    };

    fetchResumeHistory();
  }, [user]);

  if (user) return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-10 lg:px-12">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-yellow/20 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur">
              ✨ AI-Powered Resume Intelligence
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-white md:text-6xl">
              Land More Interviews with{" "}
              <span className="text-brand-yellow">
                AI-Powered Resume Analysis
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
              Get instant feedback on ATS compatibility, resume quality, weak
              sections, and improvement suggestions tailored for modern hiring
              systems.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {
                user?.credits ?
                  <Link to={'/upload-resume'} className="rounded-xl bg-brand-yellow px-7 py-4 font-semibold text-black transition hover:scale-[1.02] hover:bg-white">
                    Analyze Resume
                  </Link> :
                  <button onClick={() => setModalOpen()} className="rounded-xl bg-brand-yellow px-7 py-4 font-semibold text-black transition hover:scale-[1.02] hover:bg-white">
                    Purchase Credits
                  </button>
              }
            </div>

            {/* Features */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-400">
              <div>✓ ATS Score Analysis</div>
              <div>✓ AI Suggestions</div>
              <div>✓ Keyword Optimization</div>
              <div>✓ Recruiter-Level Feedback</div>
            </div>
          </div>

          {/* Right Side Card */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
              {/* Resume Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Resume Analysis
                  </h3>
                  <p className="text-sm text-gray-400">AI Generated Report</p>
                </div>

                <div className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
                  ATS Score: 92%
                </div>
              </div>

              {/* Analysis Items */}
              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
                  <p className="font-medium text-green-400">
                    Strong Technical Skills Section
                  </p>
                  <p className="mt-1 text-sm text-gray-300">
                    Your resume highlights relevant technologies clearly.
                  </p>
                </div>

                <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                  <p className="font-medium text-yellow-400">
                    Improve Impact Statements
                  </p>
                  <p className="mt-1 text-sm text-gray-300">
                    Add measurable achievements to increase recruiter impact.
                  </p>
                </div>

                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                  <p className="font-medium text-red-400">
                    Missing Industry Keywords
                  </p>
                  <p className="mt-1 text-sm text-gray-300">
                    Your resume may not rank well for ATS filtering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Resume Analyses */}
      <section className="px-6 py-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-yellow">
                History
              </p>

              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Previous Resume Analyses
              </h2>

              <p className="mt-3 text-gray-400">
                Revisit your previous AI-generated resume reports and continue improving your chances of getting shortlisted.
              </p>
            </div>
          </div>

          {/* Empty State */}
          {user?.resumeIds.length === 0 ? (
            <div className="flex min-h-105 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 px-8 py-14 text-center backdrop-blur-xl">
              {/* Icon */}
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-brand-yellow/10 text-brand-yellow">
                <FileSearch size={42} />
              </div>

              {/* Content */}
              <h3 className="mt-8 text-3xl font-bold text-white">
                No Resume Analysis Found
              </h3>

              <p className="mt-4 max-w-lg text-base leading-8 text-gray-400">
                You haven’t analyzed any resumes yet. Upload your resume and get
                AI-powered insights including ATS compatibility, content quality,
                skills matching, and improvement recommendations.
              </p>

              {/* Features */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {[
                  "ATS Score",
                  "Content Review",
                  "Skills Analysis",
                  "Improvement Tips",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            /* Resume Cards */
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {resumeHistory.length > 0 && resumeHistory.map((resume) => <ResumeCard resume={resume} key={resume?.id} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
