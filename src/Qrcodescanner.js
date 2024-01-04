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
import {getToken} from './Utilities';
import {postRequest} from './Services/ApiCall';
// import Pro from './Pro';

export default function Notifications({navigation}) {
  const [hasPermission, setHasPermission] = React.useState(false);
  const isfocus = useIsFocused();
  const [barCode, setBarCode] = React.useState([]);
  const [scannerKey, setScannerKey] = React.useState(1);

  const remountScanner = () => {
    setScannerKey((prevKey) => prevKey + 1);
  };

  const time = setTimeout(() => {
  }, 1000);
  React.useEffect(() => {
    remountScanner()
    console.log("Scanner place...")
  }, [isfocus]);

  const getCode = async data => {
    let parms = {
      mainUuid: data[1],
      messageType: data[2],
      uuid: data[0],
    };
    let post = await postRequest(Endpoints.SCAN_CODE, parms);
    console.log(post)
    if (post.status == 'error') {
      Alert.alert(post.message);
    } else {
      navigation.navigate('Secret Pattern', {data:post.secretPattern});
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



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.scannerContainer}>
        <QRCodeScanner
         key={scannerKey} 
          onRead={onSuccess}
          showMarker={true}
          
        />
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
