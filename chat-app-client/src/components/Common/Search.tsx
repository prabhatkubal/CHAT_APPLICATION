import React from "react";
import styled from "styled-components";

interface StyledSearchInputProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded: boolean;
}

const StyledSearchInput = styled.input<StyledSearchInputProps>`
  width: 100%;
  font-size: 15px;
  border-radius: ${(props) => (props.rounded ? "5px" : "none")};
  border: 1px solid grey;
  padding: 5px 5px;
  background-color: ${({ theme }) => theme.colors.bgInputColor};
  color: grey;

  &:focus {
    border-color: #a9c8ff;
    outline: none;
    border: 2px solid #a9c8ff;
  }
`;

interface SearchProps {
  borderRadius: boolean;
  placeholder: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({
  placeholder,
  value,
  onChange,
  onKeyDown,
  borderRadius,
}) => {
  return (
    <StyledSearchInput
      rounded={borderRadius}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Search;
