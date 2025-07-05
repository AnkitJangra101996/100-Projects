import React from "react";

const FormErrorMessage = ({ message }) => {
  return <span className="text-sm text-red-500 mt-1 ml-1">{message}</span>;
};

export default FormErrorMessage;
