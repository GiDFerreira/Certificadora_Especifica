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
import MyBot from "@/components/Chatbot/Chatbot";
import { reactionImages, reactionDescriptions } from "@/utils/constants/reactionsMapping";




export default function Home() {
  const { userAuth } = useAuthContext();
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
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
        console.error("Erro:", err);
      }
    };
     fetchGoals();
  }, [userAuth]);

  useEffect(() => {
    const fetchMood = async () => {
      if (!userAuth) return;
      try {
        const moodFromBackend: Mood | null = await moodService.getTodayMood();
        setLastMood(moodFromBackend);

      } catch (error){
        console.error("Erro:", error);
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
                    <ButtonComponent className="font-bold cursor-pointer" onClick={() => router.push("/meu-humor")}>REGISTRAR</ButtonComponent>
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
                         src={reactionImages[lastMood.mood as keyof typeof reactionImages]}
                        alt="emoji_escolhido"
                        width={100}
                        height={100}
                        className="hover:scale-110 hover:rotate-3 transition-all duration-300"
                      />
                      <span>{reactionDescriptions[lastMood.mood as keyof typeof reactionDescriptions]}</span>
                    </div>
                    <CardComponent className="w-full py-6 flex flex-col items-center text-center justify-between gap-4">
                      <p>
                        Acompanhe sua jornada emocional e veja como você tem se
                        sentido ao longo do tempo.
                      </p>
                      <ButtonComponent className="font-bold cursor-pointer" onClick={() => router.push("/meu-humor")}>
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
                        <ButtonComponent className="bg-[var(--darker-green)] hover:bg-[var(--green)] text-white cursor-pointer" onClick={() => router.push("/minhas-metas")}>
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
                <>
                  <p className="font-bold">
                    Não deixe seu bem estar para depois! Cuide de suas metas:
                  </p>
                  {goals.map((goal) => (
                    <div key={goal.id} className="flex gap-2">
                      <ArrowRight className="text-darker-gray mt-8" />
                      <CardComponent className="flex w-full rounded-md bg-green-100 px-4 py-8 shadow-sm">
                        <div className="flex justify-between w-full">
                          <div className="items-start">
                            <span className="font-medium">{goal.title}</span>
                          </div>
                          <div className="items-end">
                            <span className="text-darker-pink text-sm font-semibold">
                              {new Date(goal.deadline).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardComponent>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <MyBot></MyBot>
        </div>
      )}
    </>
  );
}