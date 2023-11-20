import { NavigationContainer } from '@react-navigation/native';
import Home from './views/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import List from './views/List';
import {NativeBaseProvider} from 'native-base'
import Course from './views/Course';
import Compte from './views/Compte';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#000',
            color: '#fff'
          },
          tabBarIconStyle: {
            display: 'none'
          },
        }} initialRouteName='Budget'>
          <Tab.Screen name="Compte" component={Compte} />
          <Tab.Screen name="Budget" component={Home} />
          <Tab.Screen name="Liste" component={List} />
          <Tab.Screen name="Course" component={Course} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}