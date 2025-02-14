"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPassword =() => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    setLoading(true);

    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Password reset successful. You can now log in.");
      router.push("/pages/login");
    } else {
      alert("Failed to reset password.");
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div
            className="absolute inset-y-0 left-0 w-full md:w-1/2 h-full overflow-hidden flex justify-start items-end z-10">
          {/* Largest Circle (Light Blue) */}
          <div
              className="absolute w-[530px] h-[550px] md:w-[750px] md:h-[750px] lg:w-[1280px] lg:h-[1300px] bg-[#c6eff7] rounded-full top-0 bottom-0 left-[-350px] md:left-[-250px] lg:left-[-700px] m-auto"
          ></div>

          {/* Medium Circle (Orange) */}
          <div
              className="absolute w-[480px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[1180px] lg:h-[1200px] bg-[#ff7211] rounded-full top-0 bottom-0 left-[-310px] md:left-[-220px] lg:left-[-650px] m-auto"
          ></div>

          {/* Smallest Circle (Teal) */}
          <div
              className="absolute w-[430px] h-[450px] md:w-[650px] md:h-[650px] lg:w-[1120px] lg:h-[1150px] bg-[#1b9392] rounded-full top-0 bottom-0 left-[-280px] md:left-[-200px] lg:left-[-630px] m-auto"
          ></div>
        </div>
        <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
        <form onSubmit={handlePasswordReset} className="bg-white p-6 rounded-lg shadow-md w-80">
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
          </div>
          <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
  );
}
export default ResetPassword;