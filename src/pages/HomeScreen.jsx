import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import Swiper from "react-native-web-swiper";
import haversine from 'haversine'
import json from "../db.json";

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import SliderItem from "../components/SliderItem";
import SubtitlePage from "../components/SubtitlePage";
import ItemCard from "../components/ItemCard";
import Menu from "../components/Menu";

export default function HomeScreen({route, navigation}) {
  const {
    location,
    currentDay,
  } = route.params;


  const iconBuildingPath = '../assets/buildings/';
  const iconWhitePath = '../assets/whiteBuildings/';

  const [data, setData] = useState([]);

  // Get All Items
  useEffect(()=>{
    setData(json.sauna);
  },[data]);


  return(
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView>

          <HeaderGroup />
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

                const start = {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude
                }
                const end = {
                  latitude: el.point.lat,
                  longitude: el.point.lon
                }

                let description = '';
                if (el.ads === undefined) {
                  description = 'Отсутствует какое-либо описание для данного заведения. Приносим свои извенения.';
                } else {
                  description = el.ads.article;
                }

                let type = '';
                if (el.name_ex.extension === undefined) {
                  type = el.name_ex.primary;
                } else {
                  type = el.name_ex.extension;
                }
                let strType = type[0].toUpperCase() + type.slice(1);

                return <ItemCard open={true}
                                 title={el.name_ex.primary}
                                 type={strType}
                                 address={el.address_name}
                                 image={el.external_content}
                                 desc={description}
                                 distance={haversine(start, end).toFixed(2)}
                                 timeWork={el.schedule[currentDay]}
                                 is_24x7={el.schedule.is_24x7}
                                 rating={el.reviews.general_rating}
                                 contacts={el.contact_groups[0].contacts}
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