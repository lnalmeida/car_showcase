import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { centsToDecimal, formatCentsToDisplay } from "@/lib/utils";

export const CurrencyInput = ({
  value = 0,
  onChange,
  placeholder = "0,00",
  ...props
}) => {
  // Inicializa com o valor formatado
  const [displayValue, setDisplayValue] = useState(() => {
    const cents = Math.round(value * 100);
    return formatCentsToDisplay(cents);
  });

  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    // Remove tudo exceto números
    const numbersOnly = inputValue.replace(/\D/g, "");

    // Limita a 10 dígitos (até 99.999.999,99)
    const limitedNumbers = numbersOnly.substring(0, 10);

    if (limitedNumbers === "") {
      setDisplayValue("0,00");
      if (onChange) onChange(0);
      return;
    }

    // Converte para número inteiro (centavos)
    const cents = parseInt(limitedNumbers, 10);

    // Formata para exibição
    const formatted = formatCentsToDisplay(cents);
    setDisplayValue(formatted);

    // Converte para decimal e chama onChange
    const decimalValue = centsToDecimal(cents);
    if (onChange) {
      onChange(decimalValue);
    }
  };

  const handleFocus = (e) => {
    // Move cursor para o final
    setTimeout(() => {
      const input = e.target;
      input.setSelectionRange(input.value.length, input.value.length);
    }, 0);
  };

  const handleKeyDown = (e) => {
    // Permite backspace, delete, tab, escape, enter
    if (
      [8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
      // Permite Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true)
    ) {
      return;
    }

    // Permite apenas números
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
        R$
      </div>
      <Input
        {...props}
        ref={inputRef}
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
};
