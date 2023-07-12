import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      success
      user {
        id
        name
        email
      }
      accessToken
    }
  }
`;

