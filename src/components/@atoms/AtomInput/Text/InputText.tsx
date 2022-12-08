import lodash from 'lodash';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { css, useTheme } from 'styled-components';
import { GenerateShadowBox } from '~/utils/generateBoxShadow';
import AtomText from '../../AtomText';
import AtomView from '../../AtomView';
import AtomInputError from '../error';
import { InputTextStyled } from './styled';
import { AtomInputTextTypes } from './types';

const AtomInputText: FC<AtomInputTextTypes> = (props) => {
  const { formik, label, name, value, style } = props;
  const theme = useTheme();
  return (
    <AtomView
      css={() => css`
        background-color: transparent;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      `}
    >
      {label && (
        <AtomText
          css={() => css`
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 4px;
          `}
        >
          {label}
        </AtomText>
      )}
      <InputTextStyled
        value={value ?? lodash.get(formik?.values, name ?? '')}
        onChangeText={(e) => {
          formik?.setFieldValue(name ?? '', e);
          props?.onChangeText?.(e);
        }}
        style={Object.assign(
          {
            ...GenerateShadowBox({
              shadowColor: theme?.input?.color?.shadow ?? theme?.shadow?.color,
              shadowOpacity: 0.1,
              elevation: 5,
            }),
          },
          style
        )}
        placeholderTextColor={theme?.input?.color?.placeholder ?? theme?.text?.color?.primary}
        {...props}
      />
      <AtomInputError {...props} />
    </AtomView>
  );
};

export default AtomInputText;
