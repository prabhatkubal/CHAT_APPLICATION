import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 15px;
  background: transparent;
  border: 1px solid grey;
  padding: 4px 12px;
  cursor: pointer;

  &:hover {
    border-color: lightgray;
    outline: none;
    background: lightgray;
  }
`;

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
