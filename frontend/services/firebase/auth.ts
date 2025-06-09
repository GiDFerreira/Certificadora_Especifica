import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth, googleProvider } from "./config";
import axiosService from "../AxiosService";

export const registerWithEmail = async (name: string, email: string, password: string): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
  await axiosService.post("/api/users", {
    name,
    email,
    id: userCredential.user.uid,
  });
      
  return userCredential;
};

export const loginWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async () => {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;

        await axiosService.post("/api/users", {
            id: user.uid,
            name: user.displayName || "Usuário Google",
            email: user.email || "",
        });

        return userCredential;
    } catch(e) {
        console.error(e);
    }
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};