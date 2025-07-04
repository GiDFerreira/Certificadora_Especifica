"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import Image from "next/image";
import LogoImage from "@/public/Logo.png";
import Button from "../Button/Button";
import { ChartNoAxesCombined, House, Smile, TvMinimalPlay } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const SidebarComponent = () => {
    const { logout } = useAuthContext();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    }

    return (
        <Sidebar>
            <SidebarHeader className="h-[300px] flex justify-center items-center bg-[var(--lighter-blue)]">
                <Image src={LogoImage} alt="Serena Mente logo"/> 
            </SidebarHeader>
            <SidebarContent className="bg-[var(--lighter-blue)]">
                <SidebarGroup className="h-full flex">
                    <div className="flex flex-col gap-4 w-full ">
                        <Button className="bg-transparent text-[var(--darker-gray)] border-none shadow-none hover:bg-[var(--blue)] focus:bg-[var(--darker-blue)] focus:text-white" onClick={() => router.push("/")}>
                            <div className="ml-6 flex gap-4 w-full items-center justify-start">
                                <House />Início
                            </div>
                        </Button>
                        <Button className="bg-transparent text-[var(--darker-gray)] border-none shadow-none hover:bg-[var(--blue)] focus:bg-[var(--darker-blue)] focus:text-white" onClick={() => router.push("/meu-humor")}>
                            <div className="ml-6 flex gap-4 w-full items-center justify-start">
                                <Smile />Meu Humor
                            </div>
                        </Button>
                        <Button className="bg-transparent text-[var(--darker-gray)] border-none shadow-none hover:bg-[var(--blue)] focus:bg-[var(--darker-blue)] focus:text-white" onClick={() => router.push("/minhas-metas")}>
                            <div className="ml-6 flex gap-4 w-full items-center justify-start">
                                <ChartNoAxesCombined />Minhas Metas
                            </div>
                        </Button>
                        <Button className="bg-transparent text-[var(--darker-gray)] border-none shadow-none hover:bg-[var(--blue)] focus:bg-[var(--darker-blue)] focus:text-white" onClick={() => router.push("/conteudos")}>
                            <div className="ml-6 flex gap-4 w-full items-center justify-start">
                                <TvMinimalPlay />Conteúdos
                            </div>
                        </Button>
                    </div>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="bg-[var(--lighter-blue)]">
                <Button className="bg-transparent text-[var(--darker-gray)] border-none shadow-none focus:bg-[var(--darker-pink)] hover:text-white focus:text-white" onClick={() => handleLogout()}>Logout</Button>
            </SidebarFooter>
        </Sidebar>
    )
}

export default SidebarComponent;