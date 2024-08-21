import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import backgroundImage from "../../assets/images/banner1.jpg";
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
            setUsernameError("Username is required");
            return;
        }
        if (!password) {
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
                console.log("Navigating to /dashboard");
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
        <section className="flex flex-col md:flex-row h-screen items-center">
            <div className="bg-white lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img 
                    src={backgroundImage} 
                    alt="Background" 
                    className="w-full h-full object-cover rounded-br-xl rounded-tr-xl"
                />
            </div>
            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                <div className="w-full max-w-sm">
                    <div className="text-center">
                        <img width="210" src={logo} alt="Logo" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-center">
                        Log In to your account
                    </h1>
                    <form className="mt-6" id="logform" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700">Username</label>
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                placeholder="Enter Username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" 
                                autoFocus
                            />
                            {usernameError && <span className="text-red-500 text-sm">{usernameError}</span>}
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Enter Password" 
                                minLength="6"  
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" 
                            />
                            {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
                        </div>
                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
