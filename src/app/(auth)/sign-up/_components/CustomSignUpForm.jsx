"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { maskPhone } from "@/lib/utils";
import { Loader2, Phone, Mail, Lock, User, ShieldCheck } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const CustomSignUpForm = ({ storeName }) => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [emailAddress, setEmailAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [acceptLGPD, setAcceptLGPD] = useState(false);
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Auto-fill email from query params
    useEffect(() => {
        const emailParam = searchParams.get("email");
        if (emailParam) {
            setEmailAddress(emailParam);
        }
    }, [searchParams]);

    // Social Login handler
    const signUpWith = (strategy) => {
        return signUp.authenticateWithRedirect({
            strategy,
            redirectUrl: "/sign-up/sso-callback",
            redirectUrlComplete: "/",
        });
    };

    // Handle submission of the sign-up form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;
        if (!acceptLGPD) {
            toast.error("Você deve aceitar os termos de coleta de dados (LGPD) para prosseguir.");
            return;
        }

        setLoading(true);

        try {
            await signUp.create({
                emailAddress,
                firstName,
                lastName,
                unsafeMetadata: {
                    phone,
                    acceptedLGPD: true,
                    acceptedLGPDDate: new Date().toISOString(),
                },
            });

            // Send the email verification code
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            setPendingVerification(true);
            toast.success("Código de verificação enviado para o seu e-mail!");
        } catch (err) {

            const firstError = err.errors?.[0];
            const errorCode = firstError?.code;

            if (err.message?.includes("Failed to fetch") || err.name === "TypeError") {
                toast.error("Erro de conexão com o servidor de segurança. Use aba anônima ou desligue AdBlockers.");
            } else if (errorCode?.includes("invalid_parameter")) {
                toast.error("Configuração pendente no Clerk: Habilite 'First & Last Name' no painel.");
            } else {
                toast.error(firstError?.message || "Ocorreu um erro ao criar a conta.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle verification of the email code
    const onPressVerify = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;
        setLoading(true);

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });


            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                toast.success("Conta criada com sucesso!");
                router.push("/");
            } else if (completeSignUp.status === "missing_requirements") {
                // Clerk may flag phone_number as missing, but if we have a session, proceed
                if (completeSignUp.createdSessionId) {

                    await setActive({ session: completeSignUp.createdSessionId });
                    toast.success("Conta criada com sucesso!");
                    router.push("/");
                } else {
                    // No session available yet — need to handle remaining requirements
                    const missing = completeSignUp.missingFields || [];


                    if (missing.includes("phone_number")) {
                        toast.warning("⚠️ Telefone é obrigatório no Clerk. Desative 'Phone number' nas configurações do Clerk Dashboard → User & Authentication → Email, Phone, Username para corrigir.");
                    } else {
                        toast.error("Cadastro incompleto. Requisitos pendentes: " + missing.join(", "));
                    }
                }
            } else {

                toast.error("Código inválido ou expirado.");
            }
        } catch (err) {

            toast.error(err.errors?.[0]?.message || "Erro na verificação do código.");
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneChange = (e) => {
        setPhone(maskPhone(e.target.value));
    };

    if (!isLoaded) return null;

    return (
        <div className="space-y-6">
            {pendingVerification ? (
                <form onSubmit={onPressVerify} className="space-y-6">
                    <div className="space-y-2 text-center">
                        <ShieldCheck className="mx-auto h-12 w-12 text-blue-600 mb-2" />
                        <h3 className="text-xl font-semibold">Verifique seu e-mail</h3>
                        <p className="text-sm text-gray-500">
                            Enviamos um código para <strong>{emailAddress}</strong>. Digite-o abaixo para validar sua conta.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="code">Código de Verificação</Label>
                        <Input
                            id="code"
                            value={code}
                            placeholder="Ex: 123456"
                            onChange={(e) => setCode(e.target.value)}
                            className="text-center text-lg tracking-widest font-mono h-12"
                            required
                        />
                    </div>
                    <Button disabled={loading} className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verificar Código"}
                    </Button>
                </form>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="flex items-center gap-2">
                                    <User size={16} className="text-gray-400" /> Nome
                                </Label>
                                <Input
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Ex: João"
                                    required
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Sobrenome</Label>
                                <Input
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Ex: Silva"
                                    required
                                    className="h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail size={16} className="text-gray-400" /> E-mail
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                placeholder="seu@email.com"
                                required
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> Telefone / WhatsApp
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="(00) 00000-0000"
                                required
                                className="h-11"
                            />
                        </div>

                        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <Checkbox
                                id="lgpd"
                                checked={acceptLGPD}
                                onCheckedChange={setAcceptLGPD}
                                className="mt-1"
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="lgpd"
                                    className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                                >
                                    Aceito a coleta e processamento dos meus dados
                                </label>
                                <p className="text-xs text-gray-500">
                                    Estou de acordo com a Política de Privacidade e os Termos de Uso conforme a Lei Geral de Proteção de Dados (LGPD) para o atendimento da {storeName}.
                                </p>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button disabled={loading} type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-lg shadow-blue-100 transition-all active:scale-[0.98]">
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Criar Minha Conta"}
                            </Button>
                        </div>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Ou cadastrar com</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => signUpWith("oauth_google")}
                            className="h-11 border-gray-200 hover:bg-gray-50"
                        >
                            <svg className="h-5 w-5 mr-0" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => signUpWith("oauth_facebook")}
                            className="h-11 border-gray-200 hover:bg-gray-50"
                        >
                            <svg className="h-5 w-5 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => signUpWith("oauth_x")}
                            className="h-11 border-gray-200 hover:bg-gray-50"
                        >
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239H4.293L17.607 20.65z" />
                            </svg>
                        </Button>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Já tem uma conta?{" "}
                        <a href="/sign-in" className="text-blue-600 font-semibold hover:underline">
                            Faça Login
                        </a>
                    </p>
                </>
            )}

            {/* Required for Clerk Bot Protection (CAPTCHA) - Placed at the very bottom to avoid UI conflicts */}
            <div id="clerk-captcha" className="mt-6 empty:hidden min-h-[70px] flex justify-center" />
        </div>
    );
};

export default CustomSignUpForm;
