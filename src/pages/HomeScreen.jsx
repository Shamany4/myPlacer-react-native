import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Image, TouchableHighlight} from 'react-native';
import Swiper from "react-native-web-swiper";
import haversine from 'haversine'
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
    name,
  } = route.params;

  const iconBuildingPath = '../assets/buildings/';
  const iconWhitePath = '../assets/whiteBuildings/';

  const [isReady, setIsReady] = useState(false);
  const [items, setItems] = useState([]);
  const [localItems, setLocalItems] = useState([]);
  const [errors, setErrors] = useState(null);
  const [emptyLocalItems, setEmptyLocalItems] = useState(false);

  // Get All Items
  useEffect(()=>{
    fetch('https://shamany4.github.io/fake-server/data.json')
      .then((response) => response.json())
      .then(async (json) => {
        await getRandomItems(json.result);
        await getLocalItems(json.result, 5);
        setIsReady(true);
      })
      .catch((error) => {
        setErrors(error);
      })
  },[]);

  const getRandomItems = async (data) => {
    for (let i = 0 ; (i < 15) && (i < data.length) ; i++) {
      let r = Math.floor(Math.random() * (data.length - i)) + i;
      let building = data[r];
      data[r] = data[i];
      data[i] = building;
      setItems(array => [...array, building]);
    }
  }

  const getLocalItems = async (data, min) => {
    data.forEach((el) => {
      const start = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      const end = {
        latitude: el.point.lat,
        longitude: el.point.lon
      }

      let currentDistance = Math.round(haversine(start, end));
      if (currentDistance < min) {
        setLocalItems(array => [...array, el]);
      }
    });
  }

  const getNewRandomItemsHandler = () => {
    setItems([]);
    fetch('https://shamany4.github.io/fake-server/data.json')
      .then((response) => response.json())
      .then(async (json) => {
        await getRandomItems(json.result);
      })
      .catch((error) => {
        setErrors(error);
      })
  }

  useEffect(() => {
    if (localItems.length > 0) {
      setEmptyLocalItems(false);
    } else {
      setEmptyLocalItems(true);
    }
  }, [localItems]);

  if (errors) {
    return <MyLoadingApp title={errors} />
  }
  if (!isReady) {
    return <MyLoadingApp title="Загружаем информацию о заведениях"/>
  }
  return(
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView>

          <HeaderGroup userName={name} />
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
                emptyLocalItems
                  ?
                  <SliderItem title="Заведений рядом нет"
                              distance={0}
                              colorCard="#f3f3f3"
                              icon={require('../assets/buildings/error.png')}
                  />
                  :
                  localItems.map((el, index) => {
                    // Get Start and End coords
                    let start = {
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude
                    }
                    let end = {
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
                    let type = el.context_rubrics;

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

                    let color = '';
                    let icon = '';
                    categoryJSON.category.forEach((elCategory) => {
                      if (el.context_rubrics === elCategory.name) {
                        color = elCategory.color;
                        switch (el.context_rubrics) {
                          case 'Кинотеатры':
                            return icon = require(iconBuildingPath + 'cinema.png');
                          case 'Музеи':
                            return icon = require(iconBuildingPath + 'museum.png');
                          case 'Рестораны':
                            return icon = require(iconBuildingPath + 'restaurant.png');
                          case 'Боулинги':
                            return icon = require(iconBuildingPath + 'bowling.png');
                          case 'Бильярдные':
                            return icon = require(iconBuildingPath + 'billiard.png');
                          case 'Бани, сауны':
                            return icon = require(iconBuildingPath + 'sauna.png');
                          case 'Компьютерные клубы':
                            return icon = require(iconBuildingPath + 'computer.png');
                          case 'Парки':
                            return icon = require(iconBuildingPath + 'park.png');
                          case 'Кафе':
                            return icon = require(iconBuildingPath + 'cafe.png');
                          case 'Дельфинарии':
                            return icon = require(iconBuildingPath + 'dolphinarium.png');
                          case 'Аквапарки':
                            return icon = require(iconBuildingPath + 'aquapark.png');
                          case 'Торговые центры':
                            return icon = require(iconBuildingPath + 'shopping.png');
                          case 'Кальянные':
                            return icon = require(iconBuildingPath + 'hookah.png');
                          case 'Ночные клубы':
                            return icon = require(iconBuildingPath + 'clubs.png');
                          case 'Библиотеки':
                            return icon = require(iconBuildingPath + 'library.png');
                          case 'Fast Food':
                            return icon = require(iconBuildingPath + 'fastFood.png');

                        }
                      }
                    });

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
                                       colorCard={color}
                                       icon={icon}
                                       navigate={navigation}
                                       key={index}
                    />
                  })
              }
            </Swiper>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
            <SubtitlePage title="Случайные заведения"/>
            <TouchableHighlight underlayColor="#fff" onPress={getNewRandomItemsHandler} style={{padding: 10}}>
              <Image style={{height: 20, width: 20}}
                     source={require('../assets/icons/reload.png')}
              />
            </TouchableHighlight>
          </View>

          <View style={styles.popularWrapper}>

            {
              items.map((el, index) => {
                // Get Start and End coords
                let start = {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude
                }
                let end = {
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
                let type = el.context_rubrics;

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

                let color = '';
                let icon = '';
                categoryJSON.category.forEach((elCategory) => {
                  if (el.context_rubrics === elCategory.name) {
                    color = elCategory.color;
                    switch (el.context_rubrics) {
                      case 'Кинотеатры':
                        return icon = require(iconBuildingPath + 'cinema.png');
                      case 'Музеи':
                        return icon = require(iconBuildingPath + 'museum.png');
                      case 'Рестораны':
                        return icon = require(iconBuildingPath + 'restaurant.png');
                      case 'Боулинги':
                        return icon = require(iconBuildingPath + 'bowling.png');
                      case 'Бильярдные':
                        return icon = require(iconBuildingPath + 'billiard.png');
                      case 'Бани, сауны':
                        return icon = require(iconBuildingPath + 'sauna.png');
                      case 'Компьютерные клубы':
                        return icon = require(iconBuildingPath + 'computer.png');
                      case 'Парки':
                        return icon = require(iconBuildingPath + 'park.png');
                      case 'Кафе':
                        return icon = require(iconBuildingPath + 'cafe.png');
                      case 'Дельфинарии':
                        return icon = require(iconBuildingPath + 'dolphinarium.png');
                      case 'Аквапарки':
                        return icon = require(iconBuildingPath + 'aquapark.png');
                      case 'Торговые центры':
                        return icon = require(iconBuildingPath + 'shopping.png');
                      case 'Кальянные':
                        return icon = require(iconBuildingPath + 'hookah.png');
                      case 'Ночные клубы':
                        return icon = require(iconBuildingPath + 'clubs.png');
                      case 'Библиотеки':
                        return icon = require(iconBuildingPath + 'library.png');
                      case 'Fast Food':
                        return icon = require(iconBuildingPath + 'fastFood.png');

                    }
                  }
                });

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
                                 color={color}
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