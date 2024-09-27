import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  BackHandler,
  Alert,
  Linking,
  Image,
  TouchableOpacity,
  RefreshControl,
  Pressable,
} from 'react-native';
import {PopularApps, NewsApps, ToolsApps} from './ApiData/AppData';
import {BestGames} from './ApiData/GameData';

import Item from './Item';
import Header from '../components/Header';
import * as FacebookAds from 'expo-ads-facebook';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
FacebookAds.AdSettings.addTestDevice(FacebookAds.AdSettings.currentDeviceHash);
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import {Button} from 'react-native-paper';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8886316915612634/6720415892';

const adUnitId2 = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8886316915612634/4055528683';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const HomeScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const image = [
    'https://i.ibb.co/8bYM6kC/cattegory-banner-min.png',
    'https://i.ibb.co/wgM7xtM/Offers-min-1-1.png',
    'https://i.ibb.co/P4wMcCy/thecodersgig-min-1.png',
  ];

  useEffect(() => {
    const Action = () => {
      Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
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

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.mainBox}>
          <LinearGradient
            start={{x: 0.8, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#E8DBFC', '#F8F9D2']}
            style={styles.linearGradient}>
            <View>
              <Text style={styles.textStyle}>Popular Apps</Text>
            </View>
            <FlatList
              horizontal={true}
              data={PopularApps}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </LinearGradient>
        </View>
        {/* <View style={styles.mainBox}>
           <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-8886316915612634/6720415892"
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={(error) => console.error(error)}
          /> 
        </View> */}
        {adUnitId && (
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        )}
        <View style={styles.mainBox}>
          <LinearGradient
            start={{x: 0.8, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#E8DBFC', '#F8F9D2']}
            style={styles.linearGradient}>
            <View style={styles.box}>
              <View style={styles.appBox}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MyApp');
                  }}>
                  <Image
                    style={{width: '100%', height: 150}}
                    source={require('../screens/assests/appBox_icon.png')}
                  />
                </TouchableOpacity>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('MyApp');
                  }}>
                  <Text style={styles.text}>VISIT</Text>
                </Pressable>
              </View>

              <View style={styles.gameBox}>
                <Image
                  style={{width: '100%', height: 150}}
                  source={require('../screens/assests/gameBox_icon.png')}
                />
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('MyGame');
                  }}>
                  <Text style={styles.text}>VISIT</Text>
                </Pressable>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.mainBox}>
          <LinearGradient
            start={{x: 0.8, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#E8DBFC', '#F8F9D2']}
            style={styles.linearGradient}>
            <View>
              <Text style={styles.textStyle}>Top Games</Text>
            </View>
            <FlatList
              horizontal={true}
              data={BestGames}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </LinearGradient>
        </View>
        {adUnitId2 && (
          <BannerAd
            unitId={adUnitId2}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        )}
        <View style={styles.mainBox}>
          <LinearGradient
            start={{x: 0.8, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#e1eec3', '#f05053']}
            style={styles.linearGradient}>
            <View>
              <Text style={styles.textStyle}>Tools</Text>
            </View>
            <FlatList
              horizontal={true}
              data={ToolsApps}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </LinearGradient>
        </View>

        <View style={styles.mainBox}>
          <LinearGradient
            start={{x: 0.8, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#e1eec3', '#f05053']}
            style={styles.linearGradient}>
            <View>
              <Text style={styles.textStyle}>News</Text>
            </View>
            <FlatList
              horizontal={true}
              data={NewsApps}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </LinearGradient>
        </View>
        {adUnitId2 && (
          <BannerAd
            unitId={adUnitId2}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff2e6',
  },
  mainBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
  },
  appBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    flex: 1,
    backgroundColor: '#e1eec3',
    borderRadius: 30,
    height: 200,
    overflow: 'hidden',
  },
  gameBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    flex: 1,
    backgroundColor: '#e1eec3',
    borderRadius: 30,
    overflow: 'hidden',
  },
  ImageBox: {},
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
  ButtonStyleApp: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  CategoryItem: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  catText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  openButton: {
    borderRadius: 20,
    padding: 1,
    elevation: 1,
    top: 1,
    alignItems: 'flex-end',
    backgroundColor: '#2c3e50',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#fff',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#85144b',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
