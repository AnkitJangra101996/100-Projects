import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 px-6 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row">
        {/* Logo / Brand */}
        <div className="flex flex-col gap-2 items-start">
          <Link to={"/"} className="font-display">
            <span className="bg-brand-yellow py-2 px-1 text-black rounded-md">
              AI Resume
            </span>{" "}
            Analyzer
          </Link>

          {/* <p className="text-sm text-gray-400">
            AI-powered resume intelligence
          </p> */}
        </div>

        {/* Links */}
        {/* <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href="#" className="transition hover:text-brand-yellow">
            Privacy
          </a>

          <a href="#" className="transition hover:text-brand-yellow">
            Terms
          </a>

          <a href="#" className="transition hover:text-brand-yellow">
            Contact
          </a>
        </div> */}

        {/* Copyright */}
        <p className="text-sm text-gray-500">© 2026 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
