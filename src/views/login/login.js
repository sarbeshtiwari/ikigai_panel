import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // Updated logo image
import backgroundImage from "../../assets/images/banner1.jpg"; // Updated background image
import { loginUser } from "../../controllers/login/login";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate inputs
        if (!username) {
            setStatus("");
            setPasswordError("");
            setUsernameError("Username is required");
            return;
        }

        if (!password) {
            setStatus("");
            setUsernameError("");
            setPasswordError("Password is required");
            return;
        }

        // Clear previous errors
        setUsernameError("");
        setPasswordError("");

        try {
            setLoading(true);
            const result = await loginUser(username, password); // Call API

            if (result.token) {
                localStorage.setItem('authToken', result.token); // Store the token from response
                setStatus("User is logged in");
                navigate("/dashboard", { replace: true });
            } else {
                setStatus("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            setStatus("An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col md:flex-row h-screen items-center bg-gradient-to-r from-pink-200 via-purple-200 to-red-200">
            <div className="bg-white w-full md:w-1/2 h-screen flex items-center justify-center">
                <img 
                    src={backgroundImage} 
                    alt="Background" 
                    className="w-full h-full object-cover rounded-lg shadow-md"
                />
            </div>
            <div className="bg-white w-full md:w-1/2 h-screen flex items-center justify-center px-6 md:px-12">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <div className="text-center">
                        <img width="180" src={logo} alt="Logo" className="mx-auto mb-6"/>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                        Welcome Back to IKIGAI Wellness
                    </h1>
                    <form className="mt-4" id="logform" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Username</label>
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                placeholder="Enter your username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-pink-500 focus:bg-white focus:outline-none" 
                                autoFocus
                            />
                            {usernameError && <span className="text-red-500 text-sm">{usernameError}</span>}
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 font-medium mb-2">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Enter your password" 
                                minLength="6"  
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-pink-500 focus:bg-white focus:outline-none" 
                            />
                            {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
                        </div>
                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full block bg-pink-500 hover:bg-pink-400 focus:bg-pink-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Logging in..." : "Log In"}
                        </button>
                    </form>
                    <span className="text-red-500 text-center block mt-4">{status}</span>
                </div>
            </div>
        </section>
    );
}
