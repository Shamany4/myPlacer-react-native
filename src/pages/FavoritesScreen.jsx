import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";
import ItemCard from "../components/ItemCard";

export default function FavoritesScreen({navigation}) {
  const iconWhitePath = '../assets/whiteBuildings/';
  return (
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView style={styles.favorites}>

          <HeaderGroup/>
          <TitlePage title="Избранное"/>

          <View style={styles.popularWrapper}>
            <ItemCard open={false} title="Рассвет" type="Кинотеатр" distance="3.64" icon={require(iconWhitePath + 'cinema.png')}/>
          </View>


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
  favorites: {

  },
  popularWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
})