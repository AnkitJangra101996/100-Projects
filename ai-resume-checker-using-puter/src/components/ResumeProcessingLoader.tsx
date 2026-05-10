import { Loader2, CheckLine } from "lucide-react";
import FileScanning from '../../public/file-scanning.gif';

const ResumeProcessingLoader = ({
  message,
}: {
  message: string;
}) => {
  const isCompleted = message === 'Complete';
  const isFailure = message === 'Failure';
  return (
    <section className="flex min-h-screen items-center justify-center bg-brand-dark px-6">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
        {/* Animated Icon */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-yellow/10">
          {isCompleted ? (
            <CheckLine size={42} />
          ) : (
            <Loader2 size={42} className="animate-spin text-brand-yellow" />
          )}
          {/* <Loader2 size={42} className="animate-spin text-brand-yellow" /> */}

          <div className="absolute inset-0 rounded-full border border-brand-yellow/20 animate-ping" />
        </div>

        {/* Heading */}
        <h2 className="mt-8 text-3xl font-bold text-white">
          {isCompleted
            ? "Resume Analysis Complete" : isFailure ? "Resume Analysis Aborted" : "Analyzing Your Resume"}
        </h2>

        <p className="mt-3 text-gray-400">
          {isCompleted ? "Redirecting to your resume summary page..." : isFailure ? "There is some internal server error... redirecting to home in"
            : `Our AI is reviewing your resume for ATS compatibility, recruiter impact, and optimization opportunities.`}
        </p>

        {/* Processing States */}
        {isCompleted || !isFailure && <div className="flex items-center flex-col">
          <img src={FileScanning} />
          <p className="text-md text-white font-semibold ">
            {message}
          </p>
        </div>}
      </div>
    </section>
  );
};

export default ResumeProcessingLoader;
