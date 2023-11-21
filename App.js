import { NavigationContainer } from '@react-navigation/native';
import Home from './views/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import List from './views/List';
import {NativeBaseProvider} from 'native-base'
import Course from './views/Course';
import Compte from './views/Compte';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#000',
            color: '#fff'
          },
          tabBarIcon: ({focused, color, size}) =>  {
            let icon

            if (route.name === "Acceuil") {
              icon = focused ? <FontAwesome name="home" size={24} color="#3661cf" /> : <FontAwesome name="home" size={24} color="white" />
            }

            if (route.name === 'Compte') {
              icon = focused ? <FontAwesome name="euro" size={24} color="#3661cf" /> : <FontAwesome name="euro" size={24} color="white" />
            }

            if (route.name === 'Budget') {
              icon = focused ? <Entypo name="wallet" size={24} color="#3661cf" /> : <Entypo name="wallet" size={24} color="white" />
            }

            if (route.name === 'Course') {
              icon = focused ? <FontAwesome name="shopping-cart" size={24} color="#3661cf" /> : <FontAwesome name="shopping-cart" size={24} color="white" />
            }

            

            return icon
          }
        })} initialRouteName='Acceuil'>
          <Tab.Screen name="Acceuil" component={Home} />
          <Tab.Screen name="Compte" component={Compte} />
          <Tab.Screen name="Budget" component={List} />
          <Tab.Screen name="Course" component={Course} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}