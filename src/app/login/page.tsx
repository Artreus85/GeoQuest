"use client"

import Navbar from "@/components/navbar";
import MainContent from "@/components/main-content";
import Footer from "@/components/footer";
import GameQuestion from "@/components/game-question";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithUsernameOrEmail } from "../FirebaseDB/AuthContext";

export default function LoginForm() {
    const [identifier, setIdentifier] = useState(""); // For email or username
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const router = useRouter();

    const handleOptionSelect = (selectedOption: string) => {
        console.log("Избран отговор:", selectedOption);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!identifier) {
            setError("Please enter your username or email.");
            return;
        }

        if (!password) {
            setError("Please enter your password.");
            return;
        }

        try {
            const user = (await loginWithUsernameOrEmail(identifier, password)).user;

            router.push("/about-us");
            console.log(user.displayName + " logged in!2");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    return (
        <>
            <Navbar/>
            <MainContent 
                content={
                    <>
                    <div className="bg-gray-100 p-6 rounded-md shadow-md w-full max-w-md mx-auto">
                        <h2 className="text-center text-xl font-bold mb-6">Влизане в профил</h2>

                        {error && <p className="error-message">{error}</p>}

                        <form>
                            <div className="mb-4">
                                <label htmlFor="usernameOrEmail" className="block mb-1 text-sm font-medium">Потребителско име или имейл</label>

                                <input
                                    type="text"
                                    id="usernameOrEmail"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Въведете потребителско име или имейл"

                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)} />
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="password" className="block mb-1 text-sm font-medium">Парола</label>

                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Въведете парола"

                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    👁️
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white rounded-md p-2 font-medium hover:bg-blue-700 transition"
                                onClick={handleLogin}
                            >
                                Вход
                            </button>
                        </form>
                    </div><div><br/><br/><br/><br/><br/></div>
                </>
                }/> 
            <Footer/>
        </>
    );
}