import { ChangeEventHandler, FunctionComponent, LegacyRef } from "react";

export const Input: FunctionComponent<{
  type?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler;
  reference?: LegacyRef<HTMLInputElement>;
}> = ({ label, placeholder, value, onChange, reference, type = "text" }) => (
  <>
    <label className="text-sm block mb-1 text-gray-900">{label}</label>
    <input
      type={type}
      className="bg-gray-50 w-full p-2 rounded-lg focus:outline-none focus:shadow-lg transition-shadow"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      ref={reference}
    />
  </>
);
