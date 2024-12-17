"use client"

import Navbar from "@/components/navbar";
import MainContent from "@/components/main-content";
import Footer from "@/components/footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../FirebaseDB/firebase.config";

export default function AboutUs() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const getPoints = () => {
        
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setIsLoggedIn(true);
          }
          else {
            setIsLoggedIn(false);
          }
        });
    
        return () => unsubscribe(); 
      }, []);

    return (
        <>
            <Navbar/>
            <MainContent
                content={
                    <div className="bg-white shadow-2xl rounded-lg p-16 max-w-5xl w-full">
                        <h1 className="text-4xl font-bold text-center mb-8"> За GeoQuest </h1>

                        <p className="text-gray-700 text-xl text-center mb-12 leading-relaxed">
                            GeoQuest е уеб приложение-игра, в която потребителят може да разпознава множество от световно-изветсни културни обекти по снимките им. <br/>
                            А за всеки правилно отговорен въпрос той трупа точки, с които се изкачва нагоре в класацията на играта.
                        </p>

                        <div className="flex justify-center">
                                <Link href={isLoggedIn ? "/game" : "/login"}className="bg-[#457B9D] text-white py-4 px-10 text-lg rounded-lg hover:bg-[#356486]"> Играй </Link> 
                        </div>
                        <button onClick={getPoints}></button>
                    </div>
                }/>
            <Footer/>
        </>
    );
}