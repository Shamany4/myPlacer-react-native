import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, Image, ScrollView, Alert} from 'react-native';
import firebase from "firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';


import InputGroup from "../components/InputGroup";
import ButtonGroup from "../components/ButtonGroup";
import SubtitlePage from "../components/SubtitlePage";
import TextInputMask from "react-native-masked-text/lib/text-input-mask";


export default function LoginScreen({navigation}) {
  const iconInputPath = '../assets/icons/';

  const initParams = {
    email: '',
    pass: '',
    name: '',
    age: 0,
    phone: 0
  }
  const validFields = {
    email: false,
    pass: false,
    confirm: false,
    name: false,
    age: false,
    phone: false
  }
  const hideFields = {
    pass: true,
    confirm: true
  }


  const [regNext, setRegNext] = useState(false);
  const [userData, setUserData] = useState(initParams);
  const [hideTextInput, setHideTextInput] = useState(hideFields);
  const [successInput, setSuccessInput] = useState(validFields);
  const [errorInput, setErrorInput] = useState(validFields);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(null);

  const setNextStepRegHandler = () => {
    if (userData.email && userData.pass) {
      setRegNext(true);
    } else {
      setErrorInput({...errorInput, email: true, pass: true, confirm: true});
    }
  }

  const finishRegisterHandler = () => {
    if (userData.name && userData.age && userData.phone) {
      onSignUp();
    } else {
      setErrorInput({...errorInput, name: true, age: true, phone: true});
    }
  }

  const onSignUp = () => {
    const  { email, pass, name, age, phone } = userData;
    firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(() => {
        firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
            age,
            phone
          })
          .then(async () => {
            await AsyncStorage.setItem('@userId', firebase.auth().currentUser.uid)
            navigation.navigate('Home');
          })
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Ошибка регистрации!','Этот адрес электронной почты уже используется!');
          setRegNext(false);
          setPhone(null);
          setSuccessInput({...successInput,
            email: false,
            pass: false,
            confirm: false,
            name: false,
            age: false,
            phone: false
          });
          setErrorInput({...errorInput,
            email: true,
            pass: true,
            confirm: true,
            name: true,
            age: true,
            phone: true
          });
        }
      })
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
          setPassword(value);
          setSuccessInput({...successInput, pass: true});
          setErrorInput({...errorInput, pass: false});
        } else {
          setPassword('');
          setSuccessInput({...successInput, pass: false});
          setErrorInput({...errorInput, pass: true});
        }
        break;
      case 'passConfirm':
        if (password && password === value) {
          setUserData({...userData, pass: value});
          setSuccessInput({...successInput, confirm: true});
          setErrorInput({...errorInput, confirm: false});
        } else {
          setUserData({...userData, pass: '' });
          setSuccessInput({...successInput, confirm: false});
          setErrorInput({...errorInput, confirm: true});
        }
        break;
      case 'userName':
        if (/^[А-я]{3,20}$/.test(value) && value !== '') {
          setUserData({...userData, name: value});
          setSuccessInput({...successInput, name: true});
          setErrorInput({...errorInput, name: false});
        } else {
          setUserData({...userData, name: '' });
          setSuccessInput({...successInput, name: false});
          setErrorInput({...errorInput, name: true});
        }
        break;
      case 'age':
        if (/^[0-9]{2}$/.test(value) && value !== '') {
          setUserData({...userData, age: Number(value)});
          setSuccessInput({...successInput, age: true});
          setErrorInput({...errorInput, age: false});
        } else {
          setUserData({...userData, age: 0 });
          setSuccessInput({...successInput, age: false});
          setErrorInput({...errorInput, age: true});
        }
        break;
      case 'phone':
        let number = Number(value[0] + value[3] + value[4] + value[5] + value[8] + value[9] + value[10] + value[12] + value[13] + value[14] + value[15]);
        if (value[0] && value[3] && value[4] && value[5] && value[8] && value[9] && value[10] && value[12] && value[13] && value[14] && value[15]) {
          setUserData({...userData, phone: number});
          setSuccessInput({...successInput, phone: true});
          setErrorInput({...errorInput, phone: false});
        } else {
          setUserData({...userData, phone: 0});
          setSuccessInput({...successInput, phone: false});
          setErrorInput({...errorInput, phone: true});
        }
        break;
    }
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
            <Text style={styles.loginImageGroup__subtitle}>Регистрация</Text>
          </View>
          <Image style={styles.loginImageGroup__image}
                 source={require('../assets/image/register-bg.jpg')}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.loginForm}>
            {
              !regNext
                ?
                <View>
                  <SubtitlePage title="Данные для входа"/>
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
                  <InputGroup placeholder="Повторите пароль"
                              secure={hideTextInput.confirm}
                              icon={require(iconInputPath + 'pass.png')}
                              secondIcon={require(iconInputPath + 'eye.png')}
                              validData={successInput.confirm}
                              invalidData={errorInput.confirm}
                              iconClick={() => showPassHandler('passConfirm')}
                              changeText={(text) => changeInputHandler(text, 'passConfirm')}
                  />
                  <ButtonGroup title="Регистрация" click={setNextStepRegHandler} />
                </View>
                :
                <View>
                  <SubtitlePage title="Контактные данные"/>
                  <InputGroup placeholder="Ваше имя"
                              secure={false}
                              icon={require(iconInputPath + 'user.png')}
                              validData={successInput.name}
                              invalidData={errorInput.name}
                              changeText={(text) => changeInputHandler(text, 'userName')}
                  />
                  <InputGroup placeholder="Ваш возраст"
                              secure={false}
                              icon={require(iconInputPath + 'info.png')}
                              validData={successInput.age}
                              invalidData={errorInput.age}
                              changeText={(text) => changeInputHandler(text, 'age')}
                  />

                  <View style={styles.inputGroup}
                        borderColor={successInput.phone ? '#00ad8b' : errorInput.phone ? '#F56E6E' : null}
                        borderWidth={successInput.phone ? 2 : errorInput.phone ? 2 : null}
                  >
                    <View style={styles.inputGroupImage}>
                      <Image style={styles.inputGroupImage__icon}
                             source={require(iconInputPath + 'phone.png')}/>
                    </View>
                    <TextInputMask
                      style={styles.inputGroup__input}
                      type={'custom'}
                      placeholder="Ваш телефон"
                      options={{
                        mask: '8 (999) 999-9999'
                      }}
                      value={phone}
                      onChangeText={(text) => {
                        setPhone(text);
                        changeInputHandler(text, 'phone')
                      }}
                    />
                  </View>

                  <ButtonGroup title="Завершить регистрацию" click={finishRegisterHandler} />
                </View>
            }

            <View style={styles.loginFooter}>
              <Text style={styles.loginFooter__title}>Уже имеете аккаунт?</Text>
              <Text style={styles.loginFooter__btn} onPress={() => navigation.navigate('Login')}>Авторизация</Text>
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
  loginForm: {
    paddingBottom: 25
  },
  loginImageGroup: {
    width: '100%',
    height: 230,
    position: 'relative',
    marginBottom: '10%'
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
  },

  inputGroup: {
    width: '100%',
    height: 60,
    borderColor: '#eee',
    backgroundColor: '#eee',
    elevation: 5,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  inputGroup__input: {
    height: '100%',
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    paddingRight: 20,
    letterSpacing: 0.3,
    color: '#000',
    flex: 4,
  },
  inputGroupImage: {
    height: '100%',
    maxWidth: 60,
    minWidth: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroupImage__icon: {
    height: 24,
    width: 24
  },
});