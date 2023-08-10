import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  margin-bottom: 10px;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid grey;
  padding: 5px 5px;
  background-color: ${({ theme }) => theme.colors.bgInputColor};

  &:focus {
    border-color: #a9c8ff;
    outline: none;
    background: #a9c8ff;
  }
`;

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <StyledInput
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
