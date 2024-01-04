

import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

const ColorBox = ({ data, order, updateClickOrder }) => {
  const handlePress = () => {
    updateClickOrder(order - 1); // Subtracting 1 to match array index
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[GridStyle.gridStyle, { backgroundColor: data }]}>
        <View style={styles.textContainer}>
          <Text>{order}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
  const GridStyle = StyleSheet.create({
    gridContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    gridBox: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    gridStyle: {
      width: 200,
      height: 200,
      // borderRadius:10
    },
  });


  const styles = StyleSheet.create({
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default ColorBox;
