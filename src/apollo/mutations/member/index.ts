import { gql } from '@apollo/client';

export const CREATEMEMBER = gql`
  mutation createMember($input: CreateMemberInput!) {
    createMember(input: $input) {
      accessToken
      member {
        id
        email
        createdAt
        updatedAt
        email
        recoverToken
        recoverRegister
        isActive
        firstTime
        loginCount
        memberRoles {
          id
          role {
            id
            name
            codeName
          }
          roleId
        }
        profile {
          id
          firstName
          lastName
          phone
          photo
          countryId
          country {
            name
            code
          }
        }
      }
    }
  }
`;

export const USERPROFILEUPDATE = gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      member {
        id
        email
        createdAt
        updatedAt
        email
        recoverToken
        recoverRegister
        isActive
        firstTime
        loginCount
        profile {
          id
          firstName
          lastName
          phone
          photo
          countryId
          country {
            name
            code
          }
        }
      }
    }
  }
`;
export const USERUPDATE = gql`
  mutation updateUser($id: ID!, $input: UserInput) {
    updateUser(input: $input, id: $id) {
      user {
        id
      }
    }
  }
`;

export const USERUPDATEPASSWORD = gql`
  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      member {
        id
      }
    }
  }
`;

export const RECOVER_PASSWORD = gql`
  mutation recoverPassword($input: RecoverPasswordInput!) {
    recoverPassword(input: $input) {
      member {
        email
      }
    }
  }
`;
export const RESTORE_PASSWORD = gql`
  mutation restorePassword($input: RestorePasswordInput!) {
    restorePassword(input: $input) {
      member {
        email
      }
    }
  }
`;
export const VERIFY_TOKEN = gql`
  mutation verifyToken($input: VerifyTokenInput!) {
    verifyToken(input: $input) {
      member {
        email
        id
      }
    }
  }
`;

export const ACTIVATEACCOUNT = gql`
  mutation activeMember($input: ActiveMemberInput!) {
    activeMember(input: $input) {
      member {
        id
        createdAt
        updatedAt
      }
    }
  }
`;
