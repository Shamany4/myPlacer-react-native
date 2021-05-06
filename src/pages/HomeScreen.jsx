import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Alert, Text} from 'react-native';
import Swiper from "react-native-web-swiper";
import haversine from 'haversine'
import json from "../db.json";
import categoryJSON from '../category.json';

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import SliderItem from "../components/SliderItem";
import SubtitlePage from "../components/SubtitlePage";
import ItemCard from "../components/ItemCard";
import Menu from "../components/Menu";
import MyLoadingApp from "../components/MyLoadingApp";

export default function HomeScreen({route, navigation}) {
  const {
    location,
    currentDay,
  } = route.params;


  const iconBuildingPath = '../assets/buildings/';
  const iconWhitePath = '../assets/whiteBuildings/';

  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState([]);

  const [category, setCategory] = useState([]);

  // Function setTimeout
  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get All Items
  useEffect(()=>{
    // if (!isReady) {
    //   fetch('https://catalog.api.2gis.com/3.0/items?' +
    //     `q=Новосибирск кафе` +
    //     '&fields=items.org,' +
    //     'items.point,' +
    //     'items.contact_groups,' +
    //     'items.name_ex,' +
    //     'items.description,' +
    //     'items.schedule,' +
    //     'items.external_content,' +
    //     'context_rubrics,' +
    //     'items.reviews' +
    //     '&key=ruoucu5799')
    //     .then((response) => response.json())
    //     .then((json) => {
    //       setData(json.result);
    //       setIsReady(true);
    //     })
    // }
  },[data]);


  if (!isReady) {
    return (
      <MyLoadingApp title="Загружаем информацию о заведениях" />
    );
  } else {
    return (
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
                {
                  data.items.map((el, index) => {
                    if (el.name_ex === undefined || el.external_content === undefined || el.schedule === undefined) {
                      return null;
                    } else {
                      // Get Start and End coords
                      const start = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                      }
                      const end = {
                        latitude: el.point.lat,
                        longitude: el.point.lon
                      }

                      let currentDistance = Math.round(haversine(start, end));
                      let minDistance = 5;

                      // Checking the description for emptiness
                      let description = '';
                      if (el.ads === undefined || el.ads.article === undefined) {
                        description = 'Отсутствует какое-либо описание для данного заведения. Приносим свои извенения.';
                      } else {
                        description = el.ads.article;
                      }

                      // Checking the type for emptiness
                      let type = data.context_rubrics[0].caption;

                      // Checking the contact for emptiness
                      let contactNull = false;
                      let contactsArr = [];
                      if (el.contact_groups === undefined) {
                        contactNull = true;
                      } else {
                        if (el.contact_groups[1] !== undefined) {
                          contactsArr.push(el.contact_groups[1].contacts[0])
                        }
                        contactsArr = el.contact_groups[0].contacts;
                      }

                      // Checking the rating for emptiness
                      let rating = '';
                      if (el.reviews.general_rating === undefined) {
                        rating = 'Отсутствует';
                      } else {
                        rating = el.reviews.general_rating;
                      }


                      if (currentDistance <= minDistance) {
                        return <SliderItem open={true}
                                           title={el.name_ex.primary}
                                           type={type}
                                           address={el.address_name}
                                           image={el.external_content}
                                           desc={description}
                                           distance={haversine(start, end).toFixed(2)}
                                           timeWork={el.schedule[currentDay]}
                                           is_24x7={el.schedule.is_24x7}
                                           rating={rating}
                                           contactsNull={contactNull}
                                           contacts={contactsArr}
                                           colorCard="#f3f3f3"
                                           icon={require(iconBuildingPath + 'cinema.png')}
                                           navigate={navigation}
                                           key={index}
                        />
                      }
                    }

                  })
                }
              </Swiper>
            </View>

            <SubtitlePage title="Популярное сегодня"/>
            <View style={styles.popularWrapper}>

              {
                data.items.map((el, index) => {

                  if (el.name_ex === undefined || el.external_content === undefined || el.schedule === undefined) {
                    return null;
                  } else {
                    // Get Start and End coords
                    const start = {
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude
                    }
                    const end = {
                      latitude: el.point.lat,
                      longitude: el.point.lon
                    }

                    // Checking the description for emptiness
                    let description = '';
                    if (el.ads === undefined || el.ads.article === undefined) {
                      description = 'Отсутствует какое-либо описание для данного заведения. Приносим свои извенения.';
                    } else {
                      description = el.ads.article;
                    }

                    // Checking the type for emptiness
                    let type = data.context_rubrics[0].caption;

                    // Checking the contact for emptiness
                    let contactNull = false;
                    let contactsArr = [];
                    if (el.contact_groups === undefined) {
                      contactNull = true;
                    } else {
                      if (el.contact_groups[1] !== undefined) {
                        contactsArr.push(el.contact_groups[1].contacts[0])
                      }
                      contactsArr = el.contact_groups[0].contacts;
                    }

                    // Checking the rating for emptiness
                    let rating = '';
                    if (el.reviews.general_rating === undefined) {
                      rating = 'Отсутствует';
                    } else {
                      rating = el.reviews.general_rating;
                    }

                    return <ItemCard open={true}
                                     title={el.name_ex.primary}
                                     type={type}
                                     address={el.address_name}
                                     image={el.external_content}
                                     desc={description}
                                     distance={haversine(start, end).toFixed(2)}
                                     timeWork={el.schedule[currentDay]}
                                     is_24x7={el.schedule.is_24x7}
                                     rating={rating}
                                     contactsNull={contactNull}
                                     contacts={contactsArr}
                                     color="#000"
                                     icon={require(iconWhitePath + 'cinema.png')}
                                     navigate={navigation}
                                     key={index}
                    />
                  }

                })
              }

            </View>


          </ScrollView>
        </View>
      </View>
    );
  }
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