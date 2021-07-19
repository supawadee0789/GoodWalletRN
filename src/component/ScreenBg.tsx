import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

const ScreenBg: React.FC = ({children}) => {
  return (
    <ScreenWrapper colors={['#B58FE7', '#C88EC5', '#DF8D9F']}>
      {children}
    </ScreenWrapper>
  );
};

const ScreenWrapper = styled(LinearGradient)`
  flex: 1;
`;

export default ScreenBg;
