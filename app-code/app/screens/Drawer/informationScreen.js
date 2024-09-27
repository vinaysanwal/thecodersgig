import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import Header from '../../components/HeaderSec';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8886316915612634/6720415892';

const InformationScreen = () => {
  const url = 'https://gallant-jang-a51742.netlify.app/information.html';
  const title = 'ALLINONE';
  const bgcolor = '#232F3E';
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
      <Header name={title} color={bgcolor} />
      <View
        style={{
          justifyContent: 'center',
          padding: 1,
          height: '100%',
        }}>
        {adUnitId && (
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        )}
        <WebView
          startInLoadingState={true}
          source={{uri: url}}
          renderLoading={() => {
            return spinner();
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default InformationScreen;

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
