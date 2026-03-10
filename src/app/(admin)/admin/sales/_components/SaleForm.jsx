"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { createSale, updateSale } from "@/actions/sales";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Car, DollarSign, Calendar, FileText, CheckCircle2 } from "lucide-react";
import { maskCPFCNPJ, maskPhone, unmask, maskCurrency, unmaskCurrency } from "@/lib/utils";

export default function SaleForm({ vehicle, sellerId, sale = null }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [hasTradeIn, setHasTradeIn] = useState(sale?.tradeInVehicle ? true : false);

    const isEdit = !!sale;

    // Estados dos Campos - Inicializar com dados da venda se for edição
    const [buyerName, setBuyerName] = useState(sale?.buyerName || "");
    const [buyerPhone, setBuyerPhone] = useState(sale?.buyerPhone ? maskPhone(sale.buyerPhone) : "");
    const [buyerEmail, setBuyerEmail] = useState(sale?.buyerEmail || "");
    const [buyerDocument, setBuyerDocument] = useState(sale?.buyerDocument ? maskCPFCNPJ(sale.buyerDocument) : "");
    const [saleDate, setSaleDate] = useState(
        sale?.saleDate
            ? new Date(sale.saleDate).toISOString().substring(0, 10)
            : new Date().toISOString().substring(0, 10)
    );
    const [deliveryDate, setDeliveryDate] = useState(
        sale?.deliveryDate
            ? new Date(sale.deliveryDate).toISOString().substring(0, 10)
            : ""
    );
    const [saleValue, setSaleValue] = useState(sale?.saleValue ? maskCurrency((sale.saleValue * 100).toFixed(0)) : vehicle?.price ? maskCurrency((vehicle.price * 100).toFixed(0)) : "");
    const [paymentMethod, setPaymentMethod] = useState(sale?.paymentMethod || "À vista");
    const [bank, setBank] = useState(sale?.bank || "");
    const [installments, setInstallments] = useState(sale?.installments?.toString() || "");
    const [downPayment, setDownPayment] = useState(sale?.downPayment ? maskCurrency((sale.downPayment * 100).toFixed(0)) : "");
    const [tradeInVehicle, setTradeInVehicle] = useState(sale?.tradeInVehicle || "");
    const [tradeInValue, setTradeInValue] = useState(sale?.tradeInValue ? maskCurrency((sale.tradeInValue * 100).toFixed(0)) : "");
    const [warrantyType, setWarrantyType] = useState(sale?.warrantyType || "Legal - 90 Dias (Seminovos)");
    const [warrantyExpirationDate, setWarrantyExpirationDate] = useState(
        sale?.warrantyExpirationDate
            ? new Date(sale.warrantyExpirationDate).toISOString().substring(0, 10)
            : ""
    );
    const [observations, setObservations] = useState(sale?.observations || "");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação de data de entrega (não pode ser superior à data atual)
        if (deliveryDate) {
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            const dDate = new Date(deliveryDate);
            if (dDate > today) {
                toast.error("A data de entrega não pode ser superior à data atual.");
                return;
            }
        }

        if (!buyerName || !saleValue || !paymentMethod) {
            toast.error("Preencha Nome, Valor e Método de Pagamento.");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                vehicleId: vehicle?.id || sale?.vehicleId,
                sellerId: sellerId || sale?.sellerId || null,
                buyerName,
                buyerPhone: buyerPhone ? unmask(buyerPhone) : null,
                buyerEmail: buyerEmail || null,
                buyerDocument: buyerDocument ? unmask(buyerDocument) : null,
                saleDate: new Date(saleDate),
                deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
                saleValue: unmaskCurrency(saleValue),
                paymentMethod,
                bank: paymentMethod === 'Financiamento' ? bank : null,
                installments: paymentMethod === 'Financiamento' ? parseInt(installments) : null,
                downPayment: downPayment ? unmaskCurrency(downPayment) : null,
                tradeInVehicle: hasTradeIn ? tradeInVehicle : null,
                tradeInValue: hasTradeIn ? unmaskCurrency(tradeInValue) : null,
                observations: observations || null,
                warrantyType,
                warrantyExpirationDate: warrantyExpirationDate ? new Date(warrantyExpirationDate) : null,
            };

            const result = isEdit
                ? await updateSale(sale.id, payload)
                : await createSale(payload);

            if (result.success) {
                toast.success(isEdit ? "Venda atualizada com sucesso!" : "Venda registrada com sucesso!");
                router.back();
                router.refresh();
            } else {
                toast.error(result.error || "Ocorreu um erro ao processar a venda");
            }
        } catch (error) {
            toast.error("Erro interno no formulário", { description: error.message });
        } finally {
            setLoading(false);
        }
    };

    const maxDate = new Date().toISOString().split("T")[0];

    const displayVehicle = vehicle || sale?.vehicle;

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Resumo do Veículo Topo */}
            {displayVehicle && (
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl border border-blue-100 dark:border-blue-900">
                    <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                        <CheckCircle2 size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{displayVehicle.brand?.name} {displayVehicle.model} - {displayVehicle.year}</h2>
                        <p className="text-muted-foreground flex gap-4 text-sm mt-1">
                            <span>Placa: {displayVehicle.plate || 'Omitida'}</span>
                            <span>Cor: {displayVehicle.color}</span>
                            <span className="font-semibold text-blue-600">R$ {parseFloat(displayVehicle.price).toLocaleString('pt-BR')} (Anúncio)</span>
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bloco: Cliente */}
                <Card className="shadow-sm border-gray-200 dark:border-gray-800">
                    <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <FileText className="w-5 h-5 text-gray-500" />
                            Dados do Comprador
                        </CardTitle>
                        <CardDescription>Informações de faturamento e contato pós-venda</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="buyerName">Nome Completo *</Label>
                            <Input id="buyerName" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} required placeholder="Ex: João da Silva Nunes" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="buyerDocument">CPF / CNPJ</Label>
                                <Input id="buyerDocument" value={buyerDocument} onChange={(e) => setBuyerDocument(maskCPFCNPJ(e.target.value))} placeholder="000.000.000-00" maxLength={18} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="buyerPhone">WhatsApp</Label>
                                <Input id="buyerPhone" value={buyerPhone} onChange={(e) => setBuyerPhone(maskPhone(e.target.value))} placeholder="(21) 90000-0000" maxLength={15} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="buyerEmail">E-mail</Label>
                            <Input id="buyerEmail" type="email" value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} placeholder="joao@email.com" />
                        </div>
                    </CardContent>
                </Card>

                {/* Bloco: Negócio */}
                <Card className="shadow-sm border-blue-100 dark:border-blue-900">
                    <CardHeader className="bg-blue-50 dark:bg-blue-950/20 border-b border-blue-100 dark:border-blue-900 pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg text-blue-800 dark:text-blue-300">
                            <DollarSign className="w-5 h-5" />
                            Condições de Pagamento
                        </CardTitle>
                        <CardDescription>Valor final acordado e plano</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="saleValue">Valor Fechado (R$) *</Label>
                                <Input id="saleValue" type="text" value={saleValue} onChange={(e) => setSaleValue(maskCurrency(e.target.value))} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Forma de Pagamento</Label>
                                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="À vista">À vista (Transferência/Pix)</SelectItem>
                                        <SelectItem value="Financiamento">Financiamento Bancário</SelectItem>
                                        <SelectItem value="Consórcio">Carta de Consórcio</SelectItem>
                                        <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {paymentMethod === 'Financiamento' && (
                            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg border-l-4 border-blue-500">
                                <div className="space-y-2">
                                    <Label htmlFor="bank">Banco</Label>
                                    <Input id="bank" value={bank} onChange={(e) => setBank(e.target.value)} placeholder="Ex: Santander" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="installments">Parcelas (Qtd)</Label>
                                    <Input id="installments" type="number" value={installments} onChange={(e) => setInstallments(e.target.value)} placeholder="48" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="downPayment">Valor Entrada (R$)</Label>
                                    <Input id="downPayment" type="text" value={downPayment} onChange={(e) => setDownPayment(maskCurrency(e.target.value))} />
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 mt-4">
                            <div className="space-y-0.5">
                                <Label>Inclui Veículo na Troca?</Label>
                                <p className="text-sm text-muted-foreground">O cliente deu um carro como parte de pagamento</p>
                            </div>
                            <Switch checked={hasTradeIn} onCheckedChange={setHasTradeIn} />
                        </div>

                        {hasTradeIn && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tradeInVehicle">Carro da Troca (Modelo/Ano/Placa)</Label>
                                    <Input id="tradeInVehicle" value={tradeInVehicle} onChange={(e) => setTradeInVehicle(e.target.value)} placeholder="Gol 1.0 2018 ABC-1234" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tradeInValue">Valor Avaliado (R$)</Label>
                                    <Input id="tradeInValue" type="text" value={tradeInValue} onChange={(e) => setTradeInValue(maskCurrency(e.target.value))} />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Bloco: Prazos e Garantia */}
                <Card className="shadow-sm border-gray-200 dark:border-gray-800">
                    <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            Prazos e Garantia
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="saleDate">Data da Venda *</Label>
                                <Input id="saleDate" type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} required max={maxDate} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="deliveryDate">Data de Entrega (Agendada)</Label>
                                <Input id="deliveryDate" type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} max={maxDate} />
                            </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t mt-4">
                            <Label>Termo de Garantia da Loja</Label>
                            <Select value={warrantyType} onValueChange={setWarrantyType}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Legal - 90 Dias (Seminovos)">Legal - 90 Dias (Motor e Câmbio)</SelectItem>
                                    <SelectItem value="Fábrica - 1 a 5 Anos (Novos)">Fábrica - Conforme Fabricante</SelectItem>
                                    <SelectItem value="Repasse (Sem Garantia)">Repasse (Venda no Estado)</SelectItem>
                                    <SelectItem value="Estendida - 1 Ano">Garantia Estendida Custodiada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="warrantyExpirationDate">Fim da Garantia (Data Limite)</Label>
                            <Input id="warrantyExpirationDate" type="date" value={warrantyExpirationDate} onChange={(e) => setWarrantyExpirationDate(e.target.value)} />
                            <p className="text-xs text-muted-foreground">Caso preenchido, o dashboard alertará quando a cobertura acabar.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Bloco: Observações */}
                <Card className="shadow-sm border-gray-200 dark:border-gray-800">
                    <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b pb-4">
                        <CardTitle className="text-lg">Observações e Histórico</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <Textarea
                            placeholder="Anotações internas sobre aprovação de crédito, pendências de documentação, promessas como 'entregar polido e tanque cheio', etc..."
                            rows={6}
                            value={observations}
                            onChange={(e) => setObservations(e.target.value)}
                        />
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end pt-6 border-t gap-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                    Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
                    {loading ? "Processando..." : (isEdit ? "Salvar Alterações na Venda" : "Fechar Venda e Baixar Estoque")}
                </Button>
            </div>
        </form>
    )
}
