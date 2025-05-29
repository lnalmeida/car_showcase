"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Camera, Trash2, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const HomeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [searchImage, setSearchImage] = useState(null);
  const [isUploading, setUploading] = useState(false);

  const router = useRouter();

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error(
        "Por favor, digite uma marca ou modelo de veículo para pesquisar"
      );
      return;
    }

    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
  };
  const handleImageSearch = async (e) => {
    e.preventDefault();
    if (!searchImage) {
      toast.error("Por favor, selecione uma imagem");
      return;
    }

    // Logica da IA
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      if (file.size > 1024 * 1024 * 5) {
        toast.error("O arquivo deve ter menos de 5MB");
        return;
      }

      setUploading(true);
      setSearchImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setUploading(false);
        toast.success("Imagem carregada com sucesso!");
      };

      reader.onerror = () => {
        setUploading(false);
        toast.error("Ocorreu um erro ao carregar a imagem.");
      };

      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      maxFiles: 1,
    });

  return (
    <div>
      <form onSubmit={handleTextSubmit}>
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Busque por marca, modelo, ou use uma imagem e a IA irá encontrar carros semelhantes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-12 py-6 w-full rounded-full border-gray-300 bg-white/95 backdrop-blur-sm"
          />

          <div className="absolute right-[100px]">
            <Camera
              size={50}
              onClick={() => setIsImageSearchActive(!isImageSearchActive)}
              className="cursor-pointer rounded-xl p-1.5 ml-2 text-gray-400 hover:text-gray-500 transition duration-300"
              style={{
                background: isImageSearchActive ? "#F0F8FF" : "",
                color: isImageSearchActive ? "black" : "",
              }}
            />
          </div>

          <Button type="submit" className="absolute right-2 rounded-full">
            Buscar
          </Button>
        </div>
      </form>

      {isImageSearchActive && (
        <div className="mt-4">
          <form onSubmit={handleImageSearch}>
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center">
              {imagePreview ? (
                <div className="flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Car Preview"
                    className="h-40 object-contain mb-4"
                  />
                  <span className="relative top-0 right-7">
                    <Trash2
                      size={30}
                      onClick={() => {
                        setImagePreview("");
                        setSearchImage(null);
                        toast.info("Imagem removida!");
                      }}
                      className="cursor-pointer bg-transparent p-1.5 text-gray-500 rounded-full hover:text-red-500 bg-gray-200  transition duration-300"
                    />
                  </span>
                </div>
              ) : (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-400">
                      {isDragActive && !isDragReject
                        ? "Solte o arquivo aqui para enviar"
                        : "Arraste e solte a imagem do carro aqui para buscar carros semelhantes."}
                    </p>
                    {isDragReject && (
                      <p className="text-red-500 mb-2">
                        Tipo de arquivo inválido.
                      </p>
                    )}
                    <p className="text-gray-400 text-sm">
                      Somente arquivos JPEG, PNG ou JPG(Máx. 5MB).
                    </p>
                  </div>
                </div>
              )}
            </div>

            {imagePreview && (
              <Button
                type="submit"
                className="w-50 mt-4 p-6 rounded-md"
                disabled={isUploading}
              >
                {isUploading ? "Carregando..." : "Buscar carro usando a imagem"}
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
export default HomeSearch;
