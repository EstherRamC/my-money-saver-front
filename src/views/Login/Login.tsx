import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Link } from "react-router-dom";
import { useAppContext } from "../../store/appContext/app-context";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAppContext();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-100">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:ring focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:ring focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Login
          </button>
        </form>
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}
        <div className="text-center text-gray-300">
          Don't have an account? <Link to="/sign-up" className="text-blue-500 hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
