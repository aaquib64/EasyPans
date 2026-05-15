import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Survey from "../pages/Survey";

const SurveyModal = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // ❌ Do not show on admin pages
    if (location.pathname.startsWith("/admin")) return;

    // ❌ Do not show on survey page itself
    if (location.pathname === "/survey") return;

    // ❌ Do not show if already submitted
    if (localStorage.getItem("surveyCompleted")) return;

    // Show after 6 seconds
    const timer = setTimeout(() => {
      setOpen(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-lg w-full p-4 relative">
        <button
          className="absolute top-3 right-3 text-lg"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        <Survey onClose={() => setOpen(false)} />
      </div>
    </div>
  );
};

export default SurveyModal;
