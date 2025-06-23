// components/Dropdown.tsx
import { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  selected: Option;
  onSelect: (option: Option) => void;
};

const Dropdown = ({ options, selected, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full rounded-[8px] bg-white px-[20px] py-[11px] text-left text-[16px] font-[600] focus:outline-none"
      >
        {selected.label}
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full space-y-[10px] px-[20px] py-[10px] rounded-[8px] border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer text-[15px] hover:bg-gray-100"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
