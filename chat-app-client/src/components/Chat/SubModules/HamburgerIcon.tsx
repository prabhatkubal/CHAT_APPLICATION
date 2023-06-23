import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../Common/Button";
import { useRouter } from "next/router";
import Switch from "../../Common/SwitchToggle";
import { useToggleTheme } from "../../../theme/themeUtilis";

const Hamburger = styled.div``;

const HamburgerIcon = styled.div`
  width: 20px;
  padding-top: 8px;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  div {
    width: 100%;
    height: 2px;
    background-color: #000;
    transition: background-color 0.3s ease;

    &:first-child {
      transform-origin: top left;
    }

    &:last-child {
      transform-origin: bottom left;
    }
  }

  // &.open {
  //   div {
  //     &:first-child {
  //       transform: rotate(45deg) translate(2px, 3px);
  //     }

  //     &:nth-child(2) {
  //       opacity: 0;
  //     }

  //     &:last-child {
  //       transform: rotate(-45deg) translate(2px, -3px);
  //     }
  //   }
  }
`;

const HamburgerMenu = styled.ul`
  position: absolute;
  top: 0;
  left: -100%;
  padding: 10px;
  background-color: white;
  list-style: none;
  -webkit-transition: right 0.3s ease;
  transition: right 0.3s ease;
  width: 200px;
  height: 100%;
  z-index: 5;
  margin: 0;

  &.open {
    left: 0;
  }
`;

const HamburgerActiveMask = styled.ul`
  z-index: 3;
  background-color: #252331;
  opacity: 0.7;
  width: 100vw;
  height: 100vh;
  position: absolute;
  margin: 0;
  top: 0;
  left: 0;
  transition: opacity 0.15s linear;
`;

const HamburgerMenuItem = styled.li`
  margin-bottom: 8px;
`;

const HamburgerMenuIcon = ({
  isOpen,
  onClick,
  onToggleTheme,
  onOutsideClick,
}: {
  isOpen: boolean;
  onClick: () => void;
  onToggleTheme: () => void;
  onOutsideClick: () => void;
}) => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const { isDarkMode, toggleTheme } = useToggleTheme();

  const handleSwitchToggle = () => {
    setIsChecked(!isChecked);
    toggleTheme();
  };

  return (
    <Hamburger>
      <HamburgerIcon className={isOpen ? "open" : ""} onClick={onClick}>
        <div></div>
        <div></div>
        <div></div>
      </HamburgerIcon>
      <HamburgerMenu className={isOpen ? "open" : ""}>
        <HamburgerMenuItem>Saved Messages</HamburgerMenuItem>
        <HamburgerMenuItem>Settings</HamburgerMenuItem>
        <HamburgerMenuItem>
          <Switch
            isChecked={isChecked}
            handleToggle={handleSwitchToggle}
            tgColor="#ccd3da"
          />
          Night Time
        </HamburgerMenuItem>
        <HamburgerMenuItem>
          <Button
            onClick={() => {
              router.push({
                pathname: "/account/login",
              });
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        </HamburgerMenuItem>
      </HamburgerMenu>
      {isOpen ? (
        <HamburgerActiveMask onClick={onOutsideClick}></HamburgerActiveMask>
      ) : null}
    </Hamburger>
  );
};

export default HamburgerMenuIcon;
