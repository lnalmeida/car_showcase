import React, { useState, useRef, forwardRef } from "react";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const TagsInput = forwardRef(
  (
    {
      value = [],
      onChange,
      placeholder = "Digite e pressione Enter...",
      className = "",
      disabled = false,
      maxTags,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    const addTag = (tagValue) => {
      const trimmedValue = tagValue.trim();
      if (trimmedValue && !value.includes(trimmedValue)) {
        if (!maxTags || value.length < maxTags) {
          onChange([...value, trimmedValue]);
        }
      }
      setInputValue("");
    };

    const removeTag = (indexToRemove) => {
      onChange(value.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
        removeTag(value.length - 1);
      }
    };

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };

    const focusInput = () => {
      inputRef.current?.focus();
    };

    return (
      <div className={`space-y-2 ${className}`}>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || (maxTags && value.length >= maxTags)}
          {...props}
        />

        <div
          className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-text"
          onClick={focusInput}
        >
          {value.length === 0 ? (
            <p className="text-muted-foreground">
              Nenhum opcional adicionado...
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {value.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 pr-1"
                >
                  <span>{tag}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(index);
                    }}
                    disabled={disabled}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {maxTags && (
          <p className="text-xs text-muted-foreground">
            {value.length}/{maxTags} opcionais
          </p>
        )}
      </div>
    );
  }
);

TagsInput.displayName = "TagsInput";
