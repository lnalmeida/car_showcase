"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getLead, updateLeadStatus } from "@/actions/leads";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Car,
  User,
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusMap = {
  NEW: { label: "Novo", color: "bg-blue-500", border: "border-blue-200" },
  CONTACTED: { label: "Contatado", color: "bg-yellow-500", border: "border-yellow-200" },
  IN_PROGRESS: { label: "Em Atendimento", color: "bg-purple-500", border: "border-purple-200" },
  CLOSED: { label: "Fechado", color: "bg-green-500", border: "border-green-200" },
  DISCARDED: { label: "Descartado", color: "bg-gray-500", border: "border-gray-200" },
};

export default function LeadDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      setLoading(true);
      const result = await getLead(id);
      if (result.success) {
        setLead(result.data);
      } else {
        toast.error("Lead não encontrado.");
        router.push("/admin/leads");
      }
      setLoading(false);
    };
    fetchLead();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    const result = await updateLeadStatus(id, newStatus);
    if (result.success) {
      setLead({ ...lead, status: newStatus });
      toast.success("Status atualizado com sucesso!");
    } else {
      toast.error("Erro ao atualizar status.");
    }
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4" />
        <p className="text-gray-500 font-medium">Carregando detalhes do lead...</p>
      </div>
    );
  }

  if (!lead) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Detalhes do Lead</h1>
          <p className="text-gray-500 text-sm">Gerencie o atendimento deste cliente.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Client Info Card */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b bg-gray-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{lead.name}</h2>
                    <p className="text-sm text-gray-500">
                      Recebido em {format(new Date(lead.createdAt), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <Badge className={`${statusMap[lead.status]?.color} text-white px-3 py-1`}>
                  {statusMap[lead.status]?.label}
                </Badge>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">E-mail</span>
                    <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline font-medium">
                      {lead.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Telefone</span>
                    <a href={`tel:${lead.phone}`} className="hover:text-gray-900 transition-colors font-medium">
                      {lead.phone}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Mensagem do Cliente</span>
                    <p className="text-gray-700 leading-relaxed italic">
                      "{lead.message}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Info Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Car className="h-4 w-4" /> Veículo de Interesse
            </h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 aspect-video rounded-lg overflow-hidden bg-gray-100 border">
                <img 
                  src={lead.vehicle?.images?.[0] || "https://via.placeholder.com/400x225"} 
                  alt={lead.vehicle?.model}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {lead.vehicle?.vehicleBrand} {lead.vehicle?.model}
                  </h4>
                  <p className="text-gray-500 font-medium">Ano {lead.vehicle?.year} • {lead.vehicle?.color}</p>
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">
                      R$ {parseFloat(lead.vehicle?.price).toLocaleString("pt-BR")}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/vehicles/${lead.vehicleId}`} target="_blank">
                      Ver no site <ExternalLink className="h-3 w-3 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600" /> Ações do Lead
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Alterar Status</label>
                <Select disabled={updating} value={lead.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusMap).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4 space-y-2 border-t mt-4">
                <Button className="w-full bg-green-600 hover:bg-green-700" variant="default" asChild>
                  <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank">
                    Conversar por WhatsApp
                  </a>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <a href={`mailto:${lead.email}`}>Enviar e-mail</a>
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
            <h4 className="font-bold text-orange-800 text-sm mb-2">Resumo da Demanda</h4>
            <p className="text-orange-700 text-sm leading-relaxed">
              O cliente demonstrou interesse via formulário público de detalhes do veículo. 
              Sugerimos contato em até 1 hora para maior taxa de conversão.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
