import {View, Text} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SecretPattern = ({navigation, route}) => {
  const data = route.params.data || {}; // Accessing the passed data
  console.log('Pattern is', data);
  const [navstate,setNavState]=useState(false);

setTimeout(() => {
  setNavState(true)
}, 600000);

useState(()=>{
  console.log("Currrnt State",navstate)
},[])

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 24, fontWeight: 800, color: 'black',marginBottom:10}}>
        {data}
      </Text>
      <Icon.Button
        name={navstate==false?"qr-code-scanner":'grid-view'}
        backgroundColor="#3b5998"
        onPress={() => navigation.navigate(navstate == false ?'Scanner':'Grid')}>
        {navstate == false ?'Go To Scanner':'Go To Pattern'}
      </Icon.Button>
    </View>
  );
};

export default SecretPattern;
