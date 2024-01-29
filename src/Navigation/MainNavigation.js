import { View, Text } from 'react-native'
import React from 'react'
import LogoutButton from '../Utilities/LogoutButton'
import { Login } from '../Login'
import ColorGrid from '../ColorGrid'
import ShowCode from '../ShowCode'
import DataShow from '../DataShow'
import SecretPattern from '../SecretPattern'
import SecretMessage from '../SecretMessage'
import Scanner from '../Qrcodescanner'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="login" >
        <Stack.Screen name="login" component={Login}  options={{ headerShown: false ,headerRight: () => <LogoutButton />,}}/>
        <Stack.Screen name="Grid" component={ColorGrid}  options={{title:'Select your Pattern',headerRight: () => <LogoutButton />,}}/>
        <Stack.Screen name="Selected Pattern" component={ShowCode}  options={{headerRight: () => <LogoutButton />}} />
        <Stack.Screen name="Scanner" component={Scanner} options={{title:'Scan Message QR',headerRight: () => <LogoutButton />,}}/>
        <Stack.Screen name="MsgViewer" component={DataShow} options={{title:"Encrypted Meassage",headerRight: () => <LogoutButton />,}}/>
        <Stack.Screen name="Secret Pattern"  component={SecretPattern} options={{
             headerLeft:()=> null,
             headerBackVisible: false,
             headerRight: () => <LogoutButton />,
        }}/>
         <Stack.Screen name="ShowCode"  component={SecretMessage} options={{
            //  headerLeft:()=> null,
            //  headerBackVisible: false,
            headerRight: () => <LogoutButton />,
             title:'Secret Message'
        }}/>
      </Stack.Navigator>
  </NavigationContainer>
  )
}

export default MainNavigation