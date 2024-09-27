import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import CategoryScreen from '../../components/CategoryScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AppCategoryScreen({navigation}) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'second', title: 'Shopping', id: 'a2', type: 'app', icon: 'shopping'},
    {
      key: 'third',
      title: 'Social',
      id: 'a3',
      type: 'app',
      icon: 'account-network',
    },
    {key: 'fourth', title: 'Food', id: 'a4', type: 'app', icon: 'food'},
    {key: 'five', title: 'Grocery', id: 'a5', type: 'app', icon: 'rice'},
    {key: 'six', title: 'Medical', id: 'a6', type: 'app', icon: 'medical-bag'},
    {
      key: 'seven',
      title: 'Furniture',
      id: 'a7',
      type: 'app',
      icon: 'table-furniture',
    },
    {key: 'eight', title: 'Tools', id: 'a8', type: 'app', icon: 'toolbox'},
    {key: 'nine', title: 'News', id: 'a9', type: 'app', icon: 'newspaper'},
    {
      key: 'ten',
      title: 'Jobs',
      id: 'a10',
      type: 'app',
      icon: 'account-supervisor',
    },
    {key: 'eleven', title: 'Music', id: 'a11', type: 'app', icon: 'music'},
    {
      key: 'twelve',
      title: 'Payment',
      id: 'a12',
      type: 'app',
      icon: 'account-cash',
    },
  ]);

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

  const MainRoute = ({route}) => <CategoryScreen category={route} />;

  const renderScene = SceneMap({
    first: MainRoute,
    second: MainRoute,
    third: MainRoute,
    fourth: MainRoute,
    five: MainRoute,
    six: MainRoute,
    seven: MainRoute,
    eight: MainRoute,
    nine: MainRoute,
    ten: MainRoute,
    eleven: MainRoute,
    twelve: MainRoute,
  });

  const spinner = () => {
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  };

  const initialLayout = {width: Dimensions.get('window').width};

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#80bfff'}}
      activeColor="#80bfff"
      inactiveColor="#ffc2b3"
      style={{backgroundColor: '#000'}}
      tabStyle={{width: 'auto'}}
      renderIcon={({route, focused, color}) => (
        <Icon name={route.icon} color={color} size={18} />
      )}
      scrollEnabled={true}
      ovescroll={true}
      bounces={true}
      pressColor="#000"
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderLazyPlaceholder={spinner}
      initialLayout={initialLayout}
      ovescroll={true}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  ActivityIndicatorStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
