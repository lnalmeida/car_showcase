import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getOptionsFromEnum(enumObj, labelsObj) {
  if (!enumObj) throw new Error("Enum object is undefined!");
  return Object.keys(enumObj).map((value) => ({
    value,
    label: labelsObj[value] || value,
  }));
}

export const formatCurrency = (value) => {
  const cleanedValue = value.replace(/\D/g, "");
  const parsedValue = parseFloat(cleanedValue);
  const formattedValue = parsedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formattedValue;
};

// Converte centavos para formato de exibição (ex: 12345 -> "123,45")
export const formatCentsToDisplay = (cents) => {
  const reais = Math.floor(cents / 100);
  const centavos = cents % 100;

  const reaisFormatted = reais.toLocaleString("pt-BR");
  return `${reaisFormatted},${centavos.toString().padStart(2, "0")}`;
};

// Converte centavos para decimal (ex: 12345 -> 123.45)
export const centsToDecimal = (cents) => {
  return cents / 100;
};
