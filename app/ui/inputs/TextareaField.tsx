export interface TextareaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField = ({
  label,
  name,
  value,
  onChange,
}: TextareaFieldProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 capitalize"
    >
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      rows={3}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    ></textarea>
  </div>
);

export default TextareaField