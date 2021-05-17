import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native';
import categoryJSON from "../category.json";

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";
import CategoryGroup from "../components/CategoryGroup";
import * as SecureStore from "expo-secure-store";
import firebase from "firebase";
import MyLoadingApp from "../components/MyLoadingApp";

export default function CategoryScreen({navigation}) {

  const [user, setUser] = useState(null);

  const iconBuildingPath = '../assets/buildings/';
  const iconWhitePath = '../assets/whiteBuildings/';

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

  useEffect(() => {
    (async () => {
      let result = await SecureStore.getItemAsync('userID');
      if (result) {
        firebase.firestore().collection('users')
          .doc(result)
          .get()
          .then((response) => {
            setUser(response.data());
          })
      }
    })();
  }, []);


  if (!user) {
    return <MyLoadingApp title="Загружаем пользовательские данные"/>
  }
  return (
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView style={styles.category}>

          <HeaderGroup userName={user.name}/>
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