"use client";

import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoggedUser from "@/components/LoggedUser/loggedUser";
import CardComponent from "@/components/Card/Card";
import ButtonComponent from "@/components/Button/Button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { goalsService } from "@/services/goalsService";
import { Goal } from "@/interfaces/Goal";
import { Mood } from "@/interfaces/Mood";
import { moodService } from "@/services/moodService";




export default function Home() {
  const { userAuth } = useAuthContext();
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [lastMood, setLastMood] = useState<Mood | null>(null);

  if (userAuth == null) {
    router.push("/login");
  }

  useEffect(() => {
    const fetchGoals = async () => {
      if(!userAuth) return;
      try {
        const goalsFromBackend = await goalsService.getGoals();
        setGoals(goalsFromBackend.slice(0, 3));
      } catch (err) {
        console.error("Erro ao buscar goals:", err);
      }
    };
     fetchGoals();
  }, [userAuth]);

  useEffect(() => {
    const fetchMood = async () => {
      if (!userAuth) return;
      try {
        const moodFromBackend: Mood[] = await moodService.getMoods();
        if (moodFromBackend && moodFromBackend.length - 1) {
          setLastMood(moodFromBackend[moodFromBackend.length - 1]);
        } else {
          setLastMood(null);
        }
      } catch (error){
        console.error("Erro ao buscar o mood do dia:", error);
        setLastMood(null);
      }
    };

    fetchMood();
  }, [userAuth])

  return (
    <>
      {userAuth && (
        <div className="w-full p-4 md:p-12">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl text-center md:text-left md:text-3xl w-full"> Início </h1>
            <div className="flex items-center gap-2">
              <LoggedUser userName={userAuth.displayName ?? ""} userEmail={userAuth.email ?? ""} image={""}/>
            </div>
          </div>
          <div className="mt-12">
            {lastMood === null ? (
              <CardComponent  className="bg-[var(--lighter-pink)] w-full flex justify-center  mb-36" >
                <div className="flex gap-4 items-center">
                  <div className="text-center mr-6">
                  <Image src="/Rectangle.svg" alt="semhumor" width={100} height={100} className="hover:scale-110 hover:rotate-3 transition-all duration-300"/>
                    <span>???</span>
                  </div>
                  <CardComponent className="w-full py-6 px-6 ml-7 flex flex-col items-center text-center justify-between gap-4">
                    <p>Você ainda não registrou seu humor hoje. Que tal tirar um momento para você?</p>
                    <ButtonComponent className="font-bold cursor-pointer">REGISTRAR</ButtonComponent>
                  </CardComponent>    
                </div>
              </CardComponent>
            ):( 
              <>
                <div className="flex justify-center">
                  <p className="text-[var(--darker-pink)] font-extrabold">
                    Esse é o seu humor de hoje:
                  </p>
                </div>
                <CardComponent className="bg-[var(--darker-pink)]/50 w-full flex justify-center mb-12">
                  <div className="flex gap-4 items-center">
                    <div className="text-center">
                      <Image
                        src={`/${lastMood.mood}`}
                        alt="emoji_escolhido"
                        width={100}
                        height={100}
                        className="hover:scale-110 hover:rotate-3 transition-all duration-300"
                      />
                      <span>{lastMood.note}</span>
                    </div>
                    <CardComponent className="w-full py-6 flex flex-col items-center text-center justify-between gap-4">
                      <p>
                        Acompanhe sua jornada emocional e veja como você tem se
                        sentido ao longo do tempo.
                      </p>
                      <ButtonComponent className="font-bold cursor-pointer">
                        ACOMPANHAR
                      </ButtonComponent>
                    </CardComponent>
                  </div>
                </CardComponent>
              </>
            )}
            <div className="flex flex-col justify-center gap-8">
              
              {goals.length === 0 ? (
                <div>
                  <CardComponent className="rounded-lg bg-green-100 p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-4">
                      <p className="text-base">
                        Você ainda não tem metas cadastradas.
                        <br />
                        Cadastre sua primeira meta para conseguir acompanhá-la.
                      </p>
                      <div>
                        <ButtonComponent className="bg-[var(--darker-green)] hover:bg-[var(--green)] text-white cursor-pointer">
                          CADASTRAR
                        </ButtonComponent>
                      </div>
                    </div>
                      <div className="hidden md:block">
                        <Image
                          src="/MulherAmpulheta-Photoroom.png" 
                          alt="Ilustração de metas"
                          width={385}
                          height={385}
                        />
                      </div>
                    </div>
                  </CardComponent>
              </div>
              ):(
                goals.map((goal) => ( 
                  <>
                    <p className="font-bold">Não deixe seu bem estar para depois! Cuide de suas metas:</p>
                    <CardComponent className="flex w-full items-center justify-between rounded-md bg-green-100 p-4 shadow-sm">
                        <ArrowRight className="mr-3 text-darker-gray" />
                        <div>
                          <div className="flex items-center gap-4">
                            <span className="text-xl">→</span>
                            <span className="font-medium">{goal.title}</span>
                          </div>
                          <span className="text-darker-pink text-sm font-semibold">
                            {new Date(goal.deadline).toLocaleDateString()}
                          </span>
                        </div>
                    </CardComponent>
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
