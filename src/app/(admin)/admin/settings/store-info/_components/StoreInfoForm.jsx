"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertDealershipInfo } from "@/actions/dealership";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Store, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export function StoreInfoForm({ initialData }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        phone: initialData?.phone || "",
        email: initialData?.email || "",
        website: initialData?.website || "",
        address: initialData?.address || "",
        socialMedia: initialData?.socialMedia || "",
        facebookUrl: initialData?.facebookUrl || "",
        instagramUrl: initialData?.instagramUrl || "",
        tiktokUrl: initialData?.tiktokUrl || "",
        description: initialData?.description || "",
        logoUrl: initialData?.logoUrl || "",
        imageBase64: null,
    });

    const [previewImage, setPreviewImage] = useState(initialData?.logoUrl || "");

    const formatPhone = (value) => {
        if (!value) return "";
        const numbers = value.replace(/\D/g, "");
        if (numbers.length <= 10) {
            return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
        } else {
            return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;

        if (name === "phone") {
            finalValue = formatPhone(value);
        }

        setFormData((prev) => ({ ...prev, [name]: finalValue }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Por favor, selecione um arquivo de imagem.");
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                toast.error("A imagem deve ter no máximo 2MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setPreviewImage(base64String);
                setFormData((prev) => ({ ...prev, imageBase64: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        startTransition(async () => {
            try {
                const result = await upsertDealershipInfo(formData);

                if (result.success) {
                    toast.success("Informações da loja atualizadas com sucesso!");
                    router.refresh();
                } else {
                    toast.error(result.error);
                }
            } catch (error) {
                toast.error("Ocorreu um erro ao salvar as informações.");
            }
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded-lg border shadow-sm max-w-4xl">
            <div className="flex items-center gap-3 border-b pb-4">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-md">
                    <Store className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">Configurações da Loja</h2>
                    <p className="text-sm text-gray-500">Estas informações ficarão disponíveis como detalhes do Vendedor pelos clientes.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lado Esquerdo - Campos de Texto */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome da Loja</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Ex: JF Veículos"
                            disabled={isPending}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Telefone / WhatsApp</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Ex: (21) 99999-9999"
                            disabled={isPending}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail de Contato</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Ex: contato@loja.com"
                            disabled={isPending}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Endereço Completo</Label>
                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Ex: Av. Brizola, 1900 - Centro, RJ"
                            disabled={isPending}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="instagramUrl">Instagram (URL)</Label>
                            <Input
                                id="instagramUrl"
                                name="instagramUrl"
                                value={formData.instagramUrl}
                                onChange={handleInputChange}
                                placeholder="https://instagram.com/perfil"
                                disabled={isPending}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="facebookUrl">Facebook (URL)</Label>
                            <Input
                                id="facebookUrl"
                                name="facebookUrl"
                                value={formData.facebookUrl}
                                onChange={handleInputChange}
                                placeholder="https://facebook.com/perfil"
                                disabled={isPending}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tiktokUrl">TikTok (URL)</Label>
                            <Input
                                id="tiktokUrl"
                                name="tiktokUrl"
                                value={formData.tiktokUrl}
                                onChange={handleInputChange}
                                placeholder="https://tiktok.com/@perfil"
                                disabled={isPending}
                            />
                        </div>
                    </div>
                </div>

                {/* Lado Direito - Logo e Descrição */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Logotipo da Loja</Label>

                        <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg bg-slate-50 relative group">
                            <div className="relative w-32 h-32 rounded-lg overflow-hidden border bg-white flex items-center justify-center">
                                {previewImage ? (
                                    <Image
                                        src={previewImage}
                                        alt="Logo da Loja"
                                        fill
                                        className="object-contain p-2"
                                    />
                                ) : (
                                    <ImageIcon className="w-8 h-8 text-slate-300" />
                                )}
                            </div>

                            <Label
                                htmlFor="logo-upload"
                                className="mt-4 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full max-w-[200px]"
                            >
                                {previewImage ? "Trocar Logotipo" : "Fazer Upload de Logo"}
                                <Input
                                    id="logo-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    disabled={isPending}
                                />
                            </Label>
                            <div className="mt-2 text-center flex items-center justify-center flex-col">
                                <p className="text-xs text-slate-400">Dimensão ideal: <strong>160x60px</strong>.</p>
                                <p className="text-xs text-slate-400">PNG transparente de até 2MB.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição Pública / Slogan</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Escreva um breve resumo da sua loja para aparecer no rodapé do site ou área de contatos..."
                            rows={4}
                            disabled={isPending}
                            className="resize-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
                <Button type="submit" disabled={isPending} className="w-full md:w-auto min-w-[150px]">
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Salvando...
                        </>
                    ) : (
                        "Salvar Informações"
                    )}
                </Button>
            </div>
        </form>
    );
}
