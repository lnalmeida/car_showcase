import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  FileText,
} from "lucide-react";

export const getColumns = ({
  onViewDetails,
  onEdit,
  onDelete,
  isMounted,
}) => [
    {
      accessorKey: "saleDate",
      displayName: "Data",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("saleDate"));
        return <div className="ml-4 font-medium">{date.toLocaleDateString('pt-BR')}</div>;
      },
    },
    {
      accessorKey: "buyerName",
      displayName: "Comprador",
      header: "Comprador",
    },
    {
      id: "vehicle_model",
      displayName: "Veículo",
      header: "Veículo",
      cell: ({ row }) => {
        const sale = row.original;
        const vehicle = sale.vehicle;
        return (
          <div className="flex items-center gap-3 py-1">
            <div className="relative h-12 w-16 overflow-hidden rounded-md border border-gray-200 bg-gray-100 flex-shrink-0">
              {vehicle?.images && vehicle.images.length > 0 ? (
                <Image
                  src={vehicle.images[0]}
                  alt={vehicle.model || "Veículo"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  <Car className="h-5 w-5" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">
                {vehicle?.brand?.name} {vehicle?.model}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Placa: <span className="uppercase text-gray-700">{vehicle?.plate || "N/A"}</span>
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "saleValue",
      displayName: "Valor",
      header: "Valor de Venda",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("saleValue"));
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(amount);
        return <div className="font-bold text-blue-600">{formatted}</div>;
      },
    },
    {
      id: "actions",
      displayName: "Ações",
      header: "Ações",
      cell: ({ row }) => {
        const sale = row.original;
        const vehicle = sale.vehicle;

        if (!isMounted || !vehicle) {
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
                  <Stamp className="h-5 w-5 mr-2" />
                  Gestão CRM
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-300" />

                <DropdownMenuItem
                  onClick={() => onViewDetails(sale)}
                  className="cursor-pointer text-blue-600 font-medium focus:bg-blue-50 focus:text-blue-700"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Visualizar Venda
                </DropdownMenuItem>

                {/* Edição de Venda com Trava de Entrega */}
                {!sale.deliveryDate ? (
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href={`/admin/sales/edit/${sale.id}`} className="flex items-center w-full">
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar Venda
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem disabled className="cursor-not-allowed opacity-50">
                    <div className="flex items-center w-full">
                      <PencilOff className="h-4 w-4 mr-2" />
                      Venda Entregue (Bloqueada)
                    </div>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground uppercase tracking-wider px-2 py-1">
                  Anúncio & Cadastro
                </DropdownMenuLabel>

                <DropdownMenuItem className="cursor-pointer">
                  <Link href={`/vehicles/${vehicle.id}`} className="flex items-center w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver no Site
                  </Link>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
