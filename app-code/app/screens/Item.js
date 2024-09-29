import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const item = ({item, onPress}) => {
  const navigation = useNavigation();

  const [GameDataIcon, setGameDataIcon] = useState('heart-outline');
  const [GameDataIconColor, setGameDataIconColor] = useState('#000');

  const [ItemData, setItemData] = useState(item);
  const [ItemDisplay, setItemDisplay] = useState('flex');

  // To get the value from the TextInput
  const [textInputValue, setTextInputValue] = useState(item.uuid);
  // To set the value on Text

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      async function getGameData() {
        let type = item.type;

        if (type == 'app') {
          try {
            const value = await AsyncStorage.getItem('fav_app_key');
            let val = value.replace(/\D/g, ' ');
            val = val.match(/[^ ,]+/g).join(',');
            val = val.split(',');
            //removing duplicate of an array
            val = [...new Set(val)];
            val = val.map((i) => 'a' + i);

            let myJSON = JSON.stringify(item);
            myJSON = JSON.parse(myJSON);
            myJSON = [myJSON];

            myJSON.forEach(function (sandwich, index) {
              val.forEach(function (value, index) {
                if (sandwich.uuid == value) {
                  setGameDataIcon('heart');
                  setGameDataIconColor('red');
                }
              });
            });
          } catch (e) {
            // error reading value
          }
        } else if (type == 'game') {
          try {
            const value = await AsyncStorage.getItem('fav_game_key');
            let val = value.replace(/\D/g, ' ');
            val = val.match(/[^ ,]+/g).join(',');
            val = val.split(',');
            //removing duplicate of an array
            val = [...new Set(val)];
            val = val.map((i) => 'g' + i);

            let myJSON = JSON.stringify(item);
            myJSON = JSON.parse(myJSON);
            myJSON = [myJSON];

            let matching = [];
            myJSON.forEach(function (sandwich, index) {
              val.forEach(function (value, index) {
                if (sandwich.uuid == value) {
                  setGameDataIcon('heart');
                  setGameDataIconColor('red');
                }
              });
            });
          } catch (e) {
            // error reading value
          }
        }
      }

      getGameData();
    }

    return () => (isSubscribed = false);
  }, []);

  const favdata = {
    item: item.uuid,
  };

  const storeData = async (value) => {
    //logic to check type
    const type = item.type;

    if (type == 'app') {
      setTextInputValue(favdata);
      if (await textInputValue) {
        const dataisthere = await AsyncStorage.getItem('fav_app_key');
        console.log('Inside app');
        if (dataisthere != null) {
          let datais = dataisthere.replace(/\D/g, ' ');
          datais = datais.match(/[^ ,]+/g).join(',');
          datais = datais.split(',');
          //removing duplicate of an array
          datais = [...new Set(datais)];
          datais = datais.map((i) => 'a' + i);

          setGameDataIcon('heart');
          setGameDataIconColor('red');
          try {
            const jsonValue = JSON.stringify(textInputValue);
            let nextId = item.uuid;
            datais.forEach(async (newdata, index) => {
              if (newdata == nextId) {
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
              } else {
                await AsyncStorage.setItem(
                  'fav_app_key',
                  dataisthere.concat(jsonValue),
                );
              }
            });
          } catch (e) {}
        } else {
          try {
            const jsonValue = JSON.stringify(textInputValue);
            await AsyncStorage.setItem('fav_app_key', jsonValue);
            setGameDataIcon('heart');
            setGameDataIconColor('red');
          } catch (e) {}
        }
      } else {
      }
    } else if (type == 'game') {
      setTextInputValue(favdata);
      if (textInputValue) {
        const dataisthere = await AsyncStorage.getItem('fav_game_key');
        if (dataisthere != null) {
          let datais = dataisthere.replace(/\D/g, ' ');
          datais = datais.match(/[^ ,]+/g).join(',');
          datais = datais.split(',');
          //removing duplicate of an array
          datais = [...new Set(datais)];
          datais = datais.map((i) => 'g' + i);
          setGameDataIcon('heart');
          setGameDataIconColor('red');

          try {
            const jsonValue = JSON.stringify(textInputValue);
            let nextId = item.uuid;
            datais.forEach(async (newdata, index) => {
              if (newdata == nextId) {
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
              } else {
                await AsyncStorage.setItem(
                  'fav_game_key',
                  dataisthere.concat(jsonValue),
                );
              }
            });
          } catch (e) {}
        } else {
          try {
            const jsonValue = JSON.stringify(textInputValue);
            await AsyncStorage.setItem('fav_game_key', jsonValue);
            setGameDataIcon('heart');
            setGameDataIconColor('red');
          } catch (e) {}
        }
      } else {
      }
    }
  };

  function remove_array_element(array, n) {
    var index = array.indexOf(n);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const type = item.type;
      const uuid = item.uuid;
      if (type == 'game') {
        try {
          const value = await AsyncStorage.getItem('fav_game_key');
          if (value == null) {
            setGameDataIcon('heart-outline');
            setGameDataIconColor('#000');
          } else {
            let val = value.replace(/\D/g, ' ');
            val = val.match(/[^ ,]+/g).join(',');
            val = val.split(',');
            val = [...new Set(val)];
            val = val.map((i) => 'g' + i);
            if (val.includes(uuid)) {
              setGameDataIcon('heart');
              setGameDataIconColor('red');
            } else {
              setGameDataIcon('heart-outline');
              setGameDataIconColor('#000');
            }
          }
        } catch (e) {
          // remove error
        }
      } else if (type == 'app') {
        try {
          const value = await AsyncStorage.getItem('fav_app_key');
          if (value == null) {
            setGameDataIcon('heart-outline');
            setGameDataIconColor('#000');
          } else {
            let val = value.replace(/\D/g, ' ');
            val = val.match(/[^ ,]+/g).join(',');
            val = val.split(',');
            val = [...new Set(val)];
            val = val.map((i) => 'a' + i);

            if (val.includes(uuid)) {
              setGameDataIcon('heart');
              setGameDataIconColor('red');
            } else {
              setGameDataIcon('heart-outline');
              setGameDataIconColor('#000');
            }
          }
        } catch (e) {
          // remove error
        }
      }
    });
    return unsubscribe;
  }, [navigation]);

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
          setGameDataIconColor('#000');
          setGameDataIcon('heart-outline');
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
          setGameDataIconColor('#000');
          setGameDataIcon('heart-outline');
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
          setGameDataIconColor('#000');
          setGameDataIcon('heart-outline');
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
          setGameDataIconColor('#000');
          setGameDataIcon('heart-outline');
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
        {ItemData.type == 'offers' ? (
          <View style={styles.box}>
            <View style={styles.imageBox1}>
              <View style={styles.imageInsideBox}>
                <Image source={{uri: ItemData.images}} style={styles.image1} />
              </View>
              <View style={styles.textInsideBox}>
                <Text style={styles.ImageText1}>{ItemData.name}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.box}>
            <View style={styles.imageBox}>
              <View style={styles.imageInsideBox}>
                <Image source={{uri: ItemData.images}} style={styles.image} />
              </View>
              <View style={styles.textInsideBox}>
                <Text style={styles.ImageText}>{ItemData.name}</Text>
              </View>

              <View>
                <TouchableOpacity onPress={storeData}>
                  <Icon
                    name={GameDataIcon}
                    size={20}
                    color={GameDataIconColor}
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
        )}
      </View>
    </Pressable>
  );
};

export default item;

const styles = StyleSheet.create({
  card: {
    flex: 1,
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
    width: 60,
    height: 60,
  },
  imageBox1: {
    padding: 10,
    shadowColor: '#ffccff',
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    backgroundColor: '#f2f2f2',
    elevation: 5,
    borderRadius: 20,
  },
  image1: {
    width: 160,
    height: 160,
  },
  ImageText: {
    textAlign: 'center',
    fontSize: 8,
    color: '#000',
  },
  ImageText1: {
    textAlign: 'center',
    fontSize: 16,
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
