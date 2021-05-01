import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Menu from "../components/Menu";
import HeaderGroup from "../components/HeaderGroup";
import TitlePage from "../components/TitlePage";
import SubtitlePage from "../components/SubtitlePage";
import Swiper from "react-native-web-swiper";
import SliderItem from "../components/SliderItem";
import InputGroup from "../components/InputGroup";
import ButtonGroup from "../components/ButtonGroup";

export default function ItemInfoScreen({route, navigation, open}) {

  const iconInputPath = '../assets/icons/';

  const [favorite, setFavorite] = useState(false);
  const favoriteHandler = () => {
    setFavorite(!favorite);
  }

  const {
    name,
    address,
    image,
    description,
    workTime,
    rating,
    contacts
  } = route.params;

  return(
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <ScrollView>
        <View style={styles.container}>
          <ScrollView style={styles.info}>

            <HeaderGroup/>

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
                  open ?
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
                <View style={{display: 'flex', marginBottom: 20}}>
                  <Text style={styles.itemTitle}>Режим работы</Text>
                </View>
                <Text style={styles.itemLocation__text}>{workTime.working_hours[0].from} - {workTime.working_hours[0].to}</Text>
                <View style={styles.itemIcon}>
                  <Image style={styles.itemIcon__icon}
                         source={require('../assets/iconsWhite/clock.png')}/>
                </View>
              </View>
              <View style={styles.item} >
                <View style={{display: 'flex', marginBottom: 20}}>
                  <Text style={styles.itemTitle}>Рейтинг</Text>
                </View>
                <Text style={styles.itemLocation__text_rating}>{rating}</Text>
                <View style={styles.itemIcon}>
                  <Image style={styles.itemIcon__icon}
                         source={require('../assets/iconsWhite/star.png')}/>
                </View>
              </View>
            </View>

            <SubtitlePage title="Контактная информация" />
            {
              contacts.map((el, index) => {
                switch (el.type) {
                  case 'phone':
                    return <InputGroup value={el.text} icon={require('../assets/icons/phone.png')} secure={false} key={index}/>
                  case 'email':
                    return <InputGroup value={el.text} icon={require('../assets/icons/email.png')} secure={false} key={index}/>
                  case 'website':
                    return <InputGroup value={el.text} icon={require('../assets/icons/website.png')} secure={false} key={index}/>
                  case 'vkontakte':
                    let str = el.text.split('https://vk.com/');
                    return <InputGroup value={str[1]} icon={require('../assets/icons/vk.png')} secure={false} key={index}/>
                  case 'instagram':
                    let str2 = el.text.split('https://instagram.com/');
                    return <InputGroup value={str2[1]} icon={require('../assets/icons/instagram.png')} secure={false} key={index}/>
                }
              })
            }
            <ButtonGroup title="Позвонить" />
            <ButtonGroup title="Написать" />

          </ScrollView>
        </View>
      </ScrollView>

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
    textAlign: 'left',
  },

  smallCardWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  item: {
    width: '48%',
    height: 100,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
    marginBottom: 16
  },
  itemTitle: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
    letterSpacing: 0.32,
  },
  itemLocation__text: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 13,
    letterSpacing: 0.24,
    paddingBottom: 5
  },
  itemLocation__text_rating: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 22,
    letterSpacing: 0.4,
  },
  itemIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 50,
    width: 50,
    backgroundColor: '#404040',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemIcon__icon: {
    height: 24,
    width: 24
  }
});