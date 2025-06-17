"use client"

import { useState } from "react";
import CompletedGoals from "@/components/CompletedGoals/CompletedGoals";
import { fakeGoals } from "@/fakeDb/goals";
import InputComponent from "@/components/Input/Input";
import ButtonComponent from "@/components/Button/Button";
import LoggedUser from "@/components/LoggedUser/loggedUser";
import GridComponent from "@/components/Grid/Grid";
import ButtonsheetComponent from "@/components/Buttonsheet/Buttonsheet";
import Image from "next/image";




export default function MinhasMetas() {
  const [completedGoals, setCompletedGoals] = useState(false);
  const [goals, setGoals] = useState(fakeGoals.goals);

  const handleToggle = (goalId: string, checked: boolean) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === String(goalId) ? { ...goal, completed: checked } : goal
    );
    setGoals(updatedGoals);
  };

  const [openModal, setOpenModal] = useState(false);
  
  const handleSave = () => {
    setOpenModal(false);
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
          <ButtonComponent className="cursor-pointer" onClick={() => setOpenModal(true)}>
            Cadastrar
          </ButtonComponent>
          <ButtonsheetComponent open={openModal} onOpenChange={setOpenModal} action="Create" model="Goal" onSave={handleSave}/>
        </div>
      </div>

      <ButtonComponent
        className="bg-gray-700 text-white rounded-full text-sm cursor-pointer mb-12"
        onClick={() => setCompletedGoals(true)}
      >
        Visualizar minhas metas concluídas
      </ButtonComponent>

      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl p-8 shadow-sm h-[536.87px]" style={{ backgroundColor: "var(--blue)" }}>
        <p className="items-center">Você ainda não tem metas cadastradas. Cadastre sua primeira meta para conseguir acompanhá-la.</p>
        <img src="/MulherAmpulheta-Photoroom.png" alt="Mulher ampulheta" width={246} height={246} />
      </div>
      ) : (
        <>
        {completedGoals && (
        <CompletedGoals
          goals={fakeGoals.goals}
          onClose={() => setCompletedGoals(false)}
        />
        )}
        <div className="overflow-x-auto rounded-md border border-gray-200">
          <GridComponent data={goals} type="Goal"/>
        </div>
      </>
    )}
      
      
    </div>
  );
}