import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableHighlight} from "react-native";
import moment from 'moment';
import 'moment/locale/ru';

export default function ItemCard({ buildingID, title, type, image, desc, timeWork, is_24x7, rating, contacts, contactsNull, distance, color, icon, navigate, address, username}) {

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


  return(
    <TouchableHighlight style={{width: '48%'}}
                        underlayColor="#fff"
                        onPress={async () =>
                          await navigate.push('Info', {
                            name: title,
                            buildingID: buildingID,
                            address: address,
                            image: image,
                            description: desc,
                            workTime: timeWork,
                            rating: rating,
                            status: status,
                            contacts: contacts,
                            contactsNull: contactsNull,
                            close: close,
                            username: username,
                            is_24x7: is_24x7
                        })}
    >
      <View style={styles.item}>
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
        <View style={{display: 'flex'}}>
          <Text style={styles.itemTitle} numberOfLines={2}>{title}</Text>
          <Text style={styles.itemSubtitle} numberOfLines={1}>{type}</Text>
        </View>
        <View style={styles.itemLocation}>
          <Image style={styles.itemLocation__icon} source={require('../assets/icons/position.png')}/>
          <Text style={styles.itemLocation__text}>{distance} км</Text>
        </View>
        <View style={styles.itemIcon} backgroundColor={color} >
          <Image style={styles.itemIcon__icon}
                 source={icon}/>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 150,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
    marginBottom: 16
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
  itemTitle: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
    letterSpacing: 0.3,
    lineHeight: 20,
  },
  itemSubtitle: {
    width: '80%',
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    letterSpacing: 0.24,
    lineHeight: 20,
  },
  itemLocation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLocation__icon: {
    height: 18,
    width: 18
  },
  itemLocation__text: {
    fontFamily: 'Gilroy-Medium',
    marginLeft: 7,
    fontSize: 12,
    letterSpacing: 0.3,
  },
  itemIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 50,
    width: 50,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemIcon__icon: {
    height: 30,
    width: 30,
  }
});