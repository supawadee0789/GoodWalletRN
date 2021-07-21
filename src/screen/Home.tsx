import React from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';
import ScreenBg from '../component/ScreenBg';
import {useDispatch, useSelector} from 'react-redux';
import {getTotalValue, getUser, saveUser} from '../store/walletSlice';
import TotalWalletCard from '../component/TotalWalletCard';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
  const total = useSelector(getTotalValue);
  const dispatch = useDispatch();
  const LogoutFunction = () => {
    dispatch(saveUser(''));

    console.warn(auth().currentUser?.email);

    auth()
      .signOut()
      .then(() => {
        console.warn('User signed out!');
        navigation.navigate('start');
      });
  };
  return (
    <ScreenBg>
      <ContentContainer>
        <TotalWalletCard total={total} />
        <TouchableOpacity onPress={() => LogoutFunction()}>
          <Logout>Logout</Logout>
        </TouchableOpacity>
      </ContentContainer>
    </ScreenBg>
  );
};

const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 50px;
`;

const Logout = styled.Text`
  font-size: 20px;
  color: white;
  margin-top: 50px;
`;

export default HomeScreen;
