import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";
import ItemCard from "../components/ItemCard";
import * as SecureStore from "expo-secure-store";
import firebase from "firebase";
import MyLoadingApp from "../components/MyLoadingApp";
import categoryJSON from "../category.json";
import haversine from "haversine";

export default function FavoritesScreen({route, navigation}) {
  const {
    location,
    dayWeek
  } = route.params;

  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState(false);

  const iconBuildingPath = '../assets/buildings/';

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

  useEffect(() => {
    (async () => {
      const array = [];
      let userID = await SecureStore.getItemAsync('userID');
      await firebase.firestore().collection('favorites')
        .doc(userID)
        .collection('userFavorites')
        .get()
        .then(response => {
          response.forEach((el) => {
            array.push(el.data().buildingID);
          });
        })
      await getUsersItems(array)
    })();
  }, []);

  const getUsersItems = async (array) => {
    await fetch('https://shamany4.github.io/fake-server/data.json')
      .then((response) => response.json())
      .then((json) => {
        let data = json.result;
        array.forEach((arrElement) => {
          let result = data.filter(el => el.id === arrElement);
          result.forEach(el => {
            setItems(array => [...array, el]);
          })
        })
      })
  }

  useEffect(() => {
    if (items.length > 0) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [items]);

  const getItems = (arrayID) => {
    if (arrayID.length === 0) {
      return setItems([]);
    }
    fetch('https://shamany4.github.io/fake-server/data.json')
      .then((response) => response.json())
      .then((json) => {
        arrayID.forEach(async (indexId) =>{
          let index = await json.result.findIndex(el => el.id === indexId);
          if (index === -1) {
            return null;
          }
          if (!items) {
            await setItems([json.result[index]]);
          }
          await setItems(array => [...array, json.result[index]]);
        })
      })
  }

  if (!user) {
    return <MyLoadingApp title="Загружаем пользовательские данные"/>
  }
  return (
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView style={styles.favorites}>

          <HeaderGroup userName={user.name}/>
          <TitlePage title="Избранное"/>

          <View style={styles.popularWrapper}>
            {
              empty
                ?
                <Text style={styles.searchFailText}>Вы ещё ничего не добавили :(</Text>
                :
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
                                   buildingID={el.id}
                                   title={el.name_ex.primary}
                                   type={type}
                                   address={el.address_name}
                                   image={el.external_content}
                                   desc={description}
                                   distance={haversine(start, end).toFixed(2)}
                                   timeWork={el.schedule[dayWeek]}
                                   is_24x7={el.schedule.is_24x7}
                                   rating={rating}
                                   contactsNull={contactNull}
                                   contacts={contactsArr}
                                   color={color}
                                   icon={icon}
                                   navigate={navigation}
                                   username={user.name}
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
  favorites: {

  },
  popularWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 25
  },
  searchFailText: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
  }
})