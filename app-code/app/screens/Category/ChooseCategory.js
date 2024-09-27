import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
} from 'react-native';

import Item from './CategoryItem';
// import {AdMobBanner} from 'react-native-admob';
import LinearGradient from 'react-native-linear-gradient';

import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8886316915612634/6720415892';

const ChooseCategory = ({data}) => {
  const renderItem = ({item}) => <Item item={item} />;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <LinearGradient
        start={{x: 0.8, y: 0}}
        end={{x: 0, y: 0}}
        colors={['#E8DBFC', '#F8F9D2']}
        style={styles.linearGradient}>
        {adUnitId && (
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        )}
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ChooseCategory;

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
