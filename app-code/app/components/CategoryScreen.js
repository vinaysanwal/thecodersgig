import React from 'react';
import {View, Text} from 'react-native';
import ChooseCategory from '../screens/Category/ChooseCategory';
import {
  ShoppingApps,
  SocialApps,
  FoodApps,
  GroceryApps,
  MedicalApps,
  FurnitureApps,
  MusicApps,
  NewsApps,
  PayApps,
  JobsApps,
  ToolsApps,
} from '../screens/ApiData/AppData';
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
} from '../screens/ApiData/GameData';

const CategoryScreen = ({category}) => {
  const type = category.type;
  const MainId = category.id;
  if (type == 'app') {
    switch (MainId) {
      case 'a2':
        return <ChooseCategory data={ShoppingApps} />;
      case 'a3':
        return <ChooseCategory data={SocialApps} />;
      case 'a4':
        return <ChooseCategory data={FoodApps} />;
      case 'a5':
        return <ChooseCategory data={GroceryApps} />;
      case 'a6':
        return <ChooseCategory data={MedicalApps} />;
      case 'a7':
        return <ChooseCategory data={FurnitureApps} />;
      case 'a8':
        return <ChooseCategory data={ToolsApps} />;
      case 'a9':
        return <ChooseCategory data={NewsApps} />;
      case 'a10':
        return <ChooseCategory data={JobsApps} />;
      case 'a11':
        return <ChooseCategory data={MusicApps} />;
      case 'a12':
        return <ChooseCategory data={PayApps} />;
      default:
        return (
          <View>
            <Text>Something Went wrong !! Plzz try again later..</Text>
          </View>
        );
    }
  } else if (type == 'game') {
    switch (MainId) {
      case 'g1':
        return <ChooseCategory data={NewGames} />;
      case 'g2':
        return <ChooseCategory data={BestGames} />;
      case 'g3':
        return <ChooseCategory data={Match3Games} />;
      case 'g4':
        return <ChooseCategory data={BubbleGames} />;
      case 'g5':
        return <ChooseCategory data={PuzzleGames} />;
      case 'g6':
        return <ChooseCategory data={QuizGames} />;
      case 'g7':
        return <ChooseCategory data={CardGames} />;
      case 'g8':
        return <ChooseCategory data={GirlGames} />;
      case 'g9':
        <ChooseCategory data={JumpGames} />;
      case 'g10':
        return <ChooseCategory data={ArcadeGames} />;
      case 'g11':
        return <ChooseCategory data={RacingGames} />;
      case 'g12':
        return <ChooseCategory data={SportsGames} />;
      default:
        return (
          <View>
            <Text>Something Went wrong !! Plzz try again later..</Text>
          </View>
        );
    }
  }
};

export default CategoryScreen;
