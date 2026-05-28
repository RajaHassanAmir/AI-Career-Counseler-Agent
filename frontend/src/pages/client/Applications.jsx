import { useEffect, useState } from "react";

import {
  ref,
  onValue,
  update,
  remove
} from "firebase/database";

import { db, auth } from "../../firebase";

function Applications() {

  const [applications, setApplications] = useState([]);

  // 🔥 FETCH CLIENT APPLICATIONS
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
          (app) =>
            app.clientEmail === auth.currentUser?.email
        );

        setApplications(filtered);

      } else {

        setApplications([]);
      }
    });

    return () => unsubscribe();

  }, []);

  // ✅ ACCEPT
  const acceptApplication = async (id) => {

    try {

      const applicationRef = ref(db, `applications/${id}`);

      await update(applicationRef, {
        status: "Accepted",
      });

      alert("Application Accepted");

    } catch (error) {

      console.error(error);

      alert("Failed to accept application");
    }
  };

  // ❌ REJECT
  const rejectApplication = async (id) => {

    try {

      const applicationRef = ref(db, `applications/${id}`);

      await update(applicationRef, {
        status: "Rejected",
      });

      alert("Application Rejected");

    } catch (error) {

      console.error(error);

      alert("Failed to reject application");
    }
  };

  // 🗑 DELETE
  const deleteApplication = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this application permanently?"
    );

    if (!confirmDelete) return;

    try {

      const applicationRef = ref(db, `applications/${id}`);

      await remove(applicationRef);

      alert("Application Deleted");

    } catch (error) {

      console.error(error);

      alert("Failed to delete application");
    }
  };

  return (

    <div className="min-h-screen px-6 py-10 text-white">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="
          text-5xl font-black
          bg-gradient-to-r
          from-green-400
          via-emerald-300
          to-blue-400
          bg-clip-text
          text-transparent
        ">
          Recruiter Applications
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Manage candidates using your AI hiring dashboard.
        </p>

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
            Total Applications
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {applications.length}
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
            Accepted
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {
              applications.filter(
                (a) => a.status === "Accepted"
              ).length
            }
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
            Pending
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            {
              applications.filter(
                (a) =>
                  !a.status ||
                  a.status === "Pending"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* EMPTY */}
      {applications.length === 0 ? (

        <div className="
          bg-white/5
          border border-white/10
          rounded-3xl
          p-10
          text-center
          backdrop-blur-xl
        ">

          <h2 className="text-2xl font-bold text-white">
            No Applications Yet
          </h2>

          <p className="text-gray-400 mt-3">
            Applications from candidates will appear here.
          </p>

        </div>

      ) : (

        <div className="grid lg:grid-cols-2 gap-6">

          {applications.map((app) => (

            <div
              key={app.id}
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

              {/* TOP */}
              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    {app.title}
                  </h2>

                  <p className="text-green-300 mt-1">
                    {app.company}
                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    app.status === "Accepted"
                      ? "bg-green-500/20 text-green-300 border border-green-400/20"
                      : app.status === "Rejected"
                      ? "bg-red-500/20 text-red-300 border border-red-400/20"
                      : "bg-yellow-500/20 text-yellow-300 border border-yellow-400/20"
                  }`}
                >
                  {app.status || "Pending"}
                </span>

              </div>

              {/* DETAILS */}
              <div className="mt-6 space-y-3">

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Candidate
                  </span>

                  <span className="text-white font-medium">
                    {app.userEmail || "Unknown"}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Opportunity Type
                  </span>

                  <span className="text-white">
                    {app.type}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Applied At
                  </span>

                  <span className="text-white text-sm">
                    {new Date(
                      app.appliedAt
                    ).toLocaleString()}
                  </span>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-3 mt-8">

                <button
                  onClick={() =>
                    acceptApplication(app.id)
                  }
                  className="
                    px-5 py-2 rounded-xl
                    bg-green-500/20
                    text-green-300
                    border border-green-400/20
                    hover:bg-green-500/30
                    transition-all duration-300
                  "
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    rejectApplication(app.id)
                  }
                  className="
                    px-5 py-2 rounded-xl
                    bg-yellow-500/20
                    text-yellow-300
                    border border-yellow-400/20
                    hover:bg-yellow-500/30
                    transition-all duration-300
                  "
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    deleteApplication(app.id)
                  }
                  className="
                    px-5 py-2 rounded-xl
                    bg-red-500/20
                    text-red-300
                    border border-red-400/20
                    hover:bg-red-500/30
                    transition-all duration-300
                  "
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Applications;