import React from "react";
import { SignIn } from "@clerk/nextjs";
import AuthhLayout from "../../AuthLayout";

const SignInPage = () => {
  return (
    <AuthhLayout>
      <div className="p-6 rounded-2xl shadow-xl bg-white max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Logo da empresa"
            className="h-12 object-contain"
          />
        </div>
        <SignIn
          appearance={{
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "blockButton",
            },
            elements: {
              card: "p-6 shadow-none bg-transparent",
              formButtonPrimary:
                "bg-red-600 hover:bg-orange-600 text-white rounded-md mt-4 p-4",
              socialButtonsBlockButton:
                "bg-black text-white hover:bg-red-700 w-full mt-4 p-4",
              footerAction: "text-sm text-gray-500 text-center mt-6",
            },
            variables: {
              colorPrimary: "#e60000",
              colorText: "#000000",
              colorBackground: "#ffffff",
            },
          }}
          localization={{
            socialButtonsBlockButton: "Entrar com {{provider|titleize}}",
            start: {
              title: "Entrar na JFCar",
              subtitle: "Bem-vindo de volta! Acesse sua conta.",
            },
            formFieldLabel__emailAddress: "E-mail",
            formFieldLabel__password: "Senha",
            formFieldInputPlaceholder__emailAddress: "Digite seu e-mail",
            formFieldInputPlaceholder__password: "Digite sua senha",
            formFieldHintText__password:
              "Sua senha deve ter pelo menos 8 caracteres.",
            formButtonPrimary: "Entrar",
            footerActionText: "Ainda não tem uma conta?",
            footerActionLink: "Cadastre-se",
            headerTitle__signIn: "Acessar conta",
            headerSubtitle__signIn: "Use seus dados para entrar",
            signInWithMetamask: "Entrar com Metamask",
            backButton: "Voltar",
            dividerText: "ou",
            noAvailableProviders: "Nenhum provedor disponível",
            secondFactorTitle: "Autenticação em duas etapas",
            passwordResetRequestButton: "Enviar instruções",
            passwordResetVerificationCodeInputPlaceholder:
              "Código de verificação",
            passwordResetVerificationCodeLabel: "Código recebido por e-mail",
            passwordResetNewPasswordLabel: "Nova senha",
            passwordResetNewPasswordPlaceholder: "Digite sua nova senha",
            passwordResetButton: "Redefinir senha",
            verificationCodeFormTitle: "Verifique seu e-mail",
            verificationCodeFormSubtitle:
              "Digite o código que enviamos para o seu e-mail.",
          }}
        />
      </div>
    </AuthhLayout>
  );
};

export default SignInPage;
