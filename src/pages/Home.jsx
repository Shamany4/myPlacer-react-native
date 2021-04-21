import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Swiper from "react-native-web-swiper";

import Header from '../components/Header';
import TitlePage from "../components/TitlePage";
import SliderItem from "../components/SliderItem";
import SubtitlePage from "../components/SubtitlePage";
import ItemCard from "../components/ItemCard";
import Menu from "../components/Menu";

export default function Home() {
  return (
    <ScrollView style={styles.home}>

      <Header/>
      <TitlePage title="Главная"/>
      <SubtitlePage title="Рядом с вами"/>

      <View style={styles.sliderContainer}>
        <Swiper
          loop
          timeout={2.5}
          controlsProps={{
            prevTitle: '',
            nextTitle: '',
            dotActiveStyle: {
              backgroundColor: 'black',
              height: 10,
              width: 10,
              borderRadius: 5
            }
          }}
        >
          <SliderItem title="Континент" type="Торговый центр" distance="2.68" colorCard="#f3f3f3"/>
          <SliderItem title="Рассвет" type="Кинотеатр" distance="1.33" colorCard="#9fd2ff"/>
          <SliderItem title="Школа бильярда" type="Бильярдная" distance="3.45" colorCard="#9fffc2"/>
        </Swiper>
      </View>

      <SubtitlePage title="Популярное сегодня"/>
      <View style={styles.popularWrapper}>
        <ItemCard open={true} title="Континент" type="Торговый центр" distance="1.68"/>
        <ItemCard open={false} title="Аура" type="Торговый центр" distance="3.64"/>
        <ItemCard open={false} title="Галерея" type="Торговый центр" distance="0.15"/>
        <ItemCard open={true} title="Сибирский Молл" type="Торговый центр" distance="9.10"/>
        <ItemCard open={true} title="Роял парк" type="Торговый центр" distance="6.56"/>
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  home: {

  },
  sliderContainer: {
    width: '100%',
    height: 250,
  },
  slideWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  popularWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
})