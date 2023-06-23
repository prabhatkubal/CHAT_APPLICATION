import React from 'react';
import styled from 'styled-components';

const StyledRadioButton = styled.input`
  /* Add your custom styles for the radio button */
`;

interface RadioButtonProps {
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ value, checked, onChange }) => {
  return (
    <StyledRadioButton
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
    />
  );
}

export default RadioButton;
