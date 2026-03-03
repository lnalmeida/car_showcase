"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Loader2, Upload, Trash, Shapes, Plus, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { getVehicleTypes, createVehicleType, deleteVehicleType, updateVehicleType } from "@/actions/vehicleTypes";
import { getCategories } from "@/actions/categories";

export default function VehicleTypesPage() {
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [editingType, setEditingType] = useState(null);

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
    const selectedCategory = watch("categoryId");

    const fetchData = async () => {
        setLoading(true);
        const [typesRes, categoriesRes] = await Promise.all([
            getVehicleTypes(), getCategories()
        ]);
        if (typesRes.success) setTypes(typesRes.data);
        if (categoriesRes.success) setCategories(categoriesRes.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            if (file.size > 1024 * 1024 * 5) {
                toast.error("O arquivo deve ter menos de 5MB");
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
        maxFiles: 1,
    });

    const handleEdit = (type) => {
        setEditingType(type);
        setValue("name", type.name);
        setValue("categoryId", type.categoryId);
        setImagePreview(type.imageUrl || null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setEditingType(null);
        reset({ name: "", categoryId: "" });
        setImagePreview(null);
    };

    const onSubmit = async (data) => {
        if (!data.categoryId) {
            toast.error("Selecione uma categoria");
            return;
        }
        setIsSubmitting(true);
        const payload = {
            name: data.name,
            categoryId: data.categoryId,
            imageBase64: imagePreview && !imagePreview.startsWith("http") ? imagePreview : null,
            imageUrl: imagePreview && imagePreview.startsWith("http") ? imagePreview : null,
        };

        let result;
        if (editingType) {
            result = await updateVehicleType(editingType.id, payload);
        } else {
            result = await createVehicleType(payload);
        }

        if (result.success) {
            toast.success(editingType ? "Tipo atualizado!" : "Tipo criado com sucesso!");
            handleCancelEdit();
            fetchData();
        } else {
            toast.error(result.error || "Erro ao salvar tipo");
        }
        setIsSubmitting(false);
    };

    const handleDelete = async (id) => {
        if (confirm("Tem certeza que deseja deletar?")) {
            const result = await deleteVehicleType(id);
            if (result.success) {
                toast.success("Tipo deletado!");
                fetchData();
            } else {
                toast.error("Erro ao deletar tipo");
            }
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>{editingType ? "Editar Tipo" : "Novo Tipo de Veículo"}</CardTitle>
                    <CardDescription>{editingType ? "Modifique o nome ou a categoria vinculada." : "Adicione um novo tipo de carroceria ou design (ex: SUV para Carro, Naked para Moto)"}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="categoryId">Categoria</Label>
                            <Select value={selectedCategory} onValueChange={(val) => setValue("categoryId", val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Nome do Tipo</Label>
                            <Input id="name" {...register("name", { required: "Nome é obrigatório" })} placeholder="Ex: SUV" />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <Label>Imagem Ilustrativa (Opcional - Usada em filtros da HomePage)</Label>
                            {imagePreview ? (
                                <div className="relative inline-block">
                                    <img src={imagePreview} alt="Preview" className="h-24 object-contain rounded-md border p-2 bg-white" />
                                    <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={() => setImagePreview(null)}>
                                        <Trash className="h-3 w-3" />
                                    </Button>
                                </div>
                            ) : (
                                <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition">
                                    <input {...getInputProps()} />
                                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">Arraste ou clique para enviar foto</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={isSubmitting} className="w-full">
                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</> : editingType ? <><Pencil className="mr-2 h-4 w-4" /> Atualizar</> : <><Plus className="mr-2 h-4 w-4" /> Adicionar Tipo</>}
                            </Button>
                            {editingType && (
                                <Button type="button" variant="outline" onClick={handleCancelEdit} disabled={isSubmitting}>
                                    <X className="mr-2 h-4 w-4" /> Cancelar
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Tipos Cadastrados</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>
                    ) : types.length === 0 ? (
                        <p className="text-sm text-gray-500">Nenhum tipo encontrado.</p>
                    ) : (
                        <div className="space-y-4">
                            {types.map((type) => (
                                <div key={type.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                                    <div className="flex items-center space-x-4">
                                        {type.imageUrl ? (
                                            <img src={type.imageUrl} alt={type.name} className="h-10 w-10 object-contain" />
                                        ) : (
                                            <div className="h-10 w-10 flex items-center justify-center bg-slate-100 rounded border">
                                                <Shapes className="h-5 w-5 text-slate-400" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-slate-700">{type.name}</p>
                                            <p className="text-xs text-slate-500">{type.category?.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" onClick={() => handleEdit(type)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(type.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
