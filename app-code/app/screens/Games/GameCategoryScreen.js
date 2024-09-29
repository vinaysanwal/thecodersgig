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

export default function GameCateogoryScreen({navigation}) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      title: 'New',
      id: 'g1',
      type: 'game',
      icon: 'new-box',
    },
    {
      key: 'second',
      title: 'Best',
      id: 'g2',
      type: 'game',
      icon: 'star',
    },
    {key: 'third', title: 'Match', id: 'g3', type: 'game', icon: 'kickstarter'},
    {
      key: 'fourth',
      title: 'Bubble',
      id: 'g4',
      type: 'game',
      icon: 'airballoon',
    },
    {key: 'five', title: 'Puzzle', id: 'g5', type: 'game', icon: 'puzzle'},
    {key: 'six', title: 'Quiz', id: 'g6', type: 'game', icon: 'book-cross'},
    {
      key: 'seven',
      title: 'Card',
      id: 'g7',
      type: 'game',
      icon: 'cards-diamond',
    },
    {
      key: 'eight',
      title: 'Girl',
      id: 'g8',
      type: 'game',
      icon: 'human-female-girl',
    },
    {key: 'nine', title: 'Jump', id: 'g9', type: 'game', icon: 'jump-rope'},
    {key: 'ten', title: 'Arcade', id: 'g10', type: 'game', icon: 'ladybug'},
    {
      key: 'eleven',
      title: 'Racing',
      id: 'g11',
      type: 'game',
      icon: 'racing-helmet',
    },
    {
      key: 'twelve',
      title: 'Sports',
      id: 'g12',
      type: 'game',
      icon: 'cricket',
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
