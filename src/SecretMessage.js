import {View, Text, Button, ScrollView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import RenderHtml from 'react-native-render-html';
import {Dimensions} from 'react-native';

export default function SecretMessage({navigation, route}) {
const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
  const data = route.params.data || {};
  navigation.setOptions({
    headerLeft: () => (
      // <Icon.Button
      //   name="arrow-left"
      //   // title="Back to Screen 1"
      //   onPress={() => navigation.navigate('Scanner')}
      // />
      <Icon name="arrow-left" size={24} color="black" style={{marginRight:15}} onPress={() => navigation.navigate('Scanner')}/>
    ),
    title: 'Secret Message',
  });
  const source = {
    html:`${data.string}`
  }
  function onElement(element) {
    // Remove the first p from div which has class "parentDiv"
    if (element.attribs['class'] == 'parentDiv') {
      let i = 0;
      for (const p of element.children) {
        if (isTag(p) && i < 1) {
          removeElement(p);
          i++;
        }
      }
    }
  }
  const domVisitors = {
    onElement: onElement
  };

  const mixedStyle = {
    body: {
      whiteSpace: 'normal',
      color: 'black',
      fontSize:14,
      fontWeight:'bold'
    },
    p: {
      color: 'black',
      fontSize:16,
      fontWeight:'bold'
    }
  }
  console.log(data,"data is",source);
  return (

    <ScrollView style={{padding:10}}>
      <Text style={{fontWeight:'bold',color:'black',marginBottom:5,fontSize:16}}>FROM : </Text>
      <Text  style={{color:'black',marginBottom:10,fontSize:16}}>{data.sender}</Text>
      <Text style={{color:'black',fontWeight:'bold',marginBottom:5,fontSize:16}}>MESSAGE :</Text>
      <RenderHtml
      tagsStyles={mixedStyle}
      contentWidth={windowWidth}
      source={source}
      domVisitors={domVisitors}
    />
    </ScrollView>
  );
}
