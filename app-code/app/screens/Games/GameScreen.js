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

import {
  NewGames,
  BestGames,
  Match3Games,
  BubbleGames,
  PuzzleGames,
  QuizGames,
  CardGames,
  GirlGames,
  JumpGames,
  ArcadeGames,
  RacingGames,
  SportsGames,
} from '../ApiData/GameData';
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

const GameScreen = ({navigation}) => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBox}>
          <LinearGradient
            start={{x: 0.8, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#E8DBFC', '#F8F9D2']}
            style={styles.linearGradient}>
            <View style={styles.FirstBox}>
              <View>
                <Text style={styles.textStyle}>New Games</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('CategoryGame');
                  }}>
                  {/* <Icon name="home" size={30} color="red" /> */}
                  <Text style={styles.catText}>All Games</Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              horizontal={true}
              data={NewGames}
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

        <View style={styles.mainBox}>
          <LinearGradient
            start={{x: 0.8, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#E8DBFC', '#F8F9D2']}
            style={styles.linearGradient}>
            <View>
              <Text style={styles.textStyle}>Best Games</Text>
            </View>
            <FlatList
              horizontal={true}
              data={BestGames}
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
              <Text style={styles.textStyle}>Match Games</Text>
            </View>
            <FlatList
              horizontal={true}
              data={Match3Games}
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
              <Text style={styles.textStyle}>Bubble Games</Text>
            </View>
            <FlatList
              horizontal={true}
              data={BubbleGames}
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
              <Text style={styles.textStyle}>Puzzle Games</Text>
            </View>
            <FlatList
              horizontal={true}
              data={PuzzleGames}
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
              <Text style={styles.textStyle}>Quiz Games</Text>
            </View>
            <FlatList
              horizontal={true}
              data={QuizGames}
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
              <Text style={styles.textStyle}>Card Games</Text>
            </View>
            <FlatList
              horizontal={true}
              data={CardGames}
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
              <Text style={styles.textStyle}>Girl Games</Text>
            </View>
            <FlatList
              horizontal={true}
              data={GirlGames}
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
              <Text style={styles.textStyle}>Jump & Run Games</Text>
            </View>
            <FlatList
              horizontal={true}
              data={JumpGames}
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
              <Text style={styles.textStyle}>Arcade Games</Text>
            </View>
            <FlatList
              horizontal={true}
              data={ArcadeGames}
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
              <Text style={styles.textStyle}>Racing Games</Text>
            </View>
            <FlatList
              horizontal={true}
              data={RacingGames}
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
              <Text style={styles.textStyle}>Sports Games</Text>
            </View>
            <FlatList
              horizontal={true}
              data={SportsGames}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameScreen;

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
