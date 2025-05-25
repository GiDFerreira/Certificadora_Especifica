import Card from "@/components/Base/Card/Card";
import Checkbox from "@/components/Base/Checkbox/Checkbox";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import Button from "@/components/Base/Button/Button";


export default function Home() {
  return (
    <>
      <div className="flex justify-between items-center px-6 py-2">
        <h1 className="font-bold text-3xl">Início</h1>
        
        <div className="flex items-center gap-2">
          <Avatar>
            <img src="/firulagames.jpg" alt="firulagames" />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-serif font-semibold">@Gato</span>
            <span className="font-serif text-gray-500 text-sm font-thin">@emailGato</span>
          </div>
        </div>
      </div>
      <div className="px-10 py-10">
        <div className="flex justify-center py-3">
          <p className="text-[var(--darker-pink)] font-extrabold">
            Esse é o seu humor de hoje:
          </p>
        </div>
        <Card  className="bg-[var(--darker-pink)]/50 w-full flex justify-center py-4 px-4 ml-7 " >
          <div className="flex gap-4 items-center">
            <div className="text-center mr-6">
            <Image src="/feliz.svg" alt="feliz" width={100} height={100} className="hover:scale-110 hover:rotate-3 transition-all duration-300"/>
              <span>Feliz</span>
            </div>
            <Card className="w-full py-6 px-6 ml-7 flex flex-col items-center text-center justify-between gap-4">
              <p>Acompanhe sua jornada emocional e veja como você tem se sentido ao longo do tempo.</p>
              <Button className="font-bold cursor-pointer">ACOMPANHAR</Button>
            </Card>    
          </div>
        </Card>
        
        
        <div className="flex flex-col space-y-4 p-6">
          <p className="ml-8 py-24 font-bold">Não deixe seu bem estar para depois! Cuide de suas metas:</p>
          <div className="flex items-center gap-2">
            <Checkbox id="meta 1"/>
              <div className="flex w-full items-center justify-between rounded-md bg-green-100 p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="text-xl">→</span>
                  <span className="font-medium">Meta 1</span>
                </div>
                <span className="text-red-500 font-medium">22/03/2025</span>
              </div>
          </div>
          <div className="flex items-center gap-2">
                <Checkbox id="meta2" />
                <div className="flex w-full items-center justify-between rounded-md bg-green-100 p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-xl">→</span>
                    <span className="font-medium">Meta 2</span>
                  </div>
                  <span className="text-red-500 font-medium">07/05/2025</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="meta3" />
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
    </>
    
  );
}
