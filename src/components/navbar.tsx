"use client"

import { useState, useEffect } from "react";
import { auth, db } from "@/app/FirebaseDB/firebase.config";
import Link from 'next/link';
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import { doc, getDoc } from "firebase/firestore";
import Game from "@/app/game/page";
import { onAuthStateChanged, updateCurrentUser, User } from "firebase/auth";
import { getUserRole } from "@/app/FirebaseDB/AuthContext";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [points, setPoints] = useState<number | null>(null); 
  const [isAdmin, setIsAdmin] = useState(false);

  const [user, loading, error] = useAuthState(auth);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>("");

  const router = useRouter();

const fetchUserRole = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "Users", uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      setIsAdmin(userData.role === "admin"); 
    }
    else {
      console.error("No user role found");
      setIsAdmin(false);
    }
  } catch (error) {
    console.error("Error fetching user role: ", error);
    setIsAdmin(false);
  }
};

 const getCurrentUser = (): any => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in: ", user);

        setCurrentUser(user);
        setUserId(user.uid); 

        return user;
      } 
      else {
        console.log("No user is signed in");

        setCurrentUser(null);
        setUserId("");
        
        return user;
      }
    });
  
    return () => unsubscribe(); 
  });}

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchUserRole(user.uid); 
      }
      else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe(); 
  }, []);
  

  const getUserField = async (userId: string, fieldName: string) => {
    try {
      const userDocRef = doc(db, "Users", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const fieldValue = userDocSnapshot.data()[fieldName];

        console.log(`${fieldName}:`, fieldValue);
        return fieldValue;
      } 
      else {
        console.error("No document found for the specified user ID");
        return null;
      }
    } 
    catch (error) {
      console.error("Error fetching document: ", error);
      return null;
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); 
      setIsLoggedIn(false); 

      router.push("/login"); 
    } 
    catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const fetchUserPoints = async (userId: string): Promise<number | null> => {
    try {
      const userDocRef = doc(db, "Users", userId);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userPoints = userDocSnapshot.data().points;
        return userPoints || 0;
      } else {
        console.error("No document found for user ID");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user points:", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
  
        const userId = user.uid;

        fetchUserPoints(userId).then((userPoints) => {
          if (userPoints !== null) {
            setPoints(userPoints);
          }
        });
      } 
      else {
        setIsLoggedIn(false);
        setPoints(null);
      }
    });
  
    return () => unsubscribe(); 
  }, []);

  return (
    <nav className="bg-[#457B9D] text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Лого */}
        <span className="text-2xl font-bold">
          <Link href="#">
            <img
              className="max-w-14"
              src="./geoquest_logo.png"
              alt="GeoQuest"
            />
          </Link>
        </span>

        {/* Навигационни линкове */}
        <div className="flex space-x-36">
          {isLoggedIn && (<Link href="/game" className="text-xl font-bold hover:underline"> Играй </Link>)}
  
          <Link href="/leaderboard" className="text-xl font-bold hover:underline"> Класация </Link>
          <Link href="/about-us" className="text-xl font-bold hover:underline"> За GeoQuest </Link>

          {isAdmin && (
            <>
              <Link href="/add-question" className="text-xl font-bold hover:underline"> Добави въпрос </Link> 
              <Link href="/test" className="text-xl font-bold hover:underline"> Тест </Link>        
            </>
          )}
        </div>

        {/* Профилно меню */}
        <div className="relative flex items-center">
          {isLoggedIn && points !== null && (
            <div className="flex items-center mr-16">
              <span className="text-2xl mt-2 font-semibold">{points}</span>
              <img
                src="/user_points_icon.png"
                alt="Star icon"
                width={24}
                height={24}
                className="mx-2"
              />
            </div>
          )}

          <button
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-controls="profile-dropdown"
            className="flex items-center focus:outline-none transition duration-300"
          >
            <img
              src={isLoggedIn ? "/navbar_logged_account_menu_icon.png" : "/navbar_unlogged_account_menu_icon.png"}
              alt="Profile button"
              width={56}
              height={56}
              className="max-w-10"
            />
          </button>

          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-[#FFF9F5] text-[#1D3557] rounded-lg shadow-lg overflow-hidden z-10"
              onMouseLeave={closeDropdown}
            >
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-lg font-semibold hover:bg-[#A8DADC] hover:text-[#457B9D] transition duration-300"
                >
                  Изход
                </button>
              ) : (
                <div>
                  <Link href="/login"className="block px-4 py-3 text-lg font-semibold hover:bg-[#A8DADC] hover:text-[#457B9D] transition duration-300"> 
                    Вход
                  </Link>

                  <Link href="/register" className="block px-4 py-3 text-lg font-semibold hover:bg-[#A8DADC] hover:text-[#457B9D] transition duration-300">
                    Регистрация
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;