import { gql } from '@apollo/client';

export const CREATE_PET = gql`
  mutation CreatePet($input: PetInput!) {
    createPet(input: $input) {
      pet {
        id
        address
        breed
        color
        createdAt
        dateOfBirth
        diseases {
          id
          description
          createdAt
          updatedAt
        }
        gender
        images
        latitude
        locationOfSterilization
        longitude
        name
        notes
        petType
        silvestre
        size
        sterilized
        years
        zone
      }
    }
  }
`;
