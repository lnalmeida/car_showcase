"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { upsertBooking, getAvailableVehiclesForBooking, updateBookingByUser } from "@/actions/testdrive";
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
import { Calendar, Clock, Car, Search, Eye, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

export default function UserBookingForm({ user, initialData = null, initialVehicleId = null }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Dados do formulário
    const [visitDate, setVisitDate] = useState(initialData?.visitDate ? new Date(initialData.visitDate).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10));
    const [startTime, setStartTime] = useState(initialData?.startTime || "09:00");
    const [endTime, setEndTime] = useState(initialData?.endTime || "10:00");
    const [vehicleId, setVehicleId] = useState(initialData?.vehicleId || initialVehicleId || "");
    const [notes, setNotes] = useState(initialData?.notes || "");
    const [isTestDrive, setIsTestDrive] = useState(initialData ? initialData.isTestDrive : true);

    // Lista de veículos para seleção
    const [vehicles, setVehicles] = useState([]);
    const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
    const [loadingVehicles, setLoadingVehicles] = useState(false);
    const [vehicleSearch, setVehicleSearch] = useState("");

    const isEdit = !!initialData;

    const handleOpenVehicleModal = async () => {
        if (!visitDate || !startTime || !endTime) {
            toast.error("Preencha a data e os horários primeiro.");
            return;
        }

        setIsVehicleModalOpen(true);
        setLoadingVehicles(true);

        try {
            const res = await getAvailableVehiclesForBooking(visitDate, startTime, endTime);
            if (res.success && res.data) {
                // Se estiver editando, o veículo atual deve aparecer como disponível
                setVehicles(res.data);
            } else {
                toast.error("Erro ao buscar veículos disponíveis.");
            }
        } catch (error) {
            toast.error("Erro na comunicação com o servidor.");
        } finally {
            setLoadingVehicles(false);
        }
    };

    const handleSelectVehicle = (vehicle) => {
        setVehicleId(vehicle.id);
        setIsVehicleModalOpen(false);
    };

    // Para o veículo selecionado inicialmente na edição
    useEffect(() => {
        if (initialData?.Vehicle) {
            setVehicles(prev => {
                const exists = prev.find(v => v.id === initialData.Vehicle.id);
                if (!exists) return [initialData.Vehicle, ...prev];
                return prev;
            });
        }
    }, [initialData]);

    const selectedVehicle = vehicles.find(v => v.id === vehicleId) || initialData?.Vehicle;

    const filteredVehicles = vehicles.filter(v =>
        `${v.brand?.name} ${v.model}`.toLowerCase().includes(vehicleSearch.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!visitDate || !startTime || !endTime) {
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
                id: initialData?.id,
                userId: user.id,
                clientName: user.name,
                clientPhone: user.phone,
                clientEmail: user.email,
                isTestDrive,
                visitDate,
                startTime,
                endTime,
                vehicleId: vehicleId || null,
                notes: notes || null,
                status: "PENDING"
            };

            const result = isEdit 
                ? await updateBookingByUser(initialData.id, payload)
                : await upsertBooking(payload);

            if (result.success) {
                toast.success(isEdit ? "Agendamento atualizado!" : "Solicitação enviada com sucesso!");
                router.push("/reservations");
            } else {
                toast.error(result.error || "Ocorreu um erro no agendamento");
            }
        } catch (error) {
            toast.error("Erro interno no formulário");
        } finally {
            setLoading(false);
        }
    };

    const minDate = new Date().toISOString().split("T")[0];

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Info do Usuário (Read Only) */}
                <Card className="shadow-none border-gray-200">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-600" />
                            Seus Dados
                        </CardTitle>
                        <CardDescription>Confirmaremos o agendamento por esses dados</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0 text-sm">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">Nome:</span>
                            <span className="font-medium">{user.name}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">E-mail:</span>
                            <span className="font-medium">{user.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">WhatsApp:</span>
                            <span className="font-medium">{user.phone || "N/A"}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Data e Hora */}
                <Card className="shadow-none border-gray-200">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Calendar size={18} className="text-blue-600" />
                            Data e Horário
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-0">
                        <div className="space-y-2">
                            <Label htmlFor="visitDate">Data da Visita *</Label>
                            <Input id="visitDate" type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} required min={minDate} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="startTime">Início</Label>
                                <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endTime">Fim</Label>
                                <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Seleção de Veículo */}
            <Card className="shadow-none border-gray-200">
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Car size={18} className="text-blue-600" />
                        Veículo e Detalhes
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-0">
                   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border rounded-xl p-4 bg-gray-50/50">
                        <div className="flex items-start gap-4">
                            <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                {selectedVehicle?.images?.[0] ? (
                                    <Image src={selectedVehicle.images[0]} alt="Carro" fill className="object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400"><Car /></div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold">{selectedVehicle ? `${selectedVehicle.brand?.name} ${selectedVehicle.model}` : "Nenhum carro selecionado"}</h4>
                                <p className="text-sm text-muted-foreground">{selectedVehicle ? `Ano ${selectedVehicle.year} - ${selectedVehicle.color}` : "Selecione o carro que deseja ver"}</p>
                            </div>
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={handleOpenVehicleModal}>
                            {selectedVehicle ? "Trocar Carro" : "Escolher Carro"}
                        </Button>
                   </div>

                    <div className="space-y-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="test-drive" className="font-bold flex items-center gap-2 cursor-pointer">
                                {isTestDrive ? <Car size={18} className="text-blue-600" /> : <Eye size={18} className="text-blue-600" />}
                                {isTestDrive ? "Eu quero fazer um Test Drive" : "Quero apenas visitar para conhecer"}
                            </Label>
                            <Switch id="test-drive" checked={isTestDrive} onCheckedChange={setIsTestDrive} />
                        </div>
                        <p className="text-xs text-blue-800/70">
                            {isTestDrive 
                                ? "O Test Drive está sujeito à habilitação válida e disponibilidade do veículo no pátio." 
                                : "Sua visita será agendada e um consultor estará livre para te atender."}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Observações Adicionais (Opcional)</Label>
                        <Textarea 
                            id="notes" 
                            placeholder="Ex: Tenho interesse em dar um carro na troca, gostaria de falar sobre financiamento..." 
                            value={notes} 
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="ghost" type="button" className="flex-1" onClick={() => router.back()}>Voltar</Button>
                <Button type="submit" disabled={loading} className="flex-[2] bg-blue-600 hover:bg-blue-700">
                    {loading ? "Processando..." : (isEdit ? "Salvar Alterações" : "Solicitar Agendamento")}
                </Button>
            </div>

            <Dialog open={isVehicleModalOpen} onOpenChange={setIsVehicleModalOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Veículos Disponíveis</DialogTitle>
                        <DialogDescription>Para o dia {visitDate.split('-').reverse().join('/')} às {startTime}</DialogDescription>
                    </DialogHeader>
                    <div className="relative my-2">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar modelo..." className="pl-9" value={vehicleSearch} onChange={(e) => setVehicleSearch(e.target.value)} />
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                        {loadingVehicles ? (
                            <div className="p-10 text-center animate-pulse">Carregando estoque...</div>
                        ) : filteredVehicles.length === 0 ? (
                            <div className="p-10 text-center text-muted-foreground">Nenhum veículo disponível para este horário.</div>
                        ) : (
                            filteredVehicles.map(v => (
                                <div key={v.id} onClick={() => handleSelectVehicle(v)} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                    <div className="relative w-20 h-14 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                                        {v.images?.[0] ? <Image src={v.images[0]} alt={v.model} fill className="object-cover" /> : <div className="flex items-center justify-center h-full"><Car /></div>}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm leading-none">{v.brand?.name} {v.model}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{v.year} • {v.color}</p>
                                    </div>
                                    <Button size="sm" variant="ghost">Selecionar</Button>
                                </div>
                            ))
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </form>
    );
}
