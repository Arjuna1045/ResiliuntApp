import {View, Text} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/Feather';
import CryptoJS from "react-native-crypto-js";

const SecretPattern = ({navigation, route}) => {
  const data = route.params.data || {}; 
  
  console.log('Pattern is', data);
  const [navstate,setNavState]=useState(false);

  let  patterns=data.secretpattern.split("").reduce((acc, char) => char + acc, "");
  let dcrypto = data.dcode.split("").reduce((acc, char) => char + acc, "");

  console.log("code",patterns+dcrypto+"00")
  

  let ciphertext = CryptoJS.AES.decrypt(data.msg, patterns+dcrypto+"00");
  let originalText = ciphertext.toString(CryptoJS.enc.Utf8);
  data['encmsg']=originalText;

  

  console.log("ciphertext .....",originalText)

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
        {data.secretpattern}
      </Text>
      <Icon.Button
        name={navstate==false?"qr-code-scanner":'grid-view'}
        backgroundColor="#3b5998"
        onPress={() => navigation.navigate(navstate == false ?'Scanner':'Grid')}>
        {navstate == false ?'Go To Scanner':'Go To Pattern'}
        
      </Icon.Button>
      <View style={{marginBottom:5}}></View>
      <IconF.Button
        name={'message-square'}
        backgroundColor="#3b5998"
        onPress={() => navigation.navigate("MsgViewer",{data:data})}>
        {"View Message"}
      </IconF.Button>
    </View>
  );
};

export default SecretPattern;
