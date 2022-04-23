import {ChangeEventHandler, FunctionComponent, LegacyRef} from "react";

const Input: FunctionComponent<{
  label: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler;
  reference?: LegacyRef<HTMLInputElement>;
}> = ({ label, placeholder, value, onChange, reference }) => (
  <>
    <label className="text-sm block mb-1 text-gray-900">{label}</label>
    <input type="text"
           className="bg-gray-50 w-full p-2 rounded-lg focus:outline-none focus:shadow-lg transition-shadow"
           placeholder={placeholder}
           value={value}
           onChange={onChange}
           ref={reference}
    />
  </>
);

export default Input;
