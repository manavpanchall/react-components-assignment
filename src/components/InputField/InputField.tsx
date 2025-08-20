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
  readOnly = false,
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
  filled: 'bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white dark:focus:bg-gray-600 shadow-inner',
  outlined: 'bg-transparent border-gray-300 dark:border-gray-600 focus:border-blue-500 shadow-sm',
  ghost: 'bg-transparent border-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-b-blue-500 rounded-none',
  };

  const inputBaseClasses = `
  w-full rounded-xl border-2
  focus:outline-none focus:ring-4 focus:ring-opacity-20
  transition-all duration-300
  ${inputSizeClasses[size]}
  ${variantClasses[variant]}
  ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-opacity-70'}
  ${invalid 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
  }
  ${readOnly ? 'cursor-default bg-gray-50 dark:bg-gray-700' : ''}
`;

  // Determine if we should show the clear button
  const shouldShowClear = clearable && value && !disabled && !loading && !readOnly;

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
          readOnly={readOnly}
          className={inputBaseClasses}
          aria-invalid={invalid}
          aria-describedby={helperText || errorMessage ? `${label}-help` : undefined}
          {...props}
        />
        
        {shouldShowClear && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label="Clear input"
          >
            <X size={16} />
          </button>
        )}
        
        {isPassword && !disabled && !readOnly && (
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