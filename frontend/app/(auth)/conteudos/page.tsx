"use client"

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import LoggedUserComponent from "@/components/LoggedUser/loggedUser";
import { VideoCarousel } from "@/components/VideoCarousel/VideoCarousel";

export default function Conteudos() {
  const { userAuth } = useAuthContext();
  const router = useRouter();
      
  if(userAuth == null) {
    router.push("/login");
  }

  return (
    <>
      {userAuth && (
      <div className="w-full p-4 md:p-12">
        <div className="space-y-6">

          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl text-center md:text-left md:text-3xl w-full"> Conteúdos </h1>
            <LoggedUserComponent userName={userAuth.displayName ?? ""} userEmail={userAuth.email ?? ""} image={""}/>
          </div>

          <div style={{ backgroundColor: 'rgba(211, 226, 220, 0.53)' }} className="bg-muted p-4 rounded-md text-sm flex items-start gap-2 border border-muted-foreground/10">
            <span>💡</span>
            <p> Aqui você encontra conteúdos pensados com carinho para te ajudar a entender mais sobre si e cuidar do que sente. É só o começo — vá no seu tempo, do seu jeito. </p>
          </div>

          <section>
            <h2 className="text-lg font-semibold mb-4">Vídeos</h2>
            <div className="ml-18">
              <VideoCarousel videoIds={[ "8YG8HABY25w", "Tv0gJTBmVuc", "RpTxcwwGHv4", "1MrQPZuSs7A", "SnUBb-FAlCY"]}></VideoCarousel>
            </div>
          </section>
          
        </div>
      </div>
      )}
    </>
  );
}
