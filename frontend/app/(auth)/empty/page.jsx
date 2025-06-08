import Card from "@/components/Base/Card/Card";
import Checkbox from "@/components/Base/Checkbox/Checkbox";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import Button from "@/components/Base/Button/Button";


export default function Empty() {
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
        <Card  className="bg-[var(--darker-pink)]/50 w-full flex justify-center py-4 px-4 ml-7 " >
          <div className="flex gap-4 items-center">
            <div className="text-center mr-6">
            <Image src="/Rectangle.svg" alt="semhumor" width={100} height={100} className="hover:scale-110 hover:rotate-3 transition-all duration-300"/>
              <span>???</span>
            </div>
            <Card className="w-full py-6 px-6 ml-7 flex flex-col items-center text-center justify-between gap-4">
              <p>Você ainda não registrou seu humor hoje. Que tal tirar um momento para você?</p>
              <Button className="font-bold cursor-pointer">REGISTRAR</Button>
            </Card>    
          </div>
        </Card>
      </div>
      <div>
        <Card className="rounded-lg bg-green-100 p-6 shadow-md ml-18 mr-4 px-10 py-10">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <p className="text-base">
              Você ainda não tem metas cadastradas.
              <br />
              Cadastre sua primeira meta para conseguir acompanhá-la.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              CADASTRAR
            </Button>
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
        </Card>
      </div>
        
        
    </>
    
  );
}
