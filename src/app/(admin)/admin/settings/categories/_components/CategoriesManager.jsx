"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Loader2, Upload, Trash, Car, Plus, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { getCategories, createCategory, deleteCategory, updateCategory } from "@/actions/categories";

export function CategoriesManager({ initialCategories = [] }) {
    const [categories, setCategories] = useState(initialCategories);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [editingCat, setEditingCat] = useState(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const refreshList = async () => {
        const result = await getCategories();
        if (result.success) {
            setCategories(result.data);
        }
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

    const handleEdit = (cat) => {
        setEditingCat(cat);
        setValue("name", cat.name);
        setImagePreview(cat.imageUrl || null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setEditingCat(null);
        reset({ name: "" });
        setImagePreview(null);
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const payload = {
            name: data.name,
            imageBase64: imagePreview && !imagePreview.startsWith("http") ? imagePreview : null,
            imageUrl: imagePreview && imagePreview.startsWith("http") ? imagePreview : null,
        };

        let result;
        if (editingCat) {
            result = await updateCategory(editingCat.id, payload);
        } else {
            result = await createCategory(payload);
        }

        if (result.success) {
            toast.success(editingCat ? "Categoria atualizada!" : "Categoria criada com sucesso!");
            handleCancelEdit();
            refreshList();
        } else {
            toast.error(result.error || "Erro ao salvar categoria");
        }
        setIsSubmitting(false);
    };

    const handleDelete = async (id) => {
        if (confirm("Tem certeza que deseja deletar?")) {
            const result = await deleteCategory(id);
            if (result.success) {
                toast.success("Categoria deletada!");
                refreshList();
            } else {
                toast.error("Erro ao deletar categoria");
            }
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>{editingCat ? "Editar Categoria" : "Nova Categoria"}</CardTitle>
                    <CardDescription>{editingCat ? "Modifique o nome ou a imagem desta categoria." : "Adicione uma nova categoria de veículo (ex: Carro, Moto, Náutico)"}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome da Categoria</Label>
                            <Input id="name" {...register("name", { required: "Nome é obrigatório" })} placeholder="Ex: Carro" />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <Label>Imagem (Para Carrosséis/Banners)</Label>
                            {imagePreview ? (
                                <div className="relative inline-block">
                                    <img src={imagePreview} alt="Preview" className="h-32 object-contain rounded-md border p-2" />
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
                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</> : editingCat ? <><Pencil className="mr-2 h-4 w-4" /> Atualizar</> : <><Plus className="mr-2 h-4 w-4" /> Adicionar Categoria</>}
                            </Button>
                            {editingCat && (
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
                    <CardTitle>Categorias Cadastradas</CardTitle>
                </CardHeader>
                <CardContent>
                    {categories.length === 0 ? (
                        <p className="text-sm text-gray-500">Nenhuma categoria encontrada.</p>
                    ) : (
                        <div className="space-y-4">
                            {categories.map((cat) => (
                                <div key={cat.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                                    <div className="flex items-center space-x-4">
                                        {cat.imageUrl ? (
                                            <img src={cat.imageUrl} alt={cat.name} className="h-10 w-10 rounded object-cover border" />
                                        ) : (
                                            <div className="h-10 w-10 flex items-center justify-center bg-slate-100 rounded border">
                                                <Car className="h-5 w-5 text-slate-400" />
                                            </div>
                                        )}
                                        <span className="font-semibold text-slate-700">{cat.name}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" onClick={() => handleEdit(cat)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
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
