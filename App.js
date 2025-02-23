import { StyleSheet } from 'react-native';
import { IconButton, PaperProvider } from 'react-native-paper';
import { logoutUser, useFireAuth } from './firebase/FirebaseAuthController';
import Login from './screens/Login';
import MapScreen from './screens/Map';
import { UserContext } from './contexts/UserContext';
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function App() {
  const [user] = useFireAuth();

  return (
    <UserContext.Provider value={user}>
      <PaperProvider>
        {user ? <Navigation /> : <Login />}
      </PaperProvider>
    </UserContext.Provider>
  );
}

function Navigation() {
  const user = useContext(UserContext);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerRight: () => <IconButton icon={'logout'} onPress={logoutUser} />,
          headerTitle: user?.email
        }}
      >
        {/* Lisää navigointiin ainakin yksi screen */}
        <Drawer.Screen name="Map" component={MapScreen} />
        {/* Voit lisätä lisää ruutuja tänne */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    gap: 5
  },

});