"use client"

import CompletedGoals from "@/components/CompletedGoals/CompletedGoals";
import { useState } from "react";
import { fakeGoals } from "@/fakeDb/goals";

export default function MinhasMetas() {
  const [completedGoals, setCompletedGoals] = useState<boolean>(false);

  return (
    <div>
      <div onClick={() => setCompletedGoals(true)}>
        abrir
      </div>
        {completedGoals &&
          <CompletedGoals goals={fakeGoals.goals} onClose={() => setCompletedGoals(false)} />
        }
    </div>
  );
}
