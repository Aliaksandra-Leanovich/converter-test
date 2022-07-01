import React from "react";
import Select, { StylesConfig } from "react-select";

interface ISelect {
  name: string;
  options: string[];
  handleSelect: (options: string[] | null) => void;
}

export const CurrencySelect = ({ name, handleSelect, options }: ISelect) => {
  const customStyles: StylesConfig<any> = {
    control: (provided) => ({
      ...provided,

      border: "none",
      cursor: "pointer",
    }),

    singleValue: (provided) => ({
      ...provided,
      textAlign: "center",
      color: " rgba(117, 108, 108, 0.6)",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: " rgba(117, 108, 108, 1) ",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      marginRight: "19px",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "26px",
      color: " rgba(117, 108, 108, 1) ",
    }),

    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };
  return (
    <Select
      name={name}
      onChange={handleSelect}
      isMulti={false}
      value={options}
      defaultValue={options[0]}
      options={options}
      styles={customStyles}
    />
  );
};
