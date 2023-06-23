import React from "react";
import styled from "styled-components";

const SwitchContainer = styled.label.attrs(
  (props: { tgColor: string; isChecked: boolean }) => props
)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 36px;
  height: 20px;
  margin-bottom: 0;
  background: ${(props) => (props.isChecked ? "#f48225" : props.tgColor)};
  border-radius: 100px;
  position: relative;
  transition: background-color 0.2s;
`;

const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const SwitchButton = styled.span.attrs(
  (props: { isChecked: boolean }) => props
)`
  content: "";
  position: absolute;
  top: 2px;
  left: ${(props) => (props.isChecked ? "none" : "2px")};
  right: ${(props) => (props.isChecked ? "2px" : "none")};
  width: 16px;
  height: 16px;
  border-radius: 45px;
  transition: 0.4s;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
`;

interface SwitchProps {
  isChecked: boolean;
  handleToggle: () => void;
  tgColor?: string;
}

const Switch: React.FC<SwitchProps> = ({
  isChecked,
  tgColor,
  handleToggle,
}) => {
  return (
    <>
      <SwitchInput
        checked={isChecked}
        onChange={handleToggle}
        type="checkbox"
        id={`react-switch-new`}
      />
      <SwitchContainer
        isChecked={isChecked}
        tgColor={tgColor}
        htmlFor="react-switch-new"
      >
        <SwitchButton isChecked={isChecked} />
      </SwitchContainer>
    </>
  );
};

export default Switch;
