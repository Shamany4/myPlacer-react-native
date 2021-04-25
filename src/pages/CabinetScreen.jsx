import React from 'react';
import {StyleSheet, View, ScrollView, Text, Image, TouchableHighlight} from 'react-native';

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";
import SubtitlePage from "../components/SubtitlePage";
import InputGroup from "../components/InputGroup";

export default function CabinetScreen({navigation}) {
  const iconInputPath = '../assets/icons/';
  return (
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView style={styles.cabinet}>

          <HeaderGroup/>
          <TitlePage title="Личный кабинет"/>

          <View style={styles.cabinetImageGroup}>
            <Image style={styles.cabinetImageGroup__image}
                   source={{
                     uri: 'https://sun9-54.userapi.com/impf/c849224/v849224749/1d2f6f/-p1ekz9Xlv8.jpg?size=720x1080&quality=96&sign=a60c91d2c7a99e0aa65830162d8ae1a3&type=album',
                   }}
            />
            <View style={styles.cabinetEditGroup}>
              <Text style={styles.cabinetEditGroup__text}>Майкл</Text>
              <TouchableHighlight onPress={() => navigation.navigate('Home')}>
                <Image style={styles.cabinetEditGroup__icon} source={require('../assets/icons/edit.png')}/>
              </TouchableHighlight>
            </View>
          </View>

          <SubtitlePage title="Данные для входа"/>
          <View>
            <InputGroup value="mikle-po4ta@mail.ru" secure={false} icon={require(iconInputPath + 'mail.png')}
                        secondIcon={require(iconInputPath + 'edit.png')}/>
            <InputGroup value="*********************" secure={true} icon={require(iconInputPath + 'pass.png')} secondIcon={require(iconInputPath + 'edit.png')}/>
            <InputGroup value="8 (383) 311-01-84" secure={false} icon={require(iconInputPath + 'phone.png')} secondIcon={require(iconInputPath + 'edit.png')}/>
          </View>

          <SubtitlePage title="Контактные данные"/>
          <View>
            <View style={styles.cabinetInfoGroup}>
              <Text style={styles.cabinetInfoGroup__title}>Город проживания:</Text>
              <Text style={styles.cabinetInfoGroup__subtitle}>Новосибирск</Text>
            </View>
            <View style={styles.cabinetInfoGroup}>
              <Text style={styles.cabinetInfoGroup__title}>Улица:</Text>
              <Text style={styles.cabinetInfoGroup__subtitle}>Немировича-Данченко</Text>
            </View>
            <View style={styles.cabinetInfoGroup}>
              <Text style={styles.cabinetInfoGroup__title}>Дата регистрации:</Text>
              <Text style={styles.cabinetInfoGroup__subtitle}>15.04.2021</Text>
            </View>
            <View style={styles.cabinetInfoGroup}>
              <Text style={styles.cabinetInfoGroup__title}>Дата рождения:</Text>
              <Text style={styles.cabinetInfoGroup__subtitle}>21.06.1995</Text>
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
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#fefefe',
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
    marginTop: 10,
    marginBottom: 30,
  },
  cabinetImageGroup__image: {
    width: 140,
    height: 140,
    borderRadius: 20,
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
  cabinetEditGroup__icon: {
    width: 18,
    height: 19,
    marginLeft: 15
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