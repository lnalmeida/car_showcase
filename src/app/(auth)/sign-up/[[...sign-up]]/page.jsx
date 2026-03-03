import React from "react";
import { SignUp } from "@clerk/nextjs";
import AuthLayout from "../../AuthLayout";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <div className="p-6 rounded-2xl shadow-xl bg-white max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Logo da empresa"
            className="h-12 object-contain"
          />
        </div>
        <SignUp
          appearance={{
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "blockButton",
            },
            elements: {
              card: "p-6 shadow-none bg-transparent",
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 text-white rounded-md mt-4 p-4",
              socialButtonsBlockButton:
                "bg-black text-white hover:bg-blue-800 w-full mt-4 p-4",
              footerAction: "text-sm text-gray-500 text-center mt-6",
            },
            variables: {
              colorPrimary: "#2563eb", /* blue-600 */
              colorText: "#000000",
              colorBackground: "#ffffff",
            },
          }}
          localization={{
            socialButtonsBlockButton: "Cadastrar com {{provider|titleize}}",
            start: {
              title: "Criar conta na JFCar",
              subtitle: "Cadastre-se para salvar seus veículos favoritos.",
            },
            formFieldLabel__emailAddress: "E-mail",
            formFieldLabel__password: "Senha",
            formFieldLabel__firstName: "Nome",
            formFieldLabel__lastName: "Sobrenome",
            formFieldInputPlaceholder__emailAddress: "Digite seu e-mail",
            formFieldInputPlaceholder__password: "Crie uma senha forte",
            formFieldInputPlaceholder__firstName: "Seu nome",
            formFieldInputPlaceholder__lastName: "Seu sobrenome",
            formFieldHintText__password:
              "Sua senha deve ter pelo menos 8 caracteres.",
            formButtonPrimary: "Cadastrar",
            footerActionText: "Já tem uma conta?",
            footerActionLink: "Entrar",
            headerTitle__signUp: "Criar uma conta",
            headerSubtitle__signUp: "Insira seus dados para começar",
            dividerText: "ou",
            noAvailableProviders: "Nenhum provedor disponível",
            verificationCodeFormTitle: "Verifique seu e-mail",
            verificationCodeFormSubtitle:
              "Digite o código que enviamos para o seu e-mail.",
          }}
        />
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
