import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { Input } from "./ui/input";

// Componente CustomSelect adaptado para React Hook Form
export const CustomSelect = ({
  options = [],
  value = "",
  onChange = () => {},
  placeholder = "Selecione ou digite...",
  name,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Atualiza o valor do input quando o value prop muda
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // Filtra opções baseado no input
  useEffect(() => {
    if (inputValue) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [inputValue, options]);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleOptionSelect = (option) => {
    setInputValue(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const exactMatch = filteredOptions.find(
        (option) => option.toLowerCase() === inputValue.toLowerCase()
      );
      if (exactMatch) {
        handleOptionSelect(exactMatch);
      } else {
        onChange(inputValue);
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const clearValue = () => {
    setInputValue("");
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          name={name}
          className={`w-full px-3 py-2 pr-20 border rounded-md ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {inputValue && (
            <button
              type="button"
              onClick={clearValue}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X size={16} className="text-gray-400" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronDown
              size={16}
              className={`text-gray-400 transform transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            <>
              {filteredOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                >
                  {option}
                </button>
              ))}

              {inputValue &&
                !options.some(
                  (option) => option.toLowerCase() === inputValue.toLowerCase()
                ) && (
                  <div className="border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => handleOptionSelect(inputValue)}
                      className="w-full px-3 py-2 text-left hover:bg-green-50 focus:bg-green-50 focus:outline-none text-green-700"
                    >
                      <span className="font-medium">Criar:</span> "{inputValue}"
                    </button>
                  </div>
                )}
            </>
          ) : inputValue ? (
            <button
              type="button"
              onClick={() => handleOptionSelect(inputValue)}
              className="w-full px-3 py-2 text-left hover:bg-green-50 focus:bg-green-50 focus:outline-none text-green-700"
            >
              <span className="font-medium">Criar:</span> "{inputValue}"
            </button>
          ) : (
            <div className="px-3 py-2 text-gray-500">
              Nenhuma opção encontrada
            </div>
          )}
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
