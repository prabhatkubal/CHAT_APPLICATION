import styled from "styled-components";

export const SettingsContainer = styled.div`
  padding: 10px;
`;

export const SettingsHeader = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-size: 20px;
  margin: 0 0;
  margin-left: 15px;
  display: inline-block;
`;

export const OptionsContainer = styled.div`
  padding: 10px;
  margin-top: 20px;
`;

export const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-size: 18px;
`;

export const ToggleSwitch = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
  position: relative;
  cursor: pointer;

  &:checked {
    background-color: #007bff;
  }

  &:before {
    content: "";
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 2px;
    transition: 0.2s;
  }

  &:checked:before {
    left: calc(100% - 20px);
  }
`;
