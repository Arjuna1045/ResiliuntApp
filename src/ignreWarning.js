import {LogBox} from 'react-native';

if (__DEV__) {
  const ignoreWarns = [
    'EventEmitter.removeListener',
    '[fuego-swr-keys-from-collection-path]',
    'Setting a timer for a long period of time',
    'ViewPropTypes will be removed from React Native',
    'AsyncStorage has been extracted from react-native',
    "exported from 'deprecated-react-native-prop-types'.",
    'Non-serializable values were found in the navigation state.',
    'VirtualizedLists should never be nested inside plain ScrollViews',
    "Material Top Tab Navigator: 'lazy' in props is deprecated. Move it to 'screenOptions' instead.",
    "Cannot update a component (`NativeStackNavigator`) while rendering a different component (`SecretMessage`). To locate the bad setState() call inside `SecretMessage`, follow the stack trace as described in https://react.dev/link/setstate-in-render",
    "Cannot update a component (`ForwardRef(BaseNavigationContainer)`) while rendering a different component (`SecretPattern`). To locate the bad setState() call inside `SecretPattern`, follow the stack trace as described in https://react.dev/link/setstate-in-render"
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}