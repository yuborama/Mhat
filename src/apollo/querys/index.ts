import { gql } from '@apollo/client';

export const LIST_ARTICLES = gql`
   query listArticles($take: Int, $skip: Int, $filter: ArticleFilterInput, $order: [ArticleSortInput!]) {
    listArticles(take: $take, skip: $skip, filter: $filter, order: $order) {
      totalCount
      items {
        id
        title
        slug
        photo
        projectId
        active
        seoTitle
        typeContent
        status
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

export const ARTICLEBYID = gql`
  query ArticleById($articleByIdId: UUID!) {
    articleById(id: $articleByIdId) {
      id
      photo
      embedContent
      content
      title
      categories {
        id
        name
      }
    }
  }
`;