import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "images",
    header: "Foto",
    cell: ({ row }) => {
      const images = row.getValue("images");
      const src = Array.isArray(images) && images.length > 0 ? images[0] : null;

      return src ? (
        <Image
          src={src}
          alt="Thumbnail"
          width={50}
          height={50}
          className="rounded object-cover border"
        />
      ) : (
        <span className="text-xs text-muted-foreground">Sem imagem</span>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vehicleType",
    header: "Tipo",
  },
  {
    accessorKey: "vehicleBrand",
    header: "Marca",
  },
  {
    accessorKey: "model",
    header: "Modelo",
  },
  {
    accessorKey: "year",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ano
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Preço
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("price"));
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
  },
  {
    accessorKey: "color",
    header: "Cor",
  },
  {
    accessorKey: "engineSize",
    header: "Motor",
  },
  {
    accessorKey: "mileage",
    header: "Odômetro",
    cell: ({ row }) => `${row.getValue("mileage")} km`,
  },
  {
    accessorKey: "fuelType",
    header: "Combustível",
  },
  {
    accessorKey: "transmission",
    header: "Câmbio",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("status");
      switch (value) {
        case "Reservado":
          return (
            <Badge className="bg-yellow-600 text-white px-2" variant="warning">
              Reservado
            </Badge>
          );
        case "Vendido":
          return (
            <Badge className="bg-red-600 text-white px-2" variant="danger">
              Vendido
            </Badge>
          );
        default:
          return (
            <Badge className="bg-green-600 text-white px-2" variant="success">
              Disponível
            </Badge>
          );
      }
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const vehicle = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(vehicle.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// ];
