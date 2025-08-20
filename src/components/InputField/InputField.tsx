import React, { useState } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
import { InputFieldProps } from '../../types';

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  loading = false,
  clearable = false,
  type = 'text',
  onClear,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const handleClear = () => {
    if (onClear) onClear();
  };

  const inputSizeClasses = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-3 text-base',
    lg: 'py-3 px-4 text-lg',
  };

  const variantClasses = {
    filled: 'bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white dark:focus:bg-gray-600',
    outlined: 'bg-transparent border-gray-300 dark:border-gray-600 focus:border-blue-500',
    ghost: 'bg-transparent border-transparent border-b-gray-300 dark:border-b-gray-600 focus:border-b-blue-500',
  };

  const inputBaseClasses = `
    w-full rounded-md border
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
    transition-all duration-200
    ${inputSizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${invalid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
  `;

  return (
    <div className="w-full">
      {label && (
        <label
          className={`block mb-1 text-sm font-medium ${
            invalid ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={inputBaseClasses}
          aria-invalid={invalid}
          aria-describedby={helperText || errorMessage ? `${label}-help` : undefined}
          {...props}
        />
        
        {(clearable && value && !disabled && !loading) && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label="Clear input"
          >
            <X size={16} />
          </button>
        )}
        
        {isPassword && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
        
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 size={16} className="animate-spin text-gray-400" />
          </div>
        )}
      </div>
      
      {(helperText || errorMessage) && (
        <p
          id={`${label}-help`}
          className={`mt-1 text-xs ${
            invalid ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;