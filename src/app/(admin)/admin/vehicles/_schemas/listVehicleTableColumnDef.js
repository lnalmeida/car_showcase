import {
  ArrowUpDown,
  ChevronDown,
  Plus,
  Search,
  MoreHorizontal,
  Star,
  StarOff,
  Loader2,
  Car,
  Eye,
  Trash,
  Pencil,
  Stamp,
  PencilOff,
} from "lucide-react";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

import { getVehicles, removeVehicle, updateVehicle } from "@/actions/vehicles";

import { Badge } from "@/components/ui/badge";

const setBadgeStatusColor = (status) => {
  switch (status) {
    case "Disponível":
      return {
        variant: "success",
        badgeColor: "bg-green-500 font-semibold text-white",
      };
    case "Vendido":
      return {
        variant: "danger",
        badgeColor: "bg-red-500 font-semibold text-white",
      };
    case "Reservado":
      return {
        variant: "warning",
        badgeColor: "bg-yellow-500 font-semibold text-white ",
      };
  }
};

export const getColumns = ({
  onUpdateFeatured,
  onUpdateStatus,
  onEdit,
  onDelete,
  isMounted,
}) => [
  {
    accessorKey: "images",
    header: "Foto",
    displayName: "Foto",
    cell: ({ row }) => {
      const images = row.getValue("images");
      const src = Array.isArray(images) && images.length > 0 ? images[0] : null;

      return src ? (
        <Image
          src={src}
          alt="Thumbnail"
          width={50}
          height={50}
          className="h-14 w-14 rounded-lg"
        />
      ) : (
        <Car className="h-14 w-14 text-gray-400" />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vehicleType",
    header: "Tipo",
    displayName: "Tipo",
  },
  {
    accessorKey: "vehicleBrand",
    header: "Marca",
    displayName: "Marca",
  },
  {
    accessorKey: "model",
    header: "Modelo",
    displayName: "Modelo",
  },
  {
    accessorKey: "year",
    displayName: "Ano",
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
    displayName: "Preço",
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
    displayName: "Cor",
    header: "Cor",
  },
  {
    accessorKey: "engineSize",
    displayName: "Motor",
    header: "Motor",
  },
  {
    accessorKey: "mileage",
    displayName: "Odômetro",
    header: "Odômetro",
    cell: ({ row }) => `${row.getValue("mileage")} km`,
  },
  {
    accessorKey: "fuelType",
    displayName: "Combustível",
    header: "Combustível",
  },
  {
    accessorKey: "transmission",
    displayName: "Câmbio",
    header: "Câmbio",
  },
  {
    accessorKey: "status",
    displayName: "Status",
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

      return (
        <Badge
          className={setBadgeStatusColor(value).badgeColor}
          variant={setBadgeStatusColor(value).variant}
        >
          {value}
        </Badge>
      );
    },
  },

  {
    accessorKey: "featured",
    displayName: "Destaque?",
    header: "Destaque?",
    cell: ({ row }) => {
      const vehicle = row.original;
      const vehicleFeatured = row.getValue("featured");
      const vehicleStatus = row.getValue("status");
      return vehicleStatus === "Disponível" ? (
        <Star
          onClick={() => onUpdateFeatured(vehicle)}
          className={`inline-block h-4 w-4 cursor-pointer text-center ${
            vehicleFeatured
              ? "text-yellow-300 fill-current"
              : "text-muted-foreground"
          }`}
        />
      ) : (
        <StarOff
          disabled
          className="cursor-not-allowed inline-block h-4 w-4  text-muted-300 text-center"
        />
      );
    },
  },

  {
    id: "actions",
    displayName: "Ações",
    header: "Ações",
    cell: ({ row }) => {
      const vehicle = row.original;

      if (!isMounted) {
        // Pode retornar um esqueleto de botão ou simplesmente null
        return (
          <Button disabled variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        );
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="flex items-center gap-2 cursor-none">
                <Car className="h-6 w-6 mr-2" />
                Veículos
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-300" />

              <DropdownMenuItem
                className="cursor-pointer
                text-gray-500
                font-normal
                focus:bg-gray-100
                focus:text-gray-700
                hover:bg-gray-100
                hover:text-gray-700
                hover:font-semibold"
              >
                <Eye className="h-5 w-5 mr-1 text-muted-200" />
                Visualizar
              </DropdownMenuItem>

              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger
                    disabled={vehicle.status === "Vendido"}
                    className={`
                    text-gray-500
                    font-normal
                    focus:bg-gray-100
                    focus:text-gray-700
                    hover:bg-gray-100
                    hover:text-gray-700
                    hover:font-semibold
                    ${
                      vehicle.status === "Vendido"
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <Stamp className="h-5 w-5 mr-1 text-muted-200" />
                    Status
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      className="cursor-pointer
                      text-gray-500
                      font-normal
                      focus:bg-gray-100
                      focus:text-gray-700
                      hover:bg-gray-100
                      hover:text-gray-700
                      hover:font-semibold"
                      onClick={() => onUpdateStatus(vehicle, "Disponível")}
                    >
                      Disponível
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer
                      text-gray-500
                      font-normal
                      focus:bg-gray-100
                      focus:text-gray-700
                      hover:bg-gray-100
                      hover:text-gray-700
                      hover:font-semibold"
                      onClick={() => onUpdateStatus(vehicle, "Vendido")}
                    >
                      Vendido
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer
                      text-gray-500
                      font-normal
                      focus:bg-gray-100
                      focus:text-gray-700
                      hover:bg-gray-100
                      hover:text-gray-700
                      hover:font-semibold"
                      onClick={() => onUpdateStatus(vehicle, "Reservado")}
                    >
                      Reservado
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              <DropdownMenuItem
                className="cursor-pointer
                text-red-500
                font-normal
                focus:bg-red-100
                focus:text-red-700
                hover:bg-red-100
                hover:text-red-700
                hover:font-semibold "
                onClick={() => onDelete(vehicle)}
              >
                <Trash className="h-4 w-4 mr-1" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];

// ];
