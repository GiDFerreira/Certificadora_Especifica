'use client'

import Card from "@/components/Card/Card";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const { userAuth } = useAuthContext();
  const router = useRouter();

  if(userAuth == null) {
    router.push("/login");
  }

  return (
    <>
      {userAuth && (
        <div>
          <Card  className="bg-[var(--darker-pink)]/50 w-full flex justify-center py-4 px-4 ml-7 " >
            <div className="flex gap-4 items-center">
              <div className="text-center mr-6">
              <Image src="/feliz.svg" alt="feliz" width={100} height={100} className="hover:animate-bounce"/>
                <span>Feliz</span>
              </div>
              <Card className="w-full py-6 px-6 ml-7 flex flex-col items-center text-center justify-between gap-4">
                <p>Acompanhe sua jornada emocional e veja como você tem se sentido ao longo do tempo.</p>
                <Button className="font-bold">ACOMPANHAR</Button>
              </Card>    
            </div>
            
          </Card>
        </div>
      )}
    </>
    
  );
}
