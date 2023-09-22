import React, { useState, useEffect } from "react";
import { useGoBack } from "../../utils/goBack";
import { useRouter } from "next/router";
import UserListItem from "../Chat/SubModules/UserListItem/UserListItem";
import { BackArrow } from "../../constants/Icons/Icons";
import { user_details } from "../../utils/getUserDetails";
import {
  Label,
  Option,
  OptionsContainer,
  SettingsContainer,
  SettingsHeader,
  Title,
  ToggleSwitch,
} from "./Styled";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const goBack = useGoBack();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <SettingsContainer>
      <SettingsHeader>
        <BackArrow
          onClick={() => goBack()}
          style={{ cursor: "pointer" }}
          size={28}
        />
        <Title>Settings</Title>
      </SettingsHeader>
      {hydrated && (
        <UserListItem
          user={{
            id: user_details?.id?.toString(),
            name: user_details?.name,
          }}
          userIconSize={"lg"}
          userNameFont={"lg"}
          isOnline={false}
          isCheckbox={false}
        />
      )}
      <OptionsContainer>
        <Option>
          <Label>Dark Mode</Label>
          <ToggleSwitch
            id="darkModeToggle"
            checked={darkMode}
            onChange={handleDarkModeToggle}
          />
        </Option>
      </OptionsContainer>

      {/* Add more settings options here */}
    </SettingsContainer>
  );
};

export default Settings;
