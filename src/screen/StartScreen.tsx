import React, {useEffect, useState, useRef} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';
import ScreenBg from '../component/ScreenBg';
import GestureRecognizer from 'react-native-swipe-gestures';
import LogoIcon from '../asset/LogoIcon.svg';
import {windowWidth} from '../constants/platform';
import MyModal from '../component/Modal';
import SignIn from '../component/SignIn';
import {useSelector} from 'react-redux';
import {getUser} from '../store/walletSlice';

export const ModalContext = React.createContext();

const StartScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSignIn, setSignIn] = useState(true);
  const iconAnimatedValue = useRef(new Animated.Value(0)).current;
  const modal = [modalVisible, setModalVisible];

  const user = useSelector(getUser);

  useEffect(() => {
    Animated.timing(iconAnimatedValue, {
      toValue: modalVisible ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [iconAnimatedValue, modalVisible]);

  const xVal = iconAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const yVal = iconAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200],
  });

  const animStyle = {
    transform: [{translateY: yVal}, {translateX: xVal}],
  };
  return (
    <ModalContext.Provider value={modal}>
      <ScreenBg>
        <GestureRecognizer onSwipeDown={() => setModalVisible(false)}>
          <MyModal modalVisible={modalVisible} height={500}>
            <ButtonContainer>
              <Btn
                color="#8C35B1"
                onPress={() => setSignIn(true)}
                toggle={isSignIn}>
                <BtnTitle color="#8C35B1" toggle={isSignIn}>
                  Sign In
                </BtnTitle>
              </Btn>
              <Btn
                color="#B58FE7"
                toggle={!isSignIn}
                onPress={() => setSignIn(false)}>
                <BtnTitle color="#B58FE7" toggle={!isSignIn}>
                  Sign Up
                </BtnTitle>
              </Btn>
            </ButtonContainer>
            <SignIn isSignIn={isSignIn} />
          </MyModal>
        </GestureRecognizer>
        <ContentContainer>
          <Animated.View style={[animStyle]}>
            <LogoIcon width={windowWidth * 0.4} />
          </Animated.View>

          <StartBtn
            onPress={() => {
              if (user === '') {
                setModalVisible(true);
              } else {
                navigation.navigate('home');
              }
            }}>
            <StartBtnText>START</StartBtnText>
          </StartBtn>
        </ContentContainer>
      </ScreenBg>
    </ModalContext.Provider>
  );
};

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const StartBtnText = styled.Text`
  color: white;
  font-size: 16px;
`;
const StartBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 32px;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;
const Btn = styled.TouchableOpacity<{color: string; toggle: boolean}>`
  width: ${windowWidth * 0.33}px;
  border-radius: 30px;
  background-color: ${props => (props.toggle ? props.color : 'transparent')};
  height: 46px;
  justify-content: center;
  align-items: center;
  border-color: ${props => (props.toggle ? 'transparent' : props.color)};
  border-width: 2px;
`;
const BtnTitle = styled.Text<{color: string; toggle: boolean}>`
  color: ${props => (props.toggle ? 'white' : props.color)};
  font-size: 16px;
`;

export default StartScreen;
