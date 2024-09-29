import React, {useState, useEffect} from 'react';
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
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {ShoppingApps} from '../ApiData/AppData';
import {SocialApps} from '../ApiData/AppData';
import {FoodApps} from '../ApiData/AppData';
import {GroceryApps} from '../ApiData/AppData';
import {MedicalApps} from '../ApiData/AppData';
import {FurnitureApps} from '../ApiData/AppData';
import Item from '../Item';
import Header from '../../components/Header';
// import {AdMobBanner} from 'react-native-admob';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

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

const AppScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

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
            <View style={styles.FirstBox}>
              <View>
                <Text style={styles.textStyle}>Shopping Apps</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('CategoryApp');
                  }}>
                  {/* <Icon name="home" size={30} color="red" /> */}
                  <Text style={styles.catText}>All Apps</Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              horizontal={true}
              data={ShoppingApps}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
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
            colors={['#E8DBFC', '#F8F9D2']}
            style={styles.linearGradient}>
            <View>
              <Text style={styles.textStyle}>Social Apps</Text>
            </View>
            <FlatList
              horizontal={true}
              data={SocialApps}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </LinearGradient>
        </View>
        {/* <View style={styles.mainBox}>
          <BannerView
            placementId="235238147698773_235333101022611"
            type="large"
            onPress={() => console.log('click')}
            onLoad={() => console.log('loaded')}
            onError={err => console.log('error', err)}
          />
        </View> */}

        <View style={styles.mainBox}>
          <LinearGradient
            start={{x: 0.8, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#E8DBFC', '#F8F9D2']}
            style={styles.linearGradient}>
            <View>
              <Text style={styles.textStyle}>Food Delivery Apps</Text>
            </View>
            <FlatList
              horizontal={true}
              data={FoodApps}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </LinearGradient>
        </View>
        <View style={styles.mainBox}>
          <LinearGradient
            start={{x: 0.8, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#E8DBFC', '#F8F9D2']}
            style={styles.linearGradient}>
            <View>
              <Text style={styles.textStyle}>Grocery Apps</Text>
            </View>
            <FlatList
              horizontal={true}
              data={GroceryApps}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </LinearGradient>
        </View>

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
            <View>
              <Text style={styles.textStyle}>Medicine Apps</Text>
            </View>
            <FlatList
              horizontal={true}
              data={MedicalApps}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </LinearGradient>
        </View>
        <View style={styles.mainBox}>
          <LinearGradient
            start={{x: 0.8, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#E8DBFC', '#F8F9D2']}
            style={styles.linearGradient}>
            <View>
              <Text style={styles.textStyle}>Furniture Apps</Text>
            </View>
            <FlatList
              horizontal={true}
              data={FurnitureApps}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppScreen;

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
