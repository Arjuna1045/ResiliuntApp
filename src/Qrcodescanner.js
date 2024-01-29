// import {BarcodeMask} from '@nartc/react-native-barcode-mask';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import * as React from 'react';
// import { CameraRoll } from "@react-native-camera-roll/camera-roll";
// import { CameraRoll } from 'react-native';
 

import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Alert,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
// import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import IconA from 'react-native-vector-icons/AntDesign';
import {Endpoints} from './API/Endpoints';
import {getToken, getUname} from './Utilities';
import {postRequest} from './Services/ApiCall';
import Icon from 'react-native-vector-icons/Feather';
import { Platform, PermissionsAndroid } from 'react-native';

// import Pro from './Pro';

import {launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';

export default function Notifications({navigation}) {
  
  React.useEffect(() => {}, []);
  const openlibrary = async () => {
    const galleryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };
    launchImageLibrary(galleryOptions, res => {
      if (res.didCancel) {
        console.error('cancelled');
      } else {
       
        RNQRGenerator.detect({
          base64: res?.assets[0]?.base64,
        })
          .then(item => {
            console.log('QR response', item.values[0].split(' '));
            let res = item.values[0].split(' ');

            getCode(res);
            console.log('final data is', data);
          })
        
          .catch(err => {
            console.log(err);
          });
        
      }

      console.log('QR DATA IS', res);
    }).catch(err => {
      console.log('err', err);
    });
  };

 


  const [hasPermission, setHasPermission] = React.useState(false);
  const [decryptmsg, setEncrypt] = React.useState();
  const [decrypt, setDecryptCode] = React.useState();
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
    let getname = await getUname();

    console.log(getname);
    getname = getname.replace(/^"(.+(?="$))"$/, '$1');

    let params = {
      mainUuid: data[1],
      messageType: data[2],
      uuid: data[0],
      userName:getname
    };
    let post = await postRequest(Endpoints.SCAN_CODE, params);
    console.log('Params Are....', params);
    console.log(post);
    if (post.status == 'error') {
      Alert.alert(post.message);
    } else {
      setPattern(post.secretPattern);
      getmsg(data, post.secretPattern);
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

  const getmsg = async (data, patterns) => {
    console.log('Data is ...', data);

    let getname = await getUname();
    getname = getname.replace(/^"(.+(?="$))"$/, '$1');

    let reversedPattern = patterns.split('').reverse().join('');

    let parms = {
      patternCode: reversedPattern,
      sender: getname,
      mainUuid: data[1],
      messageType: data[2],
      uuid: data[0],
    };

    try {
      let post = await postRequest(Endpoints.DECRYPT_MSG, parms);
      console.log(parms, 'prams.......');
      console.log('message is ......', post);
      const encryptedMsg = post?.message?.message?.encryptedMessage;
      if (typeof encryptedMsg !== 'undefined') {
        console.log('Response is .......', encryptedMsg);

        const payload = {
          secretpattern: patterns,
          msg: encryptedMsg,
          dcode: post.message.message.decryptedOTP,
          sender: post.message.message.sender,
        };

        navigation.navigate('Secret Pattern', {data: payload});
      } else {
        Alert.alert(post.status)
        console.log('No encrypted message found in the response.');
      }
    } catch (error) {
      console.error('Error during decryption:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.scannerContainer}>
        <QRCodeScanner key={scannerKey} onRead={onSuccess} showMarker={true} />
      </View>
      <View style={styles.bottomContent}>
        <Icon.Button
          name="upload"
          backgroundColor="#3b5998"
          onPress={openlibrary}>
          Upload QR Image
        </Icon.Button>
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
