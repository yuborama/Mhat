import { ApolloClient, from, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config';

const httpLink = new HttpLink({
  uri: `${CONFIG.GRAPHQL_URL}`,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && !graphQLErrors.filter((error) => error.message === `INVALID_TOKEN`))
    graphQLErrors.forEach(({ message, locations, path }) => {
      // console.warn(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  if (networkError) {
    // console.warn(`[Network error]: ${networkError}`)
  }
});

const link = errorLink.concat(authLink.concat(httpLink));

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
export default client;
