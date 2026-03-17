"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { createLead } from "@/actions/leads";
import { Send } from "lucide-react";

const leadSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  phone: z.string().min(8, { message: "Telefone deve ter pelo menos 8 dígitos" }),
  email: z.string().email({ message: "E-mail inválido" }),
  message: z.string().min(5, { message: "Mensagem deve ter pelo menos 5 caracteres" }),
  vehicleId: z.string(),
});

export default function LeadForm({ vehicleName, vehicleId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "Tenho interesse nesse veículo e gostaria de ter maiores informações.",
      vehicleId: vehicleId,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await createLead(formData);

      if (result.success) {
        toast.success("Mensagem enviada com sucesso! Em breve entraremos em contato.");
        reset();
      } else {
        toast.error(result.error || "Ocorreu um erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro inesperado. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 leading-tight">
        Se interessou pelo<br />
        <span className="text-blue-600">{vehicleName}</span>? Entre em contato.
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register("vehicleId")} />
        
        <div className="space-y-1">
          <Input
            placeholder="Seu nome"
            {...register("name")}
            className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.name && (
            <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Input
            placeholder="Telefone"
            {...register("phone")}
            className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Input
            type="email"
            placeholder="Seu melhor e-mail"
            {...register("email")}
            className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.email && (
            <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Textarea
            placeholder="Escreva sua mensagem..."
            rows={4}
            {...register("message")}
            className={errors.message ? "border-red-500 focus-visible:ring-red-500 resize-none" : "resize-none"}
          />
          {errors.message && (
            <p className="text-xs text-red-500 font-medium">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all duration-200"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Enviando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="h-5 w-5" /> Enviar Mensagem
            </span>
          )}
        </Button>
      </form>
      
      <p className="text-[10px] text-gray-400 mt-4 text-center leading-tight">
        Ao enviar, você concorda com nossa política de privacidade e termos de uso.
      </p>
    </div>
  );
}
