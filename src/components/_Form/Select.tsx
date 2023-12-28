import { ChangeEventHandler, FunctionComponent } from "react";

export const Select: FunctionComponent<{
  label: string;
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
  selectedValue: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}> = ({ label, placeholder, selectedValue, onChange, options }) => (
  <>
    <label className="text-sm mb-1 text-gray-900 block dark:text-gray-200">
      {label}
    </label>
    <select
      placeholder={placeholder}
      defaultValue={selectedValue}
      className="bg-gray-50 p-2 rounded-lg dark:bg-gray-800"
      onChange={onChange}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </>
);
