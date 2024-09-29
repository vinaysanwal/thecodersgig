import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  BackHandler,
  Alert,
  Linking,
} from 'react-native';
import Item from './MyFavItem';
import {AllApps} from '../ApiData/AppData';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

const adUnitId2 = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8886316915612634/4055528683';

const MyApps = ({navigation}) => {
  const [GameData, setGameData] = useState('');

  useEffect(() => {
    const Action = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => navigation.goBack()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      Action,
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          'Warning!',
          'Phone is Not connected to internet? Check Your Connection',
          [
            {
              text: 'Open App Settings',
              onPress: () => Linking.openSettings(),
              style: 'cancel',
            },
            {text: 'Exit', onPress: () => BackHandler.exitApp()},
          ],
        );
      }
    });
    unsubscribe();
  }, []);

  useEffect(() => {
    async function getGameData() {
      try {
        const value = await AsyncStorage.getItem('fav_app_key');
        let val = value.replace(/\D/g, ' ');
        val = val.match(/[^ ,]+/g).join(',');
        val = val.split(',');
        //removing duplicate of an array
        val = [...new Set(val)];
        val = val.map((i) => 'a' + i);

        let myJSON = JSON.stringify(AllApps);
        myJSON = JSON.parse(myJSON);

        let matching = [];
        myJSON.forEach(function (sandwich, index) {
          val.forEach(function (value, index) {
            if (sandwich.uuid == value) {
              matching.push(sandwich);
            }
          });
        });

        // var intersections = val.filter((e) => matching.indexOf(e) !== -1);
        setGameData(matching);
      } catch (e) {
        // error reading value
      }
    }

    getGameData();
  }, []);

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Header />

      <LinearGradient
        start={{x: 0.8, y: 0}}
        end={{x: 0, y: 0}}
        colors={['#e1eec3', '#f05053']}
        style={styles.linearGradient}>
        {adUnitId2 && (
          <BannerAd
            unitId={adUnitId2}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        )}
        <FlatList
          numColumns={3}
          keyExtractor={(item, index) => index}
          data={GameData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default MyApps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  linearGradient: {
    flex: 1,
    borderRadius: 1,
  },
  textStyle: {
    fontSize: 22,
    color: '#000',
    paddingLeft: 10,
    top: 8,
  },
});
