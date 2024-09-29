import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  BackHandler,
  Alert,
  Linking,
  Image,
} from 'react-native';
import {Drawer, Text} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8886316915612634/6720415892';

const SHeight = Dimensions.get('window').height;

export function DrawerContent(props) {
  const LogoutAction = () => {
    try {
      Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <LinearGradient
          start={{x: 0.8, y: 0}}
          end={{x: 0, y: 0}}
          colors={['#ccccff', '#ccc']}
          style={styles.linearGradient}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={styles.ImageBox}>
                <Image
                  style={{width: 250, height: 40}}
                  source={require('../assests/drawerApp.png')}
                />
              </View>
              <View style={styles.bannerView}>
                <Text style={styles.textPara}>
                  All In One is a new age daily usage app , which enable you to
                  use all daily usage app in a single app
                </Text>
              </View>
            </View>

            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="home" color={color} size={size} />
                )}
                label="Home"
                onPress={() => {
                  props.navigation.navigate('HomeTab');
                }}
                labelStyle={{color: '#000', fontWeight: 'bold'}}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="apps-box" color={color} size={size} />
                )}
                label="My Apps"
                onPress={() => {
                  props.navigation.navigate('MyApp');
                }}
                labelStyle={{color: '#000', fontWeight: 'bold'}}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="gamepad-square" color={color} size={size} />
                )}
                label="My Games"
                onPress={() => {
                  props.navigation.navigate('MyGame');
                }}
                labelStyle={{color: '#000', fontWeight: 'bold'}}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="information" color={color} size={size} />
                )}
                label="Information"
                onPress={() => {
                  props.navigation.navigate('InformationScreen');
                }}
                labelStyle={{color: '#000', fontWeight: 'bold'}}
              />

              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="account-details" color={color} size={size} />
                )}
                label="About Us"
                onPress={() => {
                  props.navigation.navigate('AboutScreen');
                }}
                labelStyle={{color: '#000', fontWeight: 'bold'}}
              />

              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="account-supervisor" color={color} size={size} />
                )}
                label="Privacy Policy"
                onPress={() => {
                  props.navigation.navigate('PrivacyScreen');
                }}
                labelStyle={{color: '#000', fontWeight: 'bold'}}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="star" color={color} size={size} />
                )}
                label="Rate Us"
                onPress={() => {
                  Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.thecodersgig.allinone',
                  );
                }}
                labelStyle={{color: '#000', fontWeight: 'bold'}}
              />

              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="heart" color={color} size={size} />
                )}
                label="Follow Us"
                onPress={() => {
                  props.navigation.navigate('Contactcreen');
                }}
                labelStyle={{color: '#000', fontWeight: 'bold'}}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="exit-to-app" color={color} size={size} />
                )}
                label="Exit"
                onPress={() => LogoutAction()}
                labelStyle={{color: '#000', fontWeight: 'bold'}}
              />
            </Drawer.Section>
            {adUnitId && (
              <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.SMART_BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
              />
            )}
          </View>
        </LinearGradient>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    top: -4.1,
  },
  linearGradient: {
    height: SHeight,
  },
  userInfoSection: {
    padding: 15,
    backgroundColor: '#000',
    top: 0,
  },

  ImageBox: {
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 10,
  },
  textPara: {
    fontSize: 15,
    textAlign: 'center',
    color: '#80bfff',
  },

  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 10,
    padding: 2,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
