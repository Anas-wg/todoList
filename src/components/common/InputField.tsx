import { ChangeEvent } from "react";
import TextInput from "./input/TextInput";
import SelectInput from "./input/SelectInput";
import DateInput from "./input/DateInput";

interface InputFieldProps {
  id: string;
  name: string;
  type?: "text" | "date" | "select";
  value: string;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  options?: { value: string; label: string; color?: string }[];
  disabled?: boolean;
}

const InputField = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
  options,
  disabled = false,
}: InputFieldProps) => {
  const renderInput = () => {
    const commonProps = {
      id,
      name,
      value,
      onChange,
      placeholder,
      required,
      error,
      disabled,
    };

    switch (type) {
      case "select":
        if (!options) return null;
        return <SelectInput {...commonProps} options={options} />;

      case "date":
        return <DateInput {...commonProps} />;

      default:
        return <TextInput {...commonProps} type={type} />;
    }
  };

  return (
    <div className="mb-4 relative overflow-visible">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
