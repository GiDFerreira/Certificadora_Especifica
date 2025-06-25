"use client"

import { useEffect, useState } from "react";
import CompletedGoals from "@/components/CompletedGoals/CompletedGoals";
import InputComponent from "@/components/Input/Input";
import ButtonComponent from "@/components/Button/Button";
import LoggedUser from "@/components/LoggedUser/loggedUser";
import GridComponent from "@/components/Grid/Grid";
import ButtonsheetComponent from "@/components/Buttonsheet/Buttonsheet";
import { Goal } from "@/interfaces/Goal";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { goalsService } from "@/services/goalsService";
import MyBot from "@/components/Chatbot/Chatbot";

export default function MinhasMetas() {
  const [completedGoals, setCompletedGoals] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { userAuth } = useAuthContext();
  const router = useRouter();

  if (userAuth == null) {
    router.push("/login");
  }

  useEffect(() => {
    const fetchGoals = async () => {
      try{
        const goalsFromBackend = await goalsService.getGoals();

        setGoals(goalsFromBackend);
      } catch (err) {
        console.error("Erro:", err);
      }
    };
    fetchGoals();
  }, [refreshKey])

  const [openModal, setOpenModal] = useState(false);
  
  const handleSave = () => {
    setOpenModal(false);
    setRefreshKey(prev => prev + 1);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const filteredGoals = goals.filter((goal) => {
    const titleText = goal.title?.toLowerCase() ?? "";
    const search = searchTerm.toLowerCase();

    return titleText.includes(search);
  });

  return (
    userAuth && (
      <div className="w-full p-4 md:p-12">       
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl text-center md:text-left md:text-3xl w-full"> Minhas Metas </h1>
          <div className="flex items-center gap-2">
            <LoggedUser userName={userAuth.displayName ?? ""} userEmail={userAuth.email ?? ""} image={""}/>
          </div>
          </div>
            <div className="flex flex-col my-10 w-full mb-2">
                  <InputComponent
                  className="w-full"
                  id="searchGoals"
                  type="search"
                  placeholder="Pesquisar por nome da meta"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  />
            </div>
          <div className="flex justify-between items-center w-full mb-12">
            <ButtonComponent className="cursor-pointer" onClick={() => setOpenModal(true)}>
              + CADASTRAR
            </ButtonComponent>
            <ButtonsheetComponent open={openModal} onOpenChange={setOpenModal} action="Create" model="Goal" onSuccess={handleSave} user={userAuth}/>
            <ButtonComponent
              className="bg-[var(--darker-pink)]/70 rounded text-sm cursor-pointer"
              onClick={() => setCompletedGoals(true)}
            >
              <img src="/checklist.svg" alt="checklist" />
            </ButtonComponent>
          </div>

        {goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl p-8 shadow-sm h-[536.87px]" style={{ backgroundColor: "var(--blue)" }}>
            <p className="items-center">Você ainda não tem metas cadastradas. Cadastre sua primeira meta para conseguir acompanhá-la.</p>
            <img src="/MulherAmpulheta-Photoroom.png" alt="Mulher ampulheta" width={246} height={246} />
        </div>
        ) : (
          <>
          <GridComponent 
            data={goals
                .filter(goal => !goal.completed)
                .filter(goal => goal.title.toLowerCase().includes(searchTerm.toLowerCase()))
              } 
              type="Goal" 
              user={userAuth} 
              onSuccess={() => setRefreshKey(prev => prev + 1)} 
              onDelete={handleDeleteGoal}/>
            <MyBot></MyBot>
          </>
        )}
        {completedGoals && (
            <CompletedGoals
              goals={goals.filter(goal => goal.completed)}
              onClose={() => setCompletedGoals(false)}
            />
          )}
        </div>
      )
  );
}