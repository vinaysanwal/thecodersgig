import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-gesture-handler';
import {useRoute, useNavigation} from '@react-navigation/native';

const HeaderSec = (props) => {
  const navigation = useNavigation();
  const color = props.color;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#000',
        textAlign: 'center',
      }}>
      <Icon
        name="arrow-left"
        size={30}
        color="#80bfff"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.searchbar}>
        <Image
          style={{width: 250, height: 40}}
          source={require('../screens/assests/drawerApp.png')}
        />
      </View>
    </View>
  );
};

export default HeaderSec;
const styles = StyleSheet.create({
  searchbar: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  input: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginLeft: 20,
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
