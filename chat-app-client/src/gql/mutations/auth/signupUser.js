import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation Signup($uuid: String, $firstname: String!, $lastname: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    signup(uuid: $uuid, firstname: $firstname, lastname: $lastname, email: $email, password: $password, confirmPassword: $confirmPassword) {
      message
      success
      user {
        id
        firstname
        lastname
        username
        email
      }
    }
  }
`;
