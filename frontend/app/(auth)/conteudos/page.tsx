"use client"

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Conteudos() {
  const { userAuth } = useAuthContext();
  const router = useRouter();
      
  if(userAuth == null) {
    router.push("/login");
  }

  return (
    <>
      {userAuth && (
        <div>
        
        </div>
      )}
    </>
  );
}
