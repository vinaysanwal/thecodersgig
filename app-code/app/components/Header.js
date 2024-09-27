import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-gesture-handler';
import {useRoute, useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Icon
        name="menu"
        size={30}
        color="#000"
        onPress={() => navigation.openDrawer()}
      />
      <View style={styles.searchbar}>
        <Image
          style={{width: 250, height: 40}}
          source={require('../screens/assests/app_icon.png')}
        />
      </View>
      <Icon
        name="brightness-percent"
        size={30}
        color="#000"
        onPress={() => navigation.navigate('OffersScreen')}
      />
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#85144b',
    textAlign: 'center',
  },
  searchbar: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  input: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    backgroundColor: '#E6848C',
    width: 18,
    height: 18,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    right: -4,
    top: -4,
  },
  badgeText: {
    color: '#fff',
  },
});
