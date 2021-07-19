import React from 'react';
import styled from 'styled-components/native';
import {Modal} from 'react-native';

type Props = {
  modalVisible: boolean;
  height: number;
};

const MyModal: React.FC<Props> = ({children, modalVisible, height}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <ModalContainer height={height}>{children}</ModalContainer>
    </Modal>
  );
};
const ModalContainer = styled.View<{height: number}>`
  background-color: white;
  border-radius: 60px;
  justify-content: center;
  align-items: center;
  height: ${props => props.height}px;
  width: 100%;
  padding: 30px;
  margin-top: auto;
`;

export default MyModal;
