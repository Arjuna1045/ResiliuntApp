import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput} from 'react-native';

const DataShow = ({route,navigation}) => {
    const data = route.params.data || {}
    const msg = route.params.msg || {}
    console.log(route.params)

  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
        <Text style={{color:'black',fontSize:16}}>{data.encmsg}</Text>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
                      placeholder="User Name / Email Address"
                      placeholderTextColor="#bbb"
                      style={styles.inputText}
                      onChangeText={uname =>
                       console.log(uname)
                      }
                    
                    />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // borderWidth:2,
    // borderColor:'red',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputText: {
    // flex: 1,
    paddingLeft: 10,
    fontSize: 14,
    color: 'grey',
    backgroundColor: '#f1f1f1',
  },
});

export default DataShow;