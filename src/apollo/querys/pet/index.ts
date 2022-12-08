import { gql } from '@apollo/client';

export const LIST_PETS = gql`
  query ListPets($filter: PetFilterInput, $order: [PetSortInput!], $skip: Int, $take: Int) {
    listPets(filter: $filter, order: $order, skip: $skip, take: $take) {
      items {
        address
        breed
        color
        createdAt
        dateOfBirth
        diseases {
          id
          createdAt
          description
          updatedAt
        }
        gender
        id
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

export const PET_BY_ID = gql`
  query PetById($petByIdId: UUID!) {
    petById(id: $petByIdId) {
      address
      breed
      color
      createdAt
      dateOfBirth
      diseases {
        id
        createdAt
        description
        updatedAt
      }
      gender
      id
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
      dateOfBirth
      zone
      user {
        dNI
        name
      }
    }
  }
`;
