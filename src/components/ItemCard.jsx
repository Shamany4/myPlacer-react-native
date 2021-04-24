import React from 'react';
import {StyleSheet, View, Text, Image} from "react-native";

export default function ItemCard({open, title, type, distance, icon}) {
  return(
    <View style={styles.item} >
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
      <View style={{display: 'flex', marginBottom: 20}}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSubtitle}>{type}</Text>
      </View>
      <View style={styles.itemLocation}>
        <Image style={styles.itemLocation__icon} source={require('../assets/icons/position.png')}/>
        <Text style={styles.itemLocation__text}>{distance} км</Text>
      </View>
      <View style={styles.itemIcon}>
        <Image style={styles.itemIcon__icon}
               source={icon}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '48%',
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
    letterSpacing: 0.32,
  },
  itemSubtitle: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 12,
    letterSpacing: 0.24,
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
    fontFamily: 'Gilroy-Regular',
    marginLeft: 7,
    fontSize: 12,
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