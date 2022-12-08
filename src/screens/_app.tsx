import { ApolloProvider } from '@apollo/client';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto';
import client from '../apollo';

import CreateThemes from '../utils/createTheme';
import ThemeContext from '../hooks/contextTheme';
import Navigation from '.';
import { themes } from '~/themes';

export const ThemesWithMachine = CreateThemes(themes);

export default function App() {
  return (
    <ThemeContext themes={ThemesWithMachine} defaultTheme={themes?.light}>
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation />
        </ApolloProvider>
      </SafeAreaProvider>
    </ThemeContext>
  );
}

AppRegistry.registerComponent('MyApp', () => App);
