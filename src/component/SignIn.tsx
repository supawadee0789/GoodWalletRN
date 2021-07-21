import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {KeyboardAvoidingView, Alert} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {ModalContext} from '../screen/StartScreen';

import {useDispatch, useSelector} from 'react-redux';
import {getTotal, saveUser} from '../store/walletSlice';

interface Props {
  isSignIn: boolean;
}
interface Users {
  email: string;
  uid: string;
}
interface Wallet extends Users {
  total: number;
}
const SignIn: React.FC<Props> = ({isSignIn}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = React.useContext(ModalContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [user]);

  const setUpData = (userID: string) => {
    const userData: Users = {email: email, uid: userID};
    const walletData: Wallet = {
      email: email,
      uid: userID,
      total: 0,
    };
    database().ref(`/users/${userID}`).set(userData);
    database().ref(`/wallets/${userID}`).set(walletData);
  };

  const getData = (userID: string) => {
    database()
      .ref(`/wallets/${userID}/total`)
      .once('value')
      .then(res => {
        const total = res.val();
        dispatch(getTotal(total));
      });
  };

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        dispatch(saveUser(email));
        setModalVisible(prev => !prev);
        getData(response.user.uid);
        dispatch(saveUser(email));
        navigation.navigate('home');

        console.warn('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert('Error', 'That email address or password is invalid.', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
        if (error.code === 'auth/user-not-found') {
          console.log('user not found');
          Alert.alert('User not found', 'You have to sign in first.', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
        // console.error(error);
      });
  };

  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        dispatch(saveUser(email));
        const userID = response.user.uid;
        setUpData(userID);
        setModalVisible(prev => !prev);
        navigation.navigate('home');
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert(
            'Email problem',
            'That email address is already in use.',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert('Email problem', 'That email address is invalid.', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }

        if (error.code === 'auth/weak-password') {
          console.log('password are too weak!');
          Alert.alert(
            'Password too weak',
            'Your password must have more than 6 digits',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }

        // console.error(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={{flex: 1, width: '100%', margin: 50}}>
      <Text>Email</Text>
      <TextInput
        onChangeText={str => {
          setEmail(str);
        }}
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        onChangeText={str => {
          setPassword(str);
        }}
      />
      {isSignIn ? (
        <TouchableOpacity onPress={() => signIn()}>
          <BtnText>Sign In</BtnText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => signUp()}>
          <BtnText>Sign Up</BtnText>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

const View = styled.View`
  flex: 1;
  padding: 30px;
  width: 100%;
`;
const Text = styled.Text`
  color: #8c35b1;
  font-size: 14px;
  text-align: left;
  font-weight: bold;
`;

const TextInput = styled.TextInput`
  border-width: 1px;
  border-color: #b58fe7;
  margin: 15px 0px;
  height: 40px;
  border-radius: 30px;
  padding: 10px;
  width: 100%;
`;
const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  background-color: #8c35b1;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: white;
`;
export default SignIn;
