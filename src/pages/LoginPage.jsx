import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../features/authSlice';
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    const userObject = {
        email,
        password
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(loginUser(userObject)); // Await the login action

        if (loginUser.fulfilled.match(resultAction)) {
            navigate("/profile"); // Navigate to profile page on successful login
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {isAuthenticated ? (
                    <p className="text-green-500 text-center">You are already logged in!</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-left text-gray-700 font-semibold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="text-left block text-gray-700 font-semibold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                )}

                <div className="mt-4 text-center">
                    <a href="/signup" className="text-indigo-500 hover:underline">
                        Dont have an account? Sign up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
