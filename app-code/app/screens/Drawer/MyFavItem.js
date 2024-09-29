import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyFavItem = ({item, onPress}) => {
  const navigation = useNavigation();

  const [ItemData, setItemData] = useState(item);
  const [ItemDisplay, setItemDisplay] = useState('flex');

  function remove_array_element(array, n) {
    var index = array.indexOf(n);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  const removeFavItem = async () => {
    Alert.alert(
      'Warning!',
      'Are You Sure? You want to remove item from Favourite',
      [
        {
          text: 'Remove Item',
          onPress: () => removeValue(),
        },
        {text: 'Cancel', style: 'cancel'},
      ],
    );
  };

  const removeValue = async () => {
    const type = item.type;
    const uuid = item.uuid;
    if (type == 'game') {
      try {
        const value = await AsyncStorage.getItem('fav_game_key');
        let val = value.replace(/\D/g, ' ');
        val = val.match(/[^ ,]+/g).join(',');
        val = val.split(',');
        val = [...new Set(val)];
        val = val.map((i) => 'g' + i);

        let del_arr = remove_array_element(val, uuid);

        if (del_arr.length === 0) {
          await AsyncStorage.removeItem('fav_game_key');
          const lala = await AsyncStorage.getItem('fav_game_key');
          let val1 = value.replace(/\D/g, ' ');
          val1 = val1.match(/[^ ,]+/g).join(',');
          val1 = val1.split(',');
          val1 = [...new Set(val1)];
          val1 = val1.map((i) => 'g' + i);
          setItemData('');
          setItemDisplay('none');
        } else {
          del_arr = JSON.stringify(del_arr);
          await AsyncStorage.removeItem('fav_game_key');
          await AsyncStorage.setItem('fav_game_key', del_arr);

          const lala = await AsyncStorage.getItem('fav_game_key');
          let val1 = lala.replace(/\D/g, ' ');
          val1 = val1.match(/[^ ,]+/g).join(',');
          val1 = val1.split(',');
          val1 = [...new Set(val1)];
          val1 = val1.map((i) => 'g' + i);
          setItemData('');
          setItemDisplay('none');
        }
      } catch (e) {
        // remove error
      }
    } else if (type == 'app') {
      try {
        const value = await AsyncStorage.getItem('fav_app_key');
        let val = value.replace(/\D/g, ' ');
        val = val.match(/[^ ,]+/g).join(',');
        val = val.split(',');
        val = [...new Set(val)];
        val = val.map((i) => 'a' + i);

        let del_arr = remove_array_element(val, uuid);

        if (del_arr.length === 0) {
          await AsyncStorage.removeItem('fav_app_key');
          const lala = await AsyncStorage.getItem('fav_app_key');
          let val1 = value.replace(/\D/g, ' ');
          val1 = val1.match(/[^ ,]+/g).join(',');
          val1 = val1.split(',');
          val1 = [...new Set(val1)];
          val1 = val1.map((i) => 'a' + i);
          setItemData('');
          setItemDisplay('none');
        } else {
          del_arr = JSON.stringify(del_arr);
          await AsyncStorage.removeItem('fav_app_key');
          await AsyncStorage.setItem('fav_app_key', del_arr);

          const lala = await AsyncStorage.getItem('fav_app_key');
          let val1 = lala.replace(/\D/g, ' ');
          val1 = val1.match(/[^ ,]+/g).join(',');
          val1 = val1.split(',');
          val1 = [...new Set(val1)];
          val1 = val1.map((i) => 'a' + i);
          setItemData('');
          setItemDisplay('none');
        }
      } catch (e) {
        // remove error
      }
    }
  };

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
      <View style={{display: ItemDisplay}}>
        <View style={styles.box}>
          <View style={styles.imageBox}>
            <View style={styles.imageInsideBox}>
              <Image source={{uri: ItemData.images}} style={styles.image} />
            </View>
            <View style={styles.textInsideBox}>
              <Text style={styles.ImageText}>{ItemData.name}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={removeFavItem}>
                <Icon
                  name="heart"
                  size={20}
                  color="red"
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    top: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MyFavItem;

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
