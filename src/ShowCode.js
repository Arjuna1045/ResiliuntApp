import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Endpoints} from './API/Endpoints';
import { getUname } from './Utilities';
import { postRequest } from './Services/ApiCall';

const ShowCode = ({navigation,route}) => {
  const data = route.params.data || {}; // Accessing the passed data
  console.log("Data is",data);
  const patternCode = data[0].cardIndex+data[1].cardIndex+data[2].cardIndex+data[3].cardIndex;
  console.log(patternCode)

  const checkpattern = async () => {
    let getname = await getUname()
    console.log(getname)
    getname=getname.replace(/^"(.+(?="$))"$/, '$1');
    let parms = {
      userName: getname,
      patternCode: patternCode,
    };

    let post = await postRequest(Endpoints.COLOR_CODE, parms);
    console.log(JSON.stringify(post));
   
    if(post.status == "success"){
      navigation.navigate("Scanner")
    }else{
      Alert.alert(post.status)
    }
  };

  return (
    <View  style={{flex:1,flexDirection:'column'}}>
      <View style={styles.container}>
      {data && data.length > 0 ? (
        data.map(item => (
          <View
            key={item.id}
            style={[styles.colorBox, {backgroundColor: item.color}]}>
            {/* <Text style={styles.colorText}>{item.id}</Text> */}
            {/* <Text style={styles.colorName}>{item.colorName}</Text> */}
          </View>
        ))
      ) : (
        <Text>No data available</Text>
      )}
      </View>
      <View style={{position:'absolute',bottom:10,left:'40%'}}>
      <TouchableOpacity onPress={checkpattern} style={styles.button} >
        <Text style={{color:'white',fontSize:16,fontWeight:'700',letterSpacing:0.4}}>Get Code</Text>
      </TouchableOpacity>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
   display:'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  colorBox: {
    width: 110,
    height: 120,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
  },
  colorText: {
    fontSize: 16,
    color: 'white',
  },
  colorName: {
    fontSize: 16,
    color: 'white',
    textAlign:'left'
  },
  button:{
    padding:15,
    backgroundColor:'blue',
    borderRadius:10,
  }
});

export default ShowCode;
