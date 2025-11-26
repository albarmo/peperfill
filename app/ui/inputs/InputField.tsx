export interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "date" | "time";
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: InputFieldProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 capitalize"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

export default InputField