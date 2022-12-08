import { gql } from '@apollo/client';

export const LOGIN_MEMBER = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      autentication
      user {
        active
        createdAt
        dNI
        email
        gender
        id
        lastLogin
        loginCount
        name
        observation
        phone
        role
        updatedAt
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        active
        createdAt
        dNI
        email
        id
        lastLogin
        location {
          address
          createdAt
          id
          latitude
          longitude
          updatedAt
          zone
        }
        name
        observation
        phone
        role
        updatedAt
      }
    }
  }
`;

// export const UPDATE_USER = gql``;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: UUID!) {
    deleteUser(id: $deleteUserId) {
      id
    }
  }
`;

export const RECOVER_PASSWORD = gql`
  mutation RecoverPassword($input: RecoverPasswordInput!) {
    recoverPassword(input: $input) {
      member {
        id
      }
    }
  }
`;
