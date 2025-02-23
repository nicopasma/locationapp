import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";

import { useEffect, useState } from "react";
import { auth, db } from "./config";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";

const USERS_REF = "users";  // Varmistetaan, että tämä on oikea

export function useFireAuth() {
    const [user, setUser] = useState();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user);
            if (user) {
                console.log("User is authenticated:", user.uid); // Debug
                if (!user.uid) return; // Estetään tyhjä UID-virhe

                const userDocRef = doc(db, USERS_REF, user.uid);
                const subColRef = collection(userDocRef, "todos");

                onSnapshot(subColRef, querySnapshot => {
                    setTodos(querySnapshot.docs.map(doc => ({
                        id: doc.id, ...doc.data()
                    })));
                });
            }
        });
    }, []);

    return [user, todos];
}

export async function signUpUser(email, password, nickname) {
    try {
        const userCreds = await createUserWithEmailAndPassword(auth, email, password);
        
        if (!userCreds.user || !userCreds.user.uid) {
            throw new Error("User credentials are undefined");
        }

        const userDocRef = doc(db, USERS_REF, userCreds.user.uid);
        await setDoc(userDocRef, {
            nickname,
            email: userCreds.user.email
        });

    } catch (error) {
        console.log("Error signing up:", error.message);
        return error.message;
    }
    return null;
}

export async function loginUser(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        return error.message;
    }
    return null;
}

export async function logoutUser() {
    try {
        await signOut(auth);
        console.log("User successfully logged out");
    } catch (error) {
        console.log("Logout error:", error.message);
    }
}