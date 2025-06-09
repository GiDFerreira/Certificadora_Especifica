"use client";

import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Input from "@/components/Input/Input";
import Image from "next/image";
import LogoImage from "@/public/Logo.png";
import { useState } from "react";
import { loginWithEmail, loginWithGoogle, registerWithEmail } from "@/services/firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
    const [register, setRegister] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const router = useRouter();
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

    const handleEmailRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        if (!/^[a-zA-ZÀ-ÿ\s]{1,35}$/.test(name)) {
            setNameError("O nome deve conter apenas letras e no máximo 30 caracteres");
            return;
        }

        if(password !== confirmPassword) {
            return setConfirmPasswordError("As senhas não coincidem.")
        }

        try {
            await registerWithEmail(name, email, password);
            router.push("/");
        } catch(error: any) {
            if (error.code){
                switch (error.code) {
                    case "auth/email-already-in-use":
                        setEmailError("Este e-mail já está cadastrado.");
                        break;
                    case "auth/invalid-email":
                        setEmailError("Insira um e-mail válido.");
                        break;
                    case "auth/weak-password":
                        setPasswordError("A senha deve ter no mínimo 6 caracteres.");
                        break;
                    default:
                        setPasswordError("Erro ao registrar. Tente novamente.");
                }
            }
        }
    }

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginWithEmail(email, password);
            router.push("/");
        } catch(error: any) {
            if (typeof error === 'object' && error !== null && 'code' in error) {
                const firebaseError = error as { code: string };
                
                switch (firebaseError.code) {
                    case "auth/invalid-email":
                    case "auth/missing-password":
                        setPasswordError("Preencha todos os campos");
                        break;
                    case "auth/invalid-credential":
                    case "auth/wrong-password":
                        setPasswordError("E-mail e/ou senha incorretos");
                        break;
                    case "auth/too-many-requests":
                        setPasswordError("Muitas tentativas de login. Tente novamente mais tarde.");
                        break;
                    default:
                        setPasswordError("Erro ao fazer login. Tente novamente.");
                }
            } else {
                setPasswordError("Erro ao fazer login. Tente novamente.");
            }
        }
    }

    const handleSignInWithGoogle = async () => {
        try {
            await loginWithGoogle();
            router.push("/");
        } catch (error: any) {
            console.error("Erro ao fazer login com o Google:", error);
        }
    }

    const cleanStates = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setEmailError("");
        setPasswordError("");
        setNameError("");
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
        <Image src={LogoImage} alt="Serena Mente logo" className={`relative ${register ? '': 'bottom-10'}`}></Image>
        {register ? (
            <Card title="Registro" description="Preencha os dados para criar sua conta" className="sm:w-[400px] w-auto">
                <form onSubmit={handleEmailRegister}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <Input id="name" label="Nome" value={name} onChange={(e) => {setNameError(""); setName(e.target.value)}} required={true} className={nameError ? 'border-red-700' : ''} maxLength={35}></Input>
                            {nameError && <p className="text-red-700 text-[12px]">{nameError}</p>}
                        </div>
                        <div>
                            <Input id="email" label="E-mail" value={email} placeholder="email@example.com" onChange={(e) => {setEmailError(""); setEmail(e.target.value)}} required={true} className={emailError ? 'border-red-700' : ''}></Input>
                            {emailError && <p className="text-red-700 text-[12px]">{emailError}</p>}
                        </div>
                        <div>
                            <Input id="password" label="Senha" value={password} onChange={(e) => {setPasswordError(""); setPassword(e.target.value)}} type="password" required={true} className={passwordError ? 'border-red-700' : ''}></Input>
                            {passwordError && <p className="text-red-700 text-[12px]">{passwordError}</p>}
                        </div>
                        <div>
                            <Input id="confirmPassword" label="Confirme sua senha" value={confirmPassword} onChange={(e) => {setConfirmPasswordError(""); setConfirmPassword(e.target.value)}} type="password" required={true} className={confirmPasswordError ? 'border-red-700' : ''}></Input>
                            {confirmPasswordError && <p className="text-red-700 text-[12px]">{confirmPasswordError}</p>}
                        </div>
                        <Button type="submit">Registrar</Button>
                        <Button variant="outline" onClick={handleSignInWithGoogle}>Registrar com Google</Button>
                        <p className="text-center text-sm">Já possui uma conta? <a className="underline underline-offset-4" onClick={() => {cleanStates(); setRegister(false)}}>Faça Login</a></p>
                    </div>
                </form>
            </Card>
        ) : (
            <Card title="Login" description="Digite seu email e senha para logar em sua conta" className="sm:w-[400px] w-auto">
                <form onSubmit={handleEmailLogin}>
                    <div className="flex flex-col gap-4">
                        <Input id="email" type="email" label="E-mail" value={email} placeholder="email@example.com" onChange={(e) => setEmail(e.target.value)} className={passwordError ? 'border-red-700' : ''} required={true}></Input>
                        <div>
                            <Input id="password" type="password" label="Senha" value={password} onChange={(e) => {setPasswordError(""); setPassword(e.target.value)}} className={passwordError ? 'border-red-700' : ''} required={true}></Input>
                            {passwordError && <p className="text-red-700 text-[12px]">{passwordError}</p>}
                        </div>
                        <Button type="submit">Login</Button>
                        <Button variant="outline" onClick={handleSignInWithGoogle}>Login com Google</Button>
                        <p className="text-center text-sm">Não tem uma conta? <a className="underline underline-offset-4" onClick={() => {cleanStates(); setRegister(true)}}>Registre-se!</a></p>
                    </div>
                </form>
            </Card>
        )}
        </div>
    );
}