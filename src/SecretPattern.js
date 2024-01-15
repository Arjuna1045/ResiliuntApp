import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/Feather';
import CryptoJS from 'react-native-crypto-js';
// import OtpInputs from 'react-native-otp-inputs';
import OTPTextView from 'react-native-otp-textinput';

const SecretPattern = ({navigation, route}) => {
  const data = route.params.data || {};

  console.log('Pattern is', data);
  const [navstate, setNavState] = useState(false);
  const [timer, settimer] = useState();
  const [code, setCode] = useState('');
  const [showdata, setShowData] = useState(false);

  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    // Clear the interval when the component unmounts or when the timer reaches 0
    return () => clearInterval(timer);
  }, []);

  // Reset the timer to 30 seconds
  const resetTimer = () => {
    setSeconds(30);
  };

  let patterns = data.secretpattern
    .split('')
    .reduce((acc, char) => char + acc, '');
  let dcrypto = data.dcode.split('').reduce((acc, char) => char + acc, '');

  console.log('code', patterns + dcrypto + '00');

  let ciphertext = CryptoJS.AES.decrypt(data.msg, patterns + dcrypto + '00');
  let originalText = ciphertext.toString(CryptoJS.enc.Utf8);
  const cleanedString = originalText.replace(/["\\]/g, '');
  data['encmsg'] = originalText;

  console.log('ciphertext .....', originalText);

  const handlemsg = value => {
    if (data.secretpattern === value) {
      setShowData(true);
    }
    if(data.secretpattern !==value){
      setShowData(false)
    }
  };

  setTimeout(() => {
    setNavState(true);
  }, 30000);

  if (navstate == true) {
    navigation.goBack(); 
  }

  useState(() => {
    console.log('Currrnt State', navstate);
  }, []);

  return (
    <ScrollView>
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <Text style={{marginBottom: 10, marginTop: 50, fontWeight: 500,color:'black'}}>
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
      <Text style={{marginBottom:15,color:'black'}}>to View Encrypt Message:</Text>
     
      <OTPTextView
        handleTextChange={(value) => handlemsg(value)}
        containerStyle={styles.textInputContainer}
        textInputStyle={styles.roundedTextInput}
        inputCount={4}
        inputCellLength={2}
      />
      <View style={{padding:5}}>
      {showdata && <Text style={{color:'black',fontSize:14,fontWeight:400,marginLeft:5,textAlign:'justify'}}>{cleanedString}</Text>}
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
    borderRadius: 10,
    borderWidth: 4,
  },
  textInputContainer: {
    marginBottom: 20,
  },
});