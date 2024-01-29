import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/AntDesign';

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('login');
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Icon size={24} name="logout" color={"red"}/>
    </TouchableOpacity>
  );
};

export default LogoutButton;
