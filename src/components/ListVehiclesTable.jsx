import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Label } from "./ui/label";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "../lib/utils";
import { vehicleSchema } from "../app/(admin)/admin/vehicles/_schemas/vehicleSchema";

const ListVehiclesTable = ({ vehicles }) => {
  return (
    <>
<Table>
        <TableHeader className="text-left">
          <TableRow className="space-x-10">
            <TableHead className="w-[150px]">Foto</TableHead>
            <TableHead className="w-[150px]">Marca</TableHead>
            <TableHead className="w-[150px]">Modelo</TableHead>
            <TableHead className="w-[150px]">Cor</TableHead>
            <TableHead className="w-[150px] text-center">Ano</TableHead>
            <TableHead className="text-right w-[150px]">Preço</TableHead>
            <TableHead className="w-[150px] text-center px-4">
              Destaque
            </TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map(vehicle => (

          <TableRow key={vehicle.id}>
            <TableCell className="font-medium">
              {vehicle.images?.[0] ? (
                <img
                  src={vehicle.images[0]}
                  alt={`${vehicle.vehicleBrand || ""} ${vehicle.model || ""}`}
                  className="h-20 w-20 rounded-md p-2 object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                  Sem foto
                </div>
              )}
            </TableCell>
            <TableCell>{vehicle.vehicleBrand}</TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell className="text-left">{vehicle.color}</TableCell>
            <TableCell className="text-center">{vehicle.year}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(vehicle.price)}
            </TableCell>
            <TableCell className="text-center">
              {vehicle.featured ? "Sim" : "Não"}
            </TableCell>
            <TableCell className="text-right">
              <Badge variant="secondary">{vehicle.status}</Badge>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
        <TableFooter className="p-2">
          <TableRow>teste</TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default ListVehiclesTable;
