import React, {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";


import Menu from "../components/Menu";
import HeaderGroup from "../components/HeaderGroup";
import TitlePage from "../components/TitlePage";
import SubtitlePage from "../components/SubtitlePage";
import Swiper from "react-native-web-swiper";
import InputGroup from "../components/InputGroup";
import ButtonGroup from "../components/ButtonGroup";
import * as SecureStore from "expo-secure-store";
import firebase from "firebase";
import MyLoadingApp from "../components/MyLoadingApp";

export default function ItemInfoScreen({route, navigation}) {

  const iconInputPath = '../assets/icons/';

  const [favorite, setFavorite] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    name,
    address,
    image,
    description,
    workTime,
    rating,
    contactsNull,
    contacts,
    status,
    is_24x7,
    close,
    username,
    buildingID
  } = route.params;

  const favoriteHandler = async () => {
    let userID = await SecureStore.getItemAsync('userID');
    if (favorite) {
      Alert.alert('Added!');
    } else {
      firebase.firestore().collection('favorites')
        .doc(userID)
        .collection('userFavorites')
        .doc(buildingID)
        .set({buildingID})
        .then(() => {
          setFavorite(true);
        })
    }
  }

  useEffect(() => {
    (async () => {
      let userID = await SecureStore.getItemAsync('userID');
      firebase.firestore().collection('favorites')
        .doc(userID)
        .collection('userFavorites')
        .get()
        .then(result => {
          result.forEach(el => {
            if (el.data().buildingID === buildingID) {
              setFavorite(true);
            } else {
              setFavorite(false);
            }
          })
        })
    })();
  }, []);

  if (isVisible) {
    return(
      <View style={styles.application}>
        <Menu navigation={navigation}/>
        <ScrollView>
          <View style={styles.container}>
            <ScrollView style={styles.info}>

              <HeaderGroup userName={username} />

              <View style={styles.infoTitleGroup}>
                <View style={{flex: 5}}>
                  <TitlePage title={name}/>
                  <Text style={styles.infoTitleGroup__address}>{address}</Text>
                </View>
                <TouchableOpacity onPress={favoriteHandler} style={{flex: 1, alignItems: 'flex-end'}}>
                  {
                    favorite
                      ?
                      <Image style={styles.infoTitleGroup__icon}
                             source={require('../assets/icons/favoriteFill.png')}
                      />
                      :
                      <Image style={styles.infoTitleGroup__icon}
                             source={require('../assets/icons/favoriteBorder.png')}
                      />
                  }
                </TouchableOpacity>
              </View>

              <View style={styles.infoStatusGroup}>
                <SubtitlePage title="Фото заведения"/>
                <View style={styles.itemStatus}>
                  {
                    status ?
                      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.itemStatus__circle} backgroundColor="#84ffa9"/>
                        <Text style={styles.itemStatus__text}>Открыто</Text>
                      </View>
                      :
                      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.itemStatus__circle} backgroundColor="#ff8c84"/>
                        <Text style={styles.itemStatus__text}>Закрыто</Text>
                      </View>
                  }
                </View>
              </View>

            </ScrollView>
          </View>

          {/* End container */}
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
                image.map((el, index) =>
                  <Image style={styles.sliderItemPhoto}
                         source={{
                           uri: el.main_photo_url
                         }}
                         key={index}
                  />)
              }
            </Swiper>
          </View>

          {/* Start container */}
          <View style={styles.containerInfo}>
            <ScrollView style={styles.info}>

              <SubtitlePage title="Информация о заведении"/>
              <Text style={styles.infoDescription}>{description.split('<br />')}</Text>

              <View style={styles.smallCardWrapper}>
                <View style={styles.item} >
                  <Text style={styles.itemTitle}>Режим работы</Text>
                  {
                    is_24x7
                      ?
                      <Text style={styles.itemLocation__text}>Круглосуточно</Text>
                      :
                      close
                        ?
                        <Text style={styles.itemLocation__text}>Выходной</Text>
                        :
                        <Text style={styles.itemLocation__text}>{workTime.working_hours[0].from} - {workTime.working_hours[0].to}</Text>
                  }
                </View>
                <View style={styles.item} >
                  <Text style={styles.itemTitle}>Рейтинг</Text>
                  <Text style={styles.itemLocation__text_rating}>{rating}</Text>
                </View>
              </View>

              <SubtitlePage title="Контактная информация" />
              {
                contactsNull
                  ?
                  <Text style={styles.infoDescription}>Отсутствует какая-либо контактная информация о заведении. Подробности узнавайте по прибытию на адрес.</Text>
                  :
                  contacts.map((el, index) => {
                    switch (el.type) {
                      case 'phone':
                        return <InputGroup value={el.text} icon={require('../assets/icons/phone.png')} secure={false} key={index}/>
                      case 'email':
                        return <InputGroup value={el.text} icon={require('../assets/icons/email.png')} secure={false} key={index}/>
                      case 'website':
                        return <InputGroup value={el.text} icon={require('../assets/icons/website.png')} secure={false} key={index}/>
                      case 'vkontakte':
                        let str = el.text.split('https://');
                        return <InputGroup value={str[1]} icon={require('../assets/icons/vk.png')} secure={false} key={index}/>
                      case 'instagram':
                        let str2 = el.text.split('https://instagram.com/');
                        return <InputGroup value={str2[1]} icon={require('../assets/icons/instagram.png')} secure={false} key={index}/>
                    }
                  })
              }


              {
                contactsNull
                  ?
                  null
                  :
                  <ButtonGroup title="Позвонить" />
              }

            </ScrollView>
          </View>
        </ScrollView>

      </View>
    );
  } else {
    return <MyLoadingApp title="Загружаем информацию о заведении" />
  }
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
  },
  containerInfo: {
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingBottom: 90
  },
  sliderContainer: {
    width: '100%',
    height: 300,
  },
  sliderItemPhoto: {
    height: '85%',
    width: '100%'
  },
  info: {

  },
  infoTitleGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoTitleGroup__address: {

  },
  infoTitleGroup__icon: {
    width: 25,
    height: 25,
  },
  infoStatusGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  itemStatus: {
    display: 'flex',
  },
  itemStatus__circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5
  },
  itemStatus__text: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
  },
  infoDescription: {
    width: '100%',
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    letterSpacing: 0.28,
    lineHeight: 20,
    textAlign: 'justify',
    marginBottom: 10,
  },

  smallCardWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  item: {
    width: '48%',
    height: 80,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  itemTitle: {
    fontFamily: 'Gilroy-Black',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.32,
  },
  itemLocation__text: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.24,
  },
  itemLocation__text_rating: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.4,
  },
});