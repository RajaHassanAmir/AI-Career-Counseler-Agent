function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h2 className="text-2xl font-bold text-center text-green-600">
          Register
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mt-6 p-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mt-4 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 p-2 border rounded"
        />

        <button className="w-full mt-6 bg-green-600 text-white py-2 rounded">
          Create Account
        </button>

      </div>
    </div>
  );
}

export default Register;