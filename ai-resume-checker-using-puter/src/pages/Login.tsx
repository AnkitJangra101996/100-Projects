import { Sparkles, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-yellow/10 blur-3xl" />
      </div>

      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden flex-col justify-between border-r border-white/10 p-12 lg:flex">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/20 bg-brand-yellow/10 px-4 py-2 text-sm text-brand-yellow">
              <Sparkles size={16} />
              AI Resume Intelligence
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-white">
              Optimize Your Resume.
              <br />
              <span className="text-brand-yellow">Land More Interviews.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-gray-400">
              Analyze resumes with AI-powered ATS scoring, recruiter insights,
              and optimization suggestions tailored for modern hiring systems.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {[
              "ATS Compatibility Analysis",
              "AI Resume Optimization",
              "Recruiter-Level Feedback",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-gray-300">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-yellow">
                  <ShieldCheck size={16} />
                </div>

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Heading */}
            <div className="mb-8 text-center lg:hidden">
              <h2 className="font-display text-3xl font-bold text-white">
                Resume Analyzer
              </h2>

              <p className="mt-2 text-gray-400">
                AI-powered resume optimization
              </p>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-4xl font-bold text-white">Welcome Back</h2>

              <p className="mt-3 text-gray-400">
                Sign in with Puter to continue optimizing your resume and
                accessing AI-powered insights.
              </p>
            </div>

            {/* Login Card */}
            <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <button
                onClick={handleLogin}
                className="group flex w-full items-center justify-center gap-4 rounded-2xl bg-brand-yellow px-6 py-4 text-lg font-semibold text-black transition hover:scale-[1.01] hover:bg-white"
              >
                <img
                  src="https://puter.com/logo.png"
                  alt="Puter"
                  className="h-6"
                />
                Continue with Puter
              </button>

              <p className="mt-6 text-center text-sm leading-6 text-gray-500">
                Secure authentication powered by Puter.
                <br />
                No passwords required.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500">
              By continuing, you agree to our{" "}
              <button className="text-brand-yellow hover:text-white">
                Terms
              </button>{" "}
              and{" "}
              <button className="text-brand-yellow hover:text-white">
                Privacy Policy
              </button>
              .
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
