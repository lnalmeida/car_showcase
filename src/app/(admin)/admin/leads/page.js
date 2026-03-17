"use client";

import React, { useEffect, useState } from "react";
import { getLeads } from "@/actions/leads";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Eye, Search, Filter } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusMap = {
  NEW: { label: "Novo", color: "bg-blue-500" },
  CONTACTED: { label: "Contatado", color: "bg-yellow-500" },
  IN_PROGRESS: { label: "Em Atendimento", color: "bg-purple-500" },
  CLOSED: { label: "Fechado", color: "bg-green-500" },
  DISCARDED: { label: "Descartado", color: "bg-gray-500" },
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const fetchLeads = async () => {
    setLoading(true);
    const result = await getLeads({ 
      search, 
      status: status === "all" ? undefined : status 
    });
    if (result.success) {
      setLeads(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, [status]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLeads();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Gestão de Leads</h1>
          <p className="text-gray-500 text-sm">Acompanhe e gerencie o interesse dos clientes.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Buscar por nome, e-mail ou telefone..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button type="submit">Buscar</Button>
          </form>
          
          <div className="w-full md:w-64">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Filtrar por Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                {Object.entries(statusMap).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead>Data</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20">
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full" />
                    <p className="text-gray-500 font-medium">Carregando leads...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20">
                  <p className="text-gray-500">Nenhum lead encontrado.</p>
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell className="text-gray-600 text-sm">
                    {format(new Date(lead.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{lead.name}</span>
                      <span className="text-xs text-gray-500">{lead.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-blue-600">
                        {lead.vehicle?.vehicleBrand} {lead.vehicle?.model}
                      </span>
                      <span className="text-xs text-gray-500">{lead.vehicle?.year}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${statusMap[lead.status]?.color} text-white border-0`}>
                      {statusMap[lead.status]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/leads/${lead.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Detalhes
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
