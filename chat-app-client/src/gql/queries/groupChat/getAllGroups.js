import { gql } from "@apollo/client";

export const GET_GROUPS = gql`
  query {
    getAllGroups {
      success
      groups {
        groupId
        groupName
        adminId
      }
    }
  }
`;
