import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, TextInput, Image, Text, TouchableHighlight} from 'react-native';

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";
import ItemCard from "../components/ItemCard";
import haversine from "haversine";


export default function SearchScreen({route, navigation}) {
  const {
    location,
    currentDay,
  } = route.params;

  const iconWhitePath = '../assets/whiteBuildings/';

  const [data, setData] = useState([]);
  const [search, setSearch] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value === '') {
      setSearch(false);
    }
  });

  const changeTextHandler = (value) => {
    setSearch(true);
    setValue(value);
  }

  const pressIconHandler = () => {
    fetch('https://catalog.api.2gis.com/3.0/items?' +
        `q=Новосибирск ${value}` +
        '&fields=items.org,' +
        'items.point,' +
        'items.contact_groups,' +
        'items.name_ex,' +
        'items.description,' +
        'items.schedule,' +
        'items.external_content,' +
        'context_rubrics,' +
        'items.reviews' +
        '&key=ruoucu5799')
          .then((response) => response.json())
          .then((json) => {
            setData(json.result);
          })
  }

  console.log(data);

  return (
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView style={styles.search}>

          <HeaderGroup/>
          <TitlePage title="Поиск"/>

          {
            search
            ?
            <View style={styles.searchGroup} marginTop={20}>
              <TextInput style={styles.searchGroup__input}
                         placeholder="Начните вводить здесь"
                         onChangeText={(text) => changeTextHandler(text)}
              />
              <TouchableHighlight style={styles.searchGroupImage}
                                  underlayColor="#f2f2f2"
                                  onPress={pressIconHandler}
              >
                <Image style={styles.searchGroupImage__icon} source={require('../assets/icons/search.png')}/>
              </TouchableHighlight>
            </View>
            :
            <View style={styles.searchGroup} marginTop="50%">
              <TextInput style={styles.searchGroup__input}
                         placeholder="Начните вводить здесь"
                         onChangeText={(text) => changeTextHandler(text)}
              />
              <View style={styles.searchGroupImage}>
                <Image style={styles.searchGroupImage__icon} source={require('../assets/icons/search.png')}/>
              </View>
            </View>
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
    alignItems: 'center'
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
  }
})