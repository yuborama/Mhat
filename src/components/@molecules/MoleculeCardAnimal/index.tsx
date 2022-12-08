import { AtomButton, AtomText, AtomWrapper } from '@ixulabs/native-ui';
import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { css } from 'styled-components/native';
import AtomImage from '~/components/@atoms/AtomImage';

interface MoleculeCardAnimalType {
  url?: string;
  name?: string;
  typeanimal?: string;
  race?: string;
  owner?: string;
  ccOwner?: string;
  location?: string;
  onPress?: () => void;
}

const MoleculeCardAnimal: FC<MoleculeCardAnimalType> = (props) => {
  const { ccOwner, location, name, owner, race, url, typeanimal, onPress } = props;
  return (
    <AtomButton onPress={onPress}>
      <AtomWrapper
        customCSS={css`
          flex-direction: row;
          align-items: center;
          justify-content: center;
          margin: 5px;
          padding: 5px;
          border: 1px solid #cdcdcd;
          border-radius: 25px;
          width: 98%;
        `}
      >
        <AtomWrapper
          width="20%"
          alignItems="center"
          justifyContent="center"
          customCSS={css`
            padding: 0 20px;
          `}
        >
          <AtomImage
            source={{
              uri:
                url ??
                'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/dogDefualt.png',
            }}
            resizeMode="cover"
            css={() => css`
              width: 70px;
              height: 70px;
              border-radius: 35px;
            `}
          />
        </AtomWrapper>
        <AtomWrapper
          customCSS={css`
            width: 80%;
            padding-left: 10px;
          `}
        >
          <AtomText style={Styles.name}>{name}</AtomText>
          <AtomText style={Styles.race}>{race ?? 'Sin definir'}</AtomText>
          <AtomText style={Styles.typeanimal}>{typeanimal}</AtomText>
          {owner ? (
            <AtomText style={Styles.dataOwner}>
              Dueño {owner} CC {ccOwner}
            </AtomText>
          ) : (
            <AtomText style={Styles.dataOwner}>Sin dueño definido</AtomText>
          )}
          <AtomText style={Styles.location}>
            {location && location?.length > 0 ? location : 'Sin direccion definida'}
          </AtomText>
        </AtomWrapper>
      </AtomWrapper>
    </AtomButton>
  );
};
export default MoleculeCardAnimal;

const Styles = StyleSheet.create({
  container: {},
  name: {
    fontSize: 20,
    color: '#167BD8',
  },
  race: {
    fontSize: 15,
    color: '#64707D',
  },
  typeanimal: {
    fontSize: 10,
    color: '#64707D',
  },
  dataOwner: {
    fontSize: 12,
    color: '#64707D',
  },
  location: {
    fontSize: 15,
    color: '#2E2E2E',
  },
});
