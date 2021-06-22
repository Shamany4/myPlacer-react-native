import React, {useState} from "react";
import {StyleSheet, View, Text, Image, ScrollView, Alert} from 'react-native';
import InputGroup from "../components/InputGroup";
import ButtonGroup from "../components/ButtonGroup";
import SubtitlePage from "../components/SubtitlePage";
import firebase from "firebase";
import * as SecureStore from "expo-secure-store";


export default function LoginScreen({navigation}) {

  const iconInputPath = '../assets/icons/';

  const initParams = {
    email: '',
    pass: '',
  }
  const validFields = {
    email: false,
    pass: false,
  }
  const hideFields = {
    pass: true,
  }

  const [userData, setUserData] = useState(initParams);
  const [hideTextInput, setHideTextInput] = useState(hideFields);
  const [successInput, setSuccessInput] = useState(validFields);
  const [errorInput, setErrorInput] = useState(validFields);

  const setNextStepRegHandler = () => {
    if (userData.email && userData.pass) {
      onSignIn();
    } else {
      setErrorInput({...errorInput, email: true, pass: true });
    }
  }

  const changeInputHandler = (value, typeInput) => {
    switch (typeInput) {
      case 'email':
        if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value) && value !== '') {
          setUserData({...userData, email: value });
          setSuccessInput({...successInput, email: true});
          setErrorInput({...errorInput, email: false});
        } else {
          setUserData({...userData, email: '' });
          setSuccessInput({...successInput, email: false});
          setErrorInput({...errorInput, email: true});
        }
        break;
      case 'pass':
        if (/(?=[#$-/:-?{-~!"^_`\[\]a-zA-Z]*([0-9#$-/:-?{-~!"^_`\[\]]))(?=[#$-/:-?{-~!"^_`\[\]a-zA-Z0-9]*[a-zA-Z])[#$-/:-?{-~!"^_`\[\]a-zA-Z0-9]{8,}/.test(value) && value !== '') {
          setUserData({...userData, pass: value });
          setSuccessInput({...successInput, pass: true});
          setErrorInput({...errorInput, pass: false});
        } else {
          setUserData({...userData, pass: '' });
          setSuccessInput({...successInput, pass: false});
          setErrorInput({...errorInput, pass: true});
        }
        break;
    }
  }

  const onSignIn = () => {
    const  { email, pass } = userData;
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(() => {
        firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then(async () => {
            await SecureStore.setItemAsync('userID', firebase.auth().currentUser.uid);
            navigation.push('Home');
          })
      })
      .catch((error) => {
        Alert.alert('Ошибка авторизации', 'Не удалось найти пользователя по данной паре логин/пароль. Попробуйте попытку снова.');
      })
  }

  const showPassHandler = (type) => {
    switch (type) {
      case 'pass':
        setHideTextInput({...hideTextInput, pass: !hideTextInput.pass});
        break;
      case 'passConfirm':
        setHideTextInput({...hideTextInput, confirm: !hideTextInput.confirm});
        break;
    }
  }

  return(
    <ScrollView>
      <View style={styles.login}>
        <View style={styles.loginImageGroup}>
          <View style={styles.loginImageGroupBlack}/>
          <View style={styles.loginImageGroupText}>
            <Text style={styles.loginImageGroup__title}>MyPlacer</Text>
            <Text style={styles.loginImageGroup__subtitle}>Авторизация</Text>
          </View>
          <Image style={styles.loginImageGroup__image}
                 source={require('../assets/image/login-bg.jpg')}
          />
        </View>

        <View style={styles.container}>
          <SubtitlePage title="Данные для входа"/>
          <View style={styles.loginForm}>
            <View>
              <InputGroup placeholder="Ваш email"
                          secure={false}
                          icon={require(iconInputPath + 'email.png')}
                          validData={successInput.email}
                          invalidData={errorInput.email}
                          changeText={(text) => changeInputHandler(text, 'email')}
              />
              <InputGroup placeholder="Ваш пароль"
                          secure={hideTextInput.pass}
                          icon={require(iconInputPath + 'pass.png')}
                          secondIcon={require(iconInputPath + 'eye.png')}
                          validData={successInput.pass}
                          invalidData={errorInput.pass}
                          iconClick={() => showPassHandler('pass')}
                          changeText={(text) => changeInputHandler(text, 'pass')}
              />
              <ButtonGroup title="Войти" click={setNextStepRegHandler}/>
            </View>

            <View style={styles.loginFooter}>
              <Text style={styles.loginFooter__title}>Ещё не имеете аккаунта?</Text>
              <Text style={styles.loginFooter__btn} onPress={() => navigation.push('Register')}>Регистрация</Text>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: '6%',
    paddingRight: '6%',
  },
  login: {

  },
  loginForm: {
  },
  loginImageGroup: {
    width: '100%',
    height: 230,
    backgroundColor: 'gray',
    position: 'relative',
    marginBottom: '15%'
  },
  loginImageGroupBlack: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  loginImageGroupText: {
    position: 'absolute',
    bottom: 22,
    left: 22,
    zIndex: 2
  },
  loginImageGroup__title: {
    fontFamily: 'Gilroy-Black',
    fontSize: 25,
    color: '#fff',
    letterSpacing: 0.2,
  },
  loginImageGroup__subtitle: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    color: '#fff',
    letterSpacing: 0.2,
  },
  loginImageGroup__image: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  loginFooter: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 50
  },
  loginFooter__title: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    letterSpacing: 0.32,
    opacity: 0.6
  },
  loginFooter__btn: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
    letterSpacing: 0.32,
    marginTop: 5
  }
});