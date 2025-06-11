import { z } from "zod";

import {
  categoryOptions,
  fuelTypeOptions,
  statusOptions,
  transmissionTypeOptions,
} from "../_constants/constants";

export const vehicleSchema = z.object({
  id: z.string().uuid().optional(), // geralmente gerado pelo banco
  category: z.string().default("Carro"),
  vehicleType: z.string().min(1, "O tipo é obrigatório"),
  vehicleBrand: z.string().min(1, "A marca é obrigatória"),
  model: z.string().min(1, "O modelo é obrigatório"),
  year: z.string().refine((value) => {
    const year = parseInt(value);
    return !isNaN(year) && year >= 1900 && year <= new Date().getFullYear();
  }, "O ano deve ser um numero entre 1900 e o ano atual."),
  price: z
    .number()
    .refine((value) => value > 0, "O preço deve ser maior que zero")
    .default(0),
  color: z.string().min(3, "A cor é obrigatória"),
  featured: z.boolean().default(false),
  seats: z
    .number()
    .int()
    .optional()
    .refine(
      (seats) => seats >= 1,
      "O número de assentos deve ser maior ou igual a um"
    )
    .default(5),
  doors: z
    .number()
    .int()
    .optional()
    .refine(
      (doors) => doors >= 0,
      "O número de portas deve ser maior ou igual a zero"
    )
    .default(2),
  engineSize: z.string().min(3, "A motorização é obrigatória;"),
  mileage: z.number().int().default(0),
  fuelType: z.string().default("Gasolina"),
  transmission: z.string().default("Manual"),
  description: z
    .string()
    .min(1, "A descrição é obrigatória")
    .max(1000, "A descrição deve ter no máximo 1000 caracteres"),
  optionals: z.array(z.string()).default([]).optional(),
  vehicleStatus: z.string().default("Disponível"),
});

export const vehicleDefaultValues = {
  category: "Carro",
  vehicleType: "",
  vehicleBrand: "",
  model: "",
  year: "1900",
  price: 0,
  color: "",
  featured: false,
  seats: 5,
  doors: 4,
  engineSize: "",
  mileage: 0,
  fuelType: "Gasolina",
  transmission: "Manual",
  description: "",
  optionals: [],
  vehicleStatus: "Disponível",
};
