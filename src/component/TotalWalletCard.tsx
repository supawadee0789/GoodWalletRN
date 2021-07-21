import React from 'react';
import styled from 'styled-components/native';
import {windowHeight, windowWidth} from '../constants/platform';

const TotalWalletCard = ({total}) => {
  return (
    <View>
      <Text>Total</Text>
      <Text>{total}</Text>
    </View>
  );
};

const View = styled.View`
  height: ${windowHeight * 0.15 + 'px'};
  width: ${windowWidth * 0.9 + 'px'};
  background-color: white;
  border-radius: 23px;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  color: purple;
  font-size: 20px;
  margin-top: 15px;
`;

export default TotalWalletCard;
