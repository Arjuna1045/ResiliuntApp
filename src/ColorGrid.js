import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
const colorCodes = [
  {
    id: '1',
    cardIndex: '01',
    color: '#9400d3',
    clicked: '',
    colorName: 'Violet',
  },
  {
    id: '2',
    cardIndex: '02',
    color: '#4b0082',
    clicked: '',
    colorName: 'Indigo',
  },
  {id: '3', cardIndex: '03', color: '#0000ff', clicked: '', colorName: 'Blue'},
  {id: '4', cardIndex: '04', color: '#00ff00', clicked: '', colorName: 'Green'},
  {
    id: '5',
    cardIndex: '05',
    color: '#ffff00',
    clicked: '',
    colorName: 'Yellow',
  },
  {
    id: '6',
    cardIndex: '06',
    color: '#ff7f00',
    clicked: '',
    colorName: 'Orange',
  },
  {id: '7', cardIndex: '07', color: '#ff0000', clicked: '', colorName: 'Red'},
  {id: '8', cardIndex: '08', color: '#ffa07a', clicked: '', colorName: 'Peach'},
  {id: '9', cardIndex: '09', color: '#00ffff', clicked: '', colorName: 'Sky'},
];
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const ColorGrid = ({navigation}) => {
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [cardCode, setCardCode] = useState([]);
  const [data, setData] = useState();

  const clearState = () => {
    setClickedBoxes([]);
    setCardCode([]);
  };
  useFocusEffect(
    React.useCallback(() => {
      const shuffledArray = shuffleArray(colorCodes);
      setData(shuffledArray);
      clearState();
      return () => {};
    }, []),
  );

  const handleBoxClick = boxId => {
    const updatedClickedBoxes = [...clickedBoxes, boxId];
    const clickedData = updatedClickedBoxes.map(id =>
      colorCodes.find(colorObj => colorObj.id === id),
    );

    if (updatedClickedBoxes.length === 4) {
      navigation.navigate('Selected Pattern', {data: clickedData});
      clearState(); // Optional: Clearing the clicked boxes if needed after navigation
    }
    setClickedBoxes(updatedClickedBoxes);
  };

  const renderColorBox = ({item}) => (
    <View style={{paddingHorizontal: 5, paddingVertical: 5}}>
      <TouchableOpacity
        style={[styles.box, {backgroundColor: item.color}]}
        onPress={() => handleBoxClick(item.id)}
        disabled={clickedBoxes.includes(item.id)}>
        <Text
          style={
            item.colorName == 'Yellow'
              ? [{color: 'black'}, styles.boxText]
              : [styles.boxText, {color: 'white'}]
          }>
          {item.clicked || item.id}
        </Text>
        <Text
         style={
          item.colorName == 'Yellow'
            ? [{color: 'black'}, styles.ColorText]
            : [styles.ColorText, {color: 'white'}]
        }>
        {item.colorName}
      </Text>
      </TouchableOpacity>
      {/* <Text
        style={styles.ColorText}>
        {item.colorName}
      </Text> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderColorBox}
        keyExtractor={item => item.id}
        numColumns={3} // Adjust as per your requirement
      />
      <Text style={styles.clickedOrder}>
        PATTERN : {clickedBoxes.join(', ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical:10,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  box: {
    width: 95,
    height: 100,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  boxText: {
    fontSize: 24,
    // color: 'white',
    // backgroundColor:'black',
    // borderRadius:50,
    // width:30,
    // height:30
  },
  ColorText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  clickedOrder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default ColorGrid;
