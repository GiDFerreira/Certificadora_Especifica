"use client"

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import LoggedUserComponent from "@/components/LoggedUser/loggedUser";
import { VideoCarousel } from "@/components/VideoCarousel/VideoCarousel";
import AccordionComponent from "@/components/Accordion/Accordion";
import AvatarComponent from "@/components/Avatar/Avatar";
import AgenlinaPsi from "@/public/angelinipsi.jpg";
import BiancaPsi from "@/public/biancamayumi.jpg";
import IzabellaPsi from "@/public/izabellacamargo.jpg";
import DrauzioLogo from "@/public/drauzio.jpg";
import MyBot from "@/components/Chatbot/Chatbot";




export default function Conteudos() {
  const { userAuth } = useAuthContext();
  const router = useRouter();
      
  if(userAuth == null) {
    router.push("/login");
  }

  const blogLinks = [
    {
      title: "PsyMeet Blog",
      link: "https://www.psymeetsocial.com/blog",
      description: "Disponibiliza artigos sobre diversos temas relacionados à saúde mental e dicas sobre como manter o bem-estar."
    },
    {
      title: "Eu Sinto-me",
      link: "https://eusinto.me/",
      description: "Um portal com informações e recursos de qualidade sobre saúde psicológica e bem-estar, baseados em evidências científicas da psicologia, atualizados, gratuitos e acessíveis a todos."
    },
    {
      title: "Instituto Ame Sua Mente",
      link: "https://www.amesuamente.org.br/",
      description: "Apresenta textos sobre temas do dia a dia com uma linguagem direta, abordando assuntos como ansiedade, bullying, depressão, diversidade, estresse, entre outros."
    }
  ];


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
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Blogs e sites para leitura</h2>
            <AccordionComponent items={blogLinks} />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Pessoas</h2>
            <section>
              <div className="flex flex-col gap-4 md:flex-row flex-wrap md:gap-8">
                <div className="flex items-center gap-4">
                  <AvatarComponent image={AgenlinaPsi} name="Amanda Angelini Psicóloga" username="angelini.psi"></AvatarComponent>
                </div>
                <div className="flex items-center gap-4">
                  <AvatarComponent image={BiancaPsi} name="Bianca Mayumi" username="psi.bianca"></AvatarComponent>
                </div>
                <div className="flex items-center gap-4">
                  <AvatarComponent image={IzabellaPsi} name="Izabella Camargo" username="izabellacamargoreal"></AvatarComponent>
                </div>
                <div className="flex items-center gap-4">
                  <AvatarComponent image={DrauzioLogo} name="Portal Drauzio" username="sitedrauziovarella"></AvatarComponent>
                </div>
              </div>
            </section>
          </div>
        </div>
        <MyBot></MyBot>
      </div>
      )}
    </>
  );
}
