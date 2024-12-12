/*
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from './firebase.config';

// User data type interface
interface UserType {
    email: string | null;
    uid: string | null;
}

// Create auth context
const AuthContext = createContext({});

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any>(AuthContext);

// Create the auth context provider
export const AuthContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    // Define the constants for the user and loading state
    const [user, setUser] = useState<UserType>({ email: null, uid: null });
    const [loading, setLoading] = useState<Boolean>(true);

    // Update the state depending on auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    uid: user.uid
                });
            } else {
                setUser({ email: null, uid: null });
            }
        });

        setLoading(false);

        return () => unsubscribe();
    }, []);

    // Sign up the user
    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login the user
    const logIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout the user
    const logOut = async () => {
        setUser({ email: null, uid: null });
        return await signOut(auth);
    };

    // Wrap the children with the context provider
    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
*/

import { auth, db } from './firebase.config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { setDoc, doc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore'; // Import Firestore functions
import { getDoc } from "firebase/firestore";

export const registerWithEmail = async (email: string, password: string, username: string, nickname: string, role: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Update the profile with the username in Firebase Auth
  await updateProfile(userCredential.user, { displayName: username });

  // If the email is a specific admin email, assign the "admin" role
  const isAdmin = (email === "petiopetkov20a@gmail.com"); // Replace with your admin's email
  isAdmin ? role = "admin" : role = "user"; // Set role to "admin" if condition matches

  // Save the user’s details in Firestore with the role (default to "user")
  await setDoc(doc(db, 'Users', userCredential.user.uid), {
    username,
    email,
    createdAt: new Date(),
    role, // Store the role (either "user" or "admin")
    uid: userCredential.user.uid,
    points: 100
  });

  // Return the updated user with displayName
  return userCredential.user;
};

export const loginWithUsernameOrEmail = async (identifier: string, password: string) => {
  let email = identifier;

  // Check if the identifier is a username (not an email)
  if (!identifier.includes('@')) {
    // Query Firestore to find the email associated with the username
    const usersRef = collection(db, 'Users');
    const q = query(usersRef, where('username', '==', identifier));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Username not found");
    }

    // Assuming username is unique, get the email from the first matched document
    email = querySnapshot.docs[0].data().email;
  }

  // Proceed to login with the found email and provided password
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export const getUserRole = async (uid: string) => {
  const userDocRef = doc(db, 'Users', uid);
  const docSnap = await getDoc(userDocRef);
  
  if (docSnap.exists()) {
    return docSnap.data().role;  // Връща ролята на потребителя - админ или обикновен потрбител
  } else {
    throw new Error("User not found");
  }
};



