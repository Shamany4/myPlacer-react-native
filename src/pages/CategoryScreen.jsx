import React from 'react';
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native';

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";
import CategoryGroup from "../components/CategoryGroup";

export default function CategoryScreen({navigation}) {
  const iconBuildingPath = '../assets/buildings/'
  return (
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView style={styles.category}>

          <HeaderGroup/>
          <TitlePage title="Категории"/>

          <CategoryGroup title="Кинотеатры" color="#9FD2FF" icon={require(iconBuildingPath + 'cinema.png')} />
          <CategoryGroup title="Музеи" color="#FFE99F" icon={require(iconBuildingPath + 'museum.png')} />
          <CategoryGroup title="Рестораны" color="#E3FF9F" icon={require(iconBuildingPath + 'restaurant.png')} />
          <CategoryGroup title="Боулинги" color="#9FBCFF" icon={require(iconBuildingPath + 'bowling.png')} />
          <CategoryGroup title="Бильярдные" color="#9FFFC2" icon={require(iconBuildingPath + 'billiard.png')} />
          <CategoryGroup title="Бани, сауны" color="#9FFFEB" icon={require(iconBuildingPath + 'sauna.png')} />
          <CategoryGroup title="Компьютерные клубы" color="#FF9F9F" icon={require(iconBuildingPath + 'computer.png')} />
          <CategoryGroup title="Парки" color="#9FD2FF" icon={require(iconBuildingPath + 'park.png')} />
          <CategoryGroup title="Кафе" color="#FFE99F" icon={require(iconBuildingPath + 'cafe.png')} />
          <CategoryGroup title="Дельфинарии" color="#E3FF9F" icon={require(iconBuildingPath + 'dolphinarium.png')} />
          <CategoryGroup title="Аквапарки" color="#9FBCFF" icon={require(iconBuildingPath + 'aquapark.png')} />
          <CategoryGroup title="Торговые центры" color="#9FFFC2" icon={require(iconBuildingPath + 'shopping.png')} />
          <CategoryGroup title="Кальянные" color="#9FFFEB" icon={require(iconBuildingPath + 'hookah.png')} />


        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  application: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#fefefe',
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
})