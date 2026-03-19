"use client";

import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, ShieldCheck } from "lucide-react";

const CustomSignInForm = ({ storeName }) => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [emailAddress, setEmailAddress] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Social Login handler
    const signInWith = (strategy) => {
        return signIn.authenticateWithRedirect({
            strategy,
            redirectUrl: "/sign-in/sso-callback",
            redirectUrlComplete: "/",
        });
    };

    // Handle submission of the sign-in form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;

        setLoading(true);

        try {
            // Try to start sign-in directly with Clerk — Clerk knows ALL users (including OIDC)
            const { supportedFirstFactors } = await signIn.create({
                identifier: emailAddress,
            });

            // Find the email_code factor
            const emailCodeFactor = supportedFirstFactors.find(
                (f) => f.strategy === "email_code"
            );

            if (emailCodeFactor) {
                await signIn.prepareFirstFactor({
                    strategy: "email_code",
                    emailAddressId: emailCodeFactor.emailAddressId,
                });
                setPendingVerification(true);
                toast.success("Código de login enviado para o seu e-mail!");
            } else {
                toast.error("Este e-mail não suporta login via código. Tente login social.");
            }
        } catch (err) {
            console.error("Erro no login:", err);
            const firstError = err.errors?.[0];

            // If Clerk doesn't know this email at all, redirect to sign-up
            if (firstError?.code === "form_identifier_not_found") {
                toast.info("E-mail não encontrado. Vamos criar sua conta!");
                router.push(`/sign-up?email=${encodeURIComponent(emailAddress)}`);
            } else {
                toast.error(firstError?.message || "Ocorreu um erro ao iniciar o login.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle verification of the sign-in code
    const onPressVerify = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;
        setLoading(true);

        try {
            const result = await signIn.attemptFirstFactor({
                strategy: "email_code",
                code,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                toast.success("Login realizado com sucesso!");
                router.push("/");
            } else {
                console.error(JSON.stringify(result, null, 2));
                toast.error("Código inválido ou expirado.");
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            toast.error(err.errors?.[0]?.message || "Erro na verificação do código.");
        } finally {
            setLoading(false);
        }
    };

    if (!isLoaded) return null;

    return (
        <div className="space-y-6">
            {pendingVerification ? (
                <form onSubmit={onPressVerify} className="space-y-6">
                    <div className="space-y-2 text-center">
                        <ShieldCheck className="mx-auto h-12 w-12 text-blue-600 mb-2" />
                        <h3 className="text-xl font-semibold">Código de Acesso</h3>
                        <p className="text-sm text-gray-500">
                            Digite o código enviado para <strong>{emailAddress}</strong> para entrar.
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
                            autoFocus
                        />
                    </div>
                    <Button disabled={loading} className="w-full h-11 bg-black hover:bg-zinc-800">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Entrar na Conta"}
                    </Button>
                </form>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="space-y-5">
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

                        <Button disabled={loading} type="submit" className="w-full h-11 bg-black hover:bg-zinc-800 font-semibold shadow-md transition-all active:scale-[0.98]">
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Receber Código de Login"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Ou entre com</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => signInWith("oauth_google")}
                            className="h-11 border-gray-200 hover:bg-gray-50 transition-colors"
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
                            onClick={() => signInWith("oauth_facebook")}
                            className="h-11 border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <svg className="h-5 w-5 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => signInWith("oauth_x")}
                            className="h-11 border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239H4.293L17.607 20.65z" />
                            </svg>
                        </Button>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Ainda não tem uma conta?{" "}
                        <a href="/sign-up" className="text-blue-600 font-semibold hover:underline">
                            Cadastre-se aqui
                        </a>
                    </p>
                </>
            )}

            {/* Required for Clerk Bot Protection (CAPTCHA) - Placed at the very bottom to avoid UI conflicts */}
            <div id="clerk-captcha" className="mt-6 empty:hidden min-h-[70px] flex justify-center" />
        </div>
    );
};

export default CustomSignInForm;
