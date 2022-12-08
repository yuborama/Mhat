import { gql } from '@apollo/client';

export const ME = gql`
  query MeById {
    meById {
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
