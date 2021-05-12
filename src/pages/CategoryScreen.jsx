import React from 'react';
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native';
import categoryJSON from "../category.json";

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";
import CategoryGroup from "../components/CategoryGroup";

export default function CategoryScreen({route, navigation}) {
  const {
    location,
    currentDay,
  } = route.params;

  const iconBuildingPath = '../assets/buildings/';

  const getUrl = (name) => {
    switch (name) {
      case 'Кинотеатры':
        return require(iconBuildingPath + 'cinema.png');
      case 'Театры':
        return require(iconBuildingPath + 'theatre.png');
      case 'Музеи':
        return require(iconBuildingPath + 'museum.png');
      case 'Рестораны':
        return require(iconBuildingPath + 'restaurant.png');
      case 'Боулинги':
        return require(iconBuildingPath + 'bowling.png');
      case 'Бильярдные':
        return require(iconBuildingPath + 'billiard.png');
      case 'Бани, сауны':
        return require(iconBuildingPath + 'sauna.png');
      case 'Компьютерные клубы':
        return require(iconBuildingPath + 'computer.png');
      case 'Парки':
        return require(iconBuildingPath + 'park.png');
      case 'Кафе':
        return require(iconBuildingPath + 'cafe.png');
      case 'Дельфинарии':
        return require(iconBuildingPath + 'dolphinarium.png');
      case 'Аквапарки':
        return require(iconBuildingPath + 'aquapark.png');
      case 'Торговые центры':
        return require(iconBuildingPath + 'shopping.png');
      case 'Кальянные':
        return require(iconBuildingPath + 'hookah.png');
      case 'Ночные клубы':
        return require(iconBuildingPath + 'clubs.png');
      case 'Библиотеки':
        return require(iconBuildingPath + 'library.png');
      case 'Fast Food':
        return require(iconBuildingPath + 'fastFood.png');
    }
  }

  return (
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView style={styles.category}>

          <HeaderGroup/>
          <TitlePage title="Категории"/>

          <View style={styles.categoryWrapper}>
            {
              categoryJSON.category.map((el, index) => {
                let icon = getUrl(el.name);
                return <CategoryGroup title={el.name}
                                      color={el.color}
                                      icon={icon}
                                      navigate={navigation}
                                      key={index}
                />
              })
            }
          </View>


        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  application: {
    flex: 1,
    backgroundColor: '#fefefe'
  },
  container: {
    flex: 1,
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingTop: 30,
    paddingBottom: 60,
  },
  category: {

  },
  categoryWrapper: {
    marginTop: 25
  }
})