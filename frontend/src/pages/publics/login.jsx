import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../utils/auth";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  const handleLogin = () => {
    const userData = {
      role: role,
      name: "Demo User"
    };

    setUser(userData);

    if (role === "user") navigate("/user/dashboard");
    if (role === "client") navigate("/client/dashboard");
    if (role === "admin") navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h2 className="text-2xl font-bold text-center text-green-600">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mt-6 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 p-2 border rounded"
        />

        <select
          className="w-full mt-4 p-2 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-green-600 text-white py-2 rounded"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;