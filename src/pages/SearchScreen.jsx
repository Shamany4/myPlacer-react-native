import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, TextInput} from 'react-native';

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";

import IconInput from '../assets/icons/search.svg';
import ItemCard from "../components/ItemCard";

export default function SearchScreen({navigation}) {
  const [search, setSearch] = useState(false);
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
            <View style={styles.searchGroup} marginTop={0}>
            <TextInput style={styles.searchGroup__input} placeholder="Начните вводить здесь"/>
            <IconInput style={styles.searchGroup__icon} height={24} width={24}/>
            </View>
            :
            <View style={styles.searchGroup} marginTop={160}>
            <TextInput style={styles.searchGroup__input} placeholder="Начните вводить здесь"/>
            <IconInput style={styles.searchGroup__icon} height={24} width={24}/>
            </View>
          }

          <View style={styles.popularWrapper}>
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
    position: 'relative',
    marginBottom: 30,
  },
  searchGroup__input: {
    fontFamily: 'Gilroy-Medium',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 20,
    fontSize: 15,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    letterSpacing: 0.2,
  },
  searchGroup__icon: {
    position: 'absolute',
    right: 25,
    top: '50%',
    transform: [{ translateY: -12 }],
  }
})