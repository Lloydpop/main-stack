import React, { useState, useEffect, useRef } from "react";
import expandIcon from "@/assets/images/expandIcon.png";
import { CheckIcon } from "@heroicons/react/24/outline";

interface Option {
  label: string;
  value: string | number;
}

interface DropdownProps {
  options: Option[];
  placeholder?: string;
  label?: string;
  selectedValues: (string | number)[];
  setSelectedValues: (selectedValues: (string | number)[]) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Select an option",
  label,
  selectedValues = [],
  setSelectedValues,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (value: string | number) => {
    const isSelected = selectedValues.includes(value);
    if (isSelected) {
      setSelectedValues(selectedValues.filter((val) => val !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {label && <span className="block my-2 font-semibold">{label}</span>}
      <button
        className="block w-full text-start py-2 px-4 text-gray-800 rounded-md focus:border-2 border-gray-300 shadow-sm focus:outline-none focus:border-black bg-[#EFF1F6]"
        onClick={toggleDropdown}
      >
        <span className="font-semibold text-[14px] flex items-center justify-between">
          {selectedValues.length === 0
            ? placeholder
            : selectedValues
                .map(
                  (value) =>
                    options.find((option) => option.value === value)?.label
                )
                .join(", ")}
          <img
            className={`w-3 h-3 object-contain ${isOpen ? "-rotate-180" : ""}`}
            src={expandIcon}
            alt="expand icon"
          />
        </span>
      </button>
      {isOpen && (
        <ul className="w-full mt-1 bg-white absolute  z-[1000] border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 text-gray-800 block hover:bg-gray-100"
            >
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  id={option.value.toString()}
                  checked={selectedValues.includes(option.value)}
                  className="mr-2 h-4 w-4 text-black cursor-pointer appearance-none rounded-sm border border-gray-400 checked:bg-black checked:border-transparent focus:outline-none"
                  onChange={() => {
                    handleOptionChange(option.value);
                  }}
                />
                <span>
                  {selectedValues.includes(option.value) ? (
                    <CheckIcon className="w-4 h-4 absolute left-0 top-1 text-white" />
                  ) : (
                    ""
                  )}
                </span>
                <span className="text-black">{option.label}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
