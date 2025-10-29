import PrioritySelector from "../PrioritySelector";

interface SelectInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  error?: string;
  options: { value: string; label: string; color?: string }[];
}

const SelectInput = ({
  name,
  value,
  onChange,
  className = "",
  options,
}: SelectInputProps) => {
  return (
    <PrioritySelector
      value={value}
      onChange={(newValue) => {
        const syntheticEvent = {
          target: { name, value: newValue },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
      }}
      options={options}
      className={className}
    />
  );
};

export default SelectInput;
