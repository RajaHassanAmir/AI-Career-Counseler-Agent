import { useState, useEffect } from "react";

import {
  ref,
  push,
  onValue
} from "firebase/database";

import { db, auth } from "../../firebase";

import { signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";

function ClientDashboard() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");

  const [myOpportunities, setMyOpportunities] = useState([]);

  // FETCH OPPORTUNITIES
  useEffect(() => {

    const oppRef = ref(db, "opportunities");

    const unsubscribe = onValue(oppRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        const loaded = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        const filtered = loaded.filter(
          (job) =>
            job.clientEmail === auth.currentUser?.email
        );

        setMyOpportunities(filtered);

      } else {

        setMyOpportunities([]);
      }

    });

    return () => unsubscribe();

  }, []);

  // LOGOUT
  const handleLogout = async () => {

    try {

      await signOut(auth);

      navigate("/auth");

    } catch (error) {

      console.error(error);
    }
  };

  // POST OPPORTUNITY
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const opportunitiesRef = ref(db, "opportunities");

      await push(opportunitiesRef, {
        title,
        company,
        type,
        clientEmail: auth.currentUser.email,
        createdAt: new Date().toISOString(),
      });

      alert("Opportunity Posted Successfully!");

      setTitle("");
      setCompany("");
      setType("");

    } catch (error) {

      console.error(error);

      alert("Error posting opportunity");
    }
  };

  return (

    <div className="min-h-screen text-white px-6 py-10">

      {/* HERO */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 mb-10">

        <div>

          <h1 className="
            text-5xl font-black
            bg-gradient-to-r
            from-green-400
            via-emerald-300
            to-blue-400
            bg-clip-text
            text-transparent
          ">
            Recruiter Dashboard
          </h1>

          <p className="text-gray-400 text-lg mt-4 max-w-2xl">
            Create opportunities, manage applications,
            and hire talent using your AI-powered
            recruitment workspace.
          </p>

        </div>

        <div className="flex items-start gap-4">

          <button
            onClick={() =>
              navigate("/client/applications")
            }
            className="
              px-6 py-3 rounded-2xl
              bg-blue-500/20
              border border-blue-400/20
              text-blue-300
              hover:bg-blue-500/30
              transition-all duration-300
              hover:scale-105
            "
          >
            View Applications
          </button>

          <button
            onClick={handleLogout}
            className="
              px-6 py-3 rounded-2xl
              bg-red-500/20
              border border-red-400/20
              text-red-300
              hover:bg-red-500/30
              transition-all duration-300
              hover:scale-105
            "
          >
            Logout
          </button>

        </div>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="
          bg-white/5
          border border-white/10
          backdrop-blur-xl
          rounded-3xl
          p-6
        ">

          <p className="text-gray-400">
            Posted Opportunities
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {myOpportunities.length}
          </h2>

        </div>

        <div className="
          bg-white/5
          border border-white/10
          backdrop-blur-xl
          rounded-3xl
          p-6
        ">

          <p className="text-gray-400">
            Recruiter Email
          </p>

          <h2 className="text-lg font-semibold mt-3 break-all">
            {auth.currentUser?.email}
          </h2>

        </div>

        <div className="
          bg-white/5
          border border-white/10
          backdrop-blur-xl
          rounded-3xl
          p-6
        ">

          <p className="text-gray-400">
            AI Hiring Mode
          </p>

          <h2 className="text-2xl font-bold text-green-400 mt-3">
            Active
          </h2>

        </div>

      </div>

      {/* POST FORM */}
      <div className="
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        rounded-3xl
        p-8
        mb-12
        max-w-3xl
      ">

        <h2 className="text-3xl font-bold mb-8">
          Create New Opportunity
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Opportunity Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="
              w-full p-4 rounded-2xl
              bg-white/5
              border border-white/10
              text-white
              placeholder:text-gray-500
              focus:outline-none
              focus:border-green-400
            "
            required
          />

          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
            className="
              w-full p-4 rounded-2xl
              bg-white/5
              border border-white/10
              text-white
              placeholder:text-gray-500
              focus:outline-none
              focus:border-green-400
            "
            required
          />

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            className="
              w-full p-4 rounded-2xl
              bg-[#111827]
              border border-white/10
              text-white
              focus:outline-none
              focus:border-green-400
            "
            required
          >

            <option value="">
              Select Opportunity Type
            </option>

            <option value="Job">
              Job
            </option>

            <option value="Internship">
              Internship
            </option>

            <option value="Course">
              Course
            </option>

          </select>

          <button
            type="submit"
            className="
              px-8 py-4 rounded-2xl
              bg-gradient-to-r
              from-green-500
              to-emerald-400
              text-white
              font-bold
              hover:scale-105
              transition-all duration-300
              shadow-xl shadow-green-500/20
            "
          >
            Post Opportunity
          </button>

        </form>

      </div>

      {/* MY POSTS */}
      <div>

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            My Opportunities
          </h2>

          <span className="
            px-4 py-2 rounded-full
            bg-white/5
            border border-white/10
            text-gray-300
          ">
            {myOpportunities.length} Total
          </span>

        </div>

        {myOpportunities.length === 0 ? (

          <div className="
            bg-white/5
            border border-white/10
            rounded-3xl
            p-10
            text-center
            backdrop-blur-xl
          ">

            <h2 className="text-2xl font-bold">
              No Opportunities Posted
            </h2>

            <p className="text-gray-400 mt-3">
              Start by creating your first AI-powered opportunity.
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-6">

            {myOpportunities.map((job) => (

              <div
                key={job.id}
                className="
                  bg-white/5
                  border border-white/10
                  backdrop-blur-xl
                  rounded-3xl
                  p-6
                  hover:border-green-400/40
                  hover:shadow-2xl
                  hover:shadow-green-500/10
                  transition-all duration-300
                "
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-2xl font-bold">
                      {job.title}
                    </h3>

                    <p className="text-green-300 mt-2">
                      {job.company}
                    </p>

                  </div>

                  <span className="
                    px-3 py-1 rounded-full
                    bg-blue-500/20
                    border border-blue-400/20
                    text-blue-300 text-sm
                  ">
                    {job.type}
                  </span>

                </div>

                <div className="mt-8">

                  <p className="text-sm text-gray-400">
                    Posted On
                  </p>

                  <p className="text-white mt-1">
                    {new Date(
                      job.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default ClientDashboard;