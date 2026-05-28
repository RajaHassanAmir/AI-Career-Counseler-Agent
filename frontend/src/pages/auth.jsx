import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebase";

import {
  ref,
  set,
  get
} from "firebase/database";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";

function Auth() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  // 🔐 AUTO REDIRECT
  useEffect(() => {

    const unsub = onAuthStateChanged(
      auth,
      async (currentUser) => {

        if (currentUser) {

          const snapshot = await get(
            ref(db, "users/" + currentUser.uid)
          );

          const userData = snapshot.val();

          if (userData?.role === "client") {

            navigate("/client/dashboard");

          } else if (userData?.role === "admin") {

            navigate("/admin/dashboard");

          } else {

            navigate("/user/dashboard");
          }
        }
      }
    );

    return () => unsub();

  }, [navigate]);

  // 🔐 LOGIN / SIGNUP
  const handleAuth = async () => {

    try {

      if (!email.trim() || !password.trim()) {

        alert("Please enter email and password");

        return;
      }

      if (password.length < 6) {

        alert("Password must be at least 6 characters");

        return;
      }

      // ✅ SIGNUP
      if (!isLogin) {

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        const user = userCredential.user;

        await set(
          ref(db, "users/" + user.uid),
          {
            email: user.email,
            role: role
          }
        );

        if (role === "client") {

          navigate("/client/dashboard");

        } else {

          navigate("/user/dashboard");
        }

      } else {

        // ✅ LOGIN
        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        const currentUser = userCredential.user;

        const snapshot = await get(
          ref(db, "users/" + currentUser.uid)
        );

        const userData = snapshot.val();

        if (userData?.role === "client") {

          navigate("/client/dashboard");

        } else if (userData?.role === "admin") {

          navigate("/admin/dashboard");

        } else {

          navigate("/user/dashboard");
        }
      }

    } catch (error) {

      console.error(error);

      alert(error.message);
    }
  };

  return (

    <div className="min-h-screen relative overflow-hidden bg-[#07111f] flex items-center justify-center px-4">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-md">

        {/* LOGO / TITLE */}
        <div className="text-center mb-8">

          <h1 className="text-5xl font-extrabold text-white mb-3 tracking-tight">
            CareerAI
          </h1>

          <p className="text-gray-300 text-lg">
            Your AI-powered career guidance platform
          </p>

        </div>

        {/* GLASS CARD */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-3xl font-bold text-white mb-6 text-center">

            {isLogin
              ? "Welcome Back"
              : "Create Account"}

          </h2>

          {/* EMAIL */}
          <div className="mb-4">

            <label className="text-gray-300 text-sm block mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-4 rounded-xl outline-none focus:border-green-400 transition"
            />

          </div>

          {/* PASSWORD */}
          <div className="mb-5">

            <label className="text-gray-300 text-sm block mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-4 rounded-xl outline-none focus:border-green-400 transition"
            />

          </div>

          {/* ROLE SELECT */}
          {!isLogin && (

            <div className="mb-6">

              <label className="text-gray-300 text-sm block mb-3">
                Choose Account Type
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`p-4 rounded-2xl border transition-all ${
                    role === "user"
                      ? "bg-green-500 text-white border-green-400"
                      : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  👨‍🎓
                  <div className="font-semibold mt-2">
                    User
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("client")}
                  className={`p-4 rounded-2xl border transition-all ${
                    role === "client"
                      ? "bg-green-500 text-white border-green-400"
                      : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  🏢
                  <div className="font-semibold mt-2">
                    Client
                  </div>
                </button>

              </div>

            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={handleAuth}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition-all text-white py-4 rounded-xl font-bold text-lg shadow-lg"
          >

            {isLogin
              ? "Login"
              : "Create Account"}

          </button>

          {/* SWITCH */}
          <p
            onClick={() => setIsLogin(!isLogin)}
            className="text-center text-gray-300 mt-6 cursor-pointer hover:text-green-400 transition"
          >

            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}

          </p>

        </div>

      </div>

    </div>
  );
}

export default Auth;