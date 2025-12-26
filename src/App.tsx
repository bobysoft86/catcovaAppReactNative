import 'react-native-get-random-values';

import { NavigationContainer } from '@react-navigation/native';


export default function App() {
    console.log('✅ App mounted'); // <-- este DEBE salir siempre

  return (

      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
  );
}