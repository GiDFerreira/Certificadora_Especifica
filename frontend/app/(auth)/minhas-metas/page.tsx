"use client"

import { useState } from "react";
import CompletedGoals from "@/components/CompletedGoals/CompletedGoals";
import { fakeGoals } from "@/fakeDb/goals";
import photo from "@/public/firulagames.jpg";
import AvatarComponent from "@/components/Avatar/Avatar";
import InputComponent from "@/components/Input/Input";
import ButtonComponent from "@/components/Button/Button";
import CheckboxComponent from "@/components/Checkbox/Checkbox";

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
    <>
      <div className="w-full px-8 py-6">        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-4">Minhas metas</h1>
        </div>
        <AvatarComponent image={photo} name="Firula" username="figames" />
        <div className="flex gap-4 items-center mb-6">
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
        className="bg-gray-700 text-white rounded-full px-4 py-2 text-sm cursor-pointer"
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
      <div className="overflow-x-auto rounded-md border border-gray-200 max-w-4xl mx-auto">
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
                <td className="px-6 py-4">
                  <CheckboxComponent
                    id={`goal-${goal.id}`}
                    checked={!!goal.completedDate}
                    onCheckedChange={(checked) =>
                      handleToggle(goal.id, !!checked)
                    }
                    className="ml-3"
                  />
                </td>
                <td className="ml-6">{goal.title}</td>
                <td>{goal.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}