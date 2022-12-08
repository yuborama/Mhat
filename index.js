import { registerRootComponent } from 'expo';
if (Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/en-IN');
}
import { AppRegistry } from 'react-native';
import App from './src/screens/_app';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

registerRootComponent(App);
