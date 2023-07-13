import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation Signup($uuid: String, $name: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    signup(uuid: $uuid, name: $name, email: $email, password: $password, confirmPassword: $confirmPassword) {
      message
      success
      user {
        id
        name
        email
      }
    }
  }
`;
