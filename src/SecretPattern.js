import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/Feather';
import CryptoJS from 'react-native-crypto-js';
import OTPTextView from 'react-native-otp-textinput';

import {useFocusEffect} from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';

const SecretPattern = ({navigation, route}) => {
  const data = route.params.data || {};

  console.log('Pattern is', data.sender);
  const [sender] = useState(data.sender || '');
  const [navstate, setNavState] = useState(false);
  const [nextScreen,setNextScreen]=useState(false)

  const [code, setCode] = useState('');
  const [showdata, setShowData] = useState(false);
  // const [count,setCount]=useState(0)

  // const navigation = useNavigation();
  const [seconds, setSeconds] = useState(30);
  let intervalId;
  useEffect(() => {
     intervalId = setInterval(() => {
      setSeconds((prev)=>prev-1)
    },
      1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigation]);

 
 



  let patterns = data.secretpattern
    .split('')
    .reduce((acc, char) => char + acc, '');
  let dcrypto = data.dcode.split('').reduce((acc, char) => char + acc, '');
  // console.log('code', patterns + dcrypto + '00');

  let ciphertext = CryptoJS.AES.decrypt(data.msg, patterns + dcrypto + '00');
  let originalText = ciphertext.toString(CryptoJS.enc.Utf8);
  const cleanedString = originalText.replace(/["\\]/g, '');
  data['encmsg'] = originalText;

  // console.log('ciphertext .....', originalText);
const timerbomb=  setTimeout(() => {
    setNavState(true);
  }, 30000);


  const handlemsg = value => {
    if (data.secretpattern === value) {
      let data = {
        string: cleanedString,
        sender: sender,
      };
      // setCount(0);setSeconds(30)
     setNextScreen(true)
      navigation.navigate('ShowCode', {data: data});
    }
    if (data.secretpattern !== value) {
      setShowData(false);
    }
  };

  
  if (navstate == true && nextScreen== false) {
    navigation.goBack();
  }

  useFocusEffect(
    React.useCallback(() => {
      
      return () =>{
        clearInterval(intervalId);
        clearTimeout(timerbomb)
      };
    }, [intervalId])
  );


  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <Text
          style={{
            marginBottom: 10,
            marginTop: 50,
            fontWeight: 500,
            color: 'black',
          }}>
          Secret to view the message
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: 'black',
            marginBottom: 10,
          }}>
          {data.secretpattern}
        </Text>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 30,
            fontSize: 14,
            backgroundColor: 'red',
            padding: 4,
            borderRadius: 15,
            fontWeight: 600,
            color: 'white',
          }}>
          {seconds > 0 ? `${seconds} seconds` : 'Timer Expired'}
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: 'black',
            marginBottom: 10,
          }}>
          Enter Secret Pattern{' '}
        </Text>
        <Text style={{marginBottom: 15, color: 'black'}}>
          to View Encrypt Message:
        </Text>

       
         <OTPTextView
          handleTextChange={value => handlemsg(value)}
        containerStyle={styles.otpContainer}
        textInputStyle={styles.otpInput}
        inputCount={8}
        inputCellLength={1} // Adjust the length based on your design
      />
        
        <View style={{padding: 5}}>
          {showdata && (
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: 400,
                marginLeft: 5,
                textAlign: 'justify',
              }}>
              {cleanedString}
            </Text>
          )}
        </View>
        {/* {seconds > 0 && (
        <Button title="Reset Timer" onPress={resetTimer} />
      )} */}
        {/* <Icon.Button
        name={navstate == false ? 'qr-code-scanner' : 'grid-view'}
        backgroundColor="#3b5998"
        onPress={() =>
          navigation.navigate(navstate == false ? 'Scanner' : 'Grid')
        }>
        {navstate == false ? 'Go To Scanner' : 'Go To Pattern'}
      </Icon.Button> */}
        {/* <View style={{marginBottom: 5}}></View>
      <IconF.Button
        name={'message-square'}
        backgroundColor="#3b5998"
        onPress={() => navigation.navigate('MsgViewer', {data: data})}>
        {'View Message'}
      </IconF.Button> */}
      </View>
    </ScrollView>
  );
};

export default SecretPattern;

const styles = StyleSheet.create({
  roundedTextInput: {
    borderBottomWidth:2,
    marginLeft:1,
    borderBottomColor:'black'
 
  },
  textInputContainer: {
    marginBottom: 20,
    borderBottomWidth:1,
    marginLeft:1,
    borderBottomColor:'black'
    // width:400
  },
  textStyles: {
   
    color: 'black',
    fontSize: 16,
  },
  inputStyles: {
    // Add any custom styles for the OTP input cells
    borderBottomWidth: 2,
    borderColor: 'black',
    // borderRadius: 8,
    fontSize: 16,
    marginHorizontal: 8,
    padding: 4,
  },
  otpContainer: {
    flexDirection: 'row',
  },
  otpInput: {
    // Custom styles for the OTP input
    borderBottomWidth: 4,
    borderBottomColor:'black',
    // borderRadius: 8,
    margin: 5,
    textAlign: 'center',
    fontSize: 16,
    width: 30, // Adjust the width based on your design
  },
});
