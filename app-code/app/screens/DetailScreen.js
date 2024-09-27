import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  BackHandler,
  Alert,
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/HeaderSec';

const DetailScreen = ({route, navigation}) => {
  const {url} = route.params;
  const {title} = route.params;
  const {bgcolor} = route.params;
  const {type} = route.params;

  let ScreenHeight = Dimensions.get('window').height;

  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
      };
    }
  }, []);

  const HandleBackPressed = () => {
    switch (type) {
      case 'app':
        if (webView.current) {
          webView.current.goBack();
          return true; // PREVENT DEFAULT BEHAVIOUR (EXITING THE APP)
        }
        return false;
      case 'game':
        Alert.alert('Hold on!', 'Going Back To Game Library', [
          {
            text: 'Continue Playing',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => navigation.goBack()},
        ]);
        return true;
      default:
        console.log('cc');
    }
  };

  const spinner = () => {
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {(() => {
        if (type == 'app') {
          return <Header />;
        }
      })()}
      <View
        style={{
          justifyContent: 'center',
          height: '100%',
        }}>
        <WebView
          startInLoadingState={true}
          source={{uri: url}}
          renderLoading={() => {
            return spinner();
          }}
          style={{height: ScreenHeight * 0.8, resizeMode: 'cover', flex: 1}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
          scalesPageToFit={false}
          ref={webView}
          allowsBackForwardNavigationGestures
          onNavigationStateChange={(navState) =>
            setCanGoBack(navState.canGoBack)
          }
        />
      </View>
      {/* <View>
        <BannerView
          placementId="235238147698773_235333101022611"
          type="standard"
          onPress={() => console.log('click')}
          onLoad={() => console.log('loaded')}
          onError={err => console.log('error', err)}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
