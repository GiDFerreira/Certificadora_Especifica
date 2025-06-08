"use client"

import Card from "@/components/Card/Card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function MeuHumor() {
  const { userAuth } = useAuthContext();
  const router = useRouter();
    
  if(userAuth == null) {
    router.push("/login");
  }

  return (
    <>
    {userAuth && (
      <>
        <div className="ml-22">
          <h1 className="font-bold">Meu humor</h1>
        </div>
        <div className="flex justify-end">
          <Avatar className="">
            <img src="/firulagames.jpg" alt="firulagames" />
          </Avatar>
          <span className="font-serif text-sm">@firulaGames</span>
        </div>
        <div className="flex flex-col gap-6 px-8 m-4">
          <div className="w-full flex justify-center"><span className="justify-between text-rose-400">Como você define seu dia hoje?</span></div>
          <Card className="bg-[var(--darker-pink)]/50 w-full flex justify-center py-4 px-4 ml-7" >
            <div className="flex gap-12 items-center">
              <div className="text-center ml-8 mr-10 cursor-pointer">
              <Image src="/feliz.svg" alt="feliz" width={100} height={100} className="hover:scale-110 hover:rotate-3 transition-all duration-300"/>
                <span>Feliz</span>
              </div>
              <div className="text-center mr-10 cursor-pointer">
              <Image src="/maisoumenos.svg" alt="maisoumenos" width={100} height={100} className="hover:scale-110 hover:rotate-3 transition-all duration-300"/>
                <span>Mais ou menos</span>
              </div>
              <div className="text-center mr-10 cursor-pointer">
              <Image src="/indiferente.svg" alt="indiferente" width={100} height={100} className="hover:scale-110 hover:rotate-3 transition-all duration-300"/>
                <span>Indiferente</span>
              </div>
              <div className="text-center mr-10 cursor-pointer">
                <Image src="/triste.svg" alt="triste" width={100} height={100} className="hover:scale-110 hover:rotate-3 transition-all duration-300"/>
                <span>Triste</span>
              </div>
              <div className="text-center mr-10 cursor-pointer"> 
              <Image src="/bravo.svg" alt="bravo" width={100} height={100} className="hover:scale-110 hover:rotate-3 transition-all duration-300"/>
                <span>Bravo</span>
              </div>
            </div>
          </Card>
          <Card className="w-full py-48 px-6 ml-7 flex flex-col items-center text-center justify-between gap-4">
            <p className="">Perceber como você se sente é um passo importante no seu cuidado. Comece registrando seu primeiro humor por aqui.</p>
            <Button className="">REGISTRAR</Button>
          </Card>
        </div>
      </>
    )}
    </>
  );
}
