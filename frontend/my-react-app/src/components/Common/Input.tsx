import { useState } from "react";
import type {
  FocusEvent,
  ChangeEvent,
  ReactNode,
  InputHTMLAttributes,
} from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  name: string;
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  clearable?: boolean;
  onClear?: () => void;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

const Input = ({
  name,
  label,
  error,
  helperText,
  type = "text",
  placeholder,
  icon,
  iconPosition = "left",
  clearable = false,
  onClear,
  size = "md",
  fullWidth = true,
  className = "",
  inputClassName = "",
  labelClassName = "",
  required = false,
  disabled = false,
  readOnly = false,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // ✅ Get React Hook Form context (if wrapped inside FormProvider)
  const {
    register,
    formState: { errors },
  } = useFormContext() || { register: () => ({}), formState: { errors: {} } };

  // Use field-level error from RHF if available
  const fieldError = (errors as any)?.[name]?.message as string | undefined;

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleClear = () => {
    props.onChange?.({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
    onClear?.();
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const baseInputStyles = `
    w-full border rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 
    ${sizes[size]}
    ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : "bg-white text-gray-900"}
    ${readOnly ? "bg-gray-50 cursor-default" : ""}
    ${
      fieldError || error
        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
        : isFocused
        ? "border-blue-500 focus:ring-blue-500 focus:border-blue-500"
        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    }
    ${icon && iconPosition === "left" ? "pl-10" : ""}
    ${icon && iconPosition === "right" ? "pr-10" : ""}
    ${clearable ? "pr-10" : ""}
    ${type === "password" ? "pr-10" : ""}
    ${inputClassName}
  `;

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className={baseInputStyles}
          {...register(name)}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* Clear Button */}
        {clearable && !disabled && !readOnly && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Password Toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Helper Text / Error */}
      {(fieldError || error || helperText) && (
        <p
          className={`mt-1 text-sm ${
            fieldError || error ? "text-red-500" : "text-gray-500"
          }`}
        >
          {fieldError || error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
