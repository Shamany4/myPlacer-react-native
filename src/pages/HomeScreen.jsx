import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Swiper from "react-native-web-swiper";

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import SliderItem from "../components/SliderItem";
import SubtitlePage from "../components/SubtitlePage";
import ItemCard from "../components/ItemCard";
import Menu from "../components/Menu";

export default function HomeScreen({navigation}) {
  const iconBuildingPath = '../assets/buildings/';
  const iconWhitePath = '../assets/whiteBuildings/';
  return (
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView>

          <HeaderGroup/>
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
              <SliderItem title="Континент" type="Торговый центр"
                          distance="2.68" colorCard="#f3f3f3"
                          icon={require(iconBuildingPath + 'shopping.png')}/>
              <SliderItem title="CyberX" type="Компьютерный клуб"
                          distance="1.37" colorCard="#ff9f9f"
                          icon={require(iconBuildingPath + 'computer.png')}/>
              <SliderItem title="Победа" type="Кинотеатр"
                          distance="3.34" colorCard="#9fd2ff"
                          icon={require(iconBuildingPath + 'cinema.png')}/>
              <SliderItem title="Школа бильярда" type="Бильярдные"
                          distance="2.68" colorCard="#9fffc2"
                          icon={require(iconBuildingPath + 'billiard.png')}/>
            </Swiper>
          </View>

          <SubtitlePage title="Популярное сегодня"/>
          <View style={styles.popularWrapper}>
            <ItemCard open={true} title="Континент" type="Торговый центр" distance="1.68" icon={require(iconWhitePath + 'shopping.png')}/>
            <ItemCard open={false} title="Рассвет" type="Кинотеатр" distance="3.64" icon={require(iconWhitePath + 'cinema.png')}/>
            <ItemCard open={false} title="Галерея" type="Торговый центр" distance="0.15" icon={require(iconWhitePath + 'shopping.png')}/>
            <ItemCard open={true} title="CyberX" type="Компьютерный клуб" distance="9.10" icon={require(iconWhitePath + 'computer.png')}/>
            <ItemCard open={true} title="Школа бильярда" type="Торговый центр" distance="6.56" icon={require(iconWhitePath + 'billiard.png')}/>
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
  sliderContainer: {
    width: '100%',
    height: 220,
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