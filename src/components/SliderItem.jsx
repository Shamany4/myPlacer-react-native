import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';
import moment from "moment";

export default function SliderItem({colorCard, title, type, image, desc, timeWork, is_24x7, rating, contacts, contactsNull, distance, color, icon, navigate, address}) {

  const [status, setStatus] = useState(false);
  const [close, setClose] = useState(false);

  useEffect(() => {
    if (timeWork === undefined) {
      setStatus(false);
      setClose(true);
    }
  }, [timeWork]);


  // Change status buildings
  useEffect(() => {
    if (is_24x7) {
      setStatus(true);
    } else {
      if (timeWork) {
        getStatus();
      }
    }
  }, [timeWork]);

  const getStatus = () => {
    let date = new Date();
    let timeOpen = moment().format(timeWork.working_hours[0].from);
    let timeClose = moment().format(timeWork.working_hours[0].to);
    let timeCurrent = moment().format('HH:mm');
    if (moment.utc(moment.duration(timeClose) - moment.duration(timeCurrent)).format('HH:mm') <= moment.utc(moment.duration(timeClose) - moment.duration(timeOpen)).format('HH:mm')) {
      setStatus(true);
    }
  }

  return (
    <TouchableHighlight style={{height: '83%'}}
                        underlayColor="#fff"
                        onPress={() =>
                          navigate.navigate('Info', {
                            name: title,
                            address: address,
                            image: image,
                            description: desc,
                            workTime: timeWork,
                            rating: rating,
                            status: status,
                            contacts: contacts,
                            contactsNull: contactsNull,
                            close: close,
                            is_24x7: is_24x7
                          })}

    >
      <View style={styles.sliderItem} backgroundColor={colorCard}>
        <View style={styles.sliderInfo}>
          <View style={styles.sliderLocation}>
            <Image style={styles.sliderLocation__icon} source={require('../assets/icons/position.png')}/>
            <Text style={styles.sliderLocation__text}>{distance} км</Text>
          </View>
          <View>
            <Text style={styles.sliderTitle}>{title}</Text>
            <Text style={styles.sliderSubtitle}>{type}</Text>
          </View>
        </View>
        <View style={styles.sliderImage}>
          <Image style={styles.sliderImage__icon}
                 source={icon}/>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  sliderItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 10,
    padding: 20,
  },
  sliderInfo: {
    flex: 2.5,
    height: '100%',
    justifyContent: 'space-around',
  },
  sliderLocation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderLocation__icon: {
    marginRight: 8,
    height: 22,
    width: 22
  },
  sliderLocation__text: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  sliderTitle: {
    fontFamily: 'Gilroy-ExtraBold',
    fontSize: 25,
    letterSpacing: 0.1,
    lineHeight: 28
  },
  sliderSubtitle: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    letterSpacing: 0.24,
  },
  sliderImage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sliderImage__icon: {
    height: 80,
    width: 80
  }
})