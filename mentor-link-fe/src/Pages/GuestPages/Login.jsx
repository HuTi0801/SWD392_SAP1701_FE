import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/your-background-image.jpg')" }}>
      <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-lg backdrop-blur-md w-96">
        <h2 className="text-3xl font-semibold text-center mb-6 text-black">LOGIN</h2>
        
        <div className="mb-4">
          <label className="block text-black font-medium mb-2">Username</label>
          <div className="flex items-center border rounded-md bg-white px-3">
            <span className="text-gray-500 pr-2">👤</span>
            <input type="text" className="w-full p-2 bg-transparent focus:outline-none" placeholder="Enter username" />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium mb-2">Password</label>
          <div className="flex items-center border rounded-md bg-white px-3">
            <span className="text-gray-500 pr-2">🔒</span>
            <input type="password" className="w-full p-2 bg-transparent focus:outline-none" placeholder="Enter password" />
          </div>
        </div>

        <div className="text-right mb-4">
          <a href="#" className="text-black text-sm">Forgot Password?</a>
        </div>

        <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
