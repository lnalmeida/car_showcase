"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Loader2, Upload, Trash, Tag, Plus, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getBrands, createBrand, deleteBrand, updateBrand } from "@/actions/brands";

export function BrandsManager({ initialBrands = [], categories = [] }) {
    const [brands, setBrands] = useState(initialBrands);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [editingBrand, setEditingBrand] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
    const selectedCategory = watch("categoryId");

    const refreshList = async () => {
        const res = await getBrands();
        if (res.success) setBrands(res.data);
    };

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

    const handleEdit = (brand) => {
        setEditingBrand(brand);
        setValue("name", brand.name);
        setValue("categoryId", brand.categoryId);
        setImagePreview(brand.imageUrl || null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setEditingBrand(null);
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
        if (editingBrand) {
            result = await updateBrand(editingBrand.id, payload);
        } else {
            result = await createBrand(payload);
        }

        if (result.success) {
            toast.success(editingBrand ? "Marca atualizada!" : "Marca criada com sucesso!");
            handleCancelEdit();
            refreshList();
        } else {
            toast.error(result.error || "Erro ao salvar marca");
        }
        setIsSubmitting(false);
    };

    const handleDelete = (id) => {
        setDeletingId(id);
    };

    const confirmDelete = async () => {
        if (!deletingId) return;
        const result = await deleteBrand(deletingId);
        if (result.success) {
            toast.success("Marca deletada!");
            refreshList();
        } else {
            toast.error("Erro ao deletar marca");
        }
        setDeletingId(null);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>{editingBrand ? "Editar Marca" : "Nova Marca"}</CardTitle>
                    <CardDescription>{editingBrand ? "Modifique o nome, logotipo ou a categoria vinculada." : "Adicione uma nova marca vinculada a uma categoria (ex: Honda em Carro ou Honda em Moto)"}</CardDescription>
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
                            <Label htmlFor="name">Nome da Marca</Label>
                            <Input id="name" {...register("name", { required: "Nome é obrigatório" })} placeholder="Ex: Honda" />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <Label>Logo da Marca (Opcional - Usada em carrosséis)</Label>
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
                                    <p className="text-sm text-gray-600">Arraste ou clique para enviar a logo</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={isSubmitting} className="w-full">
                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</> : editingBrand ? <><Pencil className="mr-2 h-4 w-4" /> Atualizar</> : <><Plus className="mr-2 h-4 w-4" /> Adicionar Marca</>}
                            </Button>
                            {editingBrand && (
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
                    <CardTitle>Marcas Cadastradas</CardTitle>
                </CardHeader>
                <CardContent>
                    {brands.length === 0 ? (
                        <p className="text-sm text-gray-500">Nenhuma marca encontrada.</p>
                    ) : (
                        <div className="space-y-4">
                            {brands.map((brand) => (
                                <div key={brand.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                                    <div className="flex items-center space-x-4">
                                        {brand.imageUrl ? (
                                            <img src={brand.imageUrl} alt={brand.name} className="h-10 w-10 object-contain" />
                                        ) : (
                                            <div className="h-10 w-10 flex items-center justify-center bg-slate-100 rounded border">
                                                <Tag className="h-5 w-5 text-slate-400" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-slate-700">{brand.name}</p>
                                            <p className="text-xs text-slate-500">{brand.category?.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" onClick={() => handleEdit(brand)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(brand.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Marca</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja excluir esta marca permanentemente?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={confirmDelete}
                        >
                            Excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
