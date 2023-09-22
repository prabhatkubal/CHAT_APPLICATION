

import styled from "styled-components";
import { TabProps } from "./Interface";

export const TabContainer = styled.div`
  display: flex;
`;

export const Tab = styled.div<TabProps>`
  padding: 0.4rem 0.5rem;
  background-color: ${(props) =>
    props.active
      ? props.theme.tabs.tabActiveBgColor
      : props.theme.tabs.tabInActiveBgColor};
  color: ${(props) =>
    props.active
      ? props.theme.tabs.tabActiveColor
      : props.theme.tabs.tabInActiveColor};
  font-weight: ${(props) => (props.active ? "400" : "400")};
  border: ${({ theme }) => theme.tabs.tabBorder};
  border-bottom: ${(props) =>
    props.active
      ? props.theme.tabs.tabActiveBorderBtm
      : props.theme.tabs.tabInActiveBorderBtm};
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  margin: 0;
  user-select: none;
  transition: background-color 0.2s ease, color 0.2s ease;
  width: fit-content;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundalt};
  }
`;

export const EmptyContentTab = styled.div`
  flex-grow: 1;
  border-bottom: ${({ theme }) => theme.tabs.tabBorder};
`;

export const ChatListContainer = styled.div`
  padding: 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const ChatListControls = styled.div`
  display: flex;
  margin: 0.5rem 0.5rem 0rem 0.5rem;
  margin-bottom: 10px;
`;