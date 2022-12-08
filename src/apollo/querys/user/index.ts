import { gql } from '@apollo/client';

export const LIST_USERS = gql`
  query ListUsers($filter: UserFilterInput, $order: [UserSortInput!], $skip: Int, $take: Int) {
    listUsers(filter: $filter, order: $order, skip: $skip, take: $take) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
      items {
        id
        active
        createdAt
        dNI
        email
        gender
        name
        observation
        role
        lastLogin
        loginCount
        phone
        location {
          address
          latitude
          longitude
          updatedAt
          zone
        }
      }
    }
  }
`;

export const USER_BY_ID = gql`
  query UserById($userByIdId: UUID!) {
    userById(id: $userByIdId) {
      id
      active
      createdAt
      dNI
      email
      gender
      lastLogin
      location {
        address
        latitude
        longitude
        updatedAt
        zone
      }
      loginCount
      name
      observation
      phone
      role
      pets {
        address
        breed
        color
        dateOfBirth
        diseases {
          createdAt
          description
          id
          updatedAt
        }
        gender
        id
        images
        name
        notes
        petType
        silvestre
        size
        sterilized
        ubication
        years
        zone
      }
    }
  }
`;
