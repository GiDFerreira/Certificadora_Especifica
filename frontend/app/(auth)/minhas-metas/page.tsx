"use client"

import CompletedGoals from "@/components/CompletedGoals/CompletedGoals";
import { useState } from "react";
import { fakeGoals } from "@/fakeDb/goals";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function MinhasMetas() {
  const [completedGoals, setCompletedGoals] = useState<boolean>(false);
  const { userAuth } = useAuthContext();
  const router = useRouter();
  
  if(userAuth == null) {
    router.push("/login");
  }

  return (
    <>
    {userAuth && (
      <div>
        <div onClick={() => setCompletedGoals(true)}>
          abrir
        </div>
        {completedGoals &&
          <CompletedGoals goals={fakeGoals.goals} onClose={() => setCompletedGoals(false)} />
        }
      </div>
    )}
    </>
  );
}
