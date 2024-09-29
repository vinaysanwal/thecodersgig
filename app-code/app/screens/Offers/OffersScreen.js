import React, {useEffect} from 'react';
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
  TouchableOpacity,
} from 'react-native';

import {ShoppingDeals} from '../ApiData/OffersData';
import Item from '../Item';
// import {AdMobBanner} from 'react-native-admob';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

const adUnitId2 = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8886316915612634/4055528683';

const OffersScreen = ({navigation}) => {
  console.log(ShoppingDeals);
  useEffect(() => {
    const Action = () => {
      navigation.goBack();
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

      <View style={styles.mainBox}>
        <LinearGradient
          start={{x: 0.8, y: 0}}
          end={{x: 0, y: 0}}
          colors={['#E8DBFC', '#F8F9D2']}
          style={styles.linearGradient}>
          <FlatList
            horizontal={false}
            data={ShoppingDeals}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
          />
          {adUnitId2 && (
            <BannerAd
              unitId={adUnitId2}
              size={BannerAdSize.SMART_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          )}
        </LinearGradient>
      </View>
      {/* <View style={styles.mainBox}>
          <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-3940256099942544/6300978111"
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}
          />
        </View> */}
    </SafeAreaView>
  );
};

export default OffersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff2e6',
  },
  mainBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
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
  FirstBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    top: 2,
  },
  catText: {
    color: '#fff',
    padding: 3,
  },
});
