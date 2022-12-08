import { AtomIcon, AtomText, AtomWrapper } from '@ixulabs/native-ui';
import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { css } from 'styled-components/native';
import AtomButton from '~/components/@atoms/AtomButton';

interface MoleculeCardUserType {
  name?: string;
  document?: string;
  tel?: string;
  location?: string;
  onPress?: () => void;
}

const MoleculeCardUser: FC<MoleculeCardUserType> = (props) => {
  const { document, tel, location = '', name, onPress } = props;
  return (
    <AtomButton
      type="button"
      onPress={onPress}
      css={() => css`
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        margin: 5px;
        padding: 10px;
        border: 1px solid #cdcdcd;
        border-radius: 25px;
        width: 98%;
      `}
    >
      <AtomWrapper width="95%">
        <AtomText color="#162C5B">{name}</AtomText>
        <AtomText color="#0F4C81">C.C. {document}</AtomText>
        <AtomText color="#64707D">Telefono: {tel}</AtomText>

        {location !== '' && (
          <AtomWrapper flexDirection="row">
            <AtomIcon
              uri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/Cheisi/Icons/location.svg"
              color="#167BD8"
              height="15px"
              width="15px"
              style={{
                paddingTop: 5,
              }}
            />
            <AtomText
              style={{
                paddingLeft: 5,
              }}
            >
              {location}
            </AtomText>
          </AtomWrapper>
        )}
      </AtomWrapper>
    </AtomButton>
  );
};
export default MoleculeCardUser;
