import { gql } from '@apollo/client';

export const SERVICESBYPROJECT = gql`
  query servicesByProject($id: UUID!) {
    servicesByProject(id: $id) {
      id
      label
      name
      label
      image
      codeName
    }
  }
`;
