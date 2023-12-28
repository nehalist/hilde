import { forwardRef, HTMLAttributes } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  type?: string;
  label: string;
  placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function InputComponent(
    { type, label, placeholder, ...props }: InputProps,
    ref,
  ) {
    return (
      <>
        <label className="text-sm block mb-1 text-gray-900 dark:text-gray-400">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          {...props}
          className="bg-gray-50 w-full p-2 rounded-lg focus:outline-none focus:shadow-lg transition-shadow dark:bg-gray-900"
        />
      </>
    );
  },
);
