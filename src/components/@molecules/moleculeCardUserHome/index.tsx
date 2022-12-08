import { AtomWrapper } from '@ixulabs/native-ui';
import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { css } from 'styled-components/native';

interface MoleculeCardUserHomeType {
  name?: string;
  gender?: string;
  rol?: string;
}

const MoleculeCardUserHome: FC<MoleculeCardUserHomeType> = (props) => {
  const { name, gender, rol } = props;
  return (
    <AtomWrapper
      customCSS={css`
        align-items: center;
        justify-content: center;
        padding: 5px;
        border: 1px solid #cdcdcd;
        border-radius: 15px;
      `}
    >
      <Text style={styles.greetings}>{`Bienvenid${gender == 'female' ? 'a' : 'o'}`}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.rol}>{rol}</Text>
    </AtomWrapper>
  );
};
export default MoleculeCardUserHome;

const styles = StyleSheet.create({
  greetings: {
    fontSize: 20,
    fontWeight: '500',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  rol: {
    fontSize: 18,
    fontWeight: '300',
  },
});
