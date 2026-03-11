"use client";

import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import {
  carFuelTypeOptions,
  motorcycleFuelTypeOptions,
  carTransmissionTypeOptions,
  motorcycleTransmissionTypeOptions,
  statusOptions,
} from "../_constants/constants";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { CurrencyInput } from "@/components/CurrencyInput";
import { TagsInput } from "@/components/TagInput";
import { vehicleSchema } from "../_schemas/vehicleSchema";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";

import { toast } from "sonner";
import { Upload, Trash, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import { getVehicle, updateVehicleComplete } from "@/actions/vehicles";
import { getCategories } from "@/actions/categories";
import { getBrands } from "@/actions/brands";
import { getVehicleTypes } from "@/actions/vehicleTypes";

const EditVehicleForm = ({ vehicleId }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dbCategories, setDbCategories] = useState([]);
  const [dbBrands, setDbBrands] = useState([]);
  const [dbTypes, setDbTypes] = useState([]);

  // Estado local para os dados do veículo (substituindo react-query)
  const [vehicleData, setVehicleData] = useState(null);
  const [loadingVehicle, setLoadingVehicle] = useState(true);
  const [vehicleError, setVehicleError] = useState(null);

  useEffect(() => {
    async function fetchOptions() {
      const [catRes, brandRes, typeRes] = await Promise.all([
        getCategories(), getBrands(), getVehicleTypes()
      ]);
      if (catRes.success) setDbCategories(catRes.data);
      if (brandRes.success) setDbBrands(brandRes.data);
      if (typeRes.success) setDbTypes(typeRes.data);
      setIsLoading(false);
    }
    fetchOptions();
  }, []);

  const router = useRouter();

  const vehiclesFormSchema = vehicleSchema;

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(vehiclesFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    async function fetchVehicle() {
      if (!vehicleId) return;
      try {
        setLoadingVehicle(true);
        console.log("Fetching vehicle data for edit:", vehicleId);
        const result = await getVehicle(vehicleId);
        console.log("Fetch result in edit form:", result);
        if (!result.success) {
          throw new Error(result.error || "Erro ao carregar veículo");
        }
        setVehicleData(result.data);

        const data = result.data;
        // Pre-populando os dados no form
        const formData = {
          categoryId: data.categoryId || "",
          typeId: data.typeId || "",
          brandId: data.brandId || "",
          model: data.model || "",
          year: data.year?.toString() || "",
          price: parseFloat(data.price) || 0,
          color: data.color || "",
          featured: data.featured || false,
          seats: data.seats || 5,
          doors: data.doors || 4,
          engineSize: data.engineSize || "",
          mileage: data.mileage || 0,
          fuelType: data.fuelType || "Gasolina",
          transmission: data.transmission || "Manual",
          description: data.description || "",
          optionals: data.optionals || [],
          vehicleStatus: data.status || "Disponível",
        };

        reset(formData);
        setUploadedImages(data.images || []);
      } catch (err) {
        setVehicleError(err);
      } finally {
        setLoadingVehicle(false);
      }
    }
    fetchVehicle();
  }, [vehicleId, reset]);

  const {
    data: updateVehicleResult,
    loading: updateVehicleLoading,
    fn: updateVehicleFn,
  } = useFetch(updateVehicleComplete);

  useEffect(() => {
    if (updateVehicleResult?.success) {
      toast.success("Veículo atualizado com sucesso!");
      router.back();
    }
  }, [updateVehicleResult?.success, updateVehicleLoading, router]);

  const onSubmit = async (data) => {
    if (uploadedImages.length === 0) {
      setImageError("Por favor, selecione ao menos uma imagem");
      return;
    }

    const formData = new FormData();
    formData.append("vehicleId", vehicleId);
    formData.append("vehicleData", JSON.stringify(data));
    uploadedImages.forEach((img) => formData.append("images", img));

    await updateVehicleFn(formData);
  };

  const onMultiImagesDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    try {
      const options = {
        maxSizeMB: 1, // Max file size in MB
        maxWidthOrHeight: 1920, // Max dimension
        useWebWorker: true, // Use multi-threading
      };

      const compressedFilesPromises = acceptedFiles.map(async (file) => {
        try {
          // Comprime o arquivo usando browser-image-compression
          const compressedFile = await imageCompression(file, options);
          return compressedFile;
        } catch (error) {
          console.error("Erro na compressão de imagem");
          toast.error(`Falha ao comprimir a imagem ${file.name}, usando original se for menor que 5MB`);
          return file.size <= 1024 * 1024 * 5 ? file : null;
        }
      });

      const processedFiles = (await Promise.all(compressedFilesPromises)).filter(Boolean);

      // Verifica limite final (segurança extra)
      const validFiles = processedFiles.filter((file) => {
        if (file.size > 1024 * 1024 * 5) {
          toast.error(
            `A imagem excedeu o limite de 5MB mesmo após compressão e foi descartada.`
          );
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      const imagePromises = validFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject("Erro ao ler o arquivo");
            reader.readAsDataURL(file);
          })
      );

      const newImages = await Promise.all(imagePromises);
      setUploadedImages((prev) => [...prev, ...newImages]);
      setImageError("");
      toast.success(`${newImages.length} imagem(ns) otimizadas e carregadas com sucesso!`);
    } catch (err) {
      toast.error("Erro ao carregar uma ou mais imagens.");
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  const {
    getRootProps: getMultiImageRootProps,
    getInputProps: getMultiImageInputProps,
  } = useDropzone({
    onDrop: onMultiImagesDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
  });

  if (loadingVehicle || isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando dados do veículo...</span>
      </div>
    );
  }

  if (vehicleError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">Erro ao carregar veículo</h3>
          <p className="text-red-600 text-sm mt-1">
            {vehicleError.message || "Veículo não encontrado"}
          </p>
          <Button
            variant="outline"
            className="mt-3"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Editar Detalhes do Veículo</CardTitle>
          <CardDescription>
            Atualize as informações do veículo {vehicleData?.vehicleBrand} {vehicleData?.model} {vehicleData?.year}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-5 md:flex-row flex-wrap">
                <div className="flex flex-col gap-5 justify-center w-[180px]">
                  <Label htmlFor="categoryId">Categoria</Label>
                  <Select
                    value={watch("categoryId")}
                    onValueChange={(value) => {
                      setValue("categoryId", value);
                      setValue("brandId", "");
                      setValue("typeId", "");
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {dbCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && (
                    <span className="text-red-500 text-sm">
                      {errors.categoryId.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="brandId" className="mt-2">
                    Marca
                  </Label>
                  <Select
                    value={watch("brandId") ?? ""}
                    onValueChange={(value) => setValue("brandId", value)}
                    disabled={!watch("categoryId")}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {dbBrands.filter(b => b.categoryId === watch("categoryId")).map(b => (
                        <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.brandId && (
                    <span className="text-red-500 text-sm">
                      {errors.brandId.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-5 md:flex-row flex-wrap">
                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="typeId" className="mt-2">
                    Tipo
                  </Label>
                  <Select
                    value={watch("typeId") ?? ""}
                    onValueChange={(value) => setValue("typeId", value)}
                    disabled={!watch("categoryId")}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {dbTypes.filter(t => t.categoryId === watch("categoryId")).map(t => (
                        <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.typeId && (
                    <span className="text-red-500 text-sm">
                      {errors.typeId.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="model" className="mt-2">
                    Modelo
                  </Label>
                  <Input
                    id="model"
                    type="text"
                    {...register("model")}
                    placeholder="Modelo do veículo..."
                    error={errors.model?.message}
                  />
                  {errors.model && (
                    <span className="text-red-500 text-sm">
                      {errors.model.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-5 md:flex-row flex-wrap">
                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="year" className="mt-2">
                    Ano
                  </Label>
                  <Input
                    type="text"
                    id="year"
                    {...register("year")}
                    placeholder="Ano do veículo..."
                    error={errors.year?.message}
                    className="w-25"
                  />
                  {errors.year && (
                    <span className="text-red-500 text-sm">
                      {errors.year.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="color" className="mt-2">
                    Cor
                  </Label>
                  <Input
                    id="color"
                    {...register("color")}
                    placeholder="Cor do veículo..."
                    error={errors.color?.message}
                  />
                  {errors.color && (
                    <span className="text-red-500 text-sm">
                      {errors.color.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-5 md:flex-row flex-wrap">
                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="plate" className="mt-2">
                    Placa
                  </Label>
                  <Input
                    type="text"
                    id="plate"
                    {...register("plate", {
                      onChange: (e) => {
                        e.target.value = e.target.value.toUpperCase();
                      }
                    })}
                    placeholder="Ex: ABC1234..."
                    error={errors.plate?.message}
                  />
                  {errors.plate && (
                    <span className="text-red-500 text-sm">
                      {errors.plate.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="seats" className="mt-2">
                    Nº de Assentos
                  </Label>
                  <Input
                    type="text"
                    id="seats"
                    {...register("seats", { valueAsNumber: true })}
                    error={errors.seats?.message}
                  />
                  {errors.seats && (
                    <span className="text-red-500 text-sm">
                      {errors.seats.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="doors" className="mt-2">
                    Nº de Portas
                  </Label>
                  <Input
                    type="text"
                    id="doors"
                    {...register("doors", { valueAsNumber: true })}
                    error={errors.doors?.message}
                  />
                  {errors.doors && (
                    <span className="text-red-500 text-sm">
                      {errors.doors.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-5 md:flex-row flex-wrap">
                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="engineSize" className="mt-2">
                    Motorização
                  </Label>
                  <Input
                    id="engineSize"
                    {...register("engineSize")}
                    placeholder="Digite a motorização..."
                    error={errors.engineSize?.message}
                  />
                  {errors.engineSize && (
                    <span className="text-red-500 text-sm">
                      {errors.engineSize.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="transmission" className="mt-2">
                    Transmissão
                  </Label>
                  <Select
                    value={watch("transmission")}
                    onValueChange={(value) => setValue("transmission", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Transmissão" />
                    </SelectTrigger>
                    <SelectContent>
                      {(dbCategories.find(c => c.id === watch("categoryId"))?.name !== "Moto")
                        ? carTransmissionTypeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))
                        : motorcycleTransmissionTypeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-5 md:flex-row flex-wrap">
                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="fuelType" className="mt-2">
                    Combustível
                  </Label>
                  <Select
                    value={watch("fuelType")}
                    onValueChange={(value) => setValue("fuelType", value)}
                  >
                    <SelectTrigger className="w-[195px]">
                      <SelectValue placeholder="Combustível" />
                    </SelectTrigger>
                    <SelectContent>
                      {(dbCategories.find(c => c.id === watch("categoryId"))?.name !== "Moto")
                        ? carFuelTypeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))
                        : motorcycleFuelTypeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="mileage" className="mt-2">
                    Quilometragem
                  </Label>
                  <Input
                    type="text"
                    id="mileage"
                    {...register("mileage", { valueAsNumber: true })}
                    placeholder="Digite a Quilometragem..."
                    className="w-[180px]"
                    error={errors.mileage?.message}
                  />
                  {errors.mileage && (
                    <span className="text-red-500 text-sm">
                      {errors.mileage.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-5 md:flex-row flex-wrap">
                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="price">Preço</Label>
                  <CurrencyInput
                    id="price"
                    value={watch("price") ?? 0}
                    onChange={(value) => setValue("price", value)}
                    placeholder="Digite o preço do veículo..."
                    error={errors.price?.message}
                  />
                  {errors.price && (
                    <span className="text-red-500 text-sm">
                      {errors.price.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="vehicleStatus">Status</Label>
                  <Select
                    value={watch("vehicleStatus")}
                    onValueChange={(value) => setValue("vehicleStatus", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-start flex-col gap-5 w-full md:flex-row">
                <div className="flex flex-col items-start md:flex-row justify-center space-y-2 space-x-2">
                  <Label htmlFor="featured" className="mt-3">
                    Colocar veículo em destaque na página principal?
                  </Label>
                  <div className="flex items-center">
                    <Switch
                      id="featured"
                      checked={watch("featured")}
                      onCheckedChange={(value) => setValue("featured", value)}
                      className="mr-2"
                    />
                    <span
                      className={
                        watch("featured")
                          ? "ml-3 font-semibold text-green-500"
                          : "ml-3 font-semibold text-red-500"
                      }
                    >
                      {watch("featured") ? "Sim" : "Não"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <Label htmlFor="description" className="mt-2">
                Descrição
              </Label>
              <Textarea
                id="description"
                rows={4}
                maxLength={1000}
                {...register("description")}
                placeholder="Descrição do veículo..."
                error={errors.description?.message}
                className="mt-2"
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
              <p className="text-xs text-muted-foreground">
                {watch("description")?.length || 0}/1000 caracteres
              </p>
            </div>

            <div>
              <Label htmlFor="optionals" className="mt-2">
                Opcionais
              </Label>
              <TagsInput
                id="optionals"
                className="mt-2"
                value={watch("optionals") ?? []}
                onChange={(value) => setValue("optionals", value)}
                placeholder="Adicione os opcionais do veículo..."
                maxTags={30}
              />
            </div>

            <div>
              <Label
                htmlFor="images"
                className={imageError ? "text-red-500" : ""}
              >
                Fotos {imageError && <span className="text-red-500">*</span>}
              </Label>
              <div
                {...getMultiImageRootProps()}
                className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100 transition ${imageError ? "border-red-500" : "border-gray-300"
                  }`}
              >
                <input {...getMultiImageInputProps()} />
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600">
                    Arraste e solte ou clique aqui para adicionar mais fotos.
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Somente arquivos JPEG, PNG, JPG ou WebP (Máx. 5MB/foto).
                  </p>
                </div>
              </div>

              {imageError && (
                <p className="text-red-500 text-sm mt-1">{imageError}</p>
              )}
            </div>

            {uploadedImages.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium text-sm mb-2">
                  Imagens ({uploadedImages.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image}
                        alt={`Imagem ${index + 1}`}
                        width={150}
                        height={150}
                        className="h-28 w-full object-cover rounded-md"
                        priority
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={updateVehicleLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={updateVehicleLoading}
                className="flex-1"
              >
                {updateVehicleLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Atualizando veículo...
                  </>
                ) : (
                  "Salvar alterações"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditVehicleForm;