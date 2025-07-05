import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./ui/input";
import FormErrorMessage from "./FormErrorMessage";

const FormInputField = ({
  type = "text",
  placeholder,
  label,
  name,
  setData,
  data,
  error,
  disabled,
}) => {
  const handleChange = ({ target: { value, name } }) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="grid gap-1">
      <Label className="text-sm" htmlFor={name}>
        {label}
      </Label>
      <Input
        onChange={handleChange}
        id={name}
        type={type}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
      />
      {error && <FormErrorMessage message={error} />}
    </div>
  );
};

export default FormInputField;
