"use client";

import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Card from "@/components/Card/Card";
import Checkbox from "@/components/Checkbox/Checkbox";
import Button from "@/components/Button/Button";
import LoggedUser from "@/components/LoggedUser/loggedUser";

export default function Home() {
  const { userAuth } = useAuthContext();
  const router = useRouter();

  if (userAuth == null) {
    router.push("/login");
  }

  return (
    <>
      {userAuth && (
        <div className="p-12">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-3xl">Início</h1>
            <div className="flex items-center gap-2">
              <LoggedUser userName={"Gato"} userEmail={"gato@mail.com"} image={""}/>
            </div>
          </div>
          <div className="mt-12">
            <div className="flex justify-center">
              <p className="text-[var(--darker-pink)] font-extrabold">
                Esse é o seu humor de hoje:
              </p>
            </div>
            <Card className="bg-[var(--darker-pink)]/50 w-full flex justify-center mb-12">
              <div className="flex gap-4 items-center">
                <div className="text-center">
                  <Image
                    src="/feliz.svg"
                    alt="feliz"
                    width={100}
                    height={100}
                    className="hover:scale-110 hover:rotate-3 transition-all duration-300"
                  />
                  <span>Feliz</span>
                </div>
                <Card className="w-full py-6 flex flex-col items-center text-center justify-between gap-4">
                  <p>
                    Acompanhe sua jornada emocional e veja como você tem se
                    sentido ao longo do tempo.
                  </p>
                  <Button className="font-bold cursor-pointer">
                    ACOMPANHAR
                  </Button>
                </Card>
              </div>
            </Card>
            <div className="flex flex-col gap-8">
              <p className="font-bold">
                Não deixe seu bem estar para depois! Cuide de suas metas:
              </p>
              <div className="flex items-center gap-2">
                <Checkbox />
                <div className="flex w-full items-center justify-between rounded-md bg-green-100 p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-xl">→</span>
                    <span className="font-medium">Meta 1</span>
                  </div>
                  <span className="text-red-500 font-medium">22/03/2025</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox />
                <div className="flex w-full items-center justify-between rounded-md bg-green-100 p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-xl">→</span>
                    <span className="font-medium">Meta 2</span>
                  </div>
                  <span className="text-red-500 font-medium">07/05/2025</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox />
                <div className="flex w-full items-center justify-between rounded-md bg-green-100 p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-xl">→</span>
                    <span className="font-medium">Meta 3</span>
                  </div>
                  <span className="font-medium">30/05/2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
