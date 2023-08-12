import React from "react";
import styled from "styled-components";

const StyledSearchInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  font-size: 15px;
  border-radius: 5px;
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
}) => {
  return (
    <StyledSearchInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Search;
