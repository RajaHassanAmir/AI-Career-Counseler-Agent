import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db, auth } from "../../firebase";

import {
  push,
  ref,
  onValue
} from "firebase/database";

import { useAuth } from "../../Context/AuthContext";

import { signOut } from "firebase/auth";

function UserDashboard() {

  const navigate = useNavigate();

  const { user, loading } = useAuth();

  const [opportunities, setOpportunities] = useState([]);

  const [recommendedJobs, setRecommendedJobs] = useState([]);

  const [applications, setApplications] = useState([]);

  const [cvFile, setCvFile] = useState(null);

  const [analysis, setAnalysis] = useState("");

  const [uploading, setUploading] = useState(false);

  // 🔐 ROUTE PROTECTION
  useEffect(() => {

    if (!loading && !user) {
      navigate("/auth");
    }

  }, [user, loading, navigate]);

  // 🚪 LOGOUT
  const handleLogout = async () => {

    try {

      await signOut(auth);

      navigate("/auth");

    } catch (error) {

      console.error(error);
    }
  };

  // 🔥 FETCH OPPORTUNITIES
  useEffect(() => {

    const opportunitiesRef = ref(db, "opportunities");

    const unsubscribe = onValue(opportunitiesRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        const loaded = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setOpportunities(loaded);

      } else {

        setOpportunities([]);
      }

    });

    return () => unsubscribe();

  }, []);

  // 🔥 FETCH APPLICATIONS
  useEffect(() => {

    const applicationsRef = ref(db, "applications");

    const unsubscribe = onValue(applicationsRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        const loaded = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        const filtered = loaded.filter(
          (app) => app.userEmail === user?.email
        );

        setApplications(filtered);

      } else {

        setApplications([]);
      }

    });

    return () => unsubscribe();

  }, [user]);

  // 🤖 AI MATCH FUNCTION
  const calculateMatch = (analysisText, job) => {

    const text = analysisText.toLowerCase();

    let score = 0;

    const skills = [
      "python",
      "react",
      "javascript",
      "firebase",
      "mongodb",
      "machine learning",
      "ai",
      "cloud",
      "node",
      "sql",
    ];

    const jobText = `
      ${job.title}
      ${job.company}
      ${job.type}
    `.toLowerCase();

    skills.forEach((skill) => {

      if (
        text.includes(skill) &&
        jobText.includes(skill)
      ) {
        score += 20;
      }

    });

    if (score > 100) {
      score = 100;
    }

    if (score < 20) {
      score = Math.floor(Math.random() * 30) + 20;
    }

    return score;
  };

  // 📄 CV UPLOAD
  const handleCVUpload = async () => {

    if (!cvFile) return;

    const formData = new FormData();

    formData.append("cv", cvFile);

    setUploading(true);

    try {

      const res = await fetch(
        "https://ai-career-counseler-agent.onrender.com/api/upload-cv",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const aiAnalysis = data.analysis || "No AI response";

      setAnalysis(aiAnalysis);

      const matchedJobs = opportunities.map((job) => ({
        ...job,
        match: calculateMatch(aiAnalysis, job),
      }));

      matchedJobs.sort((a, b) => b.match - a.match);

      setRecommendedJobs(matchedJobs);

    } catch (error) {

      console.error(error);

      setAnalysis("Error uploading CV");
    }

    setUploading(false);
  };

  // 🟢 APPLY
 // 🟢 APPLY
  const handleApply = async (job) => {

    try {

      const applicationsRef = ref(db, "applications");

      await push(applicationsRef, {

        // JOB INFO
        jobId: job.id,
        title: job.title,
        company: job.company,
        type: job.type,

        // USER INFO
        userEmail: user?.email || "Unknown",

        // ✅ IMPORTANT FIX
        // SAVE CLIENT EMAIL
        clientEmail: job.clientEmail,

        // APPLICATION STATUS
        status: "Pending",

        // DATE/TIME
        appliedAt: new Date().toISOString(),

      });

      alert("Applied Successfully!");

    } catch (error) {

      console.error(error);

      alert("Application failed");
    }
  };

  // ⏳ LOADING
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07111f] text-white text-3xl font-bold">
        Loading AI Dashboard...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#07111f] text-white relative overflow-hidden">

      {/* GLOW EFFECTS */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* NAVBAR */}
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10 p-5 flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-extrabold">
            CareerAI Dashboard
          </h1>

          <p className="text-gray-400 mt-1">
            Welcome back, {user?.email}
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/user/chat")}
            className="bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2 rounded-xl transition"
          >
            AI Chat
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl transition"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="relative z-10 p-6">

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-5 mb-10">

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400">
              Opportunities
            </p>

            <h2 className="text-5xl font-bold mt-3 text-green-400">
              {opportunities.length}
            </h2>

          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400">
              AI Matches
            </p>

            <h2 className="text-5xl font-bold mt-3 text-blue-400">
              {recommendedJobs.length}
            </h2>

          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400">
              Applications
            </p>

            <h2 className="text-5xl font-bold mt-3 text-purple-400">
              {applications.length}
            </h2>

          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400">
              CV Status
            </p>

            <h2 className="text-lg font-semibold mt-4 text-emerald-300">
              {cvFile ? cvFile.name : "No CV Uploaded"}
            </h2>

          </div>

        </div>

        {/* CV SECTION */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-10">

          <h2 className="text-3xl font-bold mb-4">
            AI Resume Analyzer
          </h2>

          <p className="text-gray-400 mb-6">
            Upload your CV and let AI discover your best career opportunities.
          </p>

          <input
            type="file"
            onChange={(e) => setCvFile(e.target.files[0])}
            className="mb-5 block"
          />

          <button
            onClick={handleCVUpload}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition-all px-8 py-4 rounded-2xl font-bold"
          >

            {uploading
              ? "Analyzing..."
              : "Analyze CV"}

          </button>

        </div>

        {/* AI ANALYSIS */}
        {analysis && (

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-10">

            <h2 className="text-3xl font-bold mb-5">
              AI Career Insights
            </h2>

            <p className="text-gray-300 whitespace-pre-line leading-8">
              {analysis}
            </p>

          </div>
        )}

        {/* APPLICATIONS */}
        {applications.length > 0 && (

          <div className="mb-12">

            <h2 className="text-3xl font-bold mb-6">
              My Applications
            </h2>

            <div className="grid md:grid-cols-3 gap-5">

              {applications.map((app) => (

                <div
                  key={app.id}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6"
                >

                  <div className="flex justify-between items-center">

                    <h3 className="text-2xl font-bold">
                      {app.title}
                    </h3>

                    <span
                      className={`px-4 py-1 rounded-full text-sm ${
                        app.status === "Accepted"
                          ? "bg-green-500"
                          : app.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {app.status}
                    </span>

                  </div>

                  <p className="text-gray-400 mt-4">
                    {app.company}
                  </p>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* OPPORTUNITIES */}
        <div>

          <h2 className="text-3xl font-bold mb-6">
            Available Opportunities
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {opportunities.map((job) => (

              <div
                key={job.id}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:scale-[1.02] transition-all"
              >

                <div className="flex justify-between items-center">

                  <h3 className="text-2xl font-bold">
                    {job.title}
                  </h3>

                  <span className="bg-blue-500 px-4 py-1 rounded-full text-sm">
                    {job.type}
                  </span>

                </div>

                <p className="text-gray-400 mt-4">
                  {job.company}
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  Posted by: {job.clientEmail}
                </p>

                <button
                  onClick={() => handleApply(job)}
                  className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition-all py-3 rounded-2xl font-bold"
                >
                  Apply Now
                </button>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;
