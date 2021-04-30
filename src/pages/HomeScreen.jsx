import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Swiper from "react-native-web-swiper";
import json from "../db.json";

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import SliderItem from "../components/SliderItem";
import SubtitlePage from "../components/SubtitlePage";
import ItemCard from "../components/ItemCard";
import Menu from "../components/Menu";

export default function HomeScreen({navigation}) {
  const iconBuildingPath = '../assets/buildings/';
  const iconWhitePath = '../assets/whiteBuildings/';

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(()=>{
    setData(json.hookah);
  },[data]);

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
                          icon={require(iconBuildingPath + 'shopping.png')}
                          navigate={navigation}
              />
            </Swiper>
          </View>

          <SubtitlePage title="Популярное сегодня"/>
          <View style={styles.popularWrapper}>
            {
              data.map((el, index) => {
                let type = el.name_ex.extension;
                return <ItemCard open={true} title={el.name_ex.primary}
                                 type={type}
                                 icon={require(iconWhitePath + 'cinema.png')}
                                 navigate={navigation}
                                 key={index}
                />
              })
            }
            {/*<ItemCard open={true} title="Континент" type="Торговый центр"*/}
            {/*          distance="1.68" icon={require(iconWhitePath + 'shopping.png')}*/}
            {/*          navigate={navigation}/>*/}
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