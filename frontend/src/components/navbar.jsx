import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import { useAuth } from "../Context/AuthContext";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

function Navbar() {

  const { user } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  // 🚪 LOGOUT
  const handleLogout = async () => {

    try {

      await signOut(auth);

      navigate("/auth");

    } catch (error) {

      console.error("Logout failed:", error);
    }
  };

  return (

    <header
      className="
        sticky
        top-0
        z-50
        backdrop-blur-xl
        bg-white/5
        border-b
        border-white/10
      "
    >

      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">

          {/* =========================
              LOGO
          ========================== */}

          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center gap-3"
          >

            {/* AI ICON */}
            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-gradient-to-br
                from-green-400
                to-emerald-600
                flex
                items-center
                justify-center
                shadow-lg
                shadow-green-500/30
                text-xl
              "
            >
              ✨
            </div>

            <div>

              <h1
                className="
                  text-2xl
                  font-extrabold
                  bg-gradient-to-r
                  from-white
                  via-green-200
                  to-emerald-400
                  bg-clip-text
                  text-transparent
                  tracking-tight
                "
              >
                CareerAI
              </h1>

              <p className="text-xs text-gray-400 -mt-1">
                AI Career Intelligence
              </p>

            </div>

          </div>

          {/* =========================
              RIGHT SIDE
          ========================== */}

          <div className="flex items-center gap-3">

            {/* AUTH PAGE BUTTON */}
            {location.pathname === "/auth" && (

              <button
                onClick={() => navigate("/")}
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  bg-white/10
                  border
                  border-white/10
                  hover:bg-white/20
                  transition-all
                  text-white
                  font-medium
                "
              >
                ← Back to Home
              </button>

            )}

            {/* USER LOGGED IN */}
            {user && location.pathname !== "/auth" && (

              <>

                {/* EMAIL */}
                <div
                  className="
                    hidden
                    lg:flex
                    items-center
                    px-4
                    py-2
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    text-sm
                    text-gray-300
                  "
                >
                  {user.email}
                </div>

                {/* DASHBOARD BUTTON */}
                <button
                  onClick={() => {

                    if (
                      location.pathname.includes("/client")
                    ) {

                      navigate("/client/dashboard");

                    } else if (
                      location.pathname.includes("/admin")
                    ) {

                      navigate("/admin/dashboard");

                    } else {

                      navigate("/user/dashboard");
                    }
                  }}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-white/10
                    border
                    border-white/10
                    hover:bg-white/20
                    transition-all
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  Dashboard
                </button>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-gradient-to-r
                    from-red-500
                    to-rose-600
                    hover:scale-105
                    transition-all
                    text-white
                    font-semibold
                    shadow-lg
                    shadow-red-500/20
                  "
                >
                  Logout
                </button>

              </>

            )}

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
