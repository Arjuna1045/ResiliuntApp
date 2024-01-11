// import {BarcodeMask} from '@nartc/react-native-barcode-mask';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import * as React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Vibration,
  Alert,
} from 'react-native';
// import {useCameraDevices} from 'react-native-vision-camera';
// import {Camera} from 'react-native-vision-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
// import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import IconA from 'react-native-vector-icons/AntDesign';
import {Endpoints} from './API/Endpoints';
import {getToken, getUname} from './Utilities';
import {postRequest} from './Services/ApiCall';
// import Pro from './Pro';

export default function Notifications({navigation}) {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [decryptmsg,setEncrypt]=React.useState();
  const [decrypt,setDecryptCode]=React.useState()
  const isfocus = useIsFocused();
  const [barCode, setBarCode] = React.useState([]);
  const [scannerKey, setScannerKey] = React.useState(1);
  const [pattern, setPattern] = React.useState('');

  const remountScanner = () => {
    setScannerKey(prevKey => prevKey + 1);
  };
 
  const time = setTimeout(() => {}, 1000);
  React.useEffect(() => {
    remountScanner();
    console.log('Scanner place...');
  }, [isfocus]);

  const getCode = async data => {
  
    let parms = {
      mainUuid: data[1],
      messageType: data[2],
      uuid: data[0],
    };
    let post = await postRequest(Endpoints.SCAN_CODE, parms);
    console.log(post);
    if (post.status == 'error') {
      Alert.alert(post.message);
    } else {
      setPattern(post.secretPattern);
      getmsg(data,post.secretPattern)
      
    }
  };

  const onSuccess = e => {
    console.log('Scanned Data....', JSON.stringify(e));
    console.log(e.data);
    if (e.data) {
      console.log('Scanned Data...', e.data);
      let data = e.data.split(' ');
      console.log('splitted data', data);
      getCode(data);
    }
  };

  // const getmsg = async (data) => {
  //   console.log("Data is ...",data)
  //   let getname = await getUname()
  //   getname=getname.replace(/^"(.+(?="$))"$/, '$1');
  //  let  patterns=pattern.split("").reduce((acc, char) => char + acc, "");
  //   let parms = {
  //     patternCode: patterns,
  //     sender: getname,
  //     mainUuid: data[1],
  //     messageType: data[2],
  //     uuid: data[0],
  //   };
  //   let post = await postRequest(Endpoints.DECRYPT_MSG, parms);
  //   console.log("Response is .......",post?.message)
  //   // setEncrypt(post.message.message.encryptedMessage);
  //   // setDecryptCode(post.message.message.decryptedOTP);
  //   const payload = {
  //     secretpattern:pattern,
  //     msg:post.message.message.encryptedMessage,
  //     dcode:post.message.message.decryptedOTP,
  //   }
  //   navigation.navigate('Secret Pattern', {data: payload});
  // };


  const getmsg = async (data,patterns) => {
    console.log("Data is ...", data);
    
    let getname = await getUname();
    getname = getname.replace(/^"(.+(?="$))"$/, '$1');
    
    let reversedPattern = patterns.split("").reverse().join("");
    
    let parms = {
      patternCode: reversedPattern,
      sender: getname,
      mainUuid: data[1],
      messageType: data[2],
      uuid: data[0],
    };
    
    try {
      let post = await postRequest(Endpoints.DECRYPT_MSG, parms);
      console.log("message is ......",post.message)
      const encryptedMsg = post?.message?.message?.encryptedMessage;
      if (typeof encryptedMsg !== 'undefined') {
        console.log("Response is .......", encryptedMsg);
        
        const payload = {
          secretpattern: patterns,
          msg: encryptedMsg,
          dcode: post.message.message.decryptedOTP,
        };
        
        navigation.navigate('Secret Pattern', { data: payload });
      } else {
        console.log("No encrypted message found in the response.");
        
      }
    } catch (error) {
      console.error("Error during decryption:", error);
     
    }
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.scannerContainer}>
        <QRCodeScanner key={scannerKey} onRead={onSuccess} showMarker={true} />
      </View>
      <View style={styles.bottomContent}>
        {/* <Text>Custom bottom content if needed</Text> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
