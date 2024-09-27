import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainHomeScreen from './app/screens/HomeScreen';
import GameScreen from './app/screens/Games/GameScreen';
import AppScreen from './app/screens/Apps/AppScreen';
import DetailScreen from './app/screens/DetailScreen';
import PrivacyScreen from './app/screens/Drawer/PrivacyScreen';
import {DrawerContent} from './app/screens/Drawer/DrawerContent';
import SplashScreen from 'react-native-splash-screen';
import InformationScreen from './app/screens/Drawer/informationScreen';
import Contactcreen from './app/screens/Drawer/ContactScreen';
import AboutScreen from './app/screens/Drawer/AboutScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryApp from './app/screens/Apps/AppCategoryScreen';
import CategoryGame from './app/screens/Games/GameCategoryScreen';
import OffersScreen from './app/screens/Offers/OffersScreen';
import {Image, Alert, BackHandler, Linking} from 'react-native';
import MyAppScreen from './app/screens/Drawer/MyApp';
import MyGameScreen from './app/screens/Drawer/MyGames';
import VersionCheck from 'react-native-version-check';
import PushNotification from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
import * as FacebookAds from 'expo-ads-facebook';
FacebookAds.AdSettings.addTestDevice(FacebookAds.AdSettings.currentDeviceHash);
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{width: 200, height: 40}}
      source={require('./app/screens/assests/app_icon.png')}
    />
  );
}

function HomeScreen() {
  useEffect(() => {
    checkVersion();
  }, []);

  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('REMOTE NOTIFICATION ==>', notification);
        const {title, body} = notification;
        alert(title);
        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '256218572662',
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  const checkVersion = async () => {
    try {
      const latestVersion = await VersionCheck.getLatestVersion();
      const currentVersion = VersionCheck.getCurrentVersion();

      console.log(latestVersion);
      console.log(currentVersion);
      let updateNeeded = await VersionCheck.needUpdate();

      if (updateNeeded && updateNeeded.isNeeded) {
        Alert.alert(
          'Please Update',
          'You will have to update your app to the latest version to continue using.',
          [
            {
              text: 'Update',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(updateNeeded.storeUrl);
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {}
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#80bfff',
      }}>
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CategoryApp"
        component={CategoryApp}
        options={{headerTitle: (props) => <LogoTitle {...props} />}}
      />
      <Stack.Screen
        name="CategoryGame"
        component={CategoryGame}
        options={{headerTitle: (props) => <LogoTitle {...props} />}}
      />

      <Stack.Screen
        name="OffersScreen"
        component={OffersScreen}
        options={{headerTitle: (props) => <LogoTitle {...props} />}}
      />

      <Stack.Screen
        name="MyApp"
        component={MyAppScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyGame"
        component={MyGameScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="PrivacyScreen"
        component={PrivacyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InformationScreen"
        component={InformationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contactcreen"
        component={Contactcreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function OneAppsScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#80bfff',
      }}>
      <Stack.Screen
        name="AppScreen"
        component={AppScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoryApp"
        component={CategoryApp}
        options={{headerTitle: (props) => <LogoTitle {...props} />}}
      />
    </Stack.Navigator>
  );
}

function OneGamesScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#80bfff',
      }}>
      <Stack.Screen
        name="GameScreen"
        component={GameScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoryGame"
        component={CategoryGame}
        options={{title: 'All In One'}}
      />
    </Stack.Navigator>
  );
}

function HomeTab() {
  return (
    <Tab.Navigator
      shifting
      labelStyle={{
        fontSize: 80,
      }}
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: '#fff',
        labelStyle: {fontSize: 14, fontWeight: 'bold'},
        activeBackgroundColor: '#85144b',
        inactiveBackgroundColor: '#85144b',
      }}>
      <Tab.Screen
        name="Home"
        component={MainHomeScreen}
        shifting
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Apps"
        component={OneAppsScreen}
        shifting
        options={{
          tabBarLabel: 'Apps',
          tabBarIcon: ({color, size}) => (
            <Icon name="apps-box" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Games"
        component={OneGamesScreen}
        options={{
          tabBarLabel: 'Games',
          tabBarIcon: ({color, size}) => (
            <Icon name="gamepad-square" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  SplashScreen.hide();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{swipeEnabled: false}}
        drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
