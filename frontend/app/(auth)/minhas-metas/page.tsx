"use client"

import { useState } from "react";
import CompletedGoals from "@/components/CompletedGoals/CompletedGoals";
import { fakeGoals } from "@/fakeDb/goals";
import photo from "@/public/firulagames.jpg";
import AvatarComponent from "@/components/Avatar/Avatar";
import InputComponent from "@/components/Input/Input";
import ButtonComponent from "@/components/Button/Button";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import LoggedUser from "@/components/LoggedUser/loggedUser";

export default function MinhasMetas() {
  const [completedGoals, setCompletedGoals] = useState(false);
  const [goals, setGoals] = useState(fakeGoals.goals);

  const handleToggle = (goalId: string, checked: boolean) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === String(goalId) ? { ...goal, completed: checked } : goal
    );
    setGoals(updatedGoals);
  };

  return (
    <div className="p-12">
      <div className="w-full">        
        <div className="flex justify-between items-center">
            <h1 className="font-bold text-3xl">Minhas Metas</h1>
            <div className="flex items-center gap-2">
              <LoggedUser userName={"Gato"} userEmail={"gato@mail.com"} image={""}/>
            </div>
        </div>
        <div className="flex gap-4 items-center my-12">
          <InputComponent
            id="searchGoals"
            type="search"
            placeholder="Pesquisar por nome da meta"
          />
          <ButtonComponent className="cursor-pointer">
            Cadastrar
          </ButtonComponent>
        </div>
      </div>

      <ButtonComponent
        className="bg-gray-700 text-white rounded-full text-sm cursor-pointer mb-12"
        onClick={() => setCompletedGoals(true)}
      >
        Visualizar minhas metas concluídas
      </ButtonComponent>

      {completedGoals && (
        <CompletedGoals
          goals={fakeGoals.goals}
          onClose={() => setCompletedGoals(false)}
        />
      )}
      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 w-10"></th>
              <th className="p-4">Título</th>
              <th className="p-4">Data de entrega</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal) => (
              <tr className="border border-gray-200" key={goal.id}>
                <td className="py-4">
                  <CheckboxComponent
                    id={`goal-${goal.id}`}
                    checked={!!goal.completedDate}
                    onCheckedChange={(checked) =>
                      handleToggle(goal.id, !!checked)
                    }
                    className=""
                  />
                </td>
                <td className="">{goal.title}</td>
                <td>{goal.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}