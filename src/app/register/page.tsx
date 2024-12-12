"use client"

import Navbar from "@/components/navbar";
import MainContent from "@/components/main-content";
import Footer from "@/components/footer";
import GameQuestion from "@/components/game-question";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerWithEmail } from "../FirebaseDB/AuthContext";
import { setDoc } from "firebase/firestore";
import { collection } from 'firebase/firestore';
import { Auth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "firebase/compat/app";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState<string | null>(null);

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    //const [user, loading, errorMessage] = useAuthState(firebase.auth());

    const router = useRouter();
  
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
  
      /*
      if (username.length >= 10) {
        setError("Username is too long");
        return;
      }
  
      const gmailPattern = /^[^\s@]+@gmail\.com$/;
      if (!gmailPattern.test(email)) {
        setError("Please enter a valid Gmail address");
        return;
      }
  
      const usernamePattern = /^[a-zA-Z0-9]+$/;
      if (!username || !usernamePattern.test(username)) {
        setError("Please enter a valid username");
        return;
      }
  
      if (password.length < 6) {
        setError("Please enter a valid password");
        return;
      }
        */
      
      //setError(null);

      try {
        const registeredUser = await registerWithEmail(
          email,
          password,
          username,
          nickname,
          role
        );

        if (registeredUser) {
          await registeredUser.reload(); 
          router.push("/about-us");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          console.error(error.message);
        } else {
          setError("An unknown error occurred.");
          console.error(error);
        }
      }
    };

    return (
        <>
            <Navbar/>
            <MainContent 
                content={
                    <div className="bg-gray-100 p-6 rounded-md shadow-md w-full max-w-md mx-auto">
                      <h2 className="text-center text-xl font-bold mb-6">Създаване на профил</h2>

                      {error && <p className="error-message">{error}</p>}

                      {/*Форма за регистрация на потрбител*/}
                      <form>
                        {/*Поле за име*/}
                        <div className="mb-4">
                          <label htmlFor="name" className="block mb-1 text-sm font-medium">Име</label>
                          
                          <input
                              type="text"
                              id="name"
                              className="w-full border border-gray-300 rounded-md p-2"
                              placeholder="Въведете вашето име"

                              value={nickname}
                              onChange={(e) => setNickname(e.target.value)}
                          />
                        </div>

                        {/*Поле за потребителско име*/}
                        <div className="mb-4">
                          <label htmlFor="username" className="block mb-1 text-sm font-medium">Потребителско име</label>

                          <input
                              type="text"
                              id="username"
                              className="w-full border border-gray-300 rounded-md p-2"
                              placeholder="Въведете потребителско име"

                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>

                        {/*Поле за потребителски имейл*/}
                        <div className="mb-4">
                          <label htmlFor="email" className="block mb-1 text-sm font-medium">Имейл</label>

                          <input
                              type="email"
                              id="email"
                              className="w-full border border-gray-300 rounded-md p-2"
                              placeholder="example@email.com"

                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        {/*Поле за потребителска парола*/}
                        <div className="mb-4 relative">
                          <label htmlFor="password" className="block mb-1 text-sm font-medium">Парола</label>

                          <input
                              type={passwordVisible ? 'text' : 'password'}
                              id="password"
                              className="w-full border border-gray-300 rounded-md p-2"
                              placeholder="Въведете парола"

                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                          />

                          <button
                              type="button"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                              onClick={() => setPasswordVisible(!passwordVisible)}
                          >
                              👁️
                          </button>
                        </div>
                        
                        {/*Бутон за завършване на регистрацията*/}
                        <button
                          type="submit"
                          className="w-full bg-blue-600 text-white rounded-md p-2 font-medium hover:bg-blue-700 transition"
                          onClick={handleRegister}
                          >
                          Регистрация
                        </button>
                      </form>
                    </div>
                }/>
            <Footer/>
        </>
    );
}

/*
<button
      type="button"
      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
  >
      👁️
  </button>
  <div className="mb-4 relative">
  <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium">Потвърди паролата</label>

  <input
      type={confirmPasswordVisible ? 'text' : 'password'}
      id="confirmPassword"
      className="w-full border border-gray-300 rounded-md p-2"
      placeholder="Потвърдете паролата"

      value={password}
      onChange={(e) => setPassword(e.target.value)}
  />
</div>
*/