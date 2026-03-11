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
  const cleanedValue = value.toString().replace(/\D/g, "");
  const parsedValue = !isNaN(cleanedValue) ? Number(cleanedValue) : 0;
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

export const fileToBase64 = async (file) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer.toString("base64");
};

export const maskCPFCNPJ = (value) => {
  const v = value.replace(/\D/g, "");
  if (v.length <= 11) {
    return v
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    return v
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
};

export const maskPhone = (value) => {
  const v = value.replace(/\D/g, "");
  if (v.length <= 10) {
    return v
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    return v
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }
};

export const unmask = (value) => {
  return value ? value.replace(/\D/g, "") : "";
};

export const maskCurrency = (value) => {
  const v = value.toString().replace(/\D/g, "");
  const amount = parseFloat(v) / 100;
  if (isNaN(amount)) return "";
  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const unmaskCurrency = (value) => {
  return value ? parseFloat(value.replace(/\D/g, "")) / 100 : 0;
};

/**
 * Deeply serializes an object, converting Decimal objects to Number
 * and Date objects to ISO strings. Useful for passing Prisma data
 * to Client Components.
 */
export function deepSerialize(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle Decimal.js (Prisma Decimal)
  if (typeof obj.toNumber === "function") {
    return obj.toNumber();
  }

  // Handle Date
  if (obj instanceof Date) {
    return obj.toISOString();
  }

  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(deepSerialize);
  }

  // Handle Object
  const serializedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      serializedObj[key] = deepSerialize(obj[key]);
    }
  }
  return serializedObj;
}
