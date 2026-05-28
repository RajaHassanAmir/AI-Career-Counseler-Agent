import { useNavigate } from "react-router-dom";

function LandingPage() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen relative overflow-hidden bg-[#07111f] text-white">

      {/* BACKGROUND GLOWS */}

      <div className="absolute top-[-150px] left-[-100px] w-[450px] h-[450px] bg-green-500/20 blur-3xl rounded-full" />

      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-emerald-400/10 blur-3xl rounded-full" />

      <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-cyan-400/10 blur-3xl rounded-full" />

      {/* NAVBAR */}

      <nav className="relative z-10 flex justify-between items-center px-8 md:px-16 py-6 border-b border-white/10 backdrop-blur-xl">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center font-bold text-xl shadow-lg">
            AI
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            CareerAI
          </h1>

        </div>

        <div className="hidden md:flex items-center gap-8 text-gray-300">

          <a
            href="#features"
            className="hover:text-white transition"
          >
            Features
          </a>

          <a
            href="#how"
            className="hover:text-white transition"
          >
            How It Works
          </a>

          <a
            href="#sdg"
            className="hover:text-white transition"
          >
            SDGs
          </a>

        </div>

        <button
          onClick={() => navigate("/auth")}
          className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          Get Started
        </button>

      </nav>

      {/* HERO SECTION */}

      <section className="relative z-10 px-6 md:px-16 pt-24 pb-20">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm text-green-300 mb-6">

              ✨ AI-Powered Career Intelligence

            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">

              Shape Your
              <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                {" "}Future{" "}
              </span>

              With AI

            </h1>

            <p className="mt-8 text-lg text-gray-300 leading-relaxed max-w-xl">

              CareerAI helps students discover career paths,
              analyze CVs, explore opportunities, and receive
              AI-powered career guidance tailored to their skills.

            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <button
                onClick={() => navigate("/auth")}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all px-8 py-4 rounded-2xl font-bold shadow-2xl"
              >
                Launch Platform
              </button>

              <button
                className="border border-white/20 hover:bg-white/10 transition px-8 py-4 rounded-2xl font-semibold"
              >
                Watch Demo
              </button>

            </div>

            {/* STATS */}

            <div className="flex gap-10 mt-14 flex-wrap">

              <div>
                <h2 className="text-4xl font-bold text-green-400">
                  10K+
                </h2>

                <p className="text-gray-400 mt-2">
                  Career Analyses
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-cyan-400">
                  AI
                </h2>

                <p className="text-gray-400 mt-2">
                  Personalized Guidance
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-emerald-400">
                  24/7
                </h2>

                <p className="text-gray-400 mt-2">
                  AI Career Assistant
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">

              <div className="flex justify-between items-center mb-8">

                <h3 className="text-2xl font-bold">
                  AI Career Insights
                </h3>

                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />

              </div>

              <div className="space-y-5">

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                  <div className="flex justify-between mb-2">

                    <span className="text-gray-300">
                      CV Score
                    </span>

                    <span className="text-green-400 font-bold">
                      92%
                    </span>

                  </div>

                  <div className="w-full bg-white/10 rounded-full h-3">

                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full w-[92%]" />

                  </div>

                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                  <h4 className="font-semibold mb-3">
                    Recommended Careers
                  </h4>

                  <div className="flex flex-wrap gap-3">

                    <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm">
                      AI Engineer
                    </span>

                    <span className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm">
                      Data Scientist
                    </span>

                    <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm">
                      Full Stack Developer
                    </span>

                  </div>

                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/20 rounded-2xl p-5">

                  <h4 className="font-bold text-lg">
                    AI Assistant Active
                  </h4>

                  <p className="text-gray-300 mt-2">
                    Personalized recommendations are being generated based on your skills.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="relative z-10 px-6 md:px-16 py-20"
      >

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            Powerful AI Features
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Everything students need for career growth
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all">

            <div className="text-5xl mb-5">
              🤖
            </div>

            <h3 className="text-2xl font-bold mb-4">
              AI Career Guidance
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Receive personalized career recommendations powered by AI.
            </p>

          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all">

            <div className="text-5xl mb-5">
              📄
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Smart CV Analysis
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Upload your CV and get intelligent insights instantly.
            </p>

          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all">

            <div className="text-5xl mb-5">
              🚀
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Opportunities Hub
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Explore jobs, internships, and courses matched to your profile.
            </p>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section
        id="how"
        className="relative z-10 px-6 md:px-16 py-20"
      >

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            How It Works
          </h2>

        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">

          {[
            "Create Account",
            "Upload CV",
            "AI Analysis",
            "Get Opportunities",
          ].map((step, index) => (

            <div
              key={index}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center"
            >

              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center font-bold text-xl mb-5">
                {index + 1}
              </div>

              <h3 className="text-xl font-semibold">
                {step}
              </h3>

            </div>

          ))}

        </div>

      </section>

      {/* SDG */}

      <section
        id="sdg"
        className="relative z-10 px-6 md:px-16 py-20"
      >

        <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 text-center">

          <h2 className="text-5xl font-bold mb-6">
            Supporting Global SDGs
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed">

            CareerAI contributes toward SDG 4
            (Quality Education) and SDG 8
            (Decent Work & Economic Growth)
            by helping students build better futures.

          </p>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-white/10 py-10 text-center text-gray-400">

        <p>
          © 2026 CareerAI — AI Powered Career Platform
        </p>

      </footer>

    </div>
  );
}

export default LandingPage;