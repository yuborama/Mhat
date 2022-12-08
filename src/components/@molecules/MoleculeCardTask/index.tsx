import { AtomButton, AtomWrapper } from '@ixulabs/native-ui';
import React, { FC } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import AtomComponentRole from '~/components/@atoms/AtomComponetRole';

interface MoleculeCardTaskType {
  text: string;
  image: ImageSourcePropType;
  onPress?: () => void;
  RolesAccess?: string[];
}

const CustomStyles = css`
  align-items: center;
  justify-content: center;
  background-color: #167bd8;
  height: 150px;
  width: 150px;
  border-radius: 15px;
`;

const MoleculeCardTask: FC<MoleculeCardTaskType> = (props) => {
  const { text, image, onPress, RolesAccess } = props;
  return (
    <AtomComponentRole AutorizationRoles={RolesAccess}>
      <AtomButton
        onPress={onPress}
        customCSS={css`
          width: 40%;
          margin-top: 20px;
        `}
        style={styles.container}
      >
        <AtomWrapper customCSS={CustomStyles}>
          <Image style={styles.image} source={image} />
        </AtomWrapper>
        <Text style={styles.text}>{text}</Text>
      </AtomButton>
    </AtomComponentRole>
  );
};
export default MoleculeCardTask;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
  },
});
