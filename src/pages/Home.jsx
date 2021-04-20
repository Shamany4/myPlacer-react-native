import React from 'react';
import { StyleSheet, View } from 'react-native';
import Swiper from "react-native-web-swiper";

import Header from '../components/Header';
import TitlePage from "../components/TitlePage";
import SliderItem from "../components/SliderItem";
import SubtitlePage from "../components/SubtitlePage";

export default function Home() {
  return (
    <View style={styles.home}>

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
    </View>
  );
}

const styles = StyleSheet.create({
  home: {

  },
  sliderContainer: {
    width: '100%',
    height: 190,
  },
  slideWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})