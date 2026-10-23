import { Link } from "react-router-dom";
import { Home, BookOpen, GraduationCap, Phone, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-xl w-full text-center bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-4xl shadow-lg mb-6">
          404
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          Page Not Found
        </h1>

        <p className="text-slate-600 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
          The page or document you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <Link
            to="/"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-100 transition group"
          >
            <Home size={20} className="mb-1.5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Home</span>
          </Link>

          <Link
            to="/academics"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-100 transition group"
          >
            <BookOpen size={20} className="mb-1.5 text-indigo-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Academics</span>
          </Link>

          <Link
            to="/admissions"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-100 transition group"
          >
            <GraduationCap size={20} className="mb-1.5 text-purple-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Admissions</span>
          </Link>

          <Link
            to="/contact"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-100 transition group"
          >
            <Phone size={20} className="mb-1.5 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Contact</span>
          </Link>
        </div>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-900 text-white font-bold text-sm shadow-md hover:bg-blue-800 transition"
        >
          <ArrowLeft size={16} className="mr-2" />
          Return to KBS Public School Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
