import { gql } from '@apollo/client';

export const PROJECTBYURL = gql`
  query projectByUrl($url: String!) {
    projectByUrl(url: $url) {
      id
      name
      description
      logo
      tagLine
      isReady
      url
      companyId
      site {
        id
        key
        value
      }
      services {
        id
        name
        codeName
        image
        description
        priority
        updatedAt
        createdAt
        projectMicroservices {
          id
          projectId
        }
      }
      shop {
        shopType
      }
    }
  }
`;
