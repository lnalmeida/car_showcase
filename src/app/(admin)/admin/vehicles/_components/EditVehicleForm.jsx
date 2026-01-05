"use client";

import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import {
  carBrandOptions,
  motorcycleBrandOptions,
  carTypeOptions,
  motorcycleTypeOptions,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { CustomSelect } from "@/components/CustomSelect";
import { CurrencyInput } from "@/components/CurrencyInput";
import { TagsInput } from "@/components/TagInput";
import { vehicleSchema } from "../_schemas/vehicleSchema";
import { useDropzone } from "react-dropzone";

import { toast } from "sonner";
import { Upload, Trash, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import { getVehicle, updateVehicleComplete } from "@/actions/vehicles";
import { useQuery } from "@tanstack/react-query";

const EditVehicleForm = ({ vehicleId }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  // Buscar dados do veículo
  const {
    data: vehicleData,
    isLoading: loadingVehicle,
    error: vehicleError,
  } = useQuery({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => {
      const result = await getVehicle(vehicleId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!vehicleId,
  });

  // Pré-popular o formulário quando os dados chegarem
  useEffect(() => {
    if (vehicleData) {
      const formData = {
        category: vehicleData.category || "Carro",
        vehicleType: vehicleData.vehicleType || "",
        vehicleBrand: vehicleData.vehicleBrand || "",
        model: vehicleData.model || "",
        year: vehicleData.year?.toString() || "",
        price: parseFloat(vehicleData.price) || 0,
        color: vehicleData.color || "",
        featured: vehicleData.featured || false,
        seats: vehicleData.seats || 5,
        doors: vehicleData.doors || 4,
        engineSize: vehicleData.engineSize || "",
        mileage: vehicleData.mileage || 0,
        fuelType: vehicleData.fuelType || "Gasolina",
        transmission: vehicleData.transmission || "Manual",
        description: vehicleData.description || "",
        optionals: vehicleData.optionals || [],
        vehicleStatus: vehicleData.status || "Disponível",
      };

      reset(formData);
      setUploadedImages(vehicleData.images || []);
      setIsLoading(false);
    }
  }, [vehicleData, reset]);

  const {
    data: updateVehicleResult,
    loading: updateVehicleLoading,
    fn: updateVehicleFn,
  } = useFetch(updateVehicleComplete);

  useEffect(() => {
    if (updateVehicleResult?.success) {
      toast.success("Veículo atualizado com sucesso!");
      router.push("/admin/vehicles");
    }
  }, [updateVehicleResult?.success, updateVehicleLoading, router]);

  const onSubmit = async (data) => {
    if (uploadedImages.length === 0) {
      setImageError("Por favor, selecione ao menos uma imagem");
      return;
    }

    const vehicleUpdateData = {
      vehicleId,
      vehicleData: data,
      images: uploadedImages,
    };
    await updateVehicleFn(vehicleUpdateData);
  };

  const onMultiImagesDrop = async (acceptedFiles) => {
    const validFiles = acceptedFiles.filter((file) => {
      if (file.size > 1024 * 1024 * 5) {
        toast.error(
          `O arquivo ${file.name} excedeu o limite de 5MB e sera descartado`
        );
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    try {
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
      toast.success(`${newImages.length} imagem(ns) carregada(s) com sucesso!`);
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
            onClick={() => router.push("/admin/vehicles")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para lista
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
          onClick={() => router.push("/admin/vehicles")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para lista
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
                  <Label htmlFor="category">Categoria</Label>
                  <RadioGroup
                    value={watch("category")}
                    onValueChange={(value) => {
                      setValue("category", value);
                    }}
                    className="flex text-gray-700 mb-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Carro" id="car" />
                      <Label htmlFor="car">Carro</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Moto" id="motorcycle" />
                      <Label htmlFor="motorcycle">Moto</Label>
                    </div>
                  </RadioGroup>
                  {errors.category && (
                    <span className="text-red-500 text-sm">
                      {errors.category.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="brand" className="mt-2">
                    Marca
                  </Label>
                  <CustomSelect
                    id="brand"
                    className="space-y-3"
                    options={
                      watch("category") === "Carro"
                        ? carBrandOptions
                        : motorcycleBrandOptions
                    }
                    value={watch("vehicleBrand") ?? ""}
                    onChange={(value) => {
                      setValue("vehicleBrand", value);
                    }}
                    placeholder="Marca"
                    name="vehicleBrand"
                  />
                  {errors.vehicleBrand && (
                    <span className="text-red-500 text-sm">
                      {errors.vehicleBrand.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-5 md:flex-row flex-wrap">
                <div className="space-y-2 flex flex-col w-[180px]">
                  <Label htmlFor="type" className="mt-2">
                    Tipo
                  </Label>
                  <CustomSelect
                    id="type"
                    options={
                      watch("category") === "Carro"
                        ? carTypeOptions
                        : motorcycleTypeOptions
                    }
                    value={watch("vehicleType") ?? ""}
                    onChange={(value) => {
                      setValue("vehicleType", value);
                    }}
                    placeholder="Tipo"
                    name="vehicleType"
                  />
                  {errors.vehicleType && (
                    <span className="text-red-500 text-sm">
                      {errors.vehicleType.message}
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
                      {watch("category") === "Carro"
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
                      {watch("category") === "Carro"
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
                className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100 transition ${
                  imageError ? "border-red-500" : "border-gray-300"
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
                onClick={() => router.push("/admin/vehicles")}
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