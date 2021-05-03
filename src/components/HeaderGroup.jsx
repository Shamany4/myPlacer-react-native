import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';

import DateGroup from './DateGroup';
import AvatarGroup from "./AvatarGroup";

export default function HeaderGroup({ }) {

  const [dayWeek, setDayWeek] = useState('Воскресенье');
  const [dayMonth, setDayMonth] = useState('мая');

  useEffect(()=> {
    moment.locale('ru');
    let day = moment().format('dddd');
    let str = day[0].toUpperCase() + day.slice(1);
    setDayWeek(str);
    setDayMonth(moment().format('DD MMM'));
  });

  return (
    <View style={styles.header}>
      <DateGroup dayWeek={dayWeek} dayMonth={dayMonth} />
      <AvatarGroup />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35
  }
});