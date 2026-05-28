import { useEffect, useState } from "react";

import {
  ref,
  onValue,
  remove
} from "firebase/database";

import { db, auth } from "../../firebase";

import { signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [clients, setClients] = useState([]);

  const [opportunities, setOpportunities] = useState([]);

  const [applications, setApplications] = useState([]);

  // 🔥 FETCH USERS
  useEffect(() => {

    const usersRef = ref(db, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        const loadedUsers = Object.keys(data).map((key) => ({
          uid: key,
          ...data[key],
        }));

        setUsers(
          loadedUsers.filter(
            (user) => user.role === "user"
          )
        );

        setClients(
          loadedUsers.filter(
            (user) => user.role === "client"
          )
        );

      } else {

        setUsers([]);
        setClients([]);
      }
    });

    return () => unsubscribe();

  }, []);

  // 🔥 FETCH OPPORTUNITIES
  useEffect(() => {

    const oppRef = ref(db, "opportunities");

    const unsubscribe = onValue(oppRef, (snapshot) => {

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

    const appRef = ref(db, "applications");

    const unsubscribe = onValue(appRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        const loaded = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setApplications(loaded);

      } else {

        setApplications([]);
      }
    });

    return () => unsubscribe();

  }, []);

  // ❌ DELETE ACCOUNT
  const deleteAccount = async (uid) => {

    const confirmDelete = window.confirm(
      "Delete this account permanently?"
    );

    if (!confirmDelete) return;

    try {

      const userRef = ref(db, `users/${uid}`);

      await remove(userRef);

      alert("Account Deleted");

    } catch (error) {

      console.error(error);

      alert("Failed to delete account");
    }
  };

  // 🚪 LOGOUT
  const handleLogout = async () => {

    try {

      await signOut(auth);

      navigate("/auth");

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <div className="min-h-screen px-6 py-8">

      {/* =========================
          TOP HEADER
      ========================== */}

      <div
        className="
          backdrop-blur-xl
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-2xl
          mb-8
        "
      >

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <p className="text-green-400 font-semibold mb-2">
              AI System Administration
            </p>

            <h1
              className="
                text-5xl
                font-black
                bg-gradient-to-r
                from-white
                via-green-200
                to-emerald-400
                bg-clip-text
                text-transparent
                tracking-tight
              "
            >
              Admin Dashboard
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              Monitor platform analytics, users, clients and opportunities
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="
              px-6
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-red-500
              to-rose-600
              hover:scale-105
              transition-all
              shadow-lg
              shadow-red-500/20
              font-semibold
            "
          >
            Logout
          </button>

        </div>

      </div>

      {/* =========================
          ANALYTICS CARDS
      ========================== */}

      <div className="grid xl:grid-cols-5 md:grid-cols-2 gap-5 mb-10">

        {/* USERS */}
        <div
          className="
            backdrop-blur-xl
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-6
            shadow-xl
            hover:scale-[1.02]
            transition-all
          "
        >

          <div className="text-4xl mb-4">
            👨‍🎓
          </div>

          <p className="text-gray-400">
            Total Users
          </p>

          <h2 className="text-5xl font-black text-green-400 mt-3">
            {users.length}
          </h2>

        </div>

        {/* CLIENTS */}
        <div
          className="
            backdrop-blur-xl
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-6
            shadow-xl
            hover:scale-[1.02]
            transition-all
          "
        >

          <div className="text-4xl mb-4">
            🏢
          </div>

          <p className="text-gray-400">
            Total Clients
          </p>

          <h2 className="text-5xl font-black text-cyan-400 mt-3">
            {clients.length}
          </h2>

        </div>

        {/* ACCOUNTS */}
        <div
          className="
            backdrop-blur-xl
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-6
            shadow-xl
            hover:scale-[1.02]
            transition-all
          "
        >

          <div className="text-4xl mb-4">
            🌍
          </div>

          <p className="text-gray-400">
            Total Accounts
          </p>

          <h2 className="text-5xl font-black text-violet-400 mt-3">
            {users.length + clients.length}
          </h2>

        </div>

        {/* OPPORTUNITIES */}
        <div
          className="
            backdrop-blur-xl
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-6
            shadow-xl
            hover:scale-[1.02]
            transition-all
          "
        >

          <div className="text-4xl mb-4">
            🚀
          </div>

          <p className="text-gray-400">
            Opportunities
          </p>

          <h2 className="text-5xl font-black text-orange-400 mt-3">
            {opportunities.length}
          </h2>

        </div>

        {/* APPLICATIONS */}
        <div
          className="
            backdrop-blur-xl
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-6
            shadow-xl
            hover:scale-[1.02]
            transition-all
          "
        >

          <div className="text-4xl mb-4">
            📄
          </div>

          <p className="text-gray-400">
            Applications
          </p>

          <h2 className="text-5xl font-black text-pink-400 mt-3">
            {applications.length}
          </h2>

        </div>

      </div>

      {/* =========================
          ACCOUNT MANAGEMENT
      ========================== */}

      <div
        className="
          backdrop-blur-xl
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-2xl
        "
      >

        <div className="flex items-center justify-between mb-8">

          <div>

            <p className="text-green-400 font-semibold mb-2">
              User Administration
            </p>

            <h2 className="text-3xl font-bold text-white">
              Account Management
            </h2>

          </div>

          <div
            className="
              px-4
              py-2
              rounded-xl
              bg-green-500/10
              border
              border-green-500/20
              text-green-300
              font-medium
            "
          >
            {users.length + clients.length} Accounts
          </div>

        </div>

        <div className="space-y-5">

          {[...users, ...clients].map((account) => (

            <div
              key={account.uid}
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-5
                bg-white/5
                border
                border-white/10
                rounded-2xl
                p-5
                hover:bg-white/10
                transition-all
              "
            >

              {/* LEFT */}
              <div className="flex items-center gap-4">

                {/* AVATAR */}
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-green-400
                    to-emerald-600
                    flex
                    items-center
                    justify-center
                    text-2xl
                    shadow-lg
                  "
                >
                  {account.role === "client"
                    ? "🏢"
                    : "👨‍🎓"}
                </div>

                <div>

                  <h3 className="text-lg font-bold text-white">
                    {account.email}
                  </h3>

                  <p className="text-gray-400 capitalize mt-1">
                    {account.role} Account
                  </p>

                </div>

              </div>

              {/* RIGHT */}
              <button
                onClick={() =>
                  deleteAccount(account.uid)
                }
                className="
                  px-5
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-red-500
                  to-rose-600
                  hover:scale-105
                  transition-all
                  shadow-lg
                  shadow-red-500/20
                  font-semibold
                "
              >
                Delete Account
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;