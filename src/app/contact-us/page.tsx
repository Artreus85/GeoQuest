"use client"

import Navbar from "@/components/navbar";
import MainContent from "@/components/main-content";
import Footer from "@/components/footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactForm() {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const router = useRouter();

    return (
        <>
            <Navbar/>
            <MainContent content=
                {
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    {/*Форма за контакти*/}
                    <form className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full" onSubmit={() => router.push('/test')}>

                      <h1 className="text-2xl font-bold mb-4 text-center"> Свържете се с нас </h1>

                      {/*Поле за имейл*/}
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2"> Вашият имейл </label>
                          
                        <input
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border border-gray-300 p-2 rounded-lg"
                          placeholder="example@mail.com"
                        />
                      </div>

                      {/*Поле за съобщение*/}
                      <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2"> Вашето съобщение </label>
                        
                        <textarea
                          id="message"
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full border border-gray-300 p-2 rounded-lg"
                          rows={5}
                          placeholder="Напишете вашето съобщение тук..."
                        >
                        </textarea>
                      </div>

                      {/*Бутон за изпращане*/}
                      <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                      >
                        Изпрати
                      </button>
                      
                      {status && (
                        <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
                      )}
                    </form>
                  </div>
                  }
                />
            <Footer/>
        </>
    );
}