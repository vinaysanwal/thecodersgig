import React from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';


const AppCategoryItem = ({item, onPress}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('DetailScreen', {
          url: item.url,
          title: item.name,
          bgcolor: item.bgcolor,
          image: item.images,
          type: item.type,
        })
      }
      style={styles.card}>
      <View style={styles.box}>
        <View style={styles.imageBox}>
          <View style={styles.imageInsideBox}>
            <Image source={{uri: item.images}} style={styles.image} />
          </View>

          <View style={styles.textInsideBox}>
            <Text style={styles.ImageText}>{item.name}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default AppCategoryItem;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    paddingVertical: 12,
    paddingLeft: 10,
  },
  imageBox: {
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 20,
  },
  image: {
    width: 80,
    height: 80,
  },
  ImageText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#000',
  },
  imageInsideBox: {
    width: '100%',
    alignItems: 'center',
  },
  textInsideBox: {
    width: '100%',
    top: 3,
  },
});
