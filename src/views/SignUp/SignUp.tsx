import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Link } from "react-router-dom";
import { useAppContext } from "../../store/appContext/app-context";
import httpInstance from "../../services/httpInstance";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signUp } = useAppContext();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      await httpInstance.post("/syncUser", {}, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      setSuccess("User signed up successfully!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Failed to sign up. Please check your details.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-100">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-6">
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
          <div>
            <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:ring focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Sign Up
          </button>
        </form>
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}
        {success && <p className="mt-2 text-center text-green-500">{success}</p>}
        <div className="text-center text-gray-300">
          Already have an account? <Link to="/auth" className="text-blue-500 hover:underline">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
