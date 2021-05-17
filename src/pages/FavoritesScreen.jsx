import React, {useEffect, useState} from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";
import ItemCard from "../components/ItemCard";
import * as SecureStore from "expo-secure-store";
import firebase from "firebase";
import MyLoadingApp from "../components/MyLoadingApp";

export default function FavoritesScreen({navigation}) {

  const [user, setUser] = useState(null);

  const iconWhitePath = '../assets/whiteBuildings/';

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
            <ItemCard open={true} title="Континент" type="Торговый центр"
                      distance="1.68" icon={require(iconWhitePath + 'shopping.png')}
                      navigate={navigation}/>
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
  }
})