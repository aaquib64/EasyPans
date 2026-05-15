
import { useState } from "react";
import logo from "@/assets/logo.png";

const Survey = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    cookingFrequency: "",
    feedback: "",
    wantsEarlyAccess: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5001/api/auth/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Submission failed");
      }

      localStorage.setItem("surveyCompleted", "true");
      alert("Thanks for joining EasyPans 🎉");
      onClose?.();
    } catch (err) {
      setError("Server not reachable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-4 my-6"> 
        <div className="mx-auto mb-4 w-18 h-18 rounded-full  flex items-center justify-center">
         <img src={logo} alt="EasyPans Logo" className="h-10 w-auto" />
        </div>

      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Early Access Survey
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Help us build EasyPans better 
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <input
          name="name"
          value={formData.name}
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
        />

        <input
          name="email"
          type="email"
          value={formData.email}
          placeholder="Email Address"
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-4 py-3 outline-none"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3 bg-white"
        >
          <option value="">You are</option>
          <option>Student</option>
          <option>Working Professional</option>
          <option>Home Cook</option>
          <option>Small Food Business</option>
        </select>

        <select
          name="cookingFrequency"
          value={formData.cookingFrequency}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3 bg-white"
        >
          <option value="">Cooking Frequency</option>
          <option>Daily</option>
          <option>3–5 times/week</option>
          <option>Occasionally</option>
          <option>Rarely</option>
        </select>

        <textarea
          name="feedback"
          rows="3"
          value={formData.feedback}
          placeholder="Your biggest cooking challenge"
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3 resize-none"
        />

        <label className="flex items-center gap-2 text-gray-600">
          <input
            type="checkbox"
            name="wantsEarlyAccess"
            checked={formData.wantsEarlyAccess}
            onChange={handleChange}
          />
          Notify me for early access
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
        >
          {loading ? "Submitting..." : "Submit Survey"}
        </button>
      </form>
    </div>
  );
};

export default Survey;


