import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, TextInput, Image, Text, TouchableHighlight} from 'react-native';
import categoryJSON from "../category.json";
import * as SecureStore from "expo-secure-store";
import firebase from "firebase";

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";
import ItemCard from "../components/ItemCard";
import haversine from "haversine";
import MyLoadingApp from "../components/MyLoadingApp";


export default function SearchScreen({route, navigation}) {

  const {
    location,
    dayWeek,
  } = route.params;

  const iconBuildingPath = '../assets/buildings/';
  const iconWhitePath = '../assets/whiteBuildings/';

  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState(false);
  const [value, setValue] = useState('');
  const [failSearch, setFailSearch] = useState(false);

  useEffect(() => {
    if (value === '') {
      setSearch(false);
      setFailSearch(false);
    }
  });

  useEffect(()=>{
    fetch('https://shamany4.github.io/fake-server/data.json')
      .then((response) => response.json())
      .then((json) => {
        setData(json.result);
      })
  },[]);

  const changeTextHandler = (value) => {
    if (value === '') {
      setItems([]);
    }
    setSearch(true);
    setValue(value);
  }

  const getItemFromSearch = () => {
    if (items) {
      setItems([]);
    }
    data.map((el) => {
      let regexp = new RegExp(`(${value})`, 'mi')
      if (regexp.test(el.name) || regexp.test(el.context_rubrics) || regexp.test(el.name_ex.primary)) {
        setItems(array => [...array, el]);
      }
    })
  }

  useEffect(() => {
    if (items.length > 0) {
      setFailSearch(false);
    } else {
      setFailSearch(true);
    }
  }, [items]);

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
    return <MyLoadingApp title="?????????????????? ???????????????????????????????? ????????????"/>
  }
  return (
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView style={styles.search}>

          <HeaderGroup userName={user.name}/>
          <TitlePage title="??????????"/>

          {
            search
            ?
            <View style={styles.searchGroup} marginTop={20}>
              <TextInput style={styles.searchGroup__input}
                         placeholder="?????????????? ?????????????? ??????????"
                         onChangeText={(text) => changeTextHandler(text)}
              />
              <TouchableHighlight style={styles.searchGroupImage}
                                  underlayColor="#f2f2f2"
                                  onPress={getItemFromSearch}
              >
                <Image style={styles.searchGroupImage__icon} source={require('../assets/icons/search.png')}/>
              </TouchableHighlight>
            </View>
            :
            <View style={styles.searchGroup} marginTop="50%">
              <TextInput style={styles.searchGroup__input}
                         placeholder="?????????????? ?????????????? ??????????"
                         onChangeText={(text) => changeTextHandler(text)}
              />
              <View style={styles.searchGroupImage}>
                <Image style={styles.searchGroupImage__icon} source={require('../assets/icons/search.png')}/>
              </View>
            </View>
          }

          <View style={styles.popularWrapper}>

            {
              items
                ?
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
                    description = '?????????????????????? ??????????-???????? ???????????????? ?????? ?????????????? ??????????????????. ???????????????? ???????? ??????????????????.';
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
                    rating = '??????????????????????';
                  } else {
                    rating = el.reviews.general_rating;
                  }

                  let color = '';
                  let icon = '';
                  categoryJSON.category.forEach((elCategory) => {
                    if (el.context_rubrics === elCategory.name) {
                      color = elCategory.color;
                      switch (el.context_rubrics) {
                        case '????????????????????':
                          return icon = require(iconBuildingPath + 'cinema.png');
                        case '????????????':
                          return icon = require(iconBuildingPath + 'theatre.png');
                        case '??????????':
                          return icon = require(iconBuildingPath + 'museum.png');
                        case '??????????????????':
                          return icon = require(iconBuildingPath + 'restaurant.png');
                        case '????????????????':
                          return icon = require(iconBuildingPath + 'bowling.png');
                        case '????????????????????':
                          return icon = require(iconBuildingPath + 'billiard.png');
                        case '????????, ??????????':
                          return icon = require(iconBuildingPath + 'sauna.png');
                        case '???????????????????????? ??????????':
                          return icon = require(iconBuildingPath + 'computer.png');
                        case '??????????':
                          return icon = require(iconBuildingPath + 'park.png');
                        case '????????':
                          return icon = require(iconBuildingPath + 'cafe.png');
                        case '??????????????????????':
                          return icon = require(iconBuildingPath + 'dolphinarium.png');
                        case '??????????????????':
                          return icon = require(iconBuildingPath + 'aquapark.png');
                        case '???????????????? ????????????':
                          return icon = require(iconBuildingPath + 'shopping.png');
                        case '??????????????????':
                          return icon = require(iconBuildingPath + 'hookah.png');
                        case '???????????? ??????????':
                          return icon = require(iconBuildingPath + 'clubs.png');
                        case '????????????????????':
                          return icon = require(iconBuildingPath + 'library.png');
                        case 'Fast Food':
                          return icon = require(iconBuildingPath + 'fastFood.png');

                      }
                    }
                  });

                  return <ItemCard open={true}
                                   title={el.name_ex.primary}
                                   type={type}
                                   buildingID={el.id}
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
                :
                null
            }

          </View>

          {
            failSearch
              ?
              <Text style={styles.searchFailText}>??????, ???????????? ???? ?????????????? :(</Text>
              :
              null
          }


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
  popularWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  search: {

  },
  searchGroup: {
    width: '100%',
    height: 60,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchGroup__input: {
    fontFamily: 'Gilroy-Medium',
    flex: 4.5,
    fontSize: 15,
    borderRadius: 10,
    letterSpacing: 0.2,
    paddingLeft: 20
  },
  searchGroupImage: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchGroupImage__icon: {
    height: 24,
    width: 24,
  },
  searchGroupWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  searchFailText: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center'
  }
})