import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    className = '',
    ...props 
  }, ref) => {
    const baseTextAreaStyles = 'px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent';
    const errorStyles = error ? 'border-error-500 focus:ring-error-500' : 'border-gray-300';
    const widthStyles = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={`${baseTextAreaStyles} ${errorStyles} ${widthStyles} min-h-[100px]`}
          {...props}
        />
        
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-error-500' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;