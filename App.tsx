import React, { useState } from "react"
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
// import Icon, { Icons } from "../Helpers/Icon"
import { useForm, Controller } from 'react-hook-form';
import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

// import QRScanner from "./src/Qrcodescanner";
import Scanner from "./src/Qrcodescanner";
import { Login } from "./src/Login";
// import ColorGrid from "./src/ColorGrid";
import ShowCode from "./src/ShowCode";
import SecretPattern from "./src/SecretPattern";
import ColorGrid from "./src/ColorGrid";
import DataShow from "./src/DataShow";
import SecretMessage from "./src/SecretMessage";
import LogoutButton from "./src/Utilities/LogoutButton";
const Stack = createNativeStackNavigator();


const App = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
        username: '',
        password: ''
    },
})
const [showpwd, setShowpwd] = useState<boolean>(false)
const handleShowEye = () => {
    setShowpwd(() => !showpwd)
}
const handleLogin = (data:any) => {
    console.log(data)
}
// screenOptions={{headerShown:false}}
  return (
    <AlertNotificationRoot>
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
  </AlertNotificationRoot>
  )
}

const LoginStyle = StyleSheet.create({
  welcome: {

      fontSize: 28,
      marginBottom: 10,
      color: 'white',
      fontFamily: 'OpenSans-SemiBold'
  },
  welcomeText: {
      fontSize: 30,
      color: 'white',
      fontFamily: 'OpenSans-SemiBold',
      marginLeft: 15,
      textAlign: 'left'
  },
  loginLower: {
      flex: 1,
      padding: 20,
      borderTopWidth: 2,
      justifyContent: 'space-around'
  },
  username: {
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 10,
      fontSize: 16,
      marginBottom: 20,
      padding: 9,
      fontFamily: 'OpenSans-Regular',

  },
  pwd: {
      marginBottom: 10,
  },
  submitBtn: {
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 10,
      padding: 12, backgroundColor: '#1338BE'
  },
  submitText: {
      fontFamily: 'OpenSans-Bold',
      textAlign: 'center',
      fontSize: 14,
      textTransform: 'uppercase',
      letterSpacing: 0.8,

      color: 'white',

  }
})

export default App