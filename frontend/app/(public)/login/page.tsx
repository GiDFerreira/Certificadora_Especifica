"use client";

import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Input from "@/components/Input/Input";
import Image from "next/image";
import LogoImage from "@/public/Logo.png";
import { useState } from "react";

export default function Login() {
    const [register, setRegister] = useState(false);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
        <Image src={LogoImage} alt="Serena Mente logo" className={`relative ${register ? '': 'bottom-10'}`}></Image>
        {register ? (
            <Card title="Registro" description="Preencha os dados para criar sua conta" className="sm:w-[400px] w-auto">
                <form>
                    <div className="flex flex-col gap-4">
                        <Input id="name" label="Nome"></Input>
                        <Input id="email" label="E-mail" placeholder="email@example.com"></Input>
                        <Input id="password" label="Senha"></Input>
                        <Input id="confirmPassword" label="Confirme sua senha"></Input>
                        <Button>Registrar</Button>
                        <Button variant="outline">Registrar com Google</Button>
                        <p className="text-center text-sm">Já possui uma conta? <a className="underline underline-offset-4" onClick={() => setRegister(false)}>Faça Login</a></p>
                    </div>
                </form>
            </Card>
        ) : (
            <Card title="Login" description="Digite seu email e senha para logar em sua conta" className="sm:w-[400px] w-auto">
                <form>
                    <div className="flex flex-col gap-4">
                        <Input id="email" type="email" label="E-mail" placeholder="email@example.com"></Input>
                        <Input id="password" type="password" label="Senha"></Input>
                        <Button>Login</Button>
                        <Button variant="outline">Login com Google</Button>
                        <p className="text-center text-sm">Não tem uma conta? <a className="underline underline-offset-4" onClick={() => setRegister(true)}>Registre-se!</a></p>
                    </div>
                </form>
            </Card>
        )}
        </div>
    );
}