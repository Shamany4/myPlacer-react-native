import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Text, Image, TouchableHighlight} from 'react-native';
import firebase from "firebase";
import * as SecureStore from 'expo-secure-store';

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";
import SubtitlePage from "../components/SubtitlePage";
import InputGroup from "../components/InputGroup";
import MyLoadingApp from "../components/MyLoadingApp";

export default function CabinetScreen({navigation}) {

  const [user, setUser] = useState(null);

  const iconInputPath = '../assets/icons/';

  const logOutHandler = () => {
    firebase.auth()
      .signOut()
      .then(async () => {
        await SecureStore.deleteItemAsync('userID');
        navigation.navigate('Login');
      })
  }

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
        <ScrollView style={styles.cabinet}>

          <HeaderGroup userName={user.name}/>
          <TitlePage title="Личный кабинет"/>

          <View style={styles.cabinetImageGroup}>
            <View style={styles.avatar__image}>
              <Text style={styles.avatar__symbol}>{user.name[0].toUpperCase()}</Text>
            </View>
            <View style={styles.cabinetEditGroup}>
              <Text style={styles.cabinetEditGroup__text}>{user.name}</Text>
              <TouchableHighlight onPress={logOutHandler}>
                <Text style={styles.cabinetEditGroup__exit}>Выход</Text>
              </TouchableHighlight>
            </View>
          </View>

          <SubtitlePage title="Логин для входа"/>
          <View>
            <InputGroup value={user.email} secure={false}
                        icon={require(iconInputPath + 'email.png')}
            />
          </View>

          <SubtitlePage title="Контактные данные"/>
          <View>
            <View style={styles.cabinetInfoGroup}>
              <Text style={styles.cabinetInfoGroup__title}>Полное имя:</Text>
              <Text style={styles.cabinetInfoGroup__subtitle}>{user.name}</Text>
            </View>
            <View style={styles.cabinetInfoGroup}>
              <Text style={styles.cabinetInfoGroup__title}>Возраст:</Text>
              <Text style={styles.cabinetInfoGroup__subtitle}>{user.age}</Text>
            </View>
            <View style={styles.cabinetInfoGroup}>
              <Text style={styles.cabinetInfoGroup__title}>Телефон:</Text>
              <Text style={styles.cabinetInfoGroup__subtitle}>{user.phone.toString()}</Text>
            </View>
            <View style={styles.cabinetInfoGroup}>
              <Text style={styles.cabinetInfoGroup__title}>Дата регистрации:</Text>
              <Text style={styles.cabinetInfoGroup__subtitle}>{user.dateRegistration}</Text>
            </View>
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
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingTop: 30,
    paddingBottom: 60,
  },
  cabinet: {

  },
  cabinetImageGroup: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  avatar__image: {
    height: 150,
    width: 150,
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    marginLeft: 13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  avatar__symbol: {
    fontSize: 80,
    fontFamily: 'Gilroy-Black',
    color: '#000'
  },
  cabinetEditGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  cabinetEditGroup__text: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18
  },
  cabinetEditGroup__exit: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginLeft: 5
  },
  cabinetInfoGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cabinetInfoGroup__title: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
  },
  cabinetInfoGroup__subtitle: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
    marginLeft: 10
  },
})