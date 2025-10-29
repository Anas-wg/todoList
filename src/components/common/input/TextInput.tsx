interface TextInputProps {
  id: string;
  name: string;
  type?: "text" | "email" | "password" | "number";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: string;
}

const TextInput = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  error,
}: TextInputProps) => {
  // Inputfield 하단 테두리 색상 변경
  const baseInputClasses = `w-full px-0 py-2 text-gray-900 bg-transparent border-0 border-b-2 ${
    error ? "border-red-500" : "border-gray-300"
  } focus:border-brand focus:outline-none focus:ring-0 transition-colors duration-200`;

  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`${baseInputClasses} ${className}`}
    />
  );
};

export default TextInput;
