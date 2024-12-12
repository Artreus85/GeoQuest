"use client"

import Navbar from "@/components/navbar";
import MainContent from "@/components/main-content";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../FirebaseDB/firebase.config";

export default function LeaderBoard() {
    const [leaderboard, setLeaderboard] = useState<{ name: string, points: number }[]>([]);

    // Fetch leaderboard data from Firestore
    const fetchLeaderboard = async () => {
      try {
        const usersCollectionRef = collection(db, "Users");
        const q = query(usersCollectionRef, orderBy("points", "desc"));
  
        const querySnapshot = await getDocs(q);
  
        // Extract the user data (name and points) and set it in the state
        const users = querySnapshot.docs.map(doc => ({
          name: doc.data().username,
          points: doc.data().points
        }));
  
        setLeaderboard(users);
      } 
      catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    useEffect(() => {
      fetchLeaderboard();
    }, []);
    
    return (
        <>
            <Navbar/>
            <MainContent
                content={
                    <main className="flex flex-col items-center justify-center flex-grow bg-gray-100 py-20 pt-1">
                        <div className="bg-white shadow-lg rounded-lg p-12 w-[300%] max-w-screen-xl">
                            <h1 className="text-4xl font-bold text-center mb-8">Класация</h1>
                            
                            <ol>
                                {leaderboard.map((user, index) => (
                                    <li key={index} className="flex justify-between py-2">
                                        <span>{index + 1}. {user.name}</span>

                                        <div className="flex items-center">
                                            <span>{user.points}</span>
                                            <img src="/user_points_icon.png" alt="Star icon" width={24} height={24} className="mx-2"/> 
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div> 
                    </main>
                }/>
            <Footer/>
        </>
    )
}