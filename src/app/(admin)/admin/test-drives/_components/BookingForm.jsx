"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { upsertBooking, getAvailableVehiclesForBooking } from "@/actions/testdrive";
import { getVehicles } from "@/actions/vehicles";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Calendar, User, Clock, Car, Search, Eye } from "lucide-react";
import Image from "next/image";
import { maskPhone, unmask } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

export default function BookingForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Dados do formulário
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [visitDate, setVisitDate] = useState(new Date().toISOString().substring(0, 10));
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("10:00");
    const [vehicleId, setVehicleId] = useState("");
    const [notes, setNotes] = useState("");
    const [isTestDrive, setIsTestDrive] = useState(true);

    // Lista de veículos para selecção
    const [vehicles, setVehicles] = useState([]);
    const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
    const [loadingVehicles, setLoadingVehicles] = useState(false);
    const [vehicleSearch, setVehicleSearch] = useState("");

    const handleOpenVehicleModal = async () => {
        if (!visitDate || !startTime || !endTime) {
            toast.error("Preencha a data e os horários primeiro para ver os veículos disponíveis.");
            return;
        }

        setIsVehicleModalOpen(true);
        setLoadingVehicles(true);

        try {
            const res = await getAvailableVehiclesForBooking(visitDate, startTime, endTime);
            if (res.success && res.data) {
                setVehicles(res.data);
            } else {
                toast.error("Erro ao buscar veículos disponíveis.");
            }
        } catch (error) {
            console.error(error); // DEBUG
            toast.error("Erro na comunicação com o servidor.");
        } finally {
            setLoadingVehicles(false);
        }
    };

    const handleSelectVehicle = (vehicle) => {
        setVehicleId(vehicle.id);
        setIsVehicleModalOpen(false);
    };

    const selectedVehicle = vehicles.find(v => v.id === vehicleId);

    const filteredVehicles = vehicles.filter(v =>
        `${v.brand?.name} ${v.model} ${v.plate}`.toLowerCase().includes(vehicleSearch.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!clientName || !visitDate || !startTime || !endTime) {
            toast.error("Preencha todos os campos obrigatórios.");
            return;
        }

        if (isTestDrive && !vehicleId) {
            toast.error("Selecione um veículo para o Test Drive.");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                isTestDrive: isTestDrive,
                clientName,
                clientPhone: clientPhone ? unmask(clientPhone) : null,
                clientEmail: clientEmail || null,
                visitDate, // Enviamos como yyyy-MM-dd, o backend fará new Date()
                startTime,
                endTime,
                vehicleId: vehicleId || null,
                notes: notes || null,
                status: "PENDING"
            };

            const result = await upsertBooking(payload);

            if (result.success) {
                toast.success("Agendamento criado com sucesso!");
                router.back();
                router.refresh();
            } else {
                toast.error(result.error || "Ocorreu um erro ao criar o agendamento");
            }
        } catch (error) {
            toast.error("Erro interno no formulário", { description: error.message });
        } finally {
            setLoading(false);
        }
    };

    const minDate = new Date().toISOString().split("T")[0];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Dados do Cliente */}
                <Card className="shadow-sm border-gray-200 dark:border-gray-800">
                    <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <User className="w-5 h-5 text-gray-500" />
                            Dados do Cliente
                        </CardTitle>
                        <CardDescription>Informações de contato e identificação</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="clientName">Nome Completo *</Label>
                            <Input id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} required placeholder="Ex: Maria da Silva" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="clientPhone">Telefone / WhatsApp *</Label>
                                <Input id="clientPhone" value={clientPhone} onChange={(e) => setClientPhone(maskPhone(e.target.value))} required placeholder="(21) 90000-0000" maxLength={15} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="clientEmail">E-mail</Label>
                                <Input id="clientEmail" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="maria@email.com" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Dados do Agendamento */}
                <Card className="shadow-sm border-gray-200 dark:border-gray-800">
                    <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            Data e Horário
                        </CardTitle>
                        <CardDescription>Quando o test-drive ou visita ocorrerá</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="visitDate">Data do Agendamento *</Label>
                            <Input id="visitDate" type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} required min={minDate} />
                            <p className="text-xs text-muted-foreground pt-1">A data padrão é hoje, mas pode ser agendado para o futuro.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startTime">Horário de Início *</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="startTime" type="time" className="pl-9" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endTime">Horário de Término *</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="endTime" type="time" className="pl-9" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Veículo */}
            <Card className="shadow-sm border-gray-200 dark:border-gray-800">
                <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Car className="w-5 h-5 text-gray-500" />
                        Veículo de Interesse
                    </CardTitle>
                    <CardDescription>Selecione o veículo que o cliente deseja ver ou pilotar</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    {!selectedVehicle ? (
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                            <Car className="w-10 h-10 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-1">Nenhum Veículo Selecionado</h3>
                            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                                Preencha a data e horário acima para consultar quais veículos estão disponíveis neste momento. (Opcional - Pode manter vazio se for só uma visita padrão à loja)
                            </p>
                            <Button type="button" onClick={handleOpenVehicleModal} className="bg-blue-600 hover:bg-blue-700">
                                Consultar Disponibilidade
                            </Button>
                        </div>
                    ) : (
                        <div className="flex gap-4 p-4 border rounded-lg bg-blue-50/50 dark:bg-blue-900/10 items-center justify-between">
                            <div className="flex gap-4">
                                <div className="relative h-20 w-28 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                    {selectedVehicle.images && selectedVehicle.images.length > 0 ? (
                                        <Image
                                            src={selectedVehicle.images[0]}
                                            alt={selectedVehicle.model}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-gray-400">
                                            <Car className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-semibold text-lg text-blue-900 dark:text-blue-300">
                                        {selectedVehicle.brand?.name} {selectedVehicle.model}
                                    </h3>
                                    <div className="text-sm text-muted-foreground space-y-0.5">
                                        <p>Ano: {selectedVehicle.year} | Cor: {selectedVehicle.color} {selectedVehicle.plate ? `| Placa: ${selectedVehicle.plate}` : ''}</p>
                                    </div>
                                    <span className="font-bold text-blue-700">
                                        R$ {parseFloat(selectedVehicle.price).toLocaleString('pt-BR')}
                                    </span>
                                </div>
                            </div>
                            <Button type="button" variant="outline" onClick={handleOpenVehicleModal}>
                                Trocar Veículo
                            </Button>
                        </div>
                    )}



                    <div className="space-y-4 mt-8 flex flex-col">
                        <Label>Finalidade do Agendamento</Label>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center space-x-2 border rounded-lg p-3 w-fit">
                                <Switch
                                    id="test-drive-mode"
                                    checked={isTestDrive}
                                    onCheckedChange={setIsTestDrive}
                                />
                                <Label htmlFor="test-drive-mode" className="cursor-pointer select-none font-medium flex gap-2 items-center">
                                    {isTestDrive ? <Car className="w-4 h-4 text-blue-600" /> : <Eye className="w-4 h-4 text-blue-600" />}
                                    {isTestDrive ? "Test Drive" : "Somente Visitar"}
                                </Label>
                            </div>
                            <p className="text-sm text-muted-foreground ml-2">
                                {isTestDrive
                                    ? "O cliente fará um teste real com o carro. Exige disponibilidade do carro no pátio."
                                    : "A reserva não conta como teste real. Ele vai apenas visualizar a loja ou opções."}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 mt-4">
                        <Label htmlFor="notes">Observações</Label>
                        <Textarea
                            id="notes"
                            placeholder="Anotações para o test drive (ex: Cliente vem com a família, precisa cadeirinha se for andar com os filhos...)"
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end pt-4 gap-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                    Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
                    {loading ? "Cadastrando..." : "Confirmar Agendamento"}
                </Button>
            </div>
            <Dialog open={isVehicleModalOpen} onOpenChange={setIsVehicleModalOpen}>
                <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Selecione um Veículo Disponível</DialogTitle>
                        <DialogDescription>
                            Mostrando veículos livres para agendamento em {visitDate.split('-').reverse().join('/')} das {startTime} às {endTime}.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="relative my-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por modelo, marca ou placa..."
                            className="pl-9"
                            value={vehicleSearch}
                            onChange={(e) => setVehicleSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                        {loadingVehicles ? (
                            <div className="text-center py-8 text-muted-foreground animate-pulse">
                                Buscando disponibilidade...
                            </div>
                        ) : filteredVehicles.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                Nenhum veículo disponível para este horário.
                            </div>
                        ) : (
                            filteredVehicles.map((v) => (
                                <div key={v.id} className="flex gap-4 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors items-center justify-between">
                                    <div className="flex gap-4 items-center">
                                        <div className="relative h-16 w-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                            {v.images && v.images.length > 0 && v.images[0] ? (
                                                <Image
                                                    src={v.images[0]}
                                                    alt={v.model}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center w-full h-full text-gray-400">
                                                    <Car className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 dark:text-blue-300">
                                                {v.brand?.name} {v.model}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                {v.year} • Cor: {v.color} • Placa: {v.plate || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    <Button onClick={() => handleSelectVehicle(v)} className="bg-blue-600 hover:bg-blue-700">
                                        Selecionar
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </form>
    )
}

